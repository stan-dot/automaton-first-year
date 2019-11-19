// link to the original https://journal.highlandsolutions.com/cellular-automata-in-javascript-c0336af3e1f3


var config = {
    generation: 0,
    //seed?
    x: 10,
    y: 10,
    //speed?
}

//building functions

  function makeGrid(x, y) {
      var out = '';
      for (var iy = y - 1; iy >= 0; iy--) {
        var cells = '';
        for (var ix = x - 1; ix >= 0; ix--) {
          var className = 'x' + ix + 'y' + iy;
          cells += makeCell(className);
        }
        out += makeRow(cells);
      }
      return out;
    }

    function makeRow(cells) {
      return '<div class="cell-row">' + cells + '</div>';
    }
    
    function makeCell(className) {
      return '<div class="cell ' + className + '" data-toggle="0">.</div>';
    }

  function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0);
  }
//changing functions
  //population functions
  function populationDescrease(x, y, el = 'life') {
    var cell = document.getElementsByClassName(el)[0].getElementsByClassName('x' + x + 'y' + y)[0];

  }

  function populationIncrease(x, y, el = 'life') {
    var cell = document.getElementsByClassName(el)[0].getElementsByClassName('x' + x + 'y' + y)[0];
    
  }

  //resources functions
  function resourceIncrease(x, y, el = 'life') {
    var cell = document.getElementsByClassName(el)[0].getElementsByClassName('x' + x + 'y' + y)[0];
    
  }

  function resourceDecrease(x, y, el = 'life') {
    var cell = document.getElementsByClassName(el)[0].getElementsByClassName('x' + x + 'y' + y)[0];

  }

//status functions
  
  function populationStatus(x, y) {
    var cell = document.getElementsByClassName('life')[0].getElementsByClassName('x' + x + 'y' + y)[0];
    
    return //some integer meaning population size
  }

  function resourceStatus(x, y) {
    var cell = document.getElementsByClassName('life')[0].getElementsByClassName('x' + x + 'y' + y)[0];
    
    return //some integer meaning population size
  }

  function neighborsPopulation(x, y){

  }

  function neighborsResources(x, y){
  
  }

//conditional functions
  function calculateRatio(c){

  }

  function resourceChange(c){

  }


  function populationChange(c){

  }

  function abundanceEmigration(c){

  }

  function census(x, y){

  }

//main fuctions
  // each time we makeGrid
    function buildNextGeneration(){

    }
    // see = building generation 0
    function seed(){

    }
 /*main program*/
    if (document.getElementsByClassName('life')[0]) {
      initialGrid = makeGrid(config.x, config.y);
      document.getElementsByClassName('life')[0].innerHTML = initialGrid;
      document.getElementsByClassName('next')[0].innerHTML = initialGrid;
      seed();
      setInterval(buildNextGeneration, config.speed);
    }
