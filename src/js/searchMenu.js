/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { getDataV3 } from './getData';

export default function createSearch() {
  const input = document.querySelector('.search-imput');

  getDataV3('countries').then((res) => {
    input.oninput = function () {
      const value = this.value.trim().toLowerCase();
      const allLi = document.querySelectorAll('.country__item');
      if (value !== '') {
        allLi.forEach((element) => {
          if (element.innerText.toLowerCase().search(value) === -1) {
            element.classList.add('hide');
          } else {
            res.map((el) => {
              if (el.country === element.children[1].textContent) {
                element.lastChild.src = el.countryInfo.flag;
              }
            });
            element.classList.remove('hide');
          }
        });
      } else {
        allLi.forEach((element) => {
          element.classList.remove('hide');
          res.map((el) => {
            if (el.country === element.children[1].textContent) {
              element.lastChild.removeAttribute('src');
            }
          });
        });
      }
    };
  });
}
