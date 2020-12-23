/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import { getDataV3 } from './getData';
import { myMap } from './map';

export default function countryListener() {
  const countryss = document.querySelector('.country__list');
  countryss.addEventListener('click', (e) => {
    changCoord(e.target.textContent.replace(/[0-9]/g, ''));
  });
  function changCoord(country) {
    getDataV3('countries').then((res) => {
      res.map((el) => {
        if (el.country === country) {
          const countryList = document.querySelectorAll('.country__item');
          for (const e of countryList) {
            if (e.innerText.replace(/[0-9]/g, '') === el.country) {
              e.classList.add('country_activ');
            } else {
              e.classList.remove('country_activ');
            }
          }

          myMap.panTo(new L.LatLng(el.countryInfo.lat, el.countryInfo.long), 8);
        }
      });
    });
  }
}
