const getDbManager  = require('../database/db_manager');
const bcrypt = require('bcrypt')
module.exports = {
    authUser : async (req, res) => {
        try {
            const email = req.body.data.email;
            const password = req.body.data.password;
            console.log(req.body)
            const DB = await getDbManager();
            //check if email exist
            const checkEmail = await DB.query('brand_pulse',
                `
                SELECT user_id FROM user WHERE email = '${email}'
                `
            )
            if(checkEmail == 0){
                res.json({
                    success : true,
                    message : 'account not found'
                })
            }else{
                //fetch user data
                const userId = checkEmail[0].user_id;
                const userData = await DB.query('brand_pulse',
                    `
                    SELECT * FROM user
                        INNER JOIN authentication
                            ON user.user_id = authentication.user_id
                        INNER JOIN company
                            ON user.user_id = company.user_id
                        INNER JOIN account_preference
                            ON user.user_id = account_preference.user_id
                        INNER JOIN industries
                            ON company.industry_id = industries.industry_id
                        INNER JOIN plan
                            ON account_preference.plan_id = plan.plan_id
                    WHERE 
                        user.user_id =  '${userId}'
                    `
                );
                const enteredPassword = password;
                const storedHash = userData[0].password;

                bcrypt.compare(enteredPassword, storedHash, (err, result) => {
                    if (err) throw err;
                    const data = userData[0];
                    if (result) {
                        res.json({
                            success : true,
                            message : 'proceed to login',
                            userData : {
                                ...data
                            },
                        })
                    } else {
                        res.json({
                            success : true,
                            message : 'wrong password'
                        })
                    }
                });
            }
        } catch (error) {
            res.json({
                success : false,
                error : error
            })
        }
    },

    signup: async (req, res) => {
        try {
            const { name, email, password, contactNumber, address, companyName, industry } = req.body.data;
            
            const DB = await getDbManager();
            
            // Check if email already exists (parameterized)
            const checkEmail = await DB.query('brand_pulse',
                'SELECT user_id FROM user WHERE email = ?',
                [email]
            );
            
            if (checkEmail.length > 0) {
                return res.json({
                    success: false,
                    message: 'Account already exists'
                });
            }
            
            // Hash password FIRST (before database operations)
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Insert into user table (parameterized)
            const userResult = await DB.query('brand_pulse',
                `INSERT INTO user (username, email, contact_number, address) 
                VALUES (?, ?, ?, ?)`,
                [name, email, contactNumber, address]
            );
            
            const userId = userResult.insertId;
            
            // Insert into company table (parameterized)
            await DB.query('brand_pulse',
                `INSERT INTO company (user_id, name, industry_id) 
                VALUES (?, ?, ?)`,
                [userId, companyName, industry]
            );
            
            // Insert into authentication table (parameterized)
            await DB.query('brand_pulse',
                `INSERT INTO authentication (user_id, password) 
                VALUES (?, ?)`,
                [userId, hashedPassword]
            );
            
            // Insert into plan table
            const planResult = await DB.query('brand_pulse',
                `INSERT INTO plan (end_date) 
                VALUES (DATE_ADD(CURDATE(), INTERVAL 30 DAY))`
            );
            
            // Insert into account_preference table (parameterized)
            await DB.query('brand_pulse',
                `INSERT INTO account_preference (user_id, plan_id) 
                VALUES (?, ?)`,
                [userId, planResult.insertId]
            );
            
            res.json({
                success: true,
                message: 'Account created successfully'
            });
            
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create account',
                error: error.message
            });
        }
    },

    updateProfile : async (req, res) => {
        try {
            const updateData = req.body;

            // update company
            const DB = await getDbManager();
            await DB.query('brand_pulse', `
                    UPDATE company 
                        SET 
                        name = '${updateData.companyName}',
                        industry_id = '${updateData.industry}' 
                    WHERE company_id = ${updateData.companyId}
                `)
            //update profile
            await DB.query('brand_pulse',`
                    UPDATE user 
                        SET 
                        username = '${updateData.username}',
                        email = '${updateData.email}',
                        contact_number = '${updateData.contactNumber}',
                        address = '${updateData.address}',
                        avatar_base64 = '${updateData.image}'
                    WHERE user_id = ${updateData.userId}
                `)

            res.json({
                success : true,
            })
        } catch (error) {
            console.log('updateProfile: ', error)
        }
    },

    changePassword : async (req, res) => {
        try {
            const userId = req.body.userId;
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            const DB = await getDbManager();
            //fetch stored password hash
            const result = await DB.query('brand_pulse', `
                    SELECT password FROM authentication WHERE user_id = ${userId}
                `)
            const storedHash = result[0].password;  
            //compare current password with stored hash
            bcrypt.compare(currentPassword, storedHash, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    //hash new password
                    bcrypt.hash(newPassword, 10, (err, hash) => {
                        if (err) throw err; 
                        //update password in database
                        DB.query('brand_pulse', `
                                UPDATE authentication
                                    SET password = '${hash}'
                                    WHERE user_id = ${userId}
                            `)
                        res.json({  
                            success : true,
                            message : 'password changed successfully'
                        })
                    });
                } else {
                    res.json({
                        success : true,     
                        message : 'current password is incorrect'
                    })
                }
            });
        } catch (error) {
            console.log('Change Password Error: ', error)
        }
    },
    getIndustries : async (req, res) => {
        try {
            const DB = await getDbManager();

            const industries = await DB.query('brand_pulse', `
                    SELECT * FROM
                    industries
                `)
            res.json({industries});
        } catch (error) {
            console.log('Get Industries Error: ', error)
        }
    }
}