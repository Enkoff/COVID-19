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
                <ul id="country-nav" class="map-navigation country-navigation">
                    <li><span class"map__item country__total">Total</span>
                        <ul>
                            <li><span>Total Confirmed</span></li>
                            <li><span>Total Deaths</span></li>
                            <li><span>Total Recovered</span></li>
                        </ul> 
                    </li>
                    <li><span class"map__item">Total / 100.000</span>
                        <ul>
				   		    <li><span>Total Confirmed / 100.000</span></li>
				   		    <li><span>Total Deaths / 100.000</span></li>
				   		    <li><span>Total Recovered / 100.000</span></li>
					    </ul> 
                    </li>
                    <li><span class"map__item country__today">Today</span>
					    <ul>
				   		    <li><span>Today Confirmed</span></li>
				   		    <li><span>Today Deaths</span></li>
				   		    <li><span>Today Recovered</span></li>
					    </ul>         
                    </li>
                    <li><span>Today / 100.000</span>
					    <ul>
				   		    <li><span>Today Confirmed / 100.000</span></li>
				   		    <li><span>Today Deaths / 100.000</span></li>
				   		    <li><span>Today Recovered / 100.000</span></li>
					    </ul>         
                    </li>
                </ul>
                <ul class="country__list"></ul>
            </div>
        </div>
        <div class="map-wrapper">
            <div id="map" class="map"></div>
			    <ul id="map-nav" class="map-navigation">
                    <li><span class"map__item">Total</span>
                        <ul>
				   		    <li><span>Total Confirmed</span></li>
				   		    <li><span>Total Deaths</span></li>
				   		    <li><span>Total Recovered</span></li>
					    </ul> 
                    </li>
                    <li><span class"map__item">Total / 100.000</span>
                        <ul>
				   		    <li><span>Total Confirmed / 100.000</span></li>
				   		    <li><span>Total Deaths / 100.000</span></li>
				   		    <li><span>Total Recovered / 100.000</span></li>
					    </ul> 
                    </li>
            	    <li><span class"map__item">Today</span>
					    <ul>
				   		    <li><span>Today Confirmed</span></li>
				   		    <li><span>Today Deaths</span></li>
				   		    <li><span>Today Recovered</span></li>
					    </ul>         
                    </li>
                    <li><span>Today / 100.000</span>
					    <ul>
				   		    <li><span>Today Confirmed / 100.000</span></li>
				   		    <li><span>Today Deaths / 100.000</span></li>
				   		    <li><span>Today Recovered / 100.000</span></li>
					    </ul>         
                    </li>          
                </ul>    
                <div class="leg">
                    <div class="leg-wrapper">
                        <div class="circle__confirmed"></div>
                        <span>Confirmed</span>
                    </div>
                    <div class="leg-wrapper">
                        <div class="circle__deaths"></div>
                        <span class="center__span">Deaths</span>
                    </div>
                    <div class="leg-wrapper">
                        <div class="circle__recovered"></div>
                        <span>Recovered</span>
                    </div>
                </div>
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
  summaryСountries();
  createSearch();
  await graph();
  addMap();
}
