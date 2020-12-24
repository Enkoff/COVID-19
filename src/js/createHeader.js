export const root = document.querySelector('.root');

export default function createHeader() {
  const headerTitle = 'covid-19'.toUpperCase();

  const headerHtmlTemplate = `
        <header class="header">
          <h1 class="title">${headerTitle}</h1>
        </header>
    `;
  root.insertAdjacentHTML('beforeend', headerHtmlTemplate);
}
