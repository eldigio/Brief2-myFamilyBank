'use strict';

import { barChartOptions } from './modules/utils.js';

const chart = new ApexCharts(document.querySelector('#chart'), barChartOptions);

chart.render();
