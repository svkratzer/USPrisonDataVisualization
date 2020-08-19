import "./styles/index.scss";
import { createMaleWeightedBubbleChart } from  './scripts/ethnicity_weighted_male';
import { createFemaleWeightedBubbleChart } from './scripts/ethnicity_weighted_female';
import { createAllWeightedBubbleChart } from './scripts/ethnicity_weighted_all';

createAllWeightedBubbleChart();
createMaleWeightedBubbleChart();
createFemaleWeightedBubbleChart();

