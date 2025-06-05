// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const texts = [
        "Mijn ontwikkeling tijdens HBO-ICT, overzichtelijk en digitaal",
        "Praktische oplossingen bouwen met code",
        "Elke dag beter worden in softwareontwikkeling",
        "Van idee naar digitale toepassing"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById('typed-text');
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = 50;
        
        if (isDeleting) {
            typeSpeed = 50;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 3000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    if (typedTextElement) {
        typeWriter();
    }
    
    // Create floating code elements
    function createFloatingElement() {
        const codeSnippets = [
            'function()', 'const x =', 'if (true)', 'return;', 'class {}', 
            'import *', 'export', '=> {}', 'async', 'await', 'try {', 'catch',
            'console.log', 'document.', 'window.', 'this.', 'new Object',
            '<div>', '</html>', 'SELECT *', 'INSERT', 'UPDATE', 'DELETE'
        ];
        
        const floatingElement = document.createElement('div');
        floatingElement.className = 'floating-element';
        floatingElement.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        floatingElement.style.left = Math.random() * 100 + '%';
        floatingElement.style.animationDuration = (Math.random() * 10 + 10) + 's';
        floatingElement.style.fontSize = (Math.random() * 8 + 10) + 'px';
        
        // Add to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            if (!hero.querySelector('.floating-elements')) {
                const container = document.createElement('div');
                container.className = 'floating-elements';
                hero.appendChild(container);
            }
            hero.querySelector('.floating-elements').appendChild(floatingElement);
            
            // Remove element after animation
            setTimeout(() => {
                if (floatingElement.parentNode) {
                    floatingElement.parentNode.removeChild(floatingElement);
                }
            }, 15000);
        }
    }
    
    // Create floating elements periodically
    setInterval(createFloatingElement, 2000);
    
    // Status text rotation
    const statusTexts = [
        "Nieuwe technologieën aan het ontdekken",
        "Werken aan projecten die écht iets doen",
        "Problemen oplossen, stap voor stap",
        "Van idee naar werkende code",
        "Laatste wijzigingen aan het doorvoeren..."
    ];
    
    let statusIndex = 0;
    const statusTextElement = document.querySelector('.status-text');
    
    function rotateStatus() {
        if (statusTextElement) {
            statusTextElement.style.opacity = '0';
            setTimeout(() => {
                statusIndex = (statusIndex + 1) % statusTexts.length;
                statusTextElement.textContent = statusTexts[statusIndex];
                statusTextElement.style.opacity = '1';
            }, 300);
        }
    }
    
    if (statusTextElement) {
        statusTextElement.style.transition = 'opacity 0.3s ease';
        setInterval(rotateStatus, 4000);
    }

    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = document.querySelector('#assignments');
            if (targetSection) {
                const headerHeight = 70;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // Create code rain effect
    function createCodeRain() {
        const codeChars = ['0', '1', '{', '}', '(', ')', ';', '=', '+', '-', '*', '/', '>', '<', '!', '?', ':', '&', '|', '#', '@', '$', '%'];
        
        const rainDrop = document.createElement('div');
        rainDrop.className = 'rain-drop';
        rainDrop.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
        rainDrop.style.left = Math.random() * 100 + '%';
        rainDrop.style.animationDuration = (Math.random() * 3 + 2) + 's';
        rainDrop.style.fontSize = (Math.random() * 6 + 8) + 'px';
        
        // Add to body
        let codeRainContainer = document.querySelector('.code-rain');
        if (!codeRainContainer) {
            codeRainContainer = document.createElement('div');
            codeRainContainer.className = 'code-rain';
            document.body.appendChild(codeRainContainer);
        }
        
        codeRainContainer.appendChild(rainDrop);
        
        // Remove element after animation
        setTimeout(() => {
            if (rainDrop.parentNode) {
                rainDrop.parentNode.removeChild(rainDrop);
            }
        }, 5000);
    }
    
    // Create code rain drops periodically
    setInterval(createCodeRain, 300);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.assignment-card, .reflection-content').forEach(el => {
        observer.observe(el);
    });
});
