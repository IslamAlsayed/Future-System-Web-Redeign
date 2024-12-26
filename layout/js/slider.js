function createSwiper(selector, paginationClass, nextClass, prevClass, startingClass, breakpoints) {
    return new Swiper(selector, {
        loop: false, // The scroll bar is infinitely scrollable by default.
        spaceBetween: 30,
        speed: 5000,
        autoplay: {
            delay: 1,
        },
        pagination: {
            el: paginationClass,
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: nextClass,
            prevEl: prevClass
        },
        breakpoints: breakpoints,
        initialSlide: startingClass
    });
}

createSwiper('.main-card-wrapper', '.swiper-pagination', '.swiper-button-next', '.swiper-button-prev', 1, {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 1 },
    1024: { slidesPerView: 1 }
});

createSwiper('.services-card-wrapper', '.services-pagination', '.services-next', '.services-prev', 0, {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1024: { slidesPerView: 3 }
});

createSwiper('.features-card-wrapper', '.features-pagination', '.features-next', '.features-prev', 0, {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1024: { slidesPerView: 3 }
});

createSwiper('.projects-card-wrapper', '.projects-pagination', '.projects-next', '.projects-prev', 0, {
    0: { slidesPerView: 1 },
    500: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    992: { slidesPerView: 3 },
    1024: { slidesPerView: 4 }
});

createSwiper('.clients-card-wrapper', '.clients-pagination', '.clients-next', '.clients-prev', 0, {
    0: { slidesPerView: 1 },
    500: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    992: { slidesPerView: 3 },
    1024: { slidesPerView: 4 }
});

createSwiper('.client-reviews-card-wrapper', '.client-reviews-pagination', '.client-reviews-next', '.client-reviews-prev', 0, {
    0: { slidesPerView: 1 },
    500: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    992: { slidesPerView: 3 },
    1024: { slidesPerView: 4 }
});
