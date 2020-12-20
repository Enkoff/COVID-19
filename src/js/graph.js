import Chart from 'chart.js';
import { getDataV3 } from './getData';

let active = 1;

async function changeItem() {
  const global = await getDataV3('historical/all?lastdays=366')
    .then((res) => res);
  const ctx = document.querySelector('#myChart');
  const graphButton = document.querySelector('.graph__button');

  if (active === 1) {
    const cases = Object.values(global.cases);
    const keys = Object.keys(global.cases);
    // eslint-disable-next-line no-unused-vars
    const lineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: keys,
        datasets: [{
          label: 'Cases',
          data: cases,
        }],
      },
    });

    graphButton.textContent = 'Recovered';
    active = 2;
  } else if (active === 2) {
    const cases = Object.values(global.recovered);
    const keys = Object.keys(global.recovered);
    // eslint-disable-next-line no-unused-vars
    const lineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: keys,
        datasets: [{
          label: 'Recovered',
          data: cases,
        }],
      },
    });

    graphButton.textContent = 'Deaths';
    active = 3;
  } else {
    const cases = Object.values(global.deaths);
    const keys = Object.keys(global.deaths);
    // eslint-disable-next-line no-unused-vars
    const lineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: keys,
        datasets: [{
          label: 'Deaths',
          data: cases,
        }],
      },
    });

    graphButton.textContent = 'Cases';
    active = 1;
  }
}

export function graph() {
  const graphButton = document.querySelector('.graph__button');
  changeItem();

  graphButton.addEventListener('click', () => {
    if (active === 1) {
      changeItem();
    } else if (active === 2) {
      changeItem();
    } else {
      changeItem();
    }
  });
}
