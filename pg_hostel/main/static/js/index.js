 document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', function() {
                const role = this.dataset.role;
                
                // Add click animation
                this.style.transform = 'translateY(-5px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-10px) scale(1)';
                }, 100);
                
                // Simulate navigation (replace with actual navigation logic)
                const button = this.querySelector('.role-button');
                const originalText = button.textContent;
                button.textContent = 'Loading...';
                button.style.background = 'linear-gradient(135deg, #cccccc, #999999)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
                    // Here you would typically navigate to the appropriate dashboard
                    console.log(`Navigating to ${role} dashboard`);
                }, 1500);
            });
        });

        // Smooth scroll for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Add your navigation logic here
            });
        });

        // Add parallax effect to floating shapes
        window.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.floating-shape');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const xMove = (x - 0.5) * speed * 20;
                const yMove = (y - 0.5) * speed * 20;
                shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });

        // Animate stats on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const finalText = stat.textContent;
                        stat.textContent = '0';
                        
                        // Simple counter animation
                        if (finalText.includes('K+')) {
                            animateCounter(stat, 0, 10, finalText);
                        } else if (finalText.includes('%')) {
                            animateCounter(stat, 0, 99.9, finalText);
                        }
                    });
                }
            });
        }, observerOptions);

        function animateCounter(element, start, end, finalText) {
            const duration = 2000;
            const increment = (end - start) / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    element.textContent = finalText;
                    clearInterval(timer);
                } else {
                    if (finalText.includes('K+')) {
                        element.textContent = Math.floor(current / 1000) + 'K+';
                    } else if (finalText.includes('%')) {
                        element.textContent = current.toFixed(1) + '%';
                    }
                }
            }, 16);
        }

        // Observe the stats section
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }