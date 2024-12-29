document.addEventListener('DOMContentLoaded', () => {
    // Loading screen için minimum süre
    const minimumLoadTime = 3000; // 3 saniye
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        document.body.style.overflow = 'visible';
        startTypewriterEffect();
    }, minimumLoadTime);
    
    initScrollReveal();
});

function startTypewriterEffect() {
    const texts = [
        {
            element: document.querySelector('.greeting'),
            text: "Hi, my name is"
        },
        {
            element: document.querySelector('.title'),
            text: "Ulaş Taylan Met."
        },
        {
            element: document.querySelector('.subtitle'),
            text: "I build to make human life easier."
        }
    ];

    const bioElement = document.querySelector('.bio'); // Bio elementini seç
    const buttonContainer = document.querySelector('.button-container');
    let currentIndex = 0;

    function typeNextElement() {
        if (currentIndex >= texts.length) {
            // Tüm metinler bitti, bio yazısını göster
            setTimeout(() => {
                bioElement.style.opacity = '1'; // Görünür hale getir
                bioElement.style.transform = 'translateY(0)'; // Konumunu düzelt
            }, 500);

            // Butonu göster
            setTimeout(() => {
                buttonContainer.classList.add('active');
            }, 1000);
            return;
        }

        const currentItem = texts[currentIndex];
        const element = currentItem.element;

        if (!element) {
            currentIndex++;
            typeNextElement();
            return;
        }

        element.textContent = '';
        element.classList.add('active');

        let charIndex = 0;
        const text = currentItem.text;

        function typeChar() {
            if (charIndex < text.length) {
                element.textContent += text[charIndex];
                charIndex++;
                setTimeout(typeChar, 50);
            } else {
                currentIndex++;
                setTimeout(typeNextElement, 1000);
            }
        }

        typeChar();
    }

    // Başlat
    typeNextElement();
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal
function initScrollReveal() {
    const elements = document.querySelectorAll('.photo-frame, .experience-content, .project-card, #contact');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    revealOnScroll();
}

function revealOnScroll() {
    const elements = document.querySelectorAll('.photo-frame, .experience-content, .project-card, #contact');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.75) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll reveal and add scroll listener
window.addEventListener('DOMContentLoaded', initScrollReveal);
window.addEventListener('scroll', revealOnScroll);