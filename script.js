/* =========================================================
   SRI MARUTHI PEST CONTROL SERVICE
   COMPLETE SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU & ACCESSIBILITY
    ===================================================== */
    const menuButton = document.getElementById("menu");
    const mobileNav = document.getElementById("mobileNav");

    function closeMobileMenu() {
        if (!mobileNav || !menuButton) return;
        mobileNav.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        const icon = menuButton.querySelector("i");
        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }

    if (menuButton && mobileNav) {
        menuButton.addEventListener("click", function () {
            const isActive = mobileNav.classList.toggle("active");
            menuButton.setAttribute("aria-expanded", isActive ? "true" : "false");
            const icon = menuButton.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars", !isActive);
                icon.classList.toggle("fa-xmark", isActive);
            }
        });

        document.querySelectorAll("#mobileNav a").forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
        });
    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       CONSOLIDATED SCROLL HANDLER (PERFORMANCE OPTIMIZED)
    ===================================================== */
    const header = document.querySelector("header");
    const backToTop = document.querySelector(".back-to-top");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let isTicking = false;

    function handleScrollUpdates() {
        const scrollY = window.scrollY;

        // Header background toggle
        if (header) {
            header.classList.toggle("scrolled", scrollY > 50);
        }

        // Back-to-top button visibility
        if (backToTop) {
            backToTop.classList.toggle("show", scrollY > 500);
        }

        // Active navigation highlighting
        let currentSection = "";
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            const isMatch = link.getAttribute("href") === "#" + currentSection;
            link.classList.toggle("active", isMatch);
        });

        isTicking = false;
    }

    window.addEventListener("scroll", function () {
        if (!isTicking) {
            window.requestAnimationFrame(handleScrollUpdates);
            isTicking = true;
        }
    }, { passive: true });

    handleScrollUpdates(); // Initial execution check

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SCROLL REVEAL (INTERSECTION OBSERVER)
    ===================================================== */
    const revealElements = document.querySelectorAll(
        ".service-card, .gallery-item, .video-card, .why-item, .stat-box"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(function (element) {
            element.classList.add("scroll-reveal");
            observer.observe(element);
        });
    }


    /* =====================================================
       BOOKING FORM & WHATSAPP INTEGRATION
    ===================================================== */
    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name")?.value.trim();
            const phone = document.getElementById("phone")?.value.trim();
            const service = document.getElementById("service")?.value;
            const message = document.getElementById("message")?.value.trim();

            if (!name) {
                alert("Please enter your name.");
                return;
            }

            if (!phone) {
                alert("Please enter your phone number.");
                return;
            }

            if (!service) {
                alert("Please select a pest control service.");
                return;
            }

            const cleanPhone = phone.replace(/\D/g, "");
            if (cleanPhone.length < 10 || cleanPhone.length > 12) {
                alert("Please enter a valid phone number.");
                return;
            }

            const whatsappMessage = 
