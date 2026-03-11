document.addEventListener('DOMContentLoaded', () => {
    // Play Button Interactions
    const playButtons = document.querySelectorAll('.play-btn-card');
    
    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            e.stopPropagation(); 

            const icon = btn.querySelector('i');
            
            // Toggle play/pause icon
            if (icon.classList.contains('bi-play-fill')) {
                // Resetting all other buttons first
                document.querySelectorAll('.bi-pause-fill').forEach(pauseIcon => {
                    pauseIcon.classList.remove('bi-pause-fill');
                    pauseIcon.classList.add('bi-play-fill');
                    // Resetting styling on parent cards
                    const cardBtn = pauseIcon.closest('button');
                    if(cardBtn) cardBtn.style.opacity = '';
                });

                icon.classList.remove('bi-play-fill');
                icon.classList.add('bi-pause-fill');
                

                btn.style.opacity = '1';
                btn.classList.add('translate-y-0');
            } else {
                icon.classList.remove('bi-pause-fill');
                icon.classList.add('bi-play-fill');
                
                // Resetting styles to hover state
                btn.style.opacity = '';
                btn.classList.remove('translate-y-0');
            }
        });
    });

    // Todo: make cards clickable later....
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
             
             console.log("Card clicked:", card.querySelector('.card-title')?.textContent || "Card");
        });
    });
});
