/* ============================================
   Rohan Talaviya — Portfolio JS
   ============================================ */

/* --- Preloader --- */
$(window).on('load', function () {
    gsap.to('#loader', 0.8, { y: '-100%', ease: 'power2.inOut', delay: 0.4 });
    gsap.to('#loader', 0.6, { opacity: 0, delay: 0.4 });
    gsap.to('#loader', 0, { display: 'none', delay: 1.2 });
    gsap.to('#header', 0, { display: 'block', delay: 1.2 });
});

/* --- Text Rotation (Typewriter) --- */
$(function () {
    var TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 120 - Math.random() * 60;
        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 300;
        }

        setTimeout(function () { that.tick(); }, delta);
    };

    window.onload = function () {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
    };
});

/* --- Section Navigation with Breaker Transition --- */
$(function () {
    function setActiveLink(id) {
        $('.nav-links a').removeClass('active');
        $('#' + id).addClass('active');
    }

    function switchSection(showId, linkId) {
        // Hide all sections
        gsap.to('#header', 0, { display: 'none' });
        gsap.to('#about', 0, { display: 'none' });
        gsap.to('#blog', 0, { display: 'none' });

        // Breaker animation
        gsap.to('#breaker', 0, { display: 'block' });
        gsap.to('#breaker-two', 0, { display: 'block', delay: 0.08 });
        gsap.to('#breaker', 0, { display: 'none', delay: 1.6 });
        gsap.to('#breaker-two', 0, { display: 'none', delay: 1.6 });

        // Show target section
        gsap.to(showId, 0, { display: 'block', delay: 0.6 });
        setActiveLink(linkId);
    }

    $('#home-link').on('click', function (e) { e.preventDefault(); switchSection('#header', 'home-link'); });
    $('#about-link').on('click', function (e) { e.preventDefault(); switchSection('#about', 'about-link'); });
    $('#blog-link').on('click', function (e) { e.preventDefault(); switchSection('#blog', 'blog-link'); });

    // Set home as default active
    setActiveLink('home-link');
});