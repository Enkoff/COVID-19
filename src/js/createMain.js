import { root } from './createHeader';

import { allCases } from './allCases';

allCases();

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
            <div class="all-cases"></div>
            <div class="footer__content">
                <div class="graph"></div>
            </div>   
        </div>
    </main>
    `;
  root.insertAdjacentHTML('beforeend', mainHtmlTemplate);
}
