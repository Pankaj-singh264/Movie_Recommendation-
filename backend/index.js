require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const { initDb, saveRecommendation } = require('./db');
const { getMovieRecommendations } = require('./openai');

fastify.register(cors, {
    origin: true // In production, specific this to your frontend URL
});

// POST endpoint to get movie recommendations
fastify.post('/api/recommendations', async (request, reply) => {
    const { prompt } = request.body;
    console.log('Received prompt:', prompt);

    // Validate prompt
    if (!prompt || !prompt.trim()) {
        return reply.status(400).send({ error: 'Prompt is required' });
    }

    console.log('Received prompt:', prompt);

    try {
        // Get recommendations from AI
        const recommendations = await getMovieRecommendations(prompt);
        console.log('Recommendations received:', recommendations);

        // Ensure recommendations is an array
        const movieArray = Array.isArray(recommendations) ? recommendations : [];

        // Save to database
        await saveRecommendation(prompt, movieArray);

        // Return recommendations in expected format
        return reply.send({
            recommendations: movieArray,
            success: true
        });
    } catch (error) {
        fastify.log.error('Error fetching recommendations:', error);
        return reply.status(500).send({
            error: 'Failed to fetch recommendations',
            details: error.message
        });
    }
});

const start = async () => {
    try {
        await initDb();
        await fastify.listen({ port: 3001, host: '0.0.0.0' });
        console.log('Server is runningggg on http://localhost:3001');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
