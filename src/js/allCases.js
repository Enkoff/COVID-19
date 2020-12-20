import { getDataV3 } from './getData';

export async function allCases() {
  const global = await getDataV3('all')
    .then((res) => res);

  const ONE_HUNDRED_POPULATION = global.population / 100000;

  const wrapper = document.querySelector('.all-cases');

  const cases = `
    <div class="cases__column">
      <h3 class="cases__title">Total Confirmed</h3>
      <p class="cases__total">${global.cases}</p>
      <p class="cases__new">+ ${global.todayCases}</p>
    </div>

    <div class="cases__column">
      <h3 class="cases__title">Total Recovered</h3>
      <p class="cases__total">${global.recovered}</p>
      <p class="cases__new">+ ${global.todayRecovered}</p>
    </div>

    <div class="cases__column">
      <h3 class="cases__title">Total Deaths</h3>
      <p class="cases__total">${global.deaths}</p>
      <p class="cases__new">+ ${global.todayDeaths}</p>
    </div>

    <div class="cases__column">
      <h3 class="cases__title">Total Confirmed / 100.000</h3>
      <p class="cases__total">${Math.ceil(global.cases / ONE_HUNDRED_POPULATION)}</p>
      <p class="cases__new">+ ${Math.ceil(global.todayCases / ONE_HUNDRED_POPULATION)}</p>
    </div>

    <div class="cases__column">
      <h3 class="cases__title">Total Recovered / 100.000</h3>
      <p class="cases__total">${Math.ceil(global.recovered / ONE_HUNDRED_POPULATION)}</p>
      <p class="cases__new">+ ${Math.ceil(global.todayRecovered / ONE_HUNDRED_POPULATION)}</p>
    </div>

    <div class="cases__column">
      <h3 class="cases__title">Total Deaths / 100.000</h3>
      <p class="cases__total">${Math.ceil(global.deaths / ONE_HUNDRED_POPULATION)}</p>
      <p class="cases__new">+ ${Math.ceil(global.todayDeaths / ONE_HUNDRED_POPULATION)}</p>
    </div>
  `;

  wrapper.insertAdjacentHTML('beforeend', cases);
}
