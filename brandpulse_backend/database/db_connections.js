module.exports = {
    //mysql connection
    mysqlDB : {
        brand_pulse:{
            host: process.env.BRANDPULSE_HOST,
            port: process.env.BRANDPULSE_PORT || 3306,
            user: process.env.BRANDPULSE_USERNAME,
            password: process.env.BRANDPULSE_PASSWORD,
            database: process.env.BRANDPULSE_DATABASE,
            connectionLimit: 10,
            queueLimit: 100,
            // reconnect: true,
            ssl: process.env.NODE_ENV === 'production',
            charset: 'utf8mb4',
            timezone: 'Z'
        }
    },
    //ms sql connection
    mssqlDB: {
        
    }
}