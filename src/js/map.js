/* eslint-disable no-shadow */
/* eslint-disable no-mixed-operators */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable import/no-mutable-exports */

import { getDataV3 } from './getData';

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
      const allTotal = document.querySelectorAll('.country__total');
      const allItemSpan = document.querySelectorAll('.country__item_span');
      const deathsClass = 'item-deaths';
      const recoveredClass = 'item-recovered';
      const countries = res;

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

        let amount;
        switch (title) {
          case 'Total Confirmed':
            amount = obj.totalConfirmed;

            countries.sort((a, b) => (b.cases - a.cases)).map((el, i) => {
              allTotal[i].textContent = `${el.cases}`;
              allItemSpan[i].textContent = `${el.country}`;
              allTotal[i].classList.remove(deathsClass);
              allTotal[i].classList.remove(recoveredClass);
            });
            break;
          case 'Total Deaths':
            amount = obj.totalDeaths;

            countries.sort((a, b) => (b.deaths - a.deaths))
              .map((el, i) => {
                allTotal[i].textContent = `${el.deaths}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(recoveredClass);
                allTotal[i].classList.add(deathsClass);
              });
            break;
          case 'Total Recovered':
            amount = obj.totalRecovered;

            countries.sort((a, b) => (b.recovered - a.recovered))
              .map((el, i) => {
                allTotal[i].textContent = `${el.recovered}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(deathsClass);
                allTotal[i].classList.add(recoveredClass);
              });
            break;
          case 'Today Confirmed':
            amount = obj.todayConfirmed;

            countries.sort((a, b) => (b.todayCases - a.todayCases))
              .map((el, i) => {
                allTotal[i].textContent = `${el.todayCases}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(recoveredClass);
                allTotal[i].classList.remove(deathsClass);
              });
            break;
          case 'Today Deaths':
            amount = obj.todayDeaths;

            countries.sort((a, b) => (b.todayDeaths - a.todayDeaths))
              .map((el, i) => {
                allTotal[i].textContent = `${el.todayDeaths}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(recoveredClass);
                allTotal[i].classList.add(deathsClass);
              });
            break;
          case 'Today Recovered':
            amount = obj.todayRecovered;

            countries.sort((a, b) => (b.todayRecovered - a.todayRecovered))
              .map((el, i) => {
                allTotal[i].textContent = `${el.todayRecovered}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(deathsClass);
                allTotal[i].classList.add(recoveredClass);
              });
            break;
          case 'Total Confirmed / 100.000':
            amount = Math.ceil((obj.totalConfirmed / obj.population) * 100000);

            countries.sort((a, b) => (b.cases / b.population * 100000) - (a.cases / a.population * 100000))
              .map((el, i) => {
                allTotal[i].textContent = `${Math.ceil((el.cases / el.population) * 100000)}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(recoveredClass);
                allTotal[i].classList.remove(deathsClass);
              });
            break;
          case 'Total Deaths / 100.000':
            amount = Math.ceil((obj.totalDeaths / obj.population) * 100000);

            countries.sort((a, b) => (b.deaths / b.population * 100000) - (a.deaths / a.population * 100000))
              .map((el, i) => {
                allTotal[i].textContent = `${Math.ceil((el.deaths / el.population) * 100000)}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(recoveredClass);
                allTotal[i].classList.add(deathsClass);
              });
            break;
          case 'Total Recovered / 100.000':
            amount = Math.ceil((obj.totalRecovered / obj.population) * 100000);

            countries.sort((a, b) => (b.recovered / b.population * 100000) - (a.recovered / a.population * 100000))
              .map((el, i) => {
                allTotal[i].textContent = `${Math.ceil((el.recovered / el.population) * 100000)}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(deathsClass);
                allTotal[i].classList.add(recoveredClass);
              });
            break;
          case 'Today Confirmed / 100.000':
            amount = Math.ceil((obj.todayConfirmed / obj.population) * 100000);

            countries.sort((a, b) => (b.todayCases / b.population * 100000) - (a.todayCases / a.population * 100000))
              .map((el, i) => {
                allTotal[i].textContent = `${Math.ceil((el.todayCases / el.population) * 100000)}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(recoveredClass);
                allTotal[i].classList.remove(deathsClass);
              });
            break;
          case 'Today Deaths / 100.000':
            amount = Math.ceil((obj.todayDeaths / obj.population) * 100000);

            countries.sort((a, b) => (b.todayDeaths / b.population * 100000) - (a.todayDeaths / a.population * 100000))
              .map((el, i) => {
                allTotal[i].textContent = `${(Math.ceil((el.todayDeaths / el.population) * 100000))}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(recoveredClass);
                allTotal[i].classList.add(deathsClass);
              });
            break;
          case 'Today Recovered / 100.000':
            amount = Math.ceil((obj.todayRecovered / obj.population) * 100000);

            countries.sort((a, b) => (b.todayRecovered / b.population * 100000) - (a.todayRecovered / a.population * 100000))
              .map((el, i) => {
                allTotal[i].textContent = `${Math.ceil((el.todayRecovered / el.population) * 100000)}`;
                allItemSpan[i].textContent = `${el.country}`;
                allTotal[i].classList.remove(deathsClass);
                allTotal[i].classList.add(recoveredClass);
              });
            break;
          default:
            break;
        }
        const popupText = `<b>${obj.country.toUpperCase()}</b><br>${title}: ${amount}`;
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

  const mapNav = document.querySelector('#map-nav');
  mapNav.addEventListener('click', (e) => {
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

  const countryNav = document.querySelector('#country-nav');
  countryNav.addEventListener('click', (e) => {
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
  createMarker(red, 'Total Confirmed');
}

export { myMap };
