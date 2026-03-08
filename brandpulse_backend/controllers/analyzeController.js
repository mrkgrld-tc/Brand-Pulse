const getDbManager  = require('../database/db_manager');
const { analyzeFeedback, generateInsights, generateSWOT } = require('../services/geminiService');

module.exports = {
    analyzeFeedback : async (req, res) => {
        try {
            const feedback = req.body.feedbacks;
            const userid = req.body.userId;
            
            if (!feedback || !Array.isArray(feedback) || feedback.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Feedback array is required'
                });
            }
            
            console.log(`📥 Received ${feedback.length} reviews for analysis`);
            
            // STEP 1: Analyze sentiment
            console.log('🔍 Step 1: Analyzing sentiment...');
            // const analyzedResults = await analyzeFeedback(feedback);
            
            // STEP 2: Generate insights
            console.log('💡 Step 2: Generating insights...');
            // const insights = await generateInsights(analyzedResults);
            
            // STEP 3: Generate SWOT analysis
            console.log('📊 Step 3: Generating SWOT analysis...');
            // const swot = await generateSWOT(analyzedResults);
            
            //Save to database here
            const results = [
        {
            "date": "1/3/2024",
            "text": "Ang sarap ng sisig nila! Crispy at tasty. Will definitely come back!",
            "sentiment": "positive",
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
            "summary": "The customer enjoyed the crispy and tasty sisig and intends to return."
        },
        {
            "date": "1/3/2024",
            "text": "Masarap yung food pero medyo matagal yung service",
            "sentiment": "neutral",
            "confidence": 90,
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
            "summary": "The food is delicious, but the customer noted that the service is quite slow."
        },
        {
            "date": "2/3/2024",
            "text": "The lechon kawali is too oily. Hindi ko naubos.",
            "sentiment": "negative",
            "confidence": 98,
            "keywords": [
                "lechon kawali",
                "oily",
                "hindi naubos"
            ],
            "themes": [
                "food quality"
            ],
            "summary": "The lechon kawali was too oily, preventing the customer from finishing the meal."
        },
        {
            "date": "2/3/2024",
            "text": "Best adobo I've ever had! Tamang tama yung timpla",
            "sentiment": "positive",
            "confidence": 100,
            "keywords": [
                "best adobo",
                "timpla",
                "adobo"
            ],
            "themes": [
                "food quality",
                "taste"
            ],
            "summary": "The customer considers this the best adobo they have ever had due to its perfect seasoning."
        },
        {
            "date": "3/3/2024",
            "text": "Sobrang tagal ng order namin. 45 minutes kami naghintay",
            "sentiment": "negative",
            "confidence": 100,
            "keywords": [
                "tagal",
                "order",
                "45 minutes",
                "nag-hintay"
            ],
            "themes": [
                "service speed"
            ],
            "summary": "The customer was very dissatisfied with the 45-minute wait for their order."
        },
        {
            "date": "3/3/2024",
            "text": "Nice ambiance and friendly staff. Food is great too!",
            "sentiment": "positive",
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
            "summary": "The customer liked the nice ambiance, friendly staff, and great food."
        },
        {
            "date": "4/3/2024",
            "text": "Mahal for such small portions. Not worth the price",
            "sentiment": "negative",
            "confidence": 95,
            "keywords": [
                "mahal",
                "small portions",
                "not worth"
            ],
            "themes": [
                "price",
                "portion size"
            ],
            "summary": "The customer found the food expensive for its small portion size and felt it wasn't worth the price."
        },
        {
            "date": "4/3/2024",
            "text": "Fresh ingredients and authentic Filipino taste. Highly recommended!",
            "sentiment": "positive",
            "confidence": 100,
            "keywords": [
                "fresh ingredients",
                "authentic",
                "recommended"
            ],
            "themes": [
                "food quality",
                "taste"
            ],
            "summary": "The restaurant is highly recommended for its fresh ingredients and authentic Filipino flavor."
        },
        {
            "date": "5/3/2024",
            "text": "Yung rice parang kanina pa niluto. Dry na dry",
            "sentiment": "negative",
            "confidence": 98,
            "keywords": [
                "rice",
                "kanina pa",
                "dry na dry"
            ],
            "themes": [
                "food quality",
                "freshness"
            ],
            "summary": "The customer complained that the rice was extremely dry and did not seem freshly cooked."
        },
        {
            "date": "5/3/2024",
            "text": "Their halo-halo is amazing! Perfect for summer",
            "sentiment": "positive",
            "confidence": 100,
            "keywords": [
                "halo-halo",
                "amazing",
                "summer"
            ],
            "themes": [
                "food quality",
                "dessert"
            ],
            "summary": "The halo-halo was described as amazing and perfect for the summer season."
        },
        {
            "date": "6/3/2024",
            "text": "Waiters are not attentive. Hirap mag pa-follow up ng order",
            "sentiment": "negative",
            "confidence": 96,
            "keywords": [
                "waiters",
                "not attentive",
                "follow up"
            ],
            "themes": [
                "service quality",
                "staff behavior"
            ],
            "summary": "The waiters were inattentive, making it difficult for the customer to follow up on their order."
        },
        {
            "date": "6/3/2024",
            "text": "Clean restaurant and great location. Easy to find parking",
            "sentiment": "positive",
            "confidence": 98,
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
            "summary": "The customer appreciated the cleanliness of the restaurant, its location, and the easy parking."
        },
        {
            "date": "7/3/2024",
            "text": "Sinigang na baboy is superb! Asim at tamis perfect combination",
            "sentiment": "positive",
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
            "summary": "The sinigang na baboy was praised for its superb combination of sour and sweet flavors."
        },
        {
            "date": "7/3/2024",
            "text": "Too crowded and noisy. Can't enjoy the food properly",
            "sentiment": "negative",
            "confidence": 95,
            "keywords": [
                "crowded",
                "noisy",
                "enjoy"
            ],
            "themes": [
                "atmosphere"
            ],
            "summary": "The customer was unable to enjoy the food because the place was too crowded and noisy."
        },
        {
            "date": "8/3/2024",
            "text": "Overpriced for mediocre food quality",
            "sentiment": "negative",
            "confidence": 97,
            "keywords": [
                "overpriced",
                "mediocre",
                "food quality"
            ],
            "themes": [
                "price",
                "food quality"
            ],
            "summary": "The customer felt the food was overpriced given its mediocre quality."
        },
        {
            "date": "8/3/2024",
            "text": "Their pancit canton is delicious! Reminds me of my lola's cooking",
            "sentiment": "positive",
            "confidence": 100,
            "keywords": [
                "pancit canton",
                "delicious",
                "lola's cooking"
            ],
            "themes": [
                "food quality",
                "taste"
            ],
            "summary": "The pancit canton was delicious and reminded the customer of their grandmother's cooking."
        },
        {
            "date": "9/3/2024",
            "text": "Mainit pa yung serving ng bulalo. Sobrang sarap!",
            "sentiment": "positive",
            "confidence": 100,
            "keywords": [
                "mainit",
                "serving",
                "bulalo",
                "sarap"
            ],
            "themes": [
                "food quality",
                "serving temperature"
            ],
            "summary": "The bulalo was served hot and was described as being very delicious."
        },
        {
            "date": "9/3/2024",
            "text": "The place is dirty. Maraming langaw sa may counter",
            "sentiment": "negative",
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
            "summary": "The customer found the place dirty, specifically noting many flies near the counter."
        },
        {
            "date": "10/3/2024",
            "text": "Excellent customer service! Very accommodating ang staff",
            "sentiment": "positive",
            "confidence": 100,
            "keywords": [
                "customer service",
                "accommodating",
                "staff"
            ],
            "themes": [
                "service quality",
                "staff behavior"
            ],
            "summary": "The customer received excellent and very accommodating service from the staff."
        },
        {
            "date": "10/3/2024",
            "text": "Kare-kare walang lasa. Kulang sa bagoong",
            "sentiment": "negative",
            "confidence": 98,
            "keywords": [
                "kare-kare",
                "walang lasa",
                "bagoong"
            ],
            "themes": [
                "food quality",
                "taste"
            ],
            "summary": "The kare-kare was described as tasteless and lacking in shrimp paste."
        },
        {
            "date": "11/3/2024",
            "text": "Best value for money! Busog na busog kami for only 300 pesos",
            "sentiment": "positive",
            "confidence": 100,
            "keywords": [
                "value for money",
                "busog",
                "300 pesos"
            ],
            "themes": [
                "price",
                "portion size"
            ],
            "summary": "The customer felt they got the best value for their money as they were very full for only 300 pesos."
        },
        {
            "date": "11/3/2024",
            "text": "Air conditioning not working. Mainit sa loob",
            "sentiment": "negative",
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
            "summary": "The restaurant was hot inside because the air conditioning was not functioning."
        },
        {
            "date": "12/3/2024",
            "text": "Their tapsilog is perfect! Bagong luto at fresh yung itlog",
            "sentiment": "positive",
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
            "summary": "The tapsilog was perfect, being freshly cooked and featuring fresh eggs."
        },
        {
            "date": "12/3/2024",
            "text": "Sobrang alat ng tinola. Di ko naubos yung sabaw",
            "sentiment": "negative",
            "confidence": 98,
            "keywords": [
                "alat",
                "tinola",
                "hindi naubos"
            ],
            "themes": [
                "food quality",
                "taste"
            ],
            "summary": "The tinola was so salty that the customer could not finish the soup."
        }
            ]
            const DB = await getDbManager();

            // Prepare bulk insert
            const reviewsQuery = `
                INSERT INTO results 
                (date, feedback, sentiment, confidence, keywords, themes, summary) 
                VALUES ?
            `;
            
            const reviewsValues = results.map(data => [
                data.date || null,
                data.text,
                data.sentiment,
                data.confidence,
                JSON.stringify(data.keywords),
                JSON.stringify(data.themes),
                data.summary
            ]);
            
            // Execute bulk insert - Now this will work!
            const insertResult = await DB.query('brand_pulse', reviewsQuery, [reviewsValues]);
            
            console.log(`✅ Inserted ${insertResult.affectedRows} reviews`);
            // res.json({
            //     success: true,
            //     message: 'Analysis complete',
            //     results: analyzedResults,
            //     insights: insights,
            //     swot: swot,
            //     count: analyzedResults.length
            // });
        } catch (error) {   
            console.error('Analysis endpoint error:', error);
        
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to analyze feedback'
            });
        }
    }
}