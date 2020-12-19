import { getData } from './getData';

export default function summaryСountries() {
  const summaryURL = 'summary';

  getData(summaryURL).then((res) => {
    const casesTitle = document.querySelector('.cases__title');
    casesTitle.textContent = 'Cases by';

    const casesSubTitle = document.querySelector('.cases__sub_title');
    casesSubTitle.textContent = 'Country/Region/Sovereignty';

    const casesList = document.querySelector('.country__list');
    const fragment = document.createDocumentFragment();
    const сontries = res.Countries;

    // eslint-disable-next-line array-callback-return
    сontries.sort((a, b) => (b.TotalConfirmed > a.TotalConfirmed ? 1 : -1)).map((el) => {
      const item = document.createElement('li');
      item.classList.add('country__item');
      item.textContent = `${el.TotalConfirmed}`;
      const itemSpan = document.createElement('span');

      itemSpan.classList.add('country__item_span');
      itemSpan.textContent = `${el.Country}`;
      item.append(itemSpan);

      fragment.append(item);
    });
    casesList.append(fragment);

    const casesBtn = document.querySelector('.cases__btn');
    const casesBtnTitle = document.querySelector('.cases__btn_title');
    const allItem = document.querySelectorAll('.country__item');
    const deathsClass = 'item-deaths';
    const recoveredClass = 'item-recovered';
    // const allItemSpan = document.querySelectorAll('.country__item_span');
    let activBtn = 1;
    casesBtn.addEventListener('click', () => {
      if (activBtn === 1) {
        // eslint-disable-next-line no-use-before-define
        changeItem();
      } else if (activBtn === 2) {
        // eslint-disable-next-line no-use-before-define
        changeItem();
      } else {
        // eslint-disable-next-line no-use-before-define
        changeItem();
      }
    });
    function changeItem() {
      if (activBtn === 1) {
        const sortRecovered = сontries.sort((a, b) => (b.TotalDeaths > a.TotalDeaths ? 1 : -1));
        // eslint-disable-next-line array-callback-return
        sortRecovered.map((el, i) => {
          allItem[i].textContent = `${el.TotalDeaths}`;

          const itemSpan = document.createElement('span');
          itemSpan.classList.add('country__item_span');
          itemSpan.textContent = `${el.Country}`;
          allItem[i].append(itemSpan);

          allItem[i].classList.add(deathsClass);
        });
        casesBtnTitle.textContent = 'Recovered';
        activBtn = 2;
      } else if (activBtn === 2) {
        // eslint-disable-next-line max-len
        const sortConfirmed = сontries.sort((a, b) => (b.TotalRecovered > a.TotalRecovered ? 1 : -1));
        // eslint-disable-next-line array-callback-return
        sortConfirmed.map((el, i) => {
          allItem[i].textContent = `${el.TotalRecovered}`;

          const itemSpan = document.createElement('span');
          itemSpan.classList.add('country__item_span');
          itemSpan.textContent = `${el.Country}`;
          allItem[i].append(itemSpan);

          allItem[i].classList.remove(deathsClass);
          allItem[i].classList.add(recoveredClass);
        });
        casesBtnTitle.textContent = 'Confirmed';
        activBtn = 3;
      } else {
        const sortDeaths = сontries.sort((a, b) => (b.TotalConfirmed > a.TotalConfirmed ? 1 : -1));
        // eslint-disable-next-line array-callback-return
        sortDeaths.map((el, i) => {
          allItem[i].textContent = `${el.TotalConfirmed}`;

          const itemSpan = document.createElement('span');
          itemSpan.classList.add('country__item_span');
          itemSpan.textContent = `${el.Country}`;
          allItem[i].append(itemSpan);

          allItem[i].classList.remove(recoveredClass);
        });
        casesBtnTitle.textContent = 'Deaths';
        activBtn = 1;
      }
    }
  });
}
