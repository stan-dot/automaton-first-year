// link to the original https://journal.highlandsolutions.com/cellular-automata-in-javascript-c0336af3e1f3

var config = {
    generation: 0,
    //seed?
    seed: false,
    x: 10,
    y: 10,
    speed: 200,
    consumption: 0.001
}
var population = 5;
var resources = 10;

//building functions

  function makeGrid(x, y, population, resources) {
      var out = '';
      var grid = new Array(y);
      for (var iy = y - 1; iy >= 0; iy--) {
        var cells = '';
        grid[y] = new Array(x);
        for (var ix = x - 1; ix >= 0; ix--) {
          var className = 'x' + ix + 'y' + iy;
          cells += makeCell(className, population, resources);
          grid[y][x] = {
            population: 0,
            resources: 1
          }
        }
        out += makeRow(cells);
      }
      return out;
    }

    function makeRow(cells) {
      return '<div class="cell-row">' + cells + '</div>';
    }
    
    function makeCell(className, population, resources) {
      if (population > 10000){
        var red = 255;
      }
      else{
        var red = 255* population / 10000;
      }
      var green = 0;
      var blue = 0;
      return '<div class="cell ' + className + '" pop = "' + population + '"res = "' + resources + '" style="color:rgb(' + red + ',' + green + ',' + blue + ')">.</div>';
    }

  
//changing functions
  
  function newPopulation(population, resources) {
    if (popResRatio > 1){
      return population * 1.1 * popResRatio;
    }
    else{
      return population * 0.9 * popResRatio;
    }
  }

  function newResources(population, resources, consumption) {
    resources = resources - population * consumption
    if (resources > 0){
      return resources;
    }
    else{
      return 0;
    }
  }

  function abundanceEmigration(resources, population, x, y){
    population = population  - population * (popResRatio - 1) * 0.01 ;
    for(var i = -1; i < 2; i++){
      for(var j = -j; j < 2; j++){
        grid[x+i][y+j].population = population * (popResRatio -1) * 0.01 / 8;
      }
    }
  }
  
  function scarcityEmigration(resources, population, x, y){
    population = population  - population * (popResRatio - 1) * 0.01 ;
    for(var i = -1; i < 2; i++){
      for(var j = -j; j < 2; j++){
        grid[x+i][y+j].population = population * (popResRatio -1) * 0.01 / 8;
      }
    }
  }
  /*
  function neighborsPopulation(x, y){
  }

  function neighborsResources(x, y){
  }
  */
  function popResRatio(resources, population){
    return (resources / population);
  }

//main fuctions

  function buildNextGeneration(){
    config.generation++;
    document.getElementsByClassName('next')[0].innerHTML = makeGrid(config.x, config.y, population, resources);
    for (var iy = config.y - 1; iy >= 0; iy--) {
      for (var ix = config.x - 1; ix >= 0; ix--) {
        document.getElementsByClassName('ix'+'iy').style.color = "rgb(0,256,0)";
        var population = grid[iy][ix].population; 
        var resources = grid[iy][ix].resources;
        
        if (config.seed) {
          //first version - setting manually
          resources = 5;
          population = iy;
          //how to make first generation
          //configure.seed is only true in the first generation
        }
        else{
          //here regular evolution of the system
          
          resources = newResources(ix, iy, resources, population);
          population = newPopulation(ix, iy, resources, population);
        
          if (popResRatio > 1.3){
            abundanceEmigration(population, resources, x, y)
          }
          if(popResRatio < 0.7){
            scarcityEmigration(resources, population, x, y);
          }
          //neighborsPopulation (between cells)
          //neighborsResources (between cells)
        }
        
        grid[iy][ix].population = population;
        grid[iy][ix].resources = resources;
      }
    }
    live.forEach(function(cell) {
      toggle(cell.x, cell.y, 'next');
    });
    document.getElementsByClassName('life')[0].innerHTML = document.getElementsByClassName('next')[0].innerHTML;
    document.getElementsByClassName('generation')[0].innerHTML = config.generation;
    config.seed = false;
  }

  // see = building generation 0
  function seed(){
    document.getElementsByClassName('generation')[0].innerHTML = 0;
    document.getElementsByClassName('life')[0].innerHTML = makeGrid(config.x, config.y, population, resources);
    config.generation = 0;
    config.seed = true;
  }
 
/*main program*/
    if (document.getElementsByClassName('life')[0]) {
      population = 5;
      resources = 10;
      initialGrid = makeGrid(config.x, config.y, population, resources);
      document.getElementsByClassName('life')[0].innerHTML = initialGrid;
      document.getElementsByClassName('next')[0].innerHTML = initialGrid;
      seed();
      console.log("resources");
      setInterval(buildNextGeneration, config.speed);
    }

  