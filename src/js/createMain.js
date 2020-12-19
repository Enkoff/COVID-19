import { root } from './createHeader';

import { globalDeaths } from './globalDeath';

globalDeaths();

export default function createMain() {
  const mainHtmlTemplate = `
    <main class="main">
        <div class="left-content">
            <div class="global__cases"></div>
            <div class="cases-country"></div>
        </div>
        <div class="map-wrapper">
            <div class="map"></div>
        </div>
        <div class="right-content">
            <div class="header__content">
                <div class="deaths"></div>
                <div class="recovered"></div>
            </div>
            <div class="footer__content">
                <div class="graph"></div>
            </div>   
        </div>
    </main>
    `;
  root.insertAdjacentHTML('beforeend', mainHtmlTemplate);
}
