 function handleRoleClick(role) {
            console.log(`${role} role selected`);
            
            // Add a subtle animation feedback
            event.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                event.target.style.transform = 'translateY(-5px)';
            }, 100);

            // Here you can add your navigation logic
            // For example: window.location.href = `/${role}-dashboard`;
            alert(`Redirecting to ${role} section...`);
        }

        // Add some interactive hover effects
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });