
    window.addEventListener('DOMContentLoaded', () => {

      // $preloader = $('.loaderArea'),
      // $loader = $preloader.find('.loader');
      // $loader.fadeOut();
      // $preloader.delay(350).fadeOut('slow');

      
      const title = document.querySelector('title');
      console.log(title);
      setTimeout(() => {
        let name = getStoredItem('name');

        console.log(1 + name);
        if(name != false) {
          title.textContent = `${getStoredItem('name')}, спасибо! Ваша заявка принята`;
        } else {
          title.textContent = `Уважаемый клиент, спасибо! Ваша заявка принята`;
        }
          
      },500)



 

      // let yearLend = document.querySelector('.year');
      // var d = new Date();
      
      //  yearLend.innerHTML = d.getFullYear() + ' ';

    });