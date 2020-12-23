/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { getDataV3 } from './getData';

export default function summaryСountries() {
  const allURL = 'countries';

  getDataV3(allURL).then((res) => {
    const casesTitle = document.querySelector('.cases__title');
    casesTitle.textContent = 'Cases by';

    const casesSubTitle = document.querySelector('.cases__sub_title');
    casesSubTitle.textContent = 'Country/Region/Sovereignty';

    const casesList = document.querySelector('.country__list');
    const fragment = document.createDocumentFragment();
    const countries = res;

    countries.sort((a, b) => (b.cases > a.cases ? 1 : -1)).map((el) => {
      const item = document.createElement('li');
      item.classList.add('country__item');

      const itemTotalCases = document.createElement('span');
      itemTotalCases.classList.add('country__total');
      itemTotalCases.textContent = `${el.cases}`;
      item.append(itemTotalCases);

      const itemSpan = document.createElement('span');
      itemSpan.classList.add('country__item_span');
      itemSpan.textContent = `${el.country}`;
      item.append(itemSpan);

      const itemImg = document.createElement('img');
      itemImg.classList.add('country__flag');
      itemImg.src = el.countryInfo.flag;
      item.append(itemImg);

      fragment.append(item);
    });
    casesList.append(fragment);
  });
}
