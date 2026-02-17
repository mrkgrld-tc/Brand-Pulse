// database/MultiDatabaseManager.js
const mysql = require('mysql2/promise');
const sql = require('mssql');
const { mysqlDB, mssqlDB } = require('./db_connections');

class MultiDatabaseManager {
    constructor() {
        this.mysqlPools = {};
        this.mssqlPools = {};
    }

    async initializePools() {
        this.initializeMySQLPools();
        await this.initializeMSSQLPools();
    }

    initializeMySQLPools() {
        const myDBkeys = Object.keys(mysqlDB);
        myDBkeys.forEach(DBkey => {
            this.mysqlPools[DBkey] = mysql.createPool(mysqlDB[DBkey]);
        });
    }

    async initializeMSSQLPools() {
        try {
            const msDBkeys = Object.keys(mssqlDB);
            msDBkeys.forEach(DBkey => {
                this.mssqlPools[DBkey] = new sql.ConnectionPool(mssqlDB[DBkey]);
            });

            for (const [name, pool] of Object.entries(this.mssqlPools)) {
                await pool.connect();
                console.log(`MSSQL ${name} database connected`);
            }
        } catch (error) {
            console.error('MSSQL pool initialization failed:', error);
            throw error;
        }
    }

    getMySQLPool(database) {
        if (!this.mysqlPools[database]) {
            throw new Error(`MySQL database pool '${database}' not found. Available: ${Object.keys(this.mysqlPools).join(', ')}`);
        }
        return this.mysqlPools[database];
    }

    getMSSQLPool(database) {
        if (!this.mssqlPools[database]) {
            throw new Error(`MSSQL database pool '${database}' not found. Available: ${Object.keys(this.mssqlPools).join(', ')}`);
        }
        return this.mssqlPools[database];
    }

    async mysqlQuery(database, sqlQuery, params = []) {
        try {
            const pool = this.getMySQLPool(database);
            const [rows] = await pool.execute(sqlQuery, params);
            return rows;
        } catch (error) {
            console.error(`MySQL query error on '${database}':`, error);
            throw error;
        }
    }

    async mssqlQuery(database, sqlQuery, params = {}) {
        try {
            const pool = this.getMSSQLPool(database);
            const request = pool.request();

            Object.entries(params).forEach(([key, value]) => {
                request.input(key, value);
            });

            const result = await request.query(sqlQuery);
            return result.recordset;
        } catch (error) {
            console.error(`MSSQL query error on '${database}':`, error);
            throw error;
        }
    }

    async query(database, sqlQuery, params = []) {
        if (this.mysqlPools[database]) {
            return await this.mysqlQuery(database, sqlQuery, params);
        } else if (this.mssqlPools[database]) {
            const mssqlParams = Array.isArray(params)
                ? this.convertParamsForMSSQL(sqlQuery, params)
                : { query: sqlQuery, params };
            const { query, params: namedParams } = mssqlParams;
            return await this.mssqlQuery(database, query, namedParams);
        } else {
            throw new Error(`Database '${database}' not found in MySQL or MSSQL pools`);
        }
    }

    convertParamsForMSSQL(sqlQuery, params) {
        const namedParams = {};
        let modifiedQuery = sqlQuery;

        params.forEach((param, index) => {
            const paramName = `param${index}`;
            namedParams[paramName] = param;
            modifiedQuery = modifiedQuery.replace('?', `@${paramName}`);
        });

        return { query: modifiedQuery, params: namedParams };
    }

    listDatabases() {
        return {
            mysql: Object.keys(this.mysqlPools),
            mssql: Object.keys(this.mssqlPools)
        };
    }

    async healthCheck() {
        const results = {};

        for (const [name, pool] of Object.entries(this.mysqlPools)) {
            try {
                const startTime = Date.now();
                await pool.execute('SELECT 1 as health_check');
                const responseTime = Date.now() - startTime;

                results[`${name}_mysql`] = {
                    status: 'healthy',
                    type: 'MySQL',
                    responseTime: `${responseTime}ms`
                };
            } catch (error) {
                results[`${name}_mysql`] = {
                    status: 'unhealthy',
                    type: 'MySQL',
                    error: error.message
                };
            }
        }

        for (const [name, pool] of Object.entries(this.mssqlPools)) {
            try {
                const startTime = Date.now();
                const request = pool.request();
                await request.query('SELECT 1 as health_check');
                const responseTime = Date.now() - startTime;

                results[`${name}_mssql`] = {
                    status: 'healthy',
                    type: 'MSSQL',
                    responseTime: `${responseTime}ms`
                };
            } catch (error) {
                results[`${name}_mssql`] = {
                    status: 'unhealthy',
                    type: 'MSSQL',
                    error: error.message
                };
            }
        }

        return results;
    }

    async closeAll() {
        console.log('Closing all database connections...');

        const mysqlClosePromises = Object.entries(this.mysqlPools).map(async ([name, pool]) => {
            try {
                await pool.end();
                console.log(`Closed MySQL ${name} pool`);
            } catch (error) {
                console.error(`Error closing MySQL ${name} pool:`, error);
            }
        });

        const mssqlClosePromises = Object.entries(this.mssqlPools).map(async ([name, pool]) => {
            try {
                await pool.close();
                console.log(`Closed MSSQL ${name} pool`);
            } catch (error) {
                console.error(`Error closing MSSQL ${name} pool:`, error);
            }
        });

        await Promise.all([...mysqlClosePromises, ...mssqlClosePromises]);
        console.log('All database connections closed');
    }

    setUpAutoConnectionShutdown() {
        const shutdown = async (signal) => {
            console.log(`Received ${signal}. Starting Shutdown...`);
            await this.closeAll();
            process.exit(0);
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    }
}

let managerInstance = null;

const getManager = async () => {
    if (!managerInstance) {
        const manager = new MultiDatabaseManager();
        await manager.initializePools();
        manager.setUpAutoConnectionShutdown();
        managerInstance = manager;
        console.log('Database manager auto-initialized');
        const health = await managerInstance.healthCheck();
        const databases = managerInstance.listDatabases();
        console.log('Available MySQL databases:', databases.mysql);
        console.log('Available MSSQL databases:', databases.mssql);
        console.log('API Health:', health);
    }
    return managerInstance;
};

module.exports = getManager;
