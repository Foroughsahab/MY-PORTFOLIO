/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const navbar = document.getElementById("navbar");

    function handleNavbar() {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleNavbar);

    handleNavbar();



    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute("id");

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });



    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.getElementById("typing");

    const roles = [
        "Web Developer",
        "Frontend Developer",
        "UI Enthusiast",
        "Creative Coder"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function typeEffect() {

        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;


            if (
                characterIndex ===
                currentRole.length
            ) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;

            }

        } else {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;


            if (characterIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) % roles.length;

            }

        }


        setTimeout(
            typeEffect,
            deleting ? 45 : 85
        );

    }

    if (typingElement) {
        typeEffect();
    }



    /* =====================================================
       SKILLS SWIPER
    ===================================================== */

    const skillsSwiper =
        new Swiper(".skillsSwiper", {

            slidesPerView: 1,

            spaceBetween: 18,

            speed: 800,

            grabCursor: true,

            watchSlidesProgress: true,

            navigation: {

                nextEl: ".skill-next",

                prevEl: ".skill-prev"

            },

            pagination: {

                el: ".skill-pagination",

                clickable: true

            },

            breakpoints: {

                576: {
                    slidesPerView: 2
                },

                992: {
                    slidesPerView: 3
                },

                1200: {
                    slidesPerView: 3
                }

            }

        });



    /* =====================================================
       PROJECT SWIPER
    ===================================================== */

    const projectsSwiper =
        new Swiper(".projectsSwiper", {

            slidesPerView: 1,

            spaceBetween: 22,

            speed: 800,

            grabCursor: true,

            watchSlidesProgress: true,

            breakpoints: {

                768: {

                    slidesPerView: 2,

                    spaceBetween: 20

                },

                1200: {

                    slidesPerView: 2,

                    spaceBetween: 25

                }

            },

            navigation: {

                nextEl: ".project-next",

                prevEl: ".project-prev"

            },

            on: {

                init: function () {

                    updateProjectProgress(this);

                },

                slideChange: function () {

                    updateProjectProgress(this);

                }

            }

        });



    /* =====================================================
       PROJECT PROGRESS
    ===================================================== */

    function updateProjectProgress(swiper) {

        const progress =
            document.querySelector(
                ".project-progress span"
            );

        if (!progress) return;


        const totalSlides =
            swiper.slides.length;


        const visibleSlides =
            swiper.params.slidesPerView;


        const maxPosition =
            Math.max(
                1,
                totalSlides -
                Math.floor(visibleSlides)
            );


        const current =
            Math.min(
                swiper.activeIndex,
                maxPosition
            );


        const percentage =
            ((current + 1) /
                (maxPosition + 1)) * 100;


        progress.style.width =
            `${percentage}%`;

    }



    /* =====================================================
       CERTIFICATES SWIPER
    ===================================================== */

    const certificateSwiper =
        new Swiper(".certificateSwiper", {

            slidesPerView: 1,

            spaceBetween: 20,

            speed: 800,

            grabCursor: true,

            navigation: {

                nextEl: ".certificate-next",

                prevEl: ".certificate-prev"

            },

            pagination: {

                el: ".certificate-pagination",

                clickable: true

            },

            breakpoints: {

                768: {

                    slidesPerView: 2

                },

                1100: {

                    slidesPerView: 3

                }

            }

        });



    /* =====================================================
       TESTIMONIAL SWIPER
    ===================================================== */

    const testimonialSwiper =
        new Swiper(".testimonialSwiper", {

            slidesPerView: 1,

            spaceBetween: 20,

            speed: 800,

            loop: true,

            autoplay: {

                delay: 4500,

                disableOnInteraction: false

            },

            pagination: {

                el: ".testimonial-pagination",

                clickable: true

            }

        });



    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeBtn =
        document.getElementById("themeBtn");


    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "light") {

        document.body.classList.add("light");

        updateThemeIcon();

    }


    function updateThemeIcon() {

        if (!themeBtn) return;


        const icon =
            themeBtn.querySelector("i");

        if (!icon) return;


        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            icon.className =
                "bi bi-sun";

        } else {

            icon.className =
                "bi bi-moon-stars";

        }

    }


    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light"
                );


                const isLight =
                    document.body.classList.contains(
                        "light"
                    );


                localStorage.setItem(
                    "portfolio-theme",
                    isLight
                        ? "light"
                        : "dark"
                );


                updateThemeIcon();

            }
        );

    }



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });



    /* =====================================================
       COLLECTION CARD RIPPLE
    ===================================================== */

    const collectionCards =
        document.querySelectorAll(
            ".collection-card"
        );


    collectionCards.forEach((card) => {

        card.addEventListener(
            "click",
            function () {

                this.classList.add(
                    "collection-clicked"
                );


                setTimeout(() => {

                    this.classList.remove(
                        "collection-clicked"
                    );

                }, 500);

            }
        );

    });



    /* =====================================================
       PROJECT CARD MOUSE TILT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 768) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (x - centerX) /
                    30;


                const rotateX =
                    (centerY - y) /
                    35;


                card.style.transform =
                    `
                    translateY(-13px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });



    /* =====================================================
       SKILL CARD TILT
    ===================================================== */

    const skillCards =
        document.querySelectorAll(
            ".skill-card"
        );


    skillCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 768) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    (x - rect.width / 2) /
                    40;


                const rotateX =
                    (rect.height / 2 - y) /
                    45;


                card.style.transform =
                    `
                    translateY(-10px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });



    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticElements =
        document.querySelectorAll(
            ".btn-main, .btn-outline, .contact-button"
        );


    magneticElements.forEach((button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 768) {
                    return;
                }


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `
                    translate(${x * 0.08}px,
                              ${y * 0.08}px)
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });



    /* =====================================================
       HERO IMAGE PARALLAX
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (heroImage) {

        document.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 992) {
                    return;
                }


                const x =
                    (window.innerWidth / 2 -
                        event.clientX) /
                    80;


                const y =
                    (window.innerHeight / 2 -
                        event.clientY) /
                    100;


                heroImage.style.transform =
                    `
                    rotate(3deg)
                    translate(${x}px, ${y}px)
                    `;

            }
        );

    }



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


                    if (
                        targetId === "#" ||
                        targetId === ""
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar.offsetHeight;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });


                    /* Close mobile navbar */

                    const navMenu =
                        document.getElementById(
                            "navMenu"
                        );


                    if (
                        navMenu &&
                        navMenu.classList.contains(
                            "show"
                        )
                    ) {

                        const bsCollapse =
                            bootstrap.Collapse
                                .getInstance(
                                    navMenu
                                );


                        if (bsCollapse) {

                            bsCollapse.hide();

                        }

                    }

                }
            );

        });



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById("backTop");


    function handleBackTop() {

        if (
            window.scrollY > 600
        ) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackTop
    );


    handleBackTop();


    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }



    /* =====================================================
       CONTACT EMAIL
    ===================================================== */

    const contactButtons =
        document.querySelectorAll(
            '.contact-method[href^="mailto:"], .contact-button[href^="mailto:"]'
        );


    contactButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                /*
                 * Replace your@email.com
                 * inside index.html with
                 * your real email.
                 */

                console.log(
                    "Opening email application..."
                );

            }
        );

    });



    /* =====================================================
       PROJECT IMAGE LOADING EFFECT
    ===================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-image img"
        );


    projectImages.forEach((image) => {

        image.addEventListener(
            "load",
            () => {

                image.classList.add(
                    "loaded"
                );

            }
        );

    });



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom span:first-child"
        );


    if (footerYear) {

        footerYear.innerHTML =
            `© ${new Date().getFullYear()} Forough Ahady. All rights reserved.`;

    }


});