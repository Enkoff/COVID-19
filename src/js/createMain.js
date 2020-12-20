import { root } from './createHeader';
import getSummary from './upperLeftBlock';
import summaryСountries from './lowerLeftBlock';

import { allCases } from './allCases';

allCases();

export default function createMain() {
  const mainHtmlTemplate = `
    <main class="main">
        <div class="left-content">
            <div class="global-cases">
                <h2 class="global__title"></h2>
                <span class="global__confirmed"></span>
                <span class="global__date"></span>
            </div>
            <div class="cases-country">
                <h2 class="cases__title"></h2>
                <p class="cases__sub_title"></p>
                <ul class="country__list"></ul>
                <buttom class="cases__btn"><p class="cases__btn_title">Deaths</p></buttom>
            </div>
        </div>
        <div class="map-wrapper">
            <div class="map"></div>
        </div>
        <div class="right-content">
            <div class="all-cases"></div>
            <div class="footer__content">
                <div class="graph"></div>
            </div>   
        </div>
    </main>
    `;
  root.insertAdjacentHTML('beforeend', mainHtmlTemplate);
  getSummary();
  summaryСountries();
}
