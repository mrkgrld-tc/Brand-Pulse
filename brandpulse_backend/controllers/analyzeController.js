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
            // save to analysis table
            const analysisQuery = `
                INSERT INTO analysis
                (user_id, date) 
                VALUES (?, NOW())
            `
            const analysisData = [userid]
            const insertAnalysis = await DB.query('brand_pulse', analysisQuery, analysisData)
            
            const resultsQuery = `
                INSERT INTO results 
                (date, analysis_id, feedback, sentiment, confidence, keywords, themes, summary) 
                VALUES ?
            `;
            
            //save to result table
            const resultsValues = analyzedResults.map(data => [
                data.date || null,
                insertAnalysis.insertId,
                data.text,
                data.sentiment,
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
    }
}