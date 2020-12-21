/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { getDataV3 } from './getData';

export default function summaryСountries() {
  const allURL = 'countries';

  getDataV3(allURL).then((res) => {
    console.log(res);
    const casesTitle = document.querySelector('.cases__title');
    casesTitle.textContent = 'Cases by';

    const casesSubTitle = document.querySelector('.cases__sub_title');
    casesSubTitle.textContent = 'Country/Region/Sovereignty';

    const casesList = document.querySelector('.country__list');
    const fragment = document.createDocumentFragment();
    const сontries = res;

    сontries.sort((a, b) => (b.cases > a.cases ? 1 : -1)).map((el) => {
      console.log(el);
      const item = document.createElement('li');
      item.classList.add('country__item');
      item.textContent = `${el.cases}`;

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
    const deathsClass = 'item-deaths';
    const recoveredClass = 'item-recovered';
    let activBtn = 1;
    casesBtn.addEventListener('click', () => {
      if (activBtn === 1) {
        changeItem();
      } else if (activBtn === 2) {
        changeItem();
      } else {
        changeItem();
      }
    });
    function changeItem() {
      if (activBtn === 1) {
        const sortRecovered = сontries.sort((a, b) => (b.deaths > a.deaths ? 1 : -1));
        sortRecovered.map((el, i) => {
          allItem[i].textContent = `${el.deaths}`;

          const itemSpan = document.createElement('span');
          itemSpan.classList.add('country__item_span');
          itemSpan.textContent = `${el.country}`;
          allItem[i].append(itemSpan);

          allItem[i].classList.add(deathsClass);
        });
        casesBtnTitle.textContent = 'Recovered';
        activBtn = 2;
      } else if (activBtn === 2) {
        const sortConfirmed = сontries.sort((a, b) => (b.recovered > a.recovered ? 1 : -1));
        sortConfirmed.map((el, i) => {
          allItem[i].textContent = `${el.recovered}`;

          const itemSpan = document.createElement('span');
          itemSpan.classList.add('country__item_span');
          itemSpan.textContent = `${el.country}`;
          allItem[i].append(itemSpan);

          allItem[i].classList.remove(deathsClass);
          allItem[i].classList.add(recoveredClass);
        });
        casesBtnTitle.textContent = 'Confirmed';
        activBtn = 3;
      } else {
        const sortDeaths = сontries.sort((a, b) => (b.cases > a.cases ? 1 : -1));
        sortDeaths.map((el, i) => {
          allItem[i].textContent = `${el.cases}`;

          const itemSpan = document.createElement('span');
          itemSpan.classList.add('country__item_span');
          itemSpan.textContent = `${el.country}`;
          allItem[i].append(itemSpan);

          allItem[i].classList.remove(recoveredClass);
        });
        casesBtnTitle.textContent = 'Deaths';
        activBtn = 1;
      }
    }
  });
}
