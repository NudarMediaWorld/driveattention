document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.navbar .logo');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Select ONLY the very first introductory section
    const firstSection = document.querySelector('section:first-of-type');
    
    // We won't need to manage link styles via JS

    if (!navbar || !logo || !firstSection || !menuToggle) {
        console.error("Required elements for IntersectionObserver not found.");
        return;
    }

    const initialLogoSrc = "/asset/images/logo-white.svg";
    const scrolledLogoSrc = "/asset/images/logo-black.svg";

    const observerOptions = {
        root: null, // viewport
        // Trigger when 10% or less of the first section is visible
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // entry.isIntersecting is true if the first section IS visible
            // I put the white navbar when the first section is NOT intersecting (as in scrolled past it)
            if (!entry.isIntersecting) {
                // User has scrolled down past the first section
                // We ADD the 'scrolled' class. CSS handles all color changes now.
                navbar.classList.add('scrolled');
                logo.src = scrolledLogoSrc;
                menuToggle.classList.add('scrolled');
                } else {
                navbar.classList.remove('scrolled');
                logo.src = initialLogoSrc;
                menuToggle.classList.remove('scrolled');
            }
        });
    }, observerOptions);

    // Only the first section
    observer.observe(firstSection);
});


document.addEventListener("DOMContentLoaded", () => {
    const sliderInner = document.getElementById('sliderInner');
    const navDots = document.querySelectorAll('.nav-dot');

    function goToSlide(slideIndex) {
        // Shift by 65vw for each slide transition
        const slideWidthVW = 65; 
        const translateValue = -(slideIndex - 1) * slideWidthVW;
        
        sliderInner.style.transform = `translateX(${translateValue}vw)`;
        
        // Update active class for nav dots
        navDots.forEach(dot => {
            dot.classList.remove('active');
        });
        document.querySelector(`.nav-dot[data-target="${slideIndex}"]`).classList.add('active');
    }

    // Add click handlers to the nav dots
    navDots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const targetSlide = event.target.getAttribute('data-target');
            goToSlide(parseInt(targetSlide));
        });
    });
    
    goToSlide(1); 
});


