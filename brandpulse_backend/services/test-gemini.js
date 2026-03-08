// test-gemini.js (create this file temporarily to test)
require('dotenv').config();
const { analyzeFeedback } = require('./geminiService');

// Test data
const testFeedback = [
    { Date: '09/09/25', Feedback: 'medyo maalat yung fries' },
    { Date: '09/10/25', Feedback: 'Ang sarap ng burger! Highly recommended!' },
    { Date: '09/11/25', Feedback: 'Service was slow but food was worth the wait' }
];

// Run test
analyzeFeedback(testFeedback)
    .then(results => {
        console.log('\n✅ Analysis Results:');
        console.log(JSON.stringify(results, null, 2));
    })
    .catch(error => {
        console.error('❌ Test failed:', error);
    });