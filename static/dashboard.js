"use strict";

import { barChartConfig, pieChartConfig } from "./modules/utils.js";

const bar = document.querySelector("#chart");
const pie = document.querySelector("#chartPie");

new Chart(bar, barChartConfig);

new Chart(pie, pieChartConfig);
