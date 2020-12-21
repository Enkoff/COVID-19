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

    const casesBtn = document.querySelector('.cases__btn');
    const casesBtnTitle = document.querySelector('.cases__btn_title');
    const allItem = document.querySelectorAll('.country__item');
    const allTotal = document.querySelectorAll('.country__total');
    const allItemSpan = document.querySelectorAll('.country__item_span');
    const allFlag = document.querySelectorAll('.country__flag');
    const deathsClass = 'item-deaths';
    const recoveredClass = 'item-recovered';

    casesBtn.addEventListener('click', () => {
      if (casesBtn.textContent === 'Deaths') {
        const sortDeaths = countries.sort((a, b) => (b.deaths > a.deaths ? 1 : -1));
        changeItem(sortDeaths, 'Recovered', deathsClass);
      } else if (casesBtn.textContent === 'Recovered') {
        const sortRecorved = countries.sort((a, b) => (b.recovered > a.recovered ? 1 : -1));
        changeItem(sortRecorved, 'Confirmed', recoveredClass, deathsClass);
      } else {
        const sortConfirmed = countries.sort((a, b) => (b.cases > a.cases ? 1 : -1));
        changeItem(sortConfirmed, 'Deaths', '', recoveredClass);
      }
    });

    function changeItem(sortCountries, btnText, addClass, removeClass) {
      sortCountries.map((el, i) => {
        if (btnText === 'Recovered') {
          allTotal[i].textContent = `${el.deaths}`;
          allItem[i].classList.add(addClass);
        } else if (btnText === 'Confirmed') {
          allTotal[i].textContent = `${el.recovered}`;
          allItem[i].classList.remove(removeClass);
          allItem[i].classList.add(addClass);
        } else {
          allTotal[i].textContent = `${el.cases}`;
          allItem[i].classList.remove(removeClass);
        }
        allItemSpan[i].textContent = `${el.country}`;
        allFlag[i].src = `${el.countryInfo.flag}`;
      });
      casesBtnTitle.textContent = btnText;
    }
  });
}
