// Inizializzazione AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic',
    delay: 0
});

// Assicura che lo scroll non resti bloccato (alcune librerie possono impostare overflow: hidden)
function allowScroll() {
    if (document.body) document.body.style.overflow = '';
    if (document.documentElement) document.documentElement.style.overflow = '';
}
allowScroll();
document.addEventListener('DOMContentLoaded', allowScroll);

// Navbar Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const count = parseInt(counter.innerText);
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => startCounter(counter), 1);
    } else {
        counter.innerText = target;
    }
};

// Intersection Observer per Counter
const observerOptions = {
    threshold: 0.7
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => startCounter(counter));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const counterSection = document.querySelector('.counter-section');
if (counterSection) {
    observer.observe(counterSection);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Mobile Menu
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// PRELOADER DISABILITATO
/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            if (typeof AOS !== 'undefined') AOS.refresh();
        }, 500);
    }
});
*/

//backtotop

window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Aggiungiamo un piccolo ritardo per rendere la transizione più fluida
    if (window.scrollY > 300) {
        requestAnimationFrame(() => {
            backToTopButton.classList.add('visible');
        });
    } else {
        requestAnimationFrame(() => {
            backToTopButton.classList.remove('visible');
        });
    }
});

// Aggiungiamo l'event listener per il click
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Aggiungi lazy loading per le immagini
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});


// Cookie Banner Management
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');

    // Controlla se l'utente ha già fatto una scelta
    const cookiePreference = localStorage.getItem('cookiePreference');
    
    if (!cookiePreference) {
        // Mostra il banner dopo 1 secondo
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // Funzione per salvare la preferenza
    function saveCookiePreference(preference) {
        localStorage.setItem('cookiePreference', preference);
        cookieBanner.classList.remove('show');
        
        // Se l'utente accetta, inizializza gli script di analytics
        if (preference === 'accepted') {
            initializeAnalytics();
        }
    }

    // Funzione per inizializzare gli analytics (esempio)
    function initializeAnalytics() {
        // Qui puoi inserire il codice per inizializzare Google Analytics o altri servizi
        console.log('Analytics inizializzati');
    }

    // Event listeners per i pulsanti
    acceptBtn.addEventListener('click', () => {
        saveCookiePreference('accepted');
    });

    rejectBtn.addEventListener('click', () => {
        saveCookiePreference('rejected');
    });

    // Se l'utente aveva già accettato i cookie, inizializza gli analytics
    if (cookiePreference === 'accepted') {
        initializeAnalytics();
    }
});



// PRELOADER CON PERCENTUALE - DISABILITATO
/*
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.loading-progress');
    const percentage = document.querySelector('.loading-percentage');
    let loadingValue = 0;

    const interval = setInterval(() => {
        loadingValue += Math.random() * 30;
        if (loadingValue > 100) loadingValue = 100;
        
        progress.style.width = `${loadingValue}%`;
        percentage.textContent = `${Math.round(loadingValue)}%`;
        
        if (loadingValue === 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    if (typeof AOS !== 'undefined') AOS.refresh();
                }, 500);
            }, 500);
        }
    }, 500);
});
*/


document.addEventListener('DOMContentLoaded', function() {
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const sections = document.querySelectorAll('section');

    function setActiveNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight/3)) {
                currentSection = section.getAttribute('id');
            }
        });

        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();
});