`Hello Sri Maruthi Pest Control Service,

I would like to request a pest control service.

Name: ${name}
Phone: ${phone}
Service: ${service}
Problem Details: ${message || "Not provided"}

Please contact me regarding the service.

Thank you.`;

            const whatsappURL =
                "https://wa.me/919663017155?text=" +
                encodeURIComponent(whatsappMessage);

            window.open(whatsappURL, "_blank");
            bookingForm.reset();
        });
    }


    /* =====================================================
       SERVICE CARD → CONTACT FORM SELECTION
    ===================================================== */
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const serviceName = card.querySelector("h3")?.textContent;
            const serviceSelect = document.getElementById("service");

            if (serviceSelect && serviceName) {
                const cleanServiceName = serviceName
                    .replace(/ Control/gi, "")
                    .replace(/ Protection/gi, "")
                    .trim()
                    .toLowerCase();

                const option = Array.from(serviceSelect.options).find(function (item) {
                    return item.textContent.toLowerCase().includes(cleanServiceName);
                });

                if (option) {
                    serviceSelect.value = option.value;
                }

                document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    /* =====================================================
       INPUT SANITIZATION & FOCUS
    ===================================================== */
    const phoneInputs = document.querySelectorAll('input[type="tel"], #phone');

    phoneInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9+ ]/g, "");
        });
    });

    document.querySelectorAll('a[href="#contact"]').forEach(function (link) {
        link.addEventListener("click", function () {
            setTimeout(function () {
                const nameInput = document.getElementById("name");
                if (nameInput) {
                    nameInput.focus();
                }
            }, 700);
        });
    });


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */
    const galleryImages = document.querySelectorAll(".gallery-item img, .gallery img");

    if (galleryImages.length > 0) {
        const lightbox = document.createElement("div");
        lightbox.className = "premium-lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close image">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="lightbox-prev" aria-label="Previous image">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <img class="lightbox-image" src="" alt="Gallery image">
            <button class="lightbox-next" aria-label="Next image">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector(".lightbox-image");
        const closeButton = lightbox.querySelector(".lightbox-close");
        const previousButton = lightbox.querySelector(".lightbox-prev");
        const nextButton = lightbox.querySelector(".lightbox-next");

        let currentImage = 0;

        function showImage(index) {
            currentImage = (index + galleryImages.length) % galleryImages.length;
            lightboxImage.src = galleryImages[currentImage].src;
            lightbox.classList.add("active");
            document.body.classList.add("no-scroll");
        }

        function closeLightbox() {
            lightbox.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }

        galleryImages.forEach(function (image, index) {
            image.style.cursor = "zoom-in";
            image.addEventListener("click", function () {
                showImage(index);
            });
        });

        closeButton.addEventListener("click", closeLightbox);
        previousButton.addEventListener("click", function () {
            showImage(currentImage - 1);
        });
        nextButton.addEventListener("click", function () {
            showImage(currentImage + 1);
        });

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (!lightbox.classList.contains("active")) return;

            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") showImage(currentImage - 1);
            if (event.key === "ArrowRight") showImage(currentImage + 1);
        });
    }


    /* =====================================================
       DYNAMIC STYLES (LIGHTBOX & ANIMATIONS)
    ===================================================== */
    const animationStyle = document.createElement("style");
    animationStyle.textContent = `
        .scroll-reveal {
            opacity: 0;
            transform: translateY(25px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .scroll-reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        nav a.active {
            color: var(--primary) !important;
        }

        header.scrolled {
            box-shadow: 0 10px 35px rgba(0,0,0,0.08);
        }

        #mobileNav.active {
            display: flex;
            flex-direction: column;
        }

        .image-error {
            opacity: 0.4;
            background: #e5e7eb;
        }

        .premium-lightbox {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
            background: rgba(2,8,5,0.94);
            backdrop-filter: blur(15px);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .premium-lightbox.active {
            opacity: 1;
            visibility: visible;
        }

        .lightbox-image {
            max-width: 90vw;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 30px 100px rgba(0,0,0,0.5);
        }

        .premium-lightbox button {
            position: absolute;
            width: 45px;
            height: 45px;
            display: grid;
            place-items: center;
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 50%;
            color: #fff;
            background: rgba(255,255,255,0.08);
            cursor: pointer;
            transition: 0.25s ease;
        }

        .premium-lightbox button:hover {
            background: #16a34a;
            transform: scale(1.08);
        }

        .lightbox-close {
            top: 25px;
            right: 25px;
        }

        .lightbox-prev {
            left: 25px;
            top: 50%;
            transform: translateY(-50%);
        }

        .lightbox-next {
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
        }

        .no-scroll {
            overflow: hidden;
        }

        @media(max-width: 600px) {
            .premium-lightbox {
                padding: 15px;
            }
            .lightbox-prev {
                left: 10px;
            }
            .lightbox-next {
                right: 10px;
            }
            .lightbox-close {
                top: 15px;
                right: 15px;
            }
        }
    `;
    document.head.appendChild(animationStyle);


    /* =====================================================
       MEDIA ERROR HANDLING & LOGS
    ===================================================== */
    document.querySelectorAll("img, video").forEach(function (media) {
        media.addEventListener("error", function () {
            console.warn("Media could not be loaded:", media.src);
            media.classList.add("image-error");
        });
    });

    console.log("Sri Maruthi Pest Control Service website loaded successfully.");
});
