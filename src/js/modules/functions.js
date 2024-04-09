/*check browser- support webp or not*/

export function isWebp() {
  //check support
  function testWebp(callback) {
    let webp = new Image()
    webp.onload = webp.onerror = function () {
      callback(webp.height == 2)
    }
    webp.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  //add class _webp or _no-webp in HTML
  testWebp(function (support) {
    let classname = support === true ? 'webp' : 'no-webp'
    document.documentElement.classList.add(classname)
  })
}

/*toggle menu buger*/

export function toogleMenu() {
  var burgerIcon = document.getElementById('burgerIcon')
  var menu = document.getElementById('menu')

  // Добавляем обработчик события для клика на бургер-иконке
  burgerIcon.addEventListener('click', function () {
    // Переключаем класс "open" для меню
    menu.classList.toggle('open')
    burgerIcon.classList.toggle('menu-open')
  })

  // Добавляем обработчик события для закрытия меню при клике вне его области на маленьких экранах
  document.addEventListener('click', function (event) {
    if (
      window.innerWidth <= 768 &&
      !burgerIcon.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      menu.classList.remove('open')
      burgerIcon.classList.remove('menu-open')
    }
  })
}

//Spollers
// автор Фрилансер по Жизни
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.

Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

data-spollers-speed - скорость открытия

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller

*/

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = `${target.offsetHeight}px`
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = showmore ? `${showmore}px` : `0px`
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false
      !showmore ? target.style.removeProperty('height') : null
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      !showmore ? target.style.removeProperty('overflow') : null
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent('slideUpDone', {
          detail: {
            target: target,
          },
        }),
      )
    }, duration)
  }
}
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    target.hidden = target.hidden ? false : null
    showmore ? target.style.removeProperty('height') : null
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = showmore ? `${showmore}px` : `0px`
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent('slideDownDone', {
          detail: {
            target: target,
          },
        }),
      )
    }, duration)
  }
}
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration)
  } else {
    return _slideUp(target, duration)
  }
}
function dataMediaQueries(array, dataSetValue) {
  // Получение объектов с медиа запросами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(',')[0]
    }
  })
  // Инициализация объектов с медиа запросами
  if (media.length) {
    const breakpointsArray = []
    media.forEach((item) => {
      const params = item.dataset[dataSetValue]
      const breakpoint = {}
      const paramsArray = params.split(',')
      breakpoint.value = paramsArray[0]
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
      breakpoint.item = item
      if (item.hasAttribute('data-em')) {
        breakpoint.dataEm = true
      }
      breakpointsArray.push(breakpoint)
    })
    // Получаем уникальные брейкпоинты
    let mdQueries = breakpointsArray.map(function (item) {
      if (item.dataEm) {
        item.value = (item.value / 16).toString()
        return '(' + item.type + '-width: ' + item.value + 'em),' + item.value + ',' + item.type
      } else {
        return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type
      }
      // item.value = (item.value / 16).toString()
      // return '(' + item.type + "-width: " + item.value + "em)," + item.value + ',' + item.type;
    })
    mdQueries = uniqArray(mdQueries)
    const mdQueriesArray = []

    if (mdQueries.length) {
      // Работаем с каждым брейкпоинтом
      mdQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(',')
        const mediaBreakpoint = paramsArray[1]
        const mediaType = paramsArray[2]
        const matchMedia = window.matchMedia(paramsArray[0])
        // Объекты с нужными условиями
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true
          }
        })
        mdQueriesArray.push({
          itemsArray,
          matchMedia,
        })
      })
      return mdQueriesArray
    }
  }
}
export function spollers() {
  const spollersArray = document.querySelectorAll('[data-spollers]')
  if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(',')[0]
    })
    // Инициализация обычных слойлеров
    if (spollersRegular.length) {
      initSpollers(spollersRegular)
    }
    let mdQueriesArray = dataMediaQueries(spollersArray, 'spollers')
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Событие
        // mdQueriesItem.matchMedia.addEventListener("change", function () {
        // 	initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        // });
        mdQueriesItem.matchMedia.onchange = () => {
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
        }
        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
      })
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock) => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_spoller-init')
          initSpollerBody(spollersBlock)
          spollersBlock.addEventListener('click', setSpollerAction)
        } else {
          spollersBlock.classList.remove('_spoller-init')
          initSpollerBody(spollersBlock, false)
          spollersBlock.removeEventListener('click', setSpollerAction)
        }
      })
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter(
          (item) => item.closest('[data-spollers]') === spollersBlock,
        )
        spollerTitles.forEach((spollerTitle) => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex')
            if (!spollerTitle.classList.contains('_spoller-active')) {
              spollerTitle.nextElementSibling.hidden = true
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1')
            spollerTitle.nextElementSibling.hidden = false
          }
        })
      }
    }
    function setSpollerAction(e) {
      const el = e.target
      if (el.closest('[data-spoller]')) {
        const spollerTitle = el.closest('[data-spoller]')
        const spollersBlock = spollerTitle.closest('[data-spollers]')
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
        const spollerSpeed = spollersBlock.dataset.spollersSpeed
          ? parseInt(spollersBlock.dataset.spollersSpeed)
          : 500
        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
            hideSpollersBody(spollersBlock)
          }
          spollerTitle.classList.toggle('_spoller-active')
          _slideToggle(spollerTitle.nextElementSibling, spollerSpeed)
        }
        e.preventDefault()
      }
    }
    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active')
      const spollerSpeed = spollersBlock.dataset.spollersSpeed
        ? parseInt(spollersBlock.dataset.spollersSpeed)
        : 500
      if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
        spollerActiveTitle.classList.remove('_spoller-active')
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed)
      }
    }
    // Закрытие при клике вне спойлера
    const spollersClose = document.querySelectorAll('[data-spoller-close]')
    if (spollersClose.length) {
      document.addEventListener('click', function (e) {
        const el = e.target
        if (!el.closest('[data-spollers]')) {
          spollersClose.forEach((spollerClose) => {
            const spollersBlock = spollerClose.closest('[data-spollers]')
            const spollerSpeed = spollersBlock.dataset.spollersSpeed
              ? parseInt(spollersBlock.dataset.spollersSpeed)
              : 500
            spollerClose.classList.remove('_spoller-active')
            _slideUp(spollerClose.nextElementSibling, spollerSpeed)
          })
        }
      })
    }
  }
}
// *** Модуль форми кількість
export function formQuantity() {
  const quantity = document.querySelector('.quantity')
  const quantityValue = document.querySelector('.quantity input')
  const quantityPlus = document.querySelector('.quantity__button-plus')
  const quantityMinus = document.querySelector('.quantity__button-minus')
  if (quantity) {
    let count = 1

    quantityPlus.addEventListener('click', () => {
      count++
      count = count < 10 ? `0${count}` : count
      quantityValue.value = count
    })
    quantityMinus.addEventListener('click', () => {
      if (count > 1) {
        count--
        count = count < 10 ? `0${count}` : count
        quantityValue.value = count
      }
    })
  }
}
