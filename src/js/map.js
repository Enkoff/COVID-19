/* eslint-disable no-console */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import { getDataV3 } from './getData';

let myMap;

export default async function addMap() {
  myMap = L.map('map').setView([49, 32], 4);
  const red = '#ff002b';
  const black = '#070707';
  const lightGreen = '#00f597';
  let allMrker = [];

  L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}', {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: '13f220cfbd664f3891b5531aad568622',
    minZoom: 2,
    maxZoom: 8,
  }).addTo(myMap);

  const bounds = L.latLngBounds([-200, -200], [200, 200]);
  myMap.setMaxBounds(bounds);
  myMap.on('drag', () => {
    myMap.panInsideBounds(bounds, { animate: false });
  });

  const createMarker = (paint, title = 'Confirmed') => {
    const createCircle = (lat, long, cases, text, countryName) => {
      let r;
      if (cases > 10000000) {
        r = 20;
      } else if (cases > 1000000) {
        r = 15;
      } else if (cases > 500000) {
        r = 13;
      } else if (cases > 250000) {
        r = 11;
      } else if (cases > 100000) {
        r = 9;
      } else if (cases > 50000) {
        r = 7;
      } else if (cases > 10000) {
        r = 5;
      } else {
        r = 3;
      }
      const circle = L.circleMarker([lat, long], {
        color: paint,
        fillColor: paint,
        fillOpacity: 1,
        radius: r,
      }).addTo(myMap);
      circle.bindPopup(`${text}`);
      circle.on('click', () => {
        const countryList = document.querySelectorAll('.country__item');
        for (const el of countryList) {
          if (el.innerText.replace(/[0-9]/g, '') === countryName) {
            for (const element of countryList) {
              element.classList.remove('country_activ');
            }
            el.classList.add('country_activ');
          }
        }
      });
      allMrker.push(circle);
    };

    getDataV3('countries').then((res) => {
      res.map((el) => {
        const obj = {
          lat: el.countryInfo.lat,
          long: el.countryInfo.long,
          confirmed: el.cases,
          deaths: el.deaths,
          recovered: el.recovered,
          country: el.country,
        };
        let amount;
        if (title === 'Deaths') {
          amount = obj.deaths;
        } else if (title === 'Recovered') {
          amount = obj.recovered;
        } else {
          amount = obj.confirmed;
        }
        const popupText = `<b>${obj.country.toUpperCase()}</b><br>Total ${title}: ${amount}`;
        createCircle(obj.lat, obj.long, amount, popupText, obj.country);
      });
    });
  };

  const removeMarker = () => {
    for (const el of allMrker) {
      myMap.removeLayer(el);
    }
    allMrker = [];
  };

  const mapBtn = document.querySelector('.map__btn');
  const mapBtnTitle = document.querySelector('.map__btn_title');
  mapBtn.addEventListener('click', () => {
    const btnText = mapBtnTitle.textContent;
    removeMarker();
    if (btnText === 'Deaths') {
      mapBtnTitle.textContent = 'Recovered';
      createMarker(black, btnText);
    } else if (btnText === 'Recovered') {
      mapBtnTitle.textContent = 'Confirmed';
      createMarker(lightGreen, btnText);
    } else {
      mapBtnTitle.textContent = 'Deaths';
      createMarker(red, btnText);
    }
  });
  createMarker(red);
}

export { myMap };
