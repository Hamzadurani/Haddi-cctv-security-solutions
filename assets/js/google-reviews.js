/**
 * Google reviews — premium grid layout
 */
(function () {
    const config = window.HADI_GMB_CONFIG || {};
    const track = document.getElementById('testimonialsTrack');
    const summaryEl = document.getElementById('googleRatingSummary');

    if (!track) return;

    const FALLBACK = {
        rating: 5,
        total: 5,
        source: 'fallback',
        reviews: [
            { author_name: 'Hira Anas', rating: 5, text: 'Very professional and co-operative love their work', relative_time_description: 'Google Review' },
            { author_name: 'Arbaz Paracha', rating: 5, text: 'The technician Habib was very professional and knew what he was doing. I had an issue with power supplies and DVR uplink. He took his time to find the root cause and perform the necessary fixes. Communication on WhatsApp was very professional and swift.', relative_time_description: 'Local Guide' },
            { author_name: 'Laveed Kumar', rating: 5, text: 'Very good work, on time', relative_time_description: 'Google Review' },
            { author_name: 'Samad Kakar', rating: 5, text: 'Best experience work', relative_time_description: 'Google Review' },
            { author_name: 'Shaukat Saleem Shaique', rating: 5, text: 'Recommended — excellent service', relative_time_description: 'Local Guide' }
        ]
    };

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

    function starsHtml(rating) {
        const n = Math.round(rating || 5);
        return Array.from({ length: 5 }, (_, i) =>
            `<i class="fas fa-star${i < n ? '' : ' is-dim'}"></i>`
        ).join('');
    }

    function initials(name) {
        if (!name) return '?';
        return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    }

    function buildCard(review, index) {
        const featured = index === 0 ? ' testimonial-card-featured' : '';
        const avatar = review.profile_photo_url
            ? `<img src="${escapeHtml(review.profile_photo_url)}" alt="" loading="lazy" referrerpolicy="no-referrer">`
            : `<span>${initials(review.author_name)}</span>`;
        const time = escapeHtml(review.relative_time_description || 'Google Review');

        return `
            <article class="testimonial-card-premium${featured}">
                <div class="testimonial-card-premium-inner">
                    <div class="testimonial-quote-deco" aria-hidden="true"><i class="fas fa-quote-left"></i></div>
                    <div class="testimonial-stars-row">${starsHtml(review.rating)}</div>
                    <blockquote class="testimonial-quote-text">${escapeHtml(review.text)}</blockquote>
                    <footer class="testimonial-author-row">
                        <div class="testimonial-avatar-ring">${avatar}</div>
                        <div class="testimonial-author-meta">
                            <strong>${escapeHtml(review.author_name)}</strong>
                            <span><i class="fab fa-google"></i> ${time}</span>
                        </div>
                        <span class="testimonial-verified"><i class="fas fa-circle-check"></i></span>
                    </footer>
                </div>
            </article>
        `;
    }

    function renderSummary(data) {
        if (!summaryEl) return;
        const rating = Number(data.rating || 5).toFixed(1);
        const total = data.total || data.reviews?.length || 0;
        const live = data.source === 'google';

        summaryEl.innerHTML = `
            <div class="reviews-score-panel">
                <div class="reviews-score-left">
                    <span class="reviews-score-number">${rating}</span>
                    <div class="reviews-score-stars">${starsHtml(data.rating)}</div>
                    <span class="reviews-score-label">Excellent</span>
                </div>
                <div class="reviews-score-mid">
                    <p class="reviews-score-heading">Customer Rating</p>
                    <p class="reviews-score-desc">Based on <strong>${total}+</strong> verified Google reviews</p>
                    ${live ? '<span class="reviews-live-tag"><i class="fas fa-check-circle"></i> Live from Google</span>' : ''}
                </div>
                <div class="reviews-score-google" aria-hidden="true">
                    <i class="fab fa-google"></i>
                </div>
            </div>
        `;
    }

    function animateCards() {
        track.querySelectorAll('.testimonial-card-premium').forEach((card, i) => {
            card.classList.add('will-animate', 'anim-fade-up');
            setTimeout(() => card.classList.add('animate-in'), 100 + i * 70);
        });
    }

    function renderReviews(data) {
        renderSummary(data);
        const reviews = data.reviews || [];
        track.innerHTML = reviews.map((r, i) => buildCard(r, i)).join('');
        requestAnimationFrame(animateCards);
    }

    async function loadReviews() {
        track.innerHTML = `
            <div class="testimonials-loading-premium">
                <div class="testimonials-loading-spinner"></div>
                <p>Loading customer reviews…</p>
            </div>
        `;
        try {
            const res = await fetch(config.apiUrl || '/api/google-reviews');
            if (!res.ok) throw new Error('fail');
            renderReviews(await res.json());
        } catch {
            renderReviews(FALLBACK);
        }
    }

    const leaveBtn = document.getElementById('leaveGoogleReview');
    const viewBtn = document.getElementById('viewGoogleReviews');
    if (leaveBtn && config.writeReviewUrl) leaveBtn.href = config.writeReviewUrl;
    if (viewBtn && config.reviewPageUrl) viewBtn.href = config.reviewPageUrl;

    loadReviews();
})();
