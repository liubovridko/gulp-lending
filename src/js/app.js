import * as flsFunctions from './modules/functions.js'

flsFunctions.isWebp()
/*module for burger menu*/
//flsFunctions.toogleMenu()
/*module "Spollers"*/
//flsFunctions.spollers()

//===================================================================================================================
//Слайдер Swiper
//====================================================================================================================
/* 
Налаштування підключення плагіна Swiper відбувається у файлі "./files/sliders.js"
Документація https://swiperjs.com/
 */
import "./files/sliders.js"

//Функції роботи скролом
import * as flsScroll from "./files/scroll/scroll.js";

//функція додавання класів до хедеру під час прокручування
flsScroll.headerScroll();
// Модуль поекраної прокрутки
// import './modules/fullpage.js'

/*
Попапи
*/
// import './modules/popups.js'
// Робота з формами ======================================================
import * as flsForms from './modules/forms.js'

/* Робота з полями форми: додавання класів, робота з placeholder */
// flsForms.formFieldsInit()
/* Відправляє форму з вбудованою валідацією полів. false – відключити валідацію */
// flsForms.formSubmit(true)

/* Модуль форми "показати пароль" */
// flsForms.formViewpass()

/* Модуль форми "кількість" (Quantity) */
// flsFunctions.formQuantity()

/* Модуль зіркового рейтингу */
// import './modules/rating.js'

// Модуль роботи з ползунком ======================================================
/*
Підключення та налаштування виконується у файлі range.js
Документація плагіна: https://refreshless.com/nouislider/
*/
// import "./modules/range.js"

// Робота з Табами ======================================================
 // Опис в tabs.js
// import './modules/tabs.js'

// *** Кастомний селект *** ========================================= ===========
// Розкоментувати імпорт js файлу та імпорт select.scss файлу у style.scss
// У файлі select.js передати параметри текст плейсхолдера, id селекту, опшенси селекту та за потреби колбек функцію для обробки вибраного селекту
// Розкоментувати link шрифту font-awesome в head
// У index.html додати

// <div id="select"></div>

// import './modules/select.js'

/* Підключаю файл зі своїм кодом */
import './modules/script.js'