/**
 * Fetches Google Business reviews via Places API (server-side only).
 * Set in Vercel: GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID
 */

const FALLBACK = {
    rating: 5,
    total: 5,
    source: 'fallback',
    reviews: [
        { author_name: 'Hira Anas', rating: 5, text: 'Very professional and co-operative love their work', relative_time_description: 'Google Review' },
        { author_name: 'Arbaz Paracha', rating: 5, text: 'The technician Habib was very professional and knew what he was doing, I had an issue with power supplies and DVR uplink. He took his time to find the root cause and perform the necessary fixes. The communication on Whatsapp was very professional and swift.', relative_time_description: 'Local Guide' },
        { author_name: 'Laveed Kumar', rating: 5, text: 'Very good work, on time', relative_time_description: 'Google Review' },
        { author_name: 'Samad Kakar', rating: 5, text: 'Best experience work', relative_time_description: 'Google Review' },
        { author_name: 'Shaukat Saleem Shaique', rating: 5, text: 'Recommended 👍', relative_time_description: 'Local Guide' }
    ]
};

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!placeId || !apiKey) {
        return res.status(200).json(FALLBACK);
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews,rating,user_ratings_total&key=${encodeURIComponent(apiKey)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK' || !data.result) {
            return res.status(200).json({ ...FALLBACK, source: 'fallback', error: data.status });
        }

        const reviews = (data.result.reviews || []).map((r) => ({
            author_name: r.author_name,
            rating: r.rating,
            text: r.text,
            relative_time_description: r.relative_time_description,
            profile_photo_url: r.profile_photo_url || null
        }));

        return res.status(200).json({
            source: 'google',
            rating: data.result.rating || 5,
            total: data.result.user_ratings_total || reviews.length,
            reviews: reviews.length ? reviews : FALLBACK.reviews
        });
    } catch (err) {
        return res.status(200).json({ ...FALLBACK, source: 'fallback', error: 'fetch_failed' });
    }
};
