import { getData } from './getData';

export async function globalDeaths() {
  const data = await getData('summary')
    .then((res) => res);

  const deaths = document.querySelector('.deaths');

  const title = document.createElement('h3');
  title.classList.add('deaths__title');
  title.textContent = 'Global Deaths';

  const total = document.createElement('p');
  total.classList.add('deaths__total');
  total.textContent = data.Global.TotalDeaths;

  const list = document.createElement('ul');
  list.classList.add('deaths__list');

  data.Countries
    .sort((a, b) => b.TotalDeaths - a.TotalDeaths)
    // eslint-disable-next-line array-callback-return
    .map((country) => {
      const item = document.createElement('li');
      item.classList.add('deaths__item');

      const countyDeaths = document.createElement('p');
      countyDeaths.classList.add('deaths__content');
      countyDeaths.textContent = `${country.TotalDeaths} deaths`;

      const countyTitle = document.createElement('p');
      countyTitle.classList.add('deaths__content');
      countyTitle.textContent = country.Country;

      item.append(countyDeaths, countyTitle);
      list.append(item);
    });

  deaths.append(title, total, list);
}
