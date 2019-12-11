//link to the original https://journal.highlandsolutions.com/cellular-automata-in-javascript-c0336af3e1f3

//todo = syntax of grid[iy][ix].population at the beginning of buildnextgeneration
//the comments: separate build next gen from display
//fix the stop button - evenrlistener of null


"use strict";

window.config = {
  generation: 0,
  seed: true,
  x: 10,
  y: 10,
  speed: 1500,
  consumption: 0.001
}

//https://stackoverflow.com/questions/41030120/identifier-has-already-been-declared-how-to-unset-class-variable-in

var gridUnit = class GridUnit{
  constructor(population, resources){
    this.population = population;
    this.resources = resources;
  }
}

//building functions
function makeGrid(globalx, globaly) {
  var out = '';
  if (window.config.seed){
    window.grid = new Array(globaly);
  }
  for (var iy = globaly - 1; iy >= 0; iy--) {
    var cells = '';
    if(window.config.seed){
      window.grid[iy] = new Array(globalx);
    }
    for (var ix = globalx - 1; ix >= 0; ix--) {
      var className = 'x' + ix + 'y' + iy;
      if (window.config.seed) {
        //window.configure.seed is only true in the first generation
        window.grid[iy][ix] = new gridUnit(100 + iy, 100);
      }
      cells += makeCell(className, iy, ix, window.grid[iy][ix]);
    }
    out += makeRow(cells);
  }
  
  if(window.config.seed){
    console.log("building first generation"); 
  }
  console.log("generation built");
  return out;
}

function makeRow(cells) {
  return '<div class="cell-row">' + cells + '</div>';
}

function makeCell(className, iy, ix, obj) {
  //here we get population for each cell from the grid
  var localPopulation = obj.population;
  if ( localPopulation > 10000){
    var red = 255;
  }
  else{
    var red = 255* localPopulation / 10000;
  }
  var green = 0;
  var blue = 0;
  return '<div class="cell ' + className + '" pop = "' + localPopulation + '"res = "' + window.grid[iy][ix].resources + '" style="color:rgb(' + red + ',' + green + ',' + blue + ')">.</div>';
}

  
//changing functions
function newPopulation(population, resources) {
  var popResRatio = population / resources;
  if ( popResRatio > 1){
    console.log("population increase");
    return population * 1.1 * popResRatio;
  }
  else{
    console.log("population decrease");
    return population * 0.9 * popResRatio;
  }
}

function newResources(population, resources, consumption) {
  resources = resources - population * consumption
  if (resources > 0){
    //console.log("newResources 75");
    return resources;
  }
  else{
    //console.log("newResources 79");
    return 0;
  }
}

function abundanceEmigration(resources, population, x, y){
  population = population  - population * (popResRatio - 1) * 0.01 ;
  for(var i = -1; i < 2; i++){
    for(var j = -j; j < 2; j++){
      window.grid[x+i][y+j].population = population * (popResRatio -1) * 0.01 / 8;
    }
  }
  console.log("adbundanceEmigration 91");
}
  
function scarcityEmigration(resources, population, x, y){
  population = population  - population * (popResRatio - 1) * 0.01 ;
  for(var i = -1; i < 2; i++){
    for(var j = -j; j < 2; j++){
      window.grid[x+i][y+j].population = population * (popResRatio -1) * 0.01 / 8;
    }
  }
  console.log("scarcityEmigration 101");
}

/*
function neighborsPopulation(x, y){
}

function neighborsResources(x, y){
}
*/

function popResRatio(resources, population){
  console.log("population resources calculated 111");
  return (resources / population);
}

//main fuctions
function buildNextGeneration(){
  document.getElementsByClassName('next')[0].innerHTML = makeGrid(window.config.x, window.config.y);
  for (var iy = window.config.y - 1; iy >= 0; iy--){
    for (var ix = window.config.x - 1; ix >= 0; ix--) {
    //operating on temporary variables
    var population = window.grid[iy][ix].population;
    var resources = window.grid[iy][ix].resources;
    console.log(window.grid[iy][ix].resources + " resources before change");
    console.log(window.grid[iy][ix].population + " population before change");
    //here regular evolution of the system
    resources = newResources(resources, population, window.config.consumption);
    population = newPopulation(resources, population);
    console.log(resources + " resources after newRes");
    console.log( population + " population after newPop");

    /*  
    if (population / resources > 1.3){
      abundanceEmigration(population, resources, x, y)
    }
    if(population / resources < 0.7){
      scarcityEmigration(resources, population, x, y);
    }
    */
    //neighborsPopulation (between cells)
    //neighborsResources (between cells)
    
    window.grid[iy][ix].population = Math.floor(population);
    window.grid[iy][ix].resources = Math.floor(resources);
    console.log(window.grid[iy][ix].resources + " resources");
    console.log(window.grid[iy][ix].population + " population");
    console.log("grid updated 152");
    }
  }
  /*live.forEach(function(cell) {
    toggle(cell.x, cell.y, 'next');
    //line above needs to be changed; there is anonymous function; make it for for
  });*/
  console.log("next updated 159");
  document.getElementsByClassName('life')[0].innerHTML = document.getElementsByClassName('next')[0].innerHTML;
  document.getElementsByClassName('generation')[0].innerHTML = window.config.generation;
  window.config.seed = false;
  window.config.generation++;
  console.log("building generation " + window.config.generation);
}

// see = building generation 0
function seed(){
  document.getElementsByClassName('generation')[0].innerHTML = 0;
  console.log("just before makegrid in seed");
  document.getElementsByClassName('life')[0].innerHTML = makeGrid(window.config.x, window.config.y);
  window.config.generation = 0;
  window.config.seed = true;
  console.log("seed lanuched");
}
 
//event handlers
var stopbutton = document.getElementById("stopbutton");
window.stopFunction = false;
function makeStop(){
  window.stopFunction = true;
}
stopbutton.addEventListener('click',function(){makeStop()} ,false);

/*main program*/
if (document.getElementsByClassName('life')[0]) {
  //while (window.stopFunction == false){
    console.log("main");
    var initialGrid = makeGrid(window.config.x, window.config.y);
    document.getElementsByClassName('life')[0].innerHTML = initialGrid;
    document.getElementsByClassName('next')[0].innerHTML = initialGrid;
    seed();
    console.log("main after seeds");
    setInterval(function(){buildNextGeneration()}, window.config.speed);
  //}
}

  