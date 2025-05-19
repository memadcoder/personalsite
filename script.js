// script.js - Madhav Gautam Portfolio JavaScript

// Global variables
let isLoading = true;
let scrolled = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functions
    initLoadingScreen();
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initExperienceTabs();
    initSkillBars();
    initContactForm();
    initFloatingIcons();
    initCodeRain();
    initCounters();
    initSmoothScrolling();
    initParticleButtons();

    // Initialize custom cursor on desktop only
    if (window.innerWidth > 768) {
        initCustomCursor();
    }

    // Preload images
    preloadImages();

    // Initialize easter egg
    initEasterEgg();

    // Console message for developers
    showConsoleMessage();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        isLoading = false;

        // Remove loading screen after transition
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }, 3000);
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && !scrolled) {
            navbar.classList.add('scrolled');
            scrolled = true;
        } else if (window.scrollY <= 100 && scrolled) {
            navbar.classList.remove('scrolled');
            scrolled = false;
        }
    });

    // Mobile menu toggle
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                if (mobileMenu) mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const texts = [
        'Software Engineer',
        'Full Stack Developer',
        'Node.js Expert',
        'React Developer',
        'Cloud Enthusiast',
        'Problem Solver'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typeText() {
        if (isLoading) {
            setTimeout(typeText, 100);
            return;
        }

        const currentText = texts[textIndex];

        if (isWaiting) {
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                typeText();
            }, 2000);
            return;
        }

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isWaiting = true;
            }
        }

        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeText, typingSpeed);
    }

    setTimeout(typeText, 1000);
}

// Rest of JavaScript functions...

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger skill bars animation
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }

                // Trigger counter animation
                if (entry.target.classList.contains('hero')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');
    animatedElements.forEach(el => observer.observe(el));

    // Observe sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));
}

// Experience Tabs
function initExperienceTabs() {
    const expButtons = document.querySelectorAll('.exp-btn');
    const expPanels = document.querySelectorAll('.exp-panel');

    expButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');

            // Remove active class from all buttons and panels
            expButtons.forEach(btn => btn.classList.remove('active'));
            expPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.getElementById(target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    let skillsAnimated = false;

    window.animateSkillBars = function () {
        if (skillsAnimated) return;
        skillsAnimated = true;

        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');

            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 200);
        });
    };
}

// Counter Animation
function initCounters() {
    let countersAnimated = false;

    window.animateCounters = function () {
        if (countersAnimated) return;
        countersAnimated = true;

        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 50);
                } else {
                    counter.textContent = target + '+';
                }
            };

            setTimeout(updateCounter, Math.random() * 500);
        });
    };
}

// Contact Form
// Enhanced Contact Form with multiple options
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Show options modal
        showContactOptionsModal(name, email, subject, message);
    });
}

// Create options modal
function showContactOptionsModal(name, email, subject, message) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content
    modal.innerHTML = `
        <div class="modal-content" style="
            background: var(--surface);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid var(--primary);
            max-width: 400px;
            text-align: center;
            animation: slideIn 0.3s ease;
        ">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Choose Contact Method</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">How would you like to send your message?</p>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <button class="btn btn-primary whatsapp-btn" style="
                    background: #25D366;
                    border-color: #25D366;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                ">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Send via WhatsApp
                </button>
                
                <button class="btn btn-secondary email-btn" style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                ">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Send via Email
                </button>
                
                <button class="btn btn-secondary close-modal" style="
                    background: transparent;
                    border-color: var(--text-secondary);
                    color: var(--text-secondary);
                ">
                    Cancel
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector('.whatsapp-btn').addEventListener('click', () => {
        sendViaWhatsApp(name, email, subject, message);
        document.body.removeChild(modal);
    });

    modal.querySelector('.email-btn').addEventListener('click', () => {
        sendViaEmail(name, email, subject, message);
        document.body.removeChild(modal);
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Send via WhatsApp function
function sendViaWhatsApp(name, email, subject, message) {
    const whatsappMessage = `*New Portfolio Contact*

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}

---
Sent from Portfolio Website`;

    const whatsappNumber = '9779867681865'; // Your WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');
    showNotification('Opening WhatsApp! Message ready to send.', 'success');

    // Reset form
    document.getElementById('contact-form').reset();
}

// Send via Email function
function sendViaEmail(name, email, subject, message) {
    const emailBody = `New Portfolio Contact

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from Portfolio Website`;

    const emailURL = `mailto:gautammadhav2024@gmail.com?subject=${encodeURIComponent('Portfolio Contact: ' + subject)}&body=${encodeURIComponent(emailBody)}`;

    window.open(emailURL, '_blank');
    showNotification('Opening email client! Message ready to send.', 'success');

    // Reset form
    document.getElementById('contact-form').reset();
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#64ffda' : '#64ffda',
        color: '#0a192f',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.9rem',
        fontWeight: '500',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100px)',
        transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';

        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Floating Icons
function initFloatingIcons() {
    const iconsContainer = document.getElementById('floating-icons');
    if (!iconsContainer) return;

    const icons = [
        { symbol: '{', color: '#64ffda' },
        { symbol: '}', color: '#64ffda' },
        { symbol: '<', color: '#64ffda' },
        { symbol: '>', color: '#64ffda' },
        { symbol: '/', color: '#ffd700' },
        { symbol: ';', color: '#ff9800' },
        { symbol: '()', color: '#64ffda' },
        { symbol: '[]', color: '#64ffda' }
    ];

    function createFloatingIcon() {
        const icon = document.createElement('div');
        const iconData = icons[Math.floor(Math.random() * icons.length)];

        icon.className = 'floating-icon';
        icon.textContent = iconData.symbol;
        icon.style.cssText = `
            position: absolute;
            font-family: JetBrains Mono, monospace;
            font-size: 1.5rem;
            color: ${iconData.color};
            opacity: 0.1;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatRandom ${8 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;

        iconsContainer.appendChild(icon);

        // Remove icon after animation
        setTimeout(() => {
            if (icon && icon.parentNode) {
                icon.parentNode.removeChild(icon);
            }
        }, 12000);
    }

    // Create initial icons
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingIcon, i * 500);
    }

    // Continue creating icons periodically
    setInterval(createFloatingIcon, 3000);
}

// Code Rain Effect
function initCodeRain() {
    const codeRain = document.getElementById('code-rain');
    if (!codeRain) return;

    const codeChars = '01{}[]()<>,.;:|&^%$#@!+=*/-~`"\'\\';
    let columns = Math.floor(window.innerWidth / 20);
    let drops = [];
    let rainInterval;

    // Initialize drops
    function initDrops() {
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    }

    function drawCodeRain() {
        // Clear previous content
        codeRain.innerHTML = '';

        // Create rain effect
        for (let i = 0; i < drops.length; i++) {
            const char = codeChars[Math.floor(Math.random() * codeChars.length)];
            const span = document.createElement('span');

            span.textContent = char;
            span.style.cssText = `
                position: absolute;
                left: ${i * 20}px;
                top: ${drops[i] * 20}px;
                font-family: JetBrains Mono, monospace;
                font-size: 14px;
                color: #64ffda;
                opacity: ${Math.random() * 0.3 + 0.1};
            `;

            codeRain.appendChild(span);

            // Reset drop when it reaches bottom
            if (drops[i] * 20 > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Initialize and start rain
    initDrops();
    rainInterval = setInterval(drawCodeRain, 100);

    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        columns = Math.floor(window.innerWidth / 20);
        initDrops();
    }, 250));

    // Stop rain when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(rainInterval);
        } else {
            rainInterval = setInterval(drawCodeRain, 100);
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for navbar height

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Particle Button Effects
function initParticleButtons() {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create particles
            for (let i = 0; i < 12; i++) {
                createParticle(button, x, y);
            }
        });
    });
}

function createParticle(button, x, y) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 4;

    particle.style.cssText = `
        position: absolute;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        background: #64ffda;
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
    `;

    const particlesContainer = button.querySelector('.btn-particles');
    if (particlesContainer) {
        particlesContainer.appendChild(particle);

        // Animate particle
        const angle = Math.random() * 2 * Math.PI;
        const velocity = Math.random() * 100 + 50;
        const lifetime = Math.random() * 600 + 400;

        let startTime = null;

        function animateParticle(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = elapsed / lifetime;

            if (progress < 1) {
                const currentX = x + Math.cos(angle) * velocity * progress;
                const currentY = y + Math.sin(angle) * velocity * progress + 0.5 * 120 * progress * progress;
                const scale = 1 - progress;
                const opacity = 1 - progress;

                particle.style.transform = `translate(${currentX - x}px, ${currentY - y}px) scale(${scale})`;
                particle.style.opacity = opacity;

                requestAnimationFrame(animateParticle);
            } else {
                if (particle && particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        }

        requestAnimationFrame(animateParticle);
    }
}

// Custom Cursor Effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = '#ff6b6b';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = '#64ffda';
        });
    });
}

// Preload Images
function preloadImages() {
    const imageUrls = [
        '/api/placeholder/300/300',
        '/api/placeholder/350/400',
        '/api/placeholder/600/300'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Easter Egg - Konami Code
function initEasterEgg() {
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);

        // Keep only the last 10 keystrokes
        if (konamiCode.length > 10) {
            konamiCode.shift();
        }

        // Check if the sequence matches
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg: Matrix effect
            document.body.style.filter = 'hue-rotate(120deg)';
            showNotification('🎉 Konami Code activated! Welcome to the Matrix!', 'success');

            // Reset after 5 seconds
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 5000);

            konamiCode = [];
        }
    });
}

// Console Message for Developers
function showConsoleMessage() {
    console.log(`
%c██╗  ██╗███████╗██╗     ██╗      ██████╗ 
%c██║  ██║██╔════╝██║     ██║     ██╔═══██╗
%c███████║█████╗  ██║     ██║     ██║   ██║
%c██╔══██║██╔══╝  ██║     ██║     ██║   ██║
%c██║  ██║███████╗███████╗███████╗╚██████╔╝
%c╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ 

%cWelcome to my portfolio! 
%cInterested in the code? Check it out on GitHub!
%chttps://github.com/memadcoder
`,
        'color: #64ffda',
        'color: #64ffda',
        'color: #64ffda',
        'color: #64ffda',
        'color: #64ffda',
        'color: #64ffda',
        'color: #ccd6f6; font-size: 16px; font-weight: bold;',
        'color: #8892b0; font-size: 14px;',
        'color: #64ffda; font-size: 14px;'
    );
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
window.addEventListener('scroll', throttle(() => {
    // Additional scroll-based animations can be added here
}, 16));

window.addEventListener('resize', debounce(() => {
    // Additional resize-based updates can be added here
}, 250));

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLoadingScreen,
        initNavigation,
        initTypingAnimation,
        initScrollAnimations,
        initExperienceTabs,
        initSkillBars,
        initContactForm,
        showNotification,
        debounce,
        throttle
    };
}