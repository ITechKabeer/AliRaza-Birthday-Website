document.addEventListener('DOMContentLoaded', () => {

    // Target date: November 13, 2025 (Current time is November 12, 2025, 8:04 PM PKT)
    const birthday = new Date('November 13, 2025 00:00:00').getTime(); 
    
    const countdown = setInterval(function() {
        // NOTE: Since the current time (Nov 12, 2025 8:04 PM) is very close to the target (Nov 13, 2025 12:00 AM), 
        // the countdown should show a few hours/minutes/seconds.
        const now = new Date().getTime();
        const distance = birthday - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display with leading zeros
        // Check if the elements exist before trying to update them (Safety check)
        if (document.getElementById('days')) {
            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }

        // It's the Birthday!
        if (distance < 0) {
            clearInterval(countdown);
            // Ensure elements exist before changing innerHTML
            if (document.getElementById('countdown-timer')) {
                 document.getElementById('countdown-timer').innerHTML = "<h2>HAPPY BIRTHDAY ALI RAZA! 🥳</h2>";
            }
            if (document.querySelector('.hero-section h1')) {
                document.querySelector('.hero-section h1').innerHTML = "✨ **HAPPY 25th BIRTHDAY, ALI RAZA!** ✨";
            }
            createConfetti(100); // Confetti effect chalao!
        }
    }, 1000);


    // --- 2. Scroll Animation (Fade In Sections) ---
    const animatedSections = document.querySelectorAll('.animated-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10% visible hone par trigger karega
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // CSS class add hogi
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    
    // --- 3. Confetti Effect Function ---
    function createConfetti(count) {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.width = Math.random() * 8 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 1 + 's';
            document.body.appendChild(confetti);
            
            // Animation khatam hone par confetti ko remove karein
            confetti.addEventListener('animationend', () => { confetti.remove(); });
        }
    }
    
    // "Send a Virtual Hug!" button par click hone par
    const wishButton = document.getElementById('wish-button');
    if (wishButton) {
        wishButton.addEventListener('click', () => {
            alert('Ali Raza ko aapka virtual hug mil gaya! Thank you for the sweet message! ❤️');
            createConfetti(50); // Small confetti blast on click
        });
    }

    // --- 4. Candle Blow-Out Functionality ---
    const blowCandleButton = document.getElementById('blow-candle-button');
    const flame = document.getElementById('flame');
    const wishMessage = document.getElementById('wish-message');
    let candleBlown = false;

    if (blowCandleButton && flame && wishMessage) {
        blowCandleButton.addEventListener('click', () => {
            if (!candleBlown) {
                flame.classList.add('off'); // Flame extinguish animation
                setTimeout(() => {
                    flame.style.display = 'none'; // Completely hide flame after animation
                    wishMessage.style.display = 'block'; // Show wish message
                    createConfetti(70); // Confetti on blowing out candle
                }, 500); // Match this with flame-extinguish animation duration (0.5s)
                blowCandleButton.innerText = "Wish Granted! ✨";
                blowCandleButton.disabled = true;
                candleBlown = true;
            }
        });
    }
});