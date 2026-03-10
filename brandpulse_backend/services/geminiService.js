// services/geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

/**
 * Analyze feedback using Gemini AI
 */
const analyzeFeedback = async (feedbackList) => {
    try {
        console.log(`🤖 Analyzing ${feedbackList.length} reviews with Gemini AI...`);

        const prompt = buildPrompt(feedbackList);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('📥 Gemini response received');

        const analysisResults = parseGeminiResponse(text);
        const analyzedFeedback = mergeResults(feedbackList, analysisResults);

        console.log('✅ Analysis complete!');
        return analyzedFeedback;

    } catch (error) {
        console.error('❌ Gemini AI error:', error);
        throw new Error('Failed to analyze feedback: ' + error.message);
    }
};

/**
 * Build prompt for Gemini AI
 */
const buildPrompt = (feedbackList) => {
    const reviewsList = feedbackList.map((item, index) => {
        return `${index}. "${item.Feedback}"`;
    }).join('\n');

    return `
You are a sentiment analysis expert specializing in Filipino customer feedback (Tagalog, English, and Taglish).

Analyze the following customer reviews and for EACH review provide:
1. sentiment: "positive", "neutral", or "negative"
2. confidence: number between 0-100 (how confident you are)
3. keywords: array of 3-5 important keywords from the review
4. themes: array of main topics mentioned (e.g., "food quality", "service speed", "price", "cleanliness")
5. summary: one brief sentence summarizing the review

Customer Reviews:
${reviewsList}

CRITICAL INSTRUCTIONS:
- Respond ONLY with valid JSON
- Do NOT include markdown code blocks
- Do NOT include any explanation
- Use this EXACT format:

{
    "results": [
        {
            "index": 0,
            "sentiment": "negative",
            "confidence": 85,
            "keywords": ["salty", "fries", "taste"],
            "themes": ["food quality", "taste"],
            "summary": "Customer found the fries too salty"
        }
    ]
}

Respond with JSON only:`;
};

/**
 * Parse Gemini's JSON response
 */
const parseGeminiResponse = (text) => {
    try {
        let cleanText = text.trim();
        cleanText = cleanText.replace(/```json\n?/g, '');
        cleanText = cleanText.replace(/```\n?/g, '');
        cleanText = cleanText.trim();

        const parsed = JSON.parse(cleanText);

        if (!parsed.results || !Array.isArray(parsed.results)) {
            throw new Error('Invalid response structure');
        }

        return parsed.results;

    } catch (error) {
        console.error('Parse error:', error);
        console.error('Raw response:', text);
        throw new Error('Failed to parse AI response');
    }
};

/**
 * Merge results with original feedback
 */
const mergeResults = (feedbackList, analysisResults) => {
    return feedbackList.map((feedback, index) => {
        const analysis = analysisResults.find(r => r.index === index);

        if (!analysis) {
            return {
                ...feedback,
                sentiment: 'neutral',
                confidence: 0,
                keywords: [],
                themes: [],
                summary: feedback.Feedback.substring(0, 50)
            };
        }

        return {
            date: feedback.Date,
            text: feedback.Feedback,
            sentiment: analysis.sentiment,
            confidence: analysis.confidence,
            keywords: analysis.keywords,
            themes: analysis.themes,
            summary: analysis.summary
        };
    });
};

const generateInsights = async (analyzedFeedback) => {
    try {
        console.log(`💡 Generating insights from ${analyzedFeedback.length} analyzed reviews...`);

        // Calculate statistics for the prompt
        const stats = calculateStats(analyzedFeedback);
        
        const prompt = buildInsightsPrompt(analyzedFeedback, stats);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('📥 Insights received from Gemini');

        const insights = parseInsightsResponse(text);

        console.log('✅ Insights generation complete!');
        return insights;

    } catch (error) {
        console.error('❌ Insights generation error:', error);
        throw new Error('Failed to generate insights: ' + error.message);
    }
};

/**
 * Calculate statistics from analyzed feedback
 */
const calculateStats = (analyzedFeedback) => {
    const total = analyzedFeedback.length;
    const positive = analyzedFeedback.filter(f => f.sentiment === 'positive').length;
    const negative = analyzedFeedback.filter(f => f.sentiment === 'negative').length;
    const neutral = analyzedFeedback.filter(f => f.sentiment === 'neutral').length;

    // Extract all themes and count them
    const themeCounts = {};
    analyzedFeedback.forEach(f => {
        f.themes.forEach(theme => {
            themeCounts[theme] = (themeCounts[theme] || 0) + 1;
        });
    });

    // Sort themes by frequency
    const topThemes = Object.entries(themeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([theme, count]) => ({ theme, count }));

    // Get most common keywords
    const keywordCounts = {};
    analyzedFeedback.forEach(f => {
        f.keywords.forEach(keyword => {
            keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        });
    });

    const topKeywords = Object.entries(keywordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([keyword, count]) => ({ keyword, count }));

    return {
        total,
        positive,
        negative,
        neutral,
        positivePercent: Math.round((positive / total) * 100),
        negativePercent: Math.round((negative / total) * 100),
        topThemes,
        topKeywords
    };
};

/**
 * Build prompt for generating insights
 */
const buildInsightsPrompt = (analyzedFeedback, stats) => {
    // Get sample negative feedback for context
    const negativeExamples = analyzedFeedback
        .filter(f => f.sentiment === 'negative')
        .slice(0, 5)
        .map(f => f.text)
        .join('\n');

    // Get sample positive feedback for context
    const positiveExamples = analyzedFeedback
        .filter(f => f.sentiment === 'positive')
        .slice(0, 5)
        .map(f => f.text)
        .join('\n');

    const topThemesList = stats.topThemes
        .map(t => `${t.theme} (${t.count} mentions)`)
        .join(', ');

    const topNegativeThemes = stats.topThemes
        .filter(t => {
            // Check if this theme appears more in negative reviews
            const negativeCount = analyzedFeedback.filter(
                f => f.sentiment === 'negative' && f.themes.includes(t.theme)
            ).length;
            return negativeCount > 2;
        })
        .slice(0, 5);

    return `You are a business consultant analyzing customer feedback for a Filipino restaurant/business.

ANALYSIS SUMMARY:
- Total Reviews: ${stats.total}
- Positive: ${stats.positive} (${stats.positivePercent}%)
- Negative: ${stats.negative} (${stats.negativePercent}%)
- Neutral: ${stats.neutral}

TOP THEMES MENTIONED:
${topThemesList}

SAMPLE NEGATIVE FEEDBACK:
${negativeExamples}

SAMPLE POSITIVE FEEDBACK:
${positiveExamples}

Based on this analysis, generate 4-6 ACTIONABLE INSIGHTS AND RECOMMENDATIONS.

For each insight:
1. **title**: Short, action-oriented title (5-8 words)
2. **description**: Specific, actionable advice (1-2 sentences)
3. **priority**: "high", "medium", or "low"
4. **sentiment_type**: "negative" (problem to fix), "positive" (strength to leverage), or "neutral" (general improvement)
5. **theme**: Main theme this addresses (from the top themes)
6. **expected_impact**: Brief description of expected outcome

PRIORITIZATION RULES:
- "high" priority: Issues mentioned by 20+ customers OR critical problems
- "medium" priority: Issues mentioned by 10-20 customers OR important improvements
- "low" priority: Issues mentioned by 5-10 customers OR nice-to-have improvements

CRITICAL INSTRUCTIONS:
- Focus on SPECIFIC, ACTIONABLE recommendations (not vague advice)
- Include quantitative data in descriptions (e.g., "28 customers mentioned...")
- Respond ONLY with valid JSON
- Do NOT include markdown code blocks
- Do NOT include explanations

FORMAT (respond with ONLY this JSON):
{
    "insights": [
        {
            "title": "Service Speed is a Major Complaint",
            "description": "28 customers mentioned slow service. Consider adding more staff during peak hours or streamlining your order process.",
            "priority": "high",
            "sentiment_type": "negative",
            "theme": "service speed",
            "expected_impact": "Reduce wait times by 30-40% and improve customer satisfaction"
        },
        {
            "title": "Food Quality is Your Biggest Strength",
            "description": "56 customers praised your food. Highlight this in your marketing materials and social media.",
            "priority": "medium",
            "sentiment_type": "positive",
            "theme": "food quality",
            "expected_impact": "Increase customer retention and attract new customers through word-of-mouth"
        }
    ]
}

Respond with JSON only:`;
};

/**
 * Parse insights response from Gemini
 */
const parseInsightsResponse = (text) => {
    try {
        let cleanText = text.trim();
        
        // Remove markdown
        cleanText = cleanText.replace(/```json\n?/g, '');
        cleanText = cleanText.replace(/```\n?/g, '');
        
        // Extract JSON
        const jsonStart = cleanText.indexOf('{');
        const jsonEnd = cleanText.lastIndexOf('}');
        
        if (jsonStart !== -1 && jsonEnd !== -1) {
            cleanText = cleanText.substring(jsonStart, jsonEnd + 1);
        }

        const parsed = JSON.parse(cleanText);

        if (!parsed.insights || !Array.isArray(parsed.insights)) {
            throw new Error('Invalid insights structure');
        }

        console.log(`✅ Parsed ${parsed.insights.length} insights`);

        return parsed.insights;

    } catch (error) {
        console.error('Parse error:', error);
        console.error('Raw response:', text);
        throw new Error('Failed to parse insights');
    }
};

const generateSWOT = async (analyzedFeedback) => {
    try {
        console.log(`📊 Generating SWOT analysis from ${analyzedFeedback.length} reviews...`);

        const stats = calculateStats(analyzedFeedback);
        const prompt = buildSWOTPrompt(analyzedFeedback, stats);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('📥 SWOT analysis received from Gemini');

        const swot = parseSWOTResponse(text);

        console.log('✅ SWOT analysis generation complete!');
        return swot;

    } catch (error) {
        console.error('❌ SWOT generation error:', error);
        throw new Error('Failed to generate SWOT analysis: ' + error.message);
    }
};

/**
 * Build prompt for SWOT analysis
 */
const buildSWOTPrompt = (analyzedFeedback, stats) => {
    // Separate positive and negative feedback
    const positiveFeedback = analyzedFeedback
        .filter(f => f.sentiment === 'positive')
        .slice(0, 10)
        .map(f => `- ${f.text}`)
        .join('\n');

    const negativeFeedback = analyzedFeedback
        .filter(f => f.sentiment === 'negative')
        .slice(0, 10)
        .map(f => `- ${f.text}`)
        .join('\n');

    // Get most common themes
    const commonThemes = stats.topThemes
        .slice(0, 8)
        .map(t => `${t.theme} (${t.count} mentions)`)
        .join(', ');

    // Identify problems (negative themes)
    const problems = analyzedFeedback
        .filter(f => f.sentiment === 'negative')
        .flatMap(f => f.themes)
        .reduce((acc, theme) => {
            acc[theme] = (acc[theme] || 0) + 1;
            return acc;
        }, {});

    const topProblems = Object.entries(problems)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([theme, count]) => `${theme} (${count} complaints)`)
        .join(', ');

    return `You are a business strategist analyzing customer feedback for a Filipino restaurant/business.

ANALYSIS SUMMARY:
- Total Reviews: ${stats.total}
- Positive Sentiment: ${stats.positivePercent}%
- Negative Sentiment: ${stats.negativePercent}%

COMMON THEMES:
${commonThemes}

TOP PROBLEMS/COMPLAINTS:
${topProblems}

SAMPLE POSITIVE FEEDBACK:
${positiveFeedback}

SAMPLE NEGATIVE FEEDBACK:
${negativeFeedback}

Based on this customer feedback, generate a comprehensive SWOT analysis.

SWOT CATEGORIES:

**STRENGTHS (Internal Positive Factors)**
- What customers love and praise
- Competitive advantages
- Things the business does well
- Examples: "Excellent food quality (56 mentions)", "Friendly staff", "Clean environment"

**WEAKNESSES (Internal Negative Factors)**
- Problems customers complain about
- Areas needing improvement
- Internal limitations
- Examples: "Slow service (28 complaints)", "Small portions", "High prices"

**OPPORTUNITIES (External Positive Factors)**
- Market trends to leverage
- Untapped potential based on customer feedback
- Ways to capitalize on strengths
- Examples: "Expand delivery service", "Add budget-friendly menu", "Partner with food delivery apps"

**THREATS (External Negative Factors)**
- Competitive pressures
- Market challenges
- Risks based on customer feedback
- Examples: "Competitors have faster service", "Price-sensitive market", "Nearby restaurants opening"

REQUIREMENTS:
- Each category should have 3-6 items
- Include specific numbers when available (e.g., "28 customers mentioned...")
- Be specific and actionable
- Base insights on actual customer feedback data

CRITICAL INSTRUCTIONS:
- Respond ONLY with valid JSON
- Do NOT include markdown code blocks
- Do NOT include explanations

FORMAT (respond with ONLY this JSON):
{
    "strengths": [
        "Excellent food quality - 56 customers praised the taste and freshness",
        "Friendly and accommodating staff - mentioned in 45 reviews",
        "Clean and well-maintained restaurant environment"
    ],
    "weaknesses": [
        "Slow service during peak hours - 28 customer complaints",
        "High prices compared to competitors - 24 mentions",
        "Limited parking space - 15 complaints"
    ],
    "opportunities": [
        "Introduce budget-friendly combo meals to attract price-conscious customers",
        "Implement online ordering system to reduce wait times",
        "Expand social media marketing to highlight food quality strength"
    ],
    "threats": [
        "Competitors offering faster service and delivery options",
        "New restaurants opening in the area with similar cuisine",
        "Price-sensitive market may switch to cheaper alternatives"
    ]
}

Respond with JSON only:`;
};

/**
 * Parse SWOT response from Gemini
 */
const parseSWOTResponse = (text) => {
    try {
        let cleanText = text.trim();
        
        // Remove markdown
        cleanText = cleanText.replace(/```json\n?/g, '');
        cleanText = cleanText.replace(/```\n?/g, '');
        
        // Extract JSON
        const jsonStart = cleanText.indexOf('{');
        const jsonEnd = cleanText.lastIndexOf('}');
        
        if (jsonStart !== -1 && jsonEnd !== -1) {
            cleanText = cleanText.substring(jsonStart, jsonEnd + 1);
        }

        const parsed = JSON.parse(cleanText);

        // Validate structure
        if (!parsed.strengths || !parsed.weaknesses || !parsed.opportunities || !parsed.threats) {
            throw new Error('Invalid SWOT structure - missing categories');
        }

        console.log(`✅ SWOT parsed:`, {
            strengths: parsed.strengths.length,
            weaknesses: parsed.weaknesses.length,
            opportunities: parsed.opportunities.length,
            threats: parsed.threats.length
        });

        return parsed;

    } catch (error) {
        console.error('Parse error:', error);
        console.error('Raw response:', text);
        throw new Error('Failed to parse SWOT analysis');
    }
};

module.exports = {
    analyzeFeedback,
    generateInsights,
    generateSWOT
};