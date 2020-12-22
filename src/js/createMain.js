/* eslint-disable no-tabs */
import { root } from './createHeader';
import getSummary from './upperLeftBlock';
import summaryСountries from './lowerLeftBlock';
import { graph } from './graph';
import { allCases } from './allCases';
import addMap from './map';
import createSearch from './searchMenu';

allCases();

export default async function createMain() {
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
                <div class="container">
                    <input type="text" class="search-imput" placeholder="Search...">
                    <div class="search"></div>
                </div>
                <ul class="country__list"></ul>
                <buttom class="cases__btn"><p class="cases__btn_title">Deaths</p></buttom>
            </div>
        </div>
        <div class="map-wrapper">
            <div id="map" class="map"></div>
			    <ul class="map-navigation">
                    <li><span>Total</span>
                        <ul>
				   		    <li><span>Total Confirmed</span></li>
				   		    <li><span>Total Deaths</span></li>
				   		    <li><span>Total Recovered</span></li>
					    </ul> 
                    </li>
                    <li><span>Total / 100.000</span>
                        <ul>
				   		    <li><span>Total Confirmed / 100.000</span></li>
				   		    <li><span>Total Deaths / 100.000</span></li>
				   		    <li><span>Total Recovered / 100.000</span></li>
					    </ul> 
                    </li>
            	    <li><span>Today</span>
					    <ul>
				   		    <li><span>Today Confirmed</span></li>
				   		    <li><span>Today Deaths</span></li>
				   		    <li><span>Today Recovered</span></li>
					    </ul>         
                    </li>        
                </ul>    
        </div>
        <div class="right-content">
            <div class="all-cases"></div>
            <div class="footer__content">
                <div class="graph"></div>
                <canvas id="myChart"></canvas>
                <button class="button graph__button">Deaths</button>
            </div>   
        </div>
    </main>
    `;
  root.insertAdjacentHTML('beforeend', mainHtmlTemplate);
  getSummary();
  addMap();
  summaryСountries();
  createSearch();
  await graph();
}
