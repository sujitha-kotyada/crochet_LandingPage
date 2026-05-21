document.addEventListener('DOMContentLoaded', () => {
    // Canvas Animation for Floating Yarn Particles
    const canvas = document.getElementById('yarn-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class YarnParticle {
            constructor() {
                this.reset();
                // Randomize initial Y so they aren't all starting at the bottom on load
                this.y = Math.random() * height; 
            }

            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 200;
                this.length = Math.random() * 150 + 50;
                this.speed = Math.random() * 0.4 + 0.1;
                this.amplitude = Math.random() * 30 + 10;
                this.frequency = Math.random() * 0.015 + 0.005;
                this.offset = Math.random() * Math.PI * 2;
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`;
                this.thickness = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.y -= this.speed;
                if (this.y + this.length < 0) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.thickness;
                ctx.lineCap = 'round';
                
                // Draw a squiggly line like yarn
                for (let i = 0; i < this.length; i += 5) {
                    const currentY = this.y + i;
                    const currentX = this.x + Math.sin(currentY * this.frequency + this.offset) * this.amplitude;
                    if (i === 0) {
                        ctx.moveTo(currentX, currentY);
                    } else {
                        ctx.lineTo(currentX, currentY);
                    }
                }
                ctx.stroke();
            }
        }

        for (let i = 0; i < 35; i++) {
            particles.push(new YarnParticle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();
    }

    // Existing IntersectionObserver logic for fade-up elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) {
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Navbar scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});
