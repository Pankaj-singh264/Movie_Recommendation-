require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Get movie recommendations from Gemini AI
 * @param {string} prompt - User's movie preference
 * @returns {Promise<Array>} Array of movie objects with title, year, genre, and description
 */
async function getMovieRecommendations(prompt) {
    try {
        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: `You are a movie recommendation assistant. Provide 3-5 movie recommendations based on the user's preference: "${prompt}". 
                    Return the result strictly in JSON format as an object with a "movies" key containing an array of objects, 
                    where each object has 'title', 'year', 'genre', and 'description' keys.`
                }]
            }],
            generationConfig: {
                responseMimeType: "application/json",
            },
        });

        const response = await result.response;
        const content = response.text();
        const parsed = JSON.parse(content);

        // Return the movies array, ensure it's always an array
        if (parsed.movies && Array.isArray(parsed.movies)) {
            return parsed.movies;
        } else if (Array.isArray(parsed)) {
            return parsed;
        } else {
            console.error('Unexpected response format:', parsed);
            return [];
        }
    } catch (error) {
        console.error('Error getting movie recommendations:', error);
        throw new Error(`Failed to get recommendations: ${error.message}`);
    }
}

module.exports = { getMovieRecommendations };
