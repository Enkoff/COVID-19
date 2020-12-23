/* eslint-disable no-case-declarations */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import { getDataV3 } from './getData';
import { allTotal, allItemSpan, allFlag } from './lowerLeftBlock';

let myMap;

export default async function addMap() {
  myMap = L.map('map').setView([49, 32], 4);
  const red = '#ff002b';
  const black = '#070707';
  const lightGreen = '#00f597';
  let allMrker = [];

  L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}', {
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
      if (cases === Infinity) {
        r = 5;
      } else if (cases > 10000000) {
        r = 30;
      } else if (cases > 1000000) {
        r = 20;
      } else if (cases > 500000) {
        r = 18;
      } else if (cases > 250000) {
        r = 16;
      } else if (cases > 100000) {
        r = 15;
      } else if (cases > 50000) {
        r = 14;
      } else if (cases > 10000) {
        r = 13;
      } else if (cases > 5000) {
        r = 12;
      } else if (cases > 1000) {
        r = 11;
      } else if (cases > 500) {
        r = 8;
      } else if (cases > 200) {
        r = 7;
      } else if (cases > 50) {
        r = 5;
      } else if (cases === 0) {
        r = 1;
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
          totalConfirmed: el.cases,
          totalDeaths: el.deaths,
          totalRecovered: el.recovered,
          todayConfirmed: el.todayCases,
          todayDeaths: el.todayDeaths,
          todayRecovered: el.todayRecovered,
          population: el.population,
          country: el.country,
        };

        // const allItem = document.querySelectorAll('.country__item');
        // const deathsClass = 'item-deaths';
        // const recoveredClass = 'item-recovered';
        const sorts = res;
        let amount;
        switch (title) {
          case 'Total Confirmed':
            amount = obj.totalConfirmed;
            const totalConfirmed = sorts.sort((a, b) => (b.cases > a.cases ? 1 : -1));
            totalConfirmed.map((elem, i) => {
              allTotal[i].textContent = `${elem.cases}`;
              allItemSpan[i].textContent = `${elem.country}`;
              allFlag[i].src = `${elem.countryInfo.flag}`;
            });
            break;
          case 'Total Deaths':
            amount = obj.totalDeaths;
            const totalDeaths = sorts.sort((a, b) => (b.deaths > a.deaths ? 1 : -1));
            totalDeaths.map((elem, i) => {
              allTotal[i].textContent = `${elem.cases}`;
              allItemSpan[i].textContent = `${elem.country}`;
              allFlag[i].src = `${elem.countryInfo.flag}`;
            });
            break;
          case 'Total Recovered':
            amount = obj.totalRecovered;
            break;
          case 'Today Confirmed':
            amount = obj.todayConfirmed;
            break;
          case 'Today Deaths':
            amount = obj.todayDeaths;
            break;
          case 'Today Recovered':
            amount = obj.todayRecovered;
            break;
          case 'Total Confirmed / 100.000':
            amount = Math.ceil((obj.totalConfirmed / obj.population) * 100000);
            break;
          case 'Total Deaths / 100.000':
            amount = Math.ceil((obj.totalDeaths / obj.population) * 100000);
            break;
          case 'Total Recovered / 100.000':
            amount = Math.ceil((obj.totalRecovered / obj.population) * 100000);
            break;
          case 'Today Confirmed / 100.000':
            amount = Math.ceil((obj.todayConfirmed / obj.population) * 100000);
            break;
          case 'Today Deaths / 100.000':
            amount = Math.ceil((obj.todayDeaths / obj.population) * 100000);
            break;
          case 'Today Recovered / 100.000':
            amount = Math.ceil((obj.todayRecovered / obj.population) * 100000);
            break;
          default:
            break;
        }
        const popupText = `<b>${obj.country.toUpperCase()}</b><br>${title}: ${amount}`;
        createCircle(obj.lat, obj.long, amount, popupText, obj.country);

        // function changeItem(sortCountries) {
        //   sortCountries.map((elem, i) => {
        //     allTotal[i].textContent = `${elem.cases}`;
        //     allItemSpan[i].textContent = `${elem.country}`;
        //     allFlag[i].src = `${elem.countryInfo.flag}`;
        //   });
        // }
      });
    });
  };

  const removeMarker = () => {
    for (const el of allMrker) {
      myMap.removeLayer(el);
    }
    allMrker = [];
  };

  const mapNavigatin = document.querySelectorAll('.map-navigation');
  console.log(mapNavigatin);
  for (const iterator of mapNavigatin) {
    iterator.addEventListener('click', (e) => {
      const clickText = e.target.innerText;
      removeMarker();
      if (clickText.indexOf('Deaths') !== -1) {
        createMarker(black, clickText);
      } else if (clickText.indexOf('Recovered') !== -1) {
        createMarker(lightGreen, clickText);
      } else {
        createMarker(red, clickText);
      }
    });
  }
  createMarker(red, 'Total Confirmed');
}

export { myMap };
