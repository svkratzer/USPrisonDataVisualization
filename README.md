## US Prison Data Visualization
This project is a visualization of data taken from the Bureau of Justice Statistics regarding U.S. corrections system. Before I even set foot in the coding
community, I was a fan of Mike Bostock and the data visualization he's done for the New York Times. Inspired by his work, I seek to demonstrate
in a visually impactful manner, certain disparties and issues surrounding the American corrrectional system and prison-industrial complex. 
### Functionality and MVPs 
This data visualization will have the following functionality and features...
- [ ] A series of bubbles that will have different sizes based on their respective numerical values.
- [ ] A section showing U.S. incarceration rates by ethnicity.
- [ ] A section showing U.S. prison population by specific crimes.
- [ ] The ability to mouse over certain bubbles and see a further breakdown of what they represent.
  
Bonuses
- [ ] Different "view modes" for data breakdowns (e.g. splitting the bubbles into violent and nonviolent crimes)
- [ ] Animations for the bubbles moving and changing color
- [ ] Even more statistical breakdowns like duration of prison sentences, public vs. private prison budgets, etc. 
### Wireframe 
The following wireframe provides a general outline of what the finished visualization will look like. It will be a series of bubbles, each representing
a part of the overall statistical breakdown. The tabs will allow the user to switch between different parts of the dataset (e.g. Time Served, Ethnicity, Violent vs. Nonviolent, etc.)
![wireframe](https://github.com/svkratzer/USPrisonDataVisualization/blob/master/readme_images/wireframe.png)
### Architecture and Technology 
This project will utilize the popular D3 library to create a dynamic and interactive visualization of data. The data itself will be taken from the BJS (Bureau of Justice Statistics)
in .csv format. Depending on how the project moves forward, an alternative source of data might be the [Prison Politcy Initiative]()https://www.prisonpolicy.org/data/
or (for smaller amounts of data), data that I personally convert into a consumable format from trustworthy sources that don't provide the right formatting. 
### Implementation Timeline
* *Day 1*: Familiarize myself with D3 and .csv formatted data sets. Begin to work on project structure.
* *Day 2*: Create a rough draft of the first set of data (i.e. render bubbles on a page).
* *Day 3*: Create the second set of bubbles, and add tooltips to both.
* *Day 4*: Structure the webpage to have tabs that allow the user to swap back and forth between datasets and (time permitting) incorporate more advanced animations.
* *Day 5*: Add an additional "view mode" (e.g. add a button to show a side-by-side comparison of U.S. prison population by ethnicity compared to total U.S. population).
