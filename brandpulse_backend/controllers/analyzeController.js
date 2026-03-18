const getDbManager  = require('../database/db_manager');
const { analyzeFeedback, generateInsights, generateSWOT } = require('../services/geminiService');

module.exports = {
    analyzeFeedback : async (req, res) => {
        try {
            const feedback = req.body.feedbacks;
            const userid = req.body.userId;
            const company = req.body.company;
            if (!feedback || !Array.isArray(feedback) || feedback.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Feedback array is required'
                });
            }
            
            console.log(`📥 Received ${feedback.length} reviews for analysis`);
            
            // STEP 1: Analyze sentiment
            console.log('🔍 Step 1: Analyzing sentiment...');
            const analyzedResults = await analyzeFeedback(feedback);

            // STEP 2: Generate insights
            console.log('💡 Step 2: Generating insights...');
            const insights = await generateInsights(analyzedResults);
            
            // STEP 3: Generate SWOT analysis
            console.log('📊 Step 3: Generating SWOT analysis...');
            const swot = await generateSWOT(analyzedResults);
            
            console.log("Step 4: Inserting to Database")
            //Save to database here
            const DB = await getDbManager();    
            let insertAnalysis = null;
            //Isnert to Company
            if(company.own){
                // save to analysis table
                const analysisQuery = `
                    INSERT INTO analysis
                    (user_id, company_id, date) 
                    VALUES (?, ?, NOW())
                `
                const analysisData = [userid, company.company.company_id];
                const insertAnalysis = await DB.query('brand_pulse', analysisQuery, analysisData);
            }else{
                //save company to database
                const companyQuery = `
                    INSERT INTO company
                        (user_id, name, industry_id) VALUES 
                        (?, ?, ?)
                `
                const companyData = [userid, company.company.companyName, company.company.industryId]
                const insertCompany = await DB.query('brand_pulse', companyQuery, companyData)

                //insert analysis
                const companyId = insertCompany.insertId;
                const analysisQuery = `
                    INSERT INTO analysis
                    (user_id, company_id, date) 
                    VALUES (?, ?, NOW())
                `
                const analysisData = [userid, companyId];
                insertAnalysis = await DB.query('brand_pulse', analysisQuery, analysisData);
            }

            const resultsQuery = `
                INSERT INTO results 
                (date, analysis_id, feedback, sentiment, satisfaction, confidence, keywords, themes, summary) 
                VALUES ?
            `;
            
            //save to result table
            const resultsValues = analyzedResults.map(data => [
                data.date || null,
                insertAnalysis.insertId,
                data.text,
                data.sentiment,
                data.satisfaction,
                data.confidence,
                JSON.stringify(data.keywords),
                JSON.stringify(data.themes),
                data.summary
            ]);
            const insertResult = await DB.query('brand_pulse', resultsQuery, [resultsValues]);

            //save to insight table
            const insightQuery = `
                INSERT INTO insights
                (analysis_id, title, description, priority, sentiment_type, theme, expected_impact) 
                VALUES ?
            `
            const insightValues = insights.map(data => [
                insertAnalysis.insertId,
                data.title,
                data.description,
                data.priority,
                data.sentiment_type,
                data.theme,
                data.expected_impact
            ])
            const insertInsight = await DB.query('brand_pulse', insightQuery, [insightValues]);

            //save to swot table
            const swotQuery = `
                INSERT INTO swot
                (analysis_id, strength, weaknesses, opportunities, threats) 
                VALUES (?, ?, ?, ?, ?)
            `
            const swotValues = [
                insertAnalysis.insertId,
                JSON.stringify(swot.strengths),
                JSON.stringify(swot.weaknesses),
                JSON.stringify(swot.opportunities),
                JSON.stringify(swot.threats),
            ]
            const insertSwot = await DB.query('brand_pulse', swotQuery, swotValues);
            
            res.json({
                success: true,
                message: 'Analysis complete',
                results: analyzedResults,
                insights: insights,
                swot: swot,
                count: analyzedResults.length
            });

        } catch (error) {   
            console.error('Analysis endpoint error:', error);
        
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to analyze feedback'
            });
        }
    },
    analyzeFeedback1 : async (req, res) => {
        res.json({
            "success": true,
            "message": "Analysis complete",
            "results": [
                {
                    "date": "1/3/2024",
                    "text": "Ang sarap ng sisig nila! Crispy at tasty. Will definitely come back!",
                    "sentiment": "positive",
                    "satisfaction": 95,
                    "confidence": 100,
                    "keywords": [
                        "sarap",
                        "sisig",
                        "crispy",
                        "tasty"
                    ],
                    "themes": [
                        "food quality",
                        "taste"
                    ],
                    "summary": "The customer loved the crispy and tasty sisig and intends to return."
                },
                {
                    "date": "1/3/2024",
                    "text": "Masarap yung food pero medyo matagal yung service",
                    "sentiment": "positive",
                    "satisfaction": 60,
                    "confidence": 95,
                    "keywords": [
                        "masarap",
                        "food",
                        "matagal",
                        "service"
                    ],
                    "themes": [
                        "food quality",
                        "service speed"
                    ],
                    "summary": "The food was good but the service was slow."
                },
                {
                    "date": "2/3/2024",
                    "text": "The lechon kawali is too oily. Hindi ko naubos.",
                    "sentiment": "negative",
                    "satisfaction": 30,
                    "confidence": 98,
                    "keywords": [
                        "lechon kawali",
                        "oily",
                        "hindi naubos"
                    ],
                    "themes": [
                        "food quality"
                    ],
                    "summary": "The customer was dissatisfied because the lechon kawali was too oily to finish."
                },
                {
                    "date": "2/3/2024",
                    "text": "Best adobo I've ever had! Tamang tama yung timpla",
                    "sentiment": "positive",
                    "satisfaction": 100,
                    "confidence": 100,
                    "keywords": [
                        "best adobo",
                        "timpla",
                        "sarap"
                    ],
                    "themes": [
                        "food quality",
                        "taste"
                    ],
                    "summary": "The customer considers this the best adobo with perfect seasoning."
                },
                {
                    "date": "3/3/2024",
                    "text": "Sobrang tagal ng order namin. 45 minutes kami naghintay",
                    "sentiment": "negative",
                    "satisfaction": 20,
                    "confidence": 100,
                    "keywords": [
                        "sobrang tagal",
                        "order",
                        "45 minutes",
                        "naghintay"
                    ],
                    "themes": [
                        "service speed"
                    ],
                    "summary": "The customer was very dissatisfied with a 45-minute wait for their order."
                },
                {
                    "date": "3/3/2024",
                    "text": "Nice ambiance and friendly staff. Food is great too!",
                    "sentiment": "positive",
                    "satisfaction": 95,
                    "confidence": 100,
                    "keywords": [
                        "ambiance",
                        "friendly staff",
                        "food is great"
                    ],
                    "themes": [
                        "atmosphere",
                        "service quality",
                        "food quality"
                    ],
                    "summary": "The customer enjoyed the great food, nice ambiance, and friendly staff."
                },
                {
                    "date": "4/3/2024",
                    "text": "Mahal for such small portions. Not worth the price",
                    "sentiment": "negative",
                    "satisfaction": 25,
                    "confidence": 100,
                    "keywords": [
                        "mahal",
                        "small portions",
                        "not worth"
                    ],
                    "themes": [
                        "price",
                        "portion size",
                        "value"
                    ],
                    "summary": "The customer felt the food was overpriced for the small portion sizes provided."
                },
                {
                    "date": "4/3/2024",
                    "text": "Fresh ingredients and authentic Filipino taste. Highly recommended!",
                    "sentiment": "positive",
                    "satisfaction": 98,
                    "confidence": 100,
                    "keywords": [
                        "fresh ingredients",
                        "authentic",
                        "Filipino taste",
                        "recommended"
                    ],
                    "themes": [
                        "food quality",
                        "authenticity"
                    ],
                    "summary": "Highly recommended for its fresh ingredients and authentic Filipino flavor."
                },
                {
                    "date": "5/3/2024",
                    "text": "Yung rice parang kanina pa niluto. Dry na dry",
                    "sentiment": "negative",
                    "satisfaction": 20,
                    "confidence": 95,
                    "keywords": [
                        "rice",
                        "kanina pa niluto",
                        "dry"
                    ],
                    "themes": [
                        "food quality",
                        "freshness"
                    ],
                    "summary": "The rice was criticized for being very dry and not freshly cooked."
                },
                {
                    "date": "5/3/2024",
                    "text": "Their halo-halo is amazing! Perfect for summer",
                    "sentiment": "positive",
                    "satisfaction": 95,
                    "confidence": 100,
                    "keywords": [
                        "halo-halo",
                        "amazing",
                        "summer"
                    ],
                    "themes": [
                        "food quality",
                        "taste"
                    ],
                    "summary": "The customer highly enjoyed the amazing halo-halo, noting it is perfect for summer."
                },
                {
                    "date": "6/3/2024",
                    "text": "Waiters are not attentive. Hirap mag pa-follow up ng order",
                    "sentiment": "negative",
                    "satisfaction": 25,
                    "confidence": 98,
                    "keywords": [
                        "waiters",
                        "not attentive",
                        "follow up",
                        "order"
                    ],
                    "themes": [
                        "service quality"
                    ],
                    "summary": "Waiters were described as inattentive, making order follow-ups difficult."
                },
                {
                    "date": "6/3/2024",
                    "text": "Clean restaurant and great location. Easy to find parking",
                    "sentiment": "positive",
                    "satisfaction": 90,
                    "confidence": 100,
                    "keywords": [
                        "clean",
                        "location",
                        "parking"
                    ],
                    "themes": [
                        "cleanliness",
                        "location",
                        "accessibility"
                    ],
                    "summary": "The restaurant is clean, well-located, and offers easy parking."
                },
                {
                    "date": "7/3/2024",
                    "text": "Sinigang na baboy is superb! Asim at tamis perfect combination",
                    "sentiment": "positive",
                    "satisfaction": 98,
                    "confidence": 100,
                    "keywords": [
                        "sinigang na baboy",
                        "superb",
                        "asim",
                        "tamis"
                    ],
                    "themes": [
                        "food quality",
                        "taste"
                    ],
                    "summary": "The sinigang na baboy was superb due to its perfect sour and sweet balance."
                },
                {
                    "date": "7/3/2024",
                    "text": "Too crowded and noisy. Can't enjoy the food properly",
                    "sentiment": "negative",
                    "satisfaction": 35,
                    "confidence": 95,
                    "keywords": [
                        "crowded",
                        "noisy",
                        "can't enjoy"
                    ],
                    "themes": [
                        "atmosphere",
                        "ambiance"
                    ],
                    "summary": "The noisy and crowded environment prevented the customer from enjoying the food."
                },
                {
                    "date": "8/3/2024",
                    "text": "Overpriced for mediocre food quality",
                    "sentiment": "negative",
                    "satisfaction": 30,
                    "confidence": 100,
                    "keywords": [
                        "overpriced",
                        "mediocre",
                        "food quality"
                    ],
                    "themes": [
                        "price",
                        "food quality"
                    ],
                    "summary": "The customer felt the food quality was mediocre relative to the high price."
                },
                {
                    "date": "8/3/2024",
                    "text": "Their pancit canton is delicious! Reminds me of my lola's cooking",
                    "sentiment": "positive",
                    "satisfaction": 95,
                    "confidence": 98,
                    "keywords": [
                        "pancit canton",
                        "delicious",
                        "lola's cooking"
                    ],
                    "themes": [
                        "food quality",
                        "taste",
                        "authenticity"
                    ],
                    "summary": "The delicious pancit canton reminded the customer of traditional home cooking."
                },
                {
                    "date": "9/3/2024",
                    "text": "Mainit pa yung serving ng bulalo. Sobrang sarap!",
                    "sentiment": "positive",
                    "satisfaction": 95,
                    "confidence": 98,
                    "keywords": [
                        "mainit",
                        "serving",
                        "bulalo",
                        "sarap"
                    ],
                    "themes": [
                        "food quality",
                        "temperature",
                        "taste"
                    ],
                    "summary": "The bulalo was served hot and was very delicious."
                },
                {
                    "date": "9/3/2024",
                    "text": "The place is dirty. Maraming langaw sa may counter",
                    "sentiment": "negative",
                    "satisfaction": 15,
                    "confidence": 100,
                    "keywords": [
                        "dirty",
                        "langaw",
                        "counter"
                    ],
                    "themes": [
                        "cleanliness",
                        "hygiene"
                    ],
                    "summary": "Serious hygiene concerns were raised due to flies and a dirty environment."
                },
                {
                    "date": "10/3/2024",
                    "text": "Excellent customer service! Very accommodating ang staff",
                    "sentiment": "positive",
                    "satisfaction": 100,
                    "confidence": 100,
                    "keywords": [
                        "excellent",
                        "customer service",
                        "accommodating",
                        "staff"
                    ],
                    "themes": [
                        "service quality"
                    ],
                    "summary": "The customer was highly satisfied with the excellent and accommodating service."
                },
                {
                    "date": "10/3/2024",
                    "text": "Kare-kare walang lasa. Kulang sa bagoong",
                    "sentiment": "negative",
                    "satisfaction": 30,
                    "confidence": 95,
                    "keywords": [
                        "kare-kare",
                        "walang lasa",
                        "kulang bagoong"
                    ],
                    "themes": [
                        "food quality",
                        "taste"
                    ],
                    "summary": "The kare-kare was tasteless and lacked sufficient shrimp paste."
                },
                {
                    "date": "11/3/2024",
                    "text": "Best value for money! Busog na busog kami for only 300 pesos",
                    "sentiment": "positive",
                    "satisfaction": 98,
                    "confidence": 100,
                    "keywords": [
                        "value for money",
                        "busog",
                        "300 pesos"
                    ],
                    "themes": [
                        "price",
                        "value",
                        "portion size"
                    ],
                    "summary": "Excellent value for money as they were very full for a low price."
                },
                {
                    "date": "11/3/2024",
                    "text": "Air conditioning not working. Mainit sa loob",
                    "sentiment": "negative",
                    "satisfaction": 30,
                    "confidence": 100,
                    "keywords": [
                        "air conditioning",
                        "mainit",
                        "not working"
                    ],
                    "themes": [
                        "atmosphere",
                        "comfort"
                    ],
                    "summary": "The dining experience was uncomfortable because the air conditioning was not working."
                },
                {
                    "date": "12/3/2024",
                    "text": "Their tapsilog is perfect! Bagong luto at fresh yung itlog",
                    "sentiment": "positive",
                    "satisfaction": 98,
                    "confidence": 100,
                    "keywords": [
                        "tapsilog",
                        "perfect",
                        "bagong luto",
                        "fresh"
                    ],
                    "themes": [
                        "food quality",
                        "freshness"
                    ],
                    "summary": "The tapsilog was perfect, featuring fresh eggs and being freshly cooked."
                },
                {
                    "date": "12/3/2024",
                    "text": "Sobrang alat ng tinola. Di ko naubos yung sabaw",
                    "sentiment": "negative",
                    "satisfaction": 25,
                    "confidence": 98,
                    "keywords": [
                        "sobrang alat",
                        "tinola",
                        "sabaw"
                    ],
                    "themes": [
                        "food quality",
                        "taste"
                    ],
                    "summary": "The tinola was far too salty, making the soup inedible for the customer."
                }
            ],
            "insights": [
                {
                    "title": "Standardize Preparation to Maintain Food Quality",
                    "description": "15 customers praised the food quality, specifically highlighting the sisig and adobo. Ensure these recipes are strictly standardized across all shifts to maintain your primary competitive advantage.",
                    "priority": "medium",
                    "sentiment_type": "positive",
                    "theme": "food quality",
                    "expected_impact": "Sustained high satisfaction levels and increased customer loyalty through meal consistency."
                },
                {
                    "title": "Reduce Wait Times to Address Critical Delays",
                    "description": "5 customers reported service issues, including a critical 45-minute wait time for orders. Implement a kitchen display system or optimize peak-hour staffing to drastically reduce turnaround times.",
                    "priority": "high",
                    "sentiment_type": "negative",
                    "theme": "service speed",
                    "expected_impact": "Improved table turnover rates and elimination of the most severe customer complaints."
                },
                {
                    "title": "Review Pricing to Improve Perceived Customer Value",
                    "description": "7 customers expressed dissatisfaction regarding high prices and small portion sizes. Consider adjusting your platter sizes or introducing 'sulit' combo meals to better align with customer value expectations.",
                    "priority": "low",
                    "sentiment_type": "negative",
                    "theme": "price",
                    "expected_impact": "Increased repeat visits from price-sensitive diners and improved overall value-for-money ratings."
                },
                {
                    "title": "Highlight Authentic Taste in Future Marketing",
                    "description": "8 customers explicitly mentioned the authentic and tasty nature of the food. Leverage these specific testimonials in social media campaigns to attract diners seeking a genuine Filipino culinary experience.",
                    "priority": "low",
                    "sentiment_type": "positive",
                    "theme": "taste",
                    "expected_impact": "Enhanced brand identity as a top-tier destination for authentic Filipino flavors."
                },
                {
                    "title": "Improve Freshness and Kitchen Holding Standards",
                    "description": "2 customers reported freshness issues such as dry rice and overly oily lechon kawali. Implement strict holding time logs for rice and refine drainage techniques for fried items to ensure texture quality.",
                    "priority": "low",
                    "sentiment_type": "negative",
                    "theme": "freshness",
                    "expected_impact": "Higher food preparation scores and reduced wastage of poorly prepared side dishes."
                }
            ],
            "swot": {
                "strengths": [
                    "High-quality taste in signature dishes (Sisig, Adobo, Sinigang) - Taste mentioned in 8 reviews",
                    "Authentic Filipino flavor profiles and fresh ingredients - praised by 15 mentions of food quality",
                    "Friendly and accommodating staff - noted as a key factor in 3 service quality mentions",
                    "Strategic location with accessible parking and clean environment",
                    "Strong reception for specific menu items like Halo-halo and Bulalo"
                ],
                "weaknesses": [
                    "Inconsistent food preparation - 5 complaints specifically regarding oily, dry, or tasteless dishes",
                    "Poor service speed - customers reported wait times up to 45 minutes",
                    "Perceived low value for money - 3 mentions of high prices and small portion sizes",
                    "Maintenance and hygiene issues - complaints about broken air conditioning and flies at the counter",
                    "Lack of staff attentiveness during peak hours making follow-ups difficult"
                ],
                "opportunities": [
                    "Standardize kitchen operations to ensure food consistency (e.g., rice texture and oil levels)",
                    "Introduce value-for-money combo meals to address the 46% negative sentiment regarding price/portions",
                    "Implement a digital ordering or queue management system to reduce the 45-minute wait time",
                    "Invest in facility upgrades (AC repair and pest control) to capitalize on the positive 50% sentiment",
                    "Promote popular seasonal items like Halo-halo through targeted social media marketing"
                ],
                "threats": [
                    "Extremely narrow margin between positive (50%) and negative (46%) sentiment indicates high risk of customer churn",
                    "Competitive pressure from nearby restaurants offering larger portions at lower price points",
                    "Negative word-of-mouth regarding restaurant heat and hygiene affecting foot traffic",
                    "Rising ingredient costs impacting the already sensitive price-to-portion ratio"
                ]
            },
            "count": 24
        })
    }
}