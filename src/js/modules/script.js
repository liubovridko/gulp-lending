const language = localStorage.getItem('language') || 'en'; 
let translations;

fetch(`/translations/${language}.json`)
    .then(response => response.json())
    .then(data => {
        translations = data; 
        applyTranslations(); 
    });

function applyTranslations() {
    //document.getElementById('welcome').textContent = translations.welcome;
}

const changeLanguage = (lang) => {
  localStorage.setItem('language', lang); 
  location.reload(); 
};

document.addEventListener('DOMContentLoaded', () => {
  const languageButtons = document.querySelectorAll('.language-btn');

  languageButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const lang = event.target.dataset.lang;
      changeLanguage(lang);
    });
  });

  // Вызываем функцию для отправки данных на сервер при отправке формы
 document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  sendContactForm();
  });
});


 