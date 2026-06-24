/**
 * Liuyang Kangfan Trading Co., Ltd.
 * Advanced Animations JavaScript
 */

(function() {
    'use strict';

    // Initialize all animations on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
        initHoverAnimations();
        initPageTransition();
        initMouseFollower();
        initTiltEffect();
        initStaggerAnimations();
    });

    // Scroll-based Animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-scroll-animate]');
        
        if (!animatedElements.length) return;

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.dataset.scrollAnimate;
                    entry.target.classList.add(animation);
                    
                    // Add delay if specified
                    if (entry.target.dataset.delay) {
                        entry.target.style.transitionDelay = `${entry.target.dataset.delay}ms`;
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => scrollObserver.observe(el));
    }

    // Hover Animations for Cards
    function initHoverAnimations() {
        const cards = document.querySelectorAll('.feature-card, .service-card, .news-card, .team-member');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                this.classList.add('hovering');
            });

            card.addEventListener('mouseleave', function(e) {
                this.classList.remove('hovering');
            });

            // 3D tilt effect
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // Page Transition Effects
    function initPageTransition() {
        const links = document.querySelectorAll('a[href^="http"], a[href$=".html"]');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }

    // Mouse Follower Effect
    function initMouseFollower() {
        const follower = document.createElement('div');
        follower.className = 'mouse-follower';
        follower.style.cssText = `
            width: 20px;
            height: 20px;
            background: rgba(237, 137, 54, 0.3);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(follower);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            follower.style.left = `${mouseX - 10}px`;
            follower.style.top = `${mouseY - 10}px`;
            
            requestAnimationFrame(animateFollower);
        }
        
        animateFollower();

        // Scale on interactive elements
        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'scale(2)';
                follower.style.background = 'rgba(237, 137, 54, 0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'scale(1)';
                follower.style.background = 'rgba(237, 137, 54, 0.3)';
            });
        });
    }

    // 3D Tilt Effect for Images
    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', handleTilt);
            el.addEventListener('mouseleave', resetTilt);
        });
    }

    function handleTilt(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }

    // Stagger Animation for Lists
    function initStaggerAnimations() {
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        
        staggerContainers.forEach(container => {
            const children = container.children;
            const delay = parseInt(container.dataset.stagger) || 100;
            
            Array.from(children).forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = `opacity 0.5s ease ${index * delay}ms, transform 0.5s ease ${index * delay}ms`;
                
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, 100);
            });
        });
    }

    // Text Reveal Animation
    function initTextReveal() {
        const textElements = document.querySelectorAll('[data-text-reveal]');
        
        textElements.forEach(el => {
            const text = el.textContent;
            el.textContent = '';
            el.style.visibility = 'visible';
            
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    el.textContent += text[index];
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
        });
    }

    // Parallax Scroll Effect
    function initParallaxScroll() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (!parallaxElements.length) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }

    // Animate on Scroll with Counter
    function initAnimatedCounter() {
        const counters = document.querySelectorAll('[data-count]');
        
        if (!counters.length) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    const duration = parseInt(entry.target.dataset.duration) || 2000;
                    animateValue(entry.target, 0, target, duration);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * (end - start) + start);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Ripple Effect
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    left: ${x}px;
                    top: ${y}px;
                    width: 100px;
                    height: 100px;
                    margin-left: -50px;
                    margin-top: -50px;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // Add ripple animation styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Magnetic Button Effect
    function initMagneticButtons() {
        const magneticBtns = document.querySelectorAll('[data-magnetic]');
        
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Loading Animation
    function initLoadingAnimation() {
        const loader = document.querySelector('.loader');
        
        if (!loader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('loaded');
                setTimeout(() => loader.remove(), 500);
            }, 500);
        });
    }

    // Smooth Reveal for Images
    function initImageReveal() {
        const images = document.querySelectorAll('.reveal-image');
        
        if (!images.length) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.3 });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize all
    initParallaxScroll();
    initAnimatedCounter();
    initRippleEffect();
    initMagneticButtons();
    initLoadingAnimation();
    initImageReveal();

})();
