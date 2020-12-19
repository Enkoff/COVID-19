import { getData } from './getData';

export default function getSummary() {
  const summaryURL = 'summary';
  const globalTitle = document.querySelector('.global__title');
  const globalConfirmed = document.querySelector('.global__confirmed');
  const globalDate = document.querySelector('.global__date');

  globalTitle.textContent = 'Global Cases';

  getData(summaryURL).then((res) => {
    const dateAndTime = res.Date;

    globalConfirmed.textContent = res.Global.NewConfirmed;
    globalDate.textContent = dateAndTime.replace('T', ' ').replace('Z', '');
  });
}
