// Arquiteto Digital - Client Side Logic

document.addEventListener('DOMContentLoaded', () => {
    console.log('Premium Site Initialized');

    // 1. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Initial check and event listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // 2. Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Header Scroll States
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.background = 'rgba(2, 6, 23, 0.9)';
            header.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            header.style.padding = '0';
            header.style.background = 'rgba(15, 23, 42, 0.7)';
            header.style.boxShadow = 'none';
        }
    });

    // 4. Blob Mouse Parallax (Subtle)
    const blobs = document.querySelectorAll('.blob');
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) / 50;
        const y = (clientY - window.innerHeight / 2) / 50;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.5;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
});
