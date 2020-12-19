import { getData } from './getData';

export async function allCases() {
  const global = await getData('summary')
    .then((res) => res.Global);

  const wrapper = document.querySelector('.all-cases');

  const cases = `
    <div class="cases__column">
      <h3 class="cases__title">Total Confirmed</h3>
      <p class="cases__total">${global.TotalConfirmed}</p>
      <p class="cases__new">+ ${global.NewConfirmed}</p>
    </div>

    <div class="cases__column">
      <h3 class="cases__title">Total Recovered</h3>
      <p class="cases__total">${global.TotalRecovered}</p>
      <p class="cases__new">+ ${global.NewRecovered}</p>
    </div>

    <div class="cases__column">
      <h3 class="cases__title">Total Deaths</h3>
      <p class="cases__total">${global.TotalDeaths}</p>
      <p class="cases__new">+ ${global.NewDeaths}</p>
    </div>
  `;

  wrapper.insertAdjacentHTML('beforeend', cases);
}
