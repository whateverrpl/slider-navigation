'use strict';

// Making a module for multiple uses
function carouselSlider({slideSelector, sliderParentSelector, prevSelector, nextSelector, currentCounter, totalCounter, wrapperSelector, sliderInnerSelector}) {
    // DOM Elements slides, prev, next, current, total
    const slides = document.querySelectorAll(slideSelector),
          slider = document.querySelector(sliderParentSelector),
          prevArrow = document.querySelector(prevSelector),
          nextArrow = document.querySelector(nextSelector),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapperSelector),
          slidesField = document.querySelector(sliderInnerSelector),
          width = parseInt(window.getComputedStyle(slidesWrapper).width);

    // Initial positions 
    let slideIndex = 1,
        offset = 0;

    function setTotalCounter() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;
        }
    }   
    setTotalCounter(); // Important*

    function setCurrentCounter() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function setActiveDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function setCurrentOffset() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function makeWidthSlides() {
        slidesField.style.width = 100 * slides.length + '%';

        slides.forEach(slide => {
            slide.style.width = `${width}px`;
        });
    }
    makeWidthSlides();

    // Making navigation dots with actual quantity of slides
    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');

        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    // Adding eventListener for button 'next'
    nextArrow.addEventListener('click', () => {
        // Changing actual offset on end or start position
        if (offset == width * (slides.length - 1)) { 
            offset = 0;
        } else {
            offset += width;
        }

        // Changing actual slide index on end or start position
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setCurrentOffset();
        setCurrentCounter();                
        setActiveDot();
    });

    // Adding eventListener for button 'prev'
    prevArrow.addEventListener('click', () => {
        // Changing actual offset on end or start position
        if (offset == 0) { 
            offset = width * (slides.length - 1);
        } else {
            offset -= width;
        }
        
        // Changing actual slide index on end or start position
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setCurrentOffset();
        setCurrentCounter();
        setActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = width * (slideTo - 1);

            setCurrentCounter();
            setCurrentOffset();
            setActiveDot();
        });
    });
}

// When calling the function, the correct class selectors must be selected 
carouselSlider({
    slideSelector: '.offer__slide',
    sliderParentSelector: '.offer__slider',
    prevSelector: '.offer__slider-prev',
    nextSelector: '.offer__slider-next',
    currentCounter: '#current',
    totalCounter: '#total',
    wrapperSelector: '.offer__slider-wrapper',
    sliderInnerSelector: '.offer__slider-inner'
});


