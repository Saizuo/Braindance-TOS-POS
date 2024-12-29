// Add this JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('textRevealCard');
    const revealText = document.getElementById('revealText');
    const divider = document.getElementById('divider');
    const starsContainer = document.getElementById('starsContainer');

    // Create stars with faster animation
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        starsContainer.appendChild(star);
        
        function animateStar() {
            const duration = Math.random() * 3000 + 5000; // Faster duration
            star.style.transition = `all ${duration}ms linear`;
            star.style.transform = 'scale(0)';
            star.style.opacity = Math.random();
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            
            setTimeout(() => {
                star.style.transform = 'scale(1)';
                setTimeout(animateStar, duration/2);
            }, 50);
        }
        animateStar();
    }

    // Enhanced hover effect
    function updateReveal(clientX) {
        const rect = card.getBoundingClientRect();
        const relativeX = clientX - rect.left;
        const widthPercentage = (relativeX / rect.width) * 100;
        
        revealText.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
        revealText.style.opacity = '1';
        
        divider.style.left = `${widthPercentage}%`;
        divider.style.opacity = '1';
        divider.style.transform = `rotate(${(widthPercentage - 50) * 0.1}deg)`;
    }

    // Event listeners with improved responsiveness
    card.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => updateReveal(e.clientX));
    });

    card.addEventListener('touchmove', (e) => {
        e.preventDefault();
        requestAnimationFrame(() => updateReveal(e.touches[0].clientX));
    });

    card.addEventListener('mouseleave', () => {
        revealText.style.clipPath = 'inset(0 100% 0 0)';
        revealText.style.opacity = '0';
        divider.style.opacity = '0';
    });
});
