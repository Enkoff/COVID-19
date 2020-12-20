import Chart from 'chart.js';

import { getDataGrapg } from './getData';

export async function graph() {
  const global = await getDataGrapg()
    .then((res) => res.cases);

  const cases = Object.values(global);
  const keys = Object.keys(global);

  const ctx = document.getElementById('myChart');
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
}
