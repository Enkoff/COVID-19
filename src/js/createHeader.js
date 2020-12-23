export const root = document.querySelector('.root');

export default function createHeader() {
  const headerTitle = 'covid-19'.toUpperCase();

  const headerHtmlTemplate = `
        <header class="header">
        <div id="nav" class="navigation">
          <div class="navigation__inner">
            <ul class="map-navigation header-navigation">
                <li><span>Total Confirmed</span></li>
                <li><span>Total Deaths</span></li>
                <li><span>Total Recovered</span></li>
                <li><span>Total Confirmed / 100.000</span></li>
                <li><span>Total Deaths / 100.000</span></li>
                <li><span>Total Recovered / 100.000</span></li>
                <li><span>Today Confirmed</span></li>
                <li><span>Today Deaths</span></li>
                <li><span>Today Recovered</span></li>
                <li><span>Today Confirmed / 100.000</span></li>
                <li><span>Today Deaths / 100.000</span></li>
                <li><span>Today Recovered / 100.000</span></li>        
            </ul>
          </div>
      </div>
      <button id="show">Toggle Menu</button>
          <h1 class="title">${headerTitle}</h1>
        </header>
    `;
  root.insertAdjacentHTML('beforeend', headerHtmlTemplate);

  const btn = document.getElementById('show');
  const nav = document.getElementById('nav');

  btn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
