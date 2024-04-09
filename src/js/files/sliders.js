/* 
Документація https://swiperjs.com/
 */

import Swiper from 'swiper';
import { Navigation, Pagination  } from 'swiper/modules';

//Базові стилі
//import "../../scss/base/swiper.scss";
//Повний набір стилів з scss/libs/swiper.scss
//import "../scss/libs/swiper/scss";
//Повний набір стилів з node_modules
//import "swiper/css";

//import 'swiper/swiper-bundle.css'; 

// Add slider's classes
// swiper main block, swiper-wrapper cover, swiper-slide for slides
function bildSliders() {
    //BildSlider
    let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
    if (sliders) {
        sliders.forEach(slider => {
            slider.parentElement.classList.add('swiper');
            slider.classList.add('swiper-wrapper');
            for (const slide of slider.children) {
                slide.classList.add('swiper-slide');
            }
        });
    }
}

// init Swiper:
function initSliders() {
   if (document.querySelector('.swiper')) { 
       // Створюємо слайдер
       const mainSlider = new Swiper('.swiper', { 
           
           modules: [Navigation, Pagination],
           observer: true,
           observeParents: true,
           slidesPerView: 3,
           spaceBetween: 20,
           //parallax: true,
           //autoHeight: true,
           speed: 800,
           //loop: true,
           //autoHeight: true,
           //centeredSlides: true,
   
           //touchRatio: 0,
           //simulateTouch: false,
           //loop: true,
   
           // Підгрузка забражень class к img "swiper-lazy"
           //preloadImages: false,
           //lazy: true,
   
           /*
           // Еффекти
           effect: 'fade',
           autoplay: {
               delay: 3000,
               disableOnInteraction: false,
           },
           */
   
           // Пагінація
           
           pagination: {
               el: '.swiper-pagination',
               clickable: true,
           },
           
   
           // Скроллбар
           /*
           scrollbar: {
               el: '.swiper-scrollbar',
               draggable: true,
           },
           */
   
           navigation: {
               prevEl: '.swiper-button-prev',
               nextEl: '.swiper-button-next',
           },
   
           
           breakpoints: {
            320: {
               centeredSlides:true,
               spaceBetween: 15,
            },
            768: {
                centeredSlides:true,
                spaceBetween: 30,
             },
            1200: {
               centeredSlides:false,
               spaceBetween: 30,
            },
                        
           },
   
           }
       );
   }
}

// Scroll on base slider (class swiper_scroll for wrapper slider)
function initSlidersScroll() {
    // Добавление классов слайдера
    // при необходимости отключить
    bildSliders();

    let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
    if (sliderScrollItems.length > 0) {
        for (let index = 0; index < sliderScrollItems.length; index++) {
            const sliderScrollItem = sliderScrollItems[index];
            const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
            const sliderScroll = new Swiper(sliderScrollItem, {
                observer: true,
                observeParents: true,
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: {
                    enabled: true,
                },
                scrollbar: {
                    el: sliderScrollBar,
                    draggable: true,
                    snapOnRelease: false
                },
                mousewheel: {
                    releaseOnEdges: true,
                },
            });
            sliderScroll.scrollbar.updateSize();
        }
    }
}

window.addEventListener("load", function (e) {
    // Запуск инициализации слайдеров
    initSliders();
    // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
    //initSlidersScroll();
});

