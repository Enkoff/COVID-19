import { getDataV3 } from './getData';

export default function getSummary() {
  const totalURL = 'all';
  const globalTitle = document.querySelector('.global__title');
  const globalConfirmed = document.querySelector('.global__confirmed');
  const globalDate = document.querySelector('.global__date');

  globalTitle.textContent = 'Global Cases';

  getDataV3(totalURL).then((res) => {
    const dateAndTime = String(new Date(res.updated));
    const array = dateAndTime.split('');
    const endIndex = array.indexOf('G');
    globalConfirmed.textContent = res.cases;
    globalDate.textContent = dateAndTime.substring(0, endIndex);
  });
}
