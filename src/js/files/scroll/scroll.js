//We record how much was scrolled vertically
let scrollpos = window.scrollY

const header = document.querySelector('.header')

//How many pixels need to be scrolled to add a class. You can change the value
const scrollChange = 1

//Function will add a class
const add_class_on_scroll = () => header.classList.add('_header-scroll')

//Function will delete a class
const remove_class_on_scroll = () => header.classList.remove('_header-scroll')

export function headerScroll() {
  //Tracking the scroll event
  window.addEventListener('scroll', function () {
    scrollpos = window.scrollY

    //If scrolled more than we specified in the scrollChange variable, then the class adding function is executed 
    if (scrollpos >= scrollChange) {
      add_class_on_scroll()
    } else {
      remove_class_on_scroll()
    }
  })
}