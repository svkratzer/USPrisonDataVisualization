## US Prison Data Visualization
This project is a visualization of data taken from the Bureau of Justice Statistics regarding U.S. corrections system. Before I even set foot in the coding
community, I was a fan of Mike Bostock and the data visualization he's done for the New York Times. Inspired by his work, I sought to demonstrate
in a visually impactful manner, certain disparties and issues surrounding the American corrrectional system.  
  
Click [here](https://svkratzer.github.io/USPrisonDataVisualization/) to view the **live site**. 
### Functionality
This graphic was meant to be simple yet engaging. Each bubble represents the number of incarcerated indiviudals per specific demographic as a function of area. To better engage the viewer, I decided to give the bubbles movement and have them follow a basic force simulation. Later on, I thought it would be interesting to allow the user to click and drag the bubbles, to not only engage with the data but functionally compare each demographic's bubble with the total population's. By dragging a bubble to the "total population" mark, users can physically and visually compare how much a particular demographic deviates from the total population in terms of incarceration rates per 100,000 people. 
###  Preview
![preview](https://github.com/svkratzer/USPrisonDataVisualization/blob/master/readme_images/dataviz_preview.gif)
### Technology & Data
This project utilizes the popular D3 library to create a dynamic and interactive visualization of data. The data itself is taken from the BJS (Bureau of Justice Statistics)
in .csv format. To view the dataset itself, please reference the 2018 prison data report on the [BJS website](https://www.bjs.gov/index.cfm?ty=pbdetail&iid=6846). Note that the data I used for the visualization is reformatted from the data recorded in the file `p18t10.csv` a link to which can be found, [here](https://github.com/svkratzer/USPrisonDataVisualization/blob/master/data/p18t10.csv).
