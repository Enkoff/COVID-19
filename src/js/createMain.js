import { root } from './createHeader';
import getSummary from './upperLeftBlock';

import { globalDeaths } from './globalDeath';
import { graph } from './graph';

globalDeaths();

export default async function createMain() {
  const mainHtmlTemplate = `
    <main class="main">
        <div class="left-content">
            <div class="global-cases">
                <h2 class="global__title"></h2>
                <span class="global__confirmed"></span>
                <span class="global__date"></span>
            </div>
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
                <canvas id="myChart"></canvas>
            </div>   
        </div>
    </main>
    `;
  root.insertAdjacentHTML('beforeend', mainHtmlTemplate);
  getSummary();
  await graph();
}
