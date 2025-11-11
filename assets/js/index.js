// Crear partículas dinámicas
const createParticles = () => {
    const bg = document.querySelector('.animated-bg');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(16, 185, 129, ${Math.random() * 0.5 + 0.2});
                    left: ${x}%;
                    top: ${y}%;
                    animation: particleFloat ${duration}s ${delay}s infinite ease-in-out;
                `;

        bg.appendChild(particle);
    }
};

// Animación de partículas
const style = document.createElement('style');
style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); opacity: 0; }
            }
        `;
document.head.appendChild(style);

createParticles();

// Efecto parallax suave
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Ocultar/mostrar fixed CTA según scroll
const fixedCta = document.getElementById('fixedCta');
const appsSection = document.getElementById('apps');

window.addEventListener('scroll', () => {
    const appsTop = appsSection.offsetTop;
    const scrollPos = window.scrollY + window.innerHeight;

    // Ocultar el botón cuando el usuario llegue a la sección de apps
    if (scrollPos >= appsTop + 200) {
        fixedCta.classList.add('hidden');
    } else {
        fixedCta.classList.remove('hidden');
    }
});

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const appCards = document.querySelectorAll('.app-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        // Filter cards with animation
        appCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                }, index * 100);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});