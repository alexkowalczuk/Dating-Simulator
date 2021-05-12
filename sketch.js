/***********************************************************************************
 Project 03 (FINAL): Dating Simulator
  by Alex Kowalczuk
  Uses the p5.2DAdventure.js class 
  
------------------------------------------------------------------------------------
  To use:
  Add this line to the index.html
  <script src="p5.2DAdventure.js"></script>
***********************************************************************************/

// adventure manager global  
var adventureManager;


// p5.play
var playerSprite;
var playerAnimation;


// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects


// indexes into the clickable array (constants) 
const cl_Start = 0;
const cl_Continue = 1;
const cl_EnterChat = 2;
const cl_Monica = 3;
const cl_Peter = 4;
const cl_MAns1 = 5;
const cl_MAns2 = 6;
const cl_MAns3 = 7;
const cl_ContinueM1 = 8;
const cl_ContinueM2 = 9;
const cl_ContinueM3 = 10;
const cl_MAns4 = 11;
const cl_MAns5 = 12;
const cl_MAns6 = 13;
const cl_ContinueM4 = 14;
const cl_ContinueM5 = 15;
const cl_PAns1 = 16;
const cl_PAns2 = 17;
const cl_PAns3 = 18;
const cl_ContinueP1 = 19;
const cl_ContinueP2 = 20;
const cl_ContinueP3 = 21;
const cl_PAns4 = 22;
const cl_PAns5 = 23;
const cl_ContinueP4 = 24;
const cl_ContinueP5 = 25;


// Star symbol for our score
var starSymbol;   // star symbol
var maxStars = 5; // our max rating
var starCard;


let headlineFont;
let bodyFont;


// Allocate Adventure Manager with states table and interaction tables
function preload() {

  headlineFont = loadFont('fonts/Poppins-Bold.ttf');
  bodyFont = loadFont('fonts/Poppins-Regular.ttf');

  // loading images
  starSymbol = loadImage("assets/star.png");
  
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  starCard = new scoreCard();

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

  // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // load all text screens
  //loadAllText();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  fs = fullscreen();
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

  // Only draw scorecard on certain screens
  if( adventureManager.getStateName() === "Start" ||
      adventureManager.getStateName() === "Intro" ||
      adventureManager.getStateName() === "Profile" ||
      adventureManager.getStateName() === "Matches" ||
      adventureManager.getStateName() === "Chat-Main" ||
      adventureManager.getStateName() === "MonicaChat1" ||
      adventureManager.getStateName() === "PeterChat1" ||
      adventureManager.getStateName() === "MonicaChat2" ||
      adventureManager.getStateName() === "PeterChat2" ||
      adventureManager.getStateName() === "End1" ||
      adventureManager.getStateName() === "End2" ||
      adventureManager.getStateName() === "End3" ||
      adventureManager.getStateName() === "End4" ||
      adventureManager.getStateName() === "End5") {
    ;
  }
  else {
    starCard.draw();
  }

  
  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();
}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }

  // dispatch all keys to adventure manager
  adventureManager.keyPressed(key); 
}

function mouseReleased() {
  // dispatch all mouse events to adventure manager
  adventureManager.mouseReleased();
}


//-------------- CLICKABLE CODE  ---------------//

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;    
  }

  // we do specific callbacks for each clickable
  clickables[0].onPress = clickableButtonPressed;
  clickables[cl_Start].onPress = cl_Start_Pressed;
  clickables[cl_Continue].onPress = cl_Continue_Pressed;
  clickables[cl_EnterChat].onPress = cl_EnterChat_Pressed;
  clickables[cl_Monica].onPress = cl_Monica_Pressed;
  clickables[cl_Peter].onPress = cl_Peter_Pressed;
  clickables[cl_MAns1].onPress = cl_MAns1_Pressed;
  clickables[cl_MAns2].onPress = cl_MAns2_Pressed;
  clickables[cl_MAns3].onPress = cl_MAns3_Pressed;
  clickables[cl_ContinueM1].onPress = cl_ContinueM1_Pressed;
  clickables[cl_ContinueM2].onPress = cl_ContinueM2_Pressed;
  clickables[cl_ContinueM3].onPress = cl_ContinueM3_Pressed;
  clickables[cl_MAns4].onPress = cl_MAns4_Pressed;
  clickables[cl_MAns5].onPress = cl_MAns5_Pressed;
  clickables[cl_MAns6].onPress = cl_MAns6_Pressed;
  clickables[cl_ContinueM4].onPress = cl_ContinueM4_Pressed;
  clickables[cl_ContinueM5].onPress = cl_ContinueM5_Pressed;
  clickables[cl_PAns1].onPress = cl_PAns1_Pressed;
  clickables[cl_PAns2].onPress = cl_PAns2_Pressed;
  clickables[cl_PAns3].onPress = cl_PAns3_Pressed;
  clickables[cl_ContinueP1].onPress = cl_ContinueP1_Pressed;
  clickables[cl_ContinueP2].onPress = cl_ContinueP2_Pressed;
  clickables[cl_ContinueP3].onPress = cl_ContinueP3_Pressed;
  clickables[cl_PAns4].onPress = cl_PAns4_Pressed;
  clickables[cl_PAns5].onPress = cl_PAns5_Pressed;
  clickables[cl_ContinueP4].onPress = cl_ContinueP4_Pressed;
  clickables[cl_ContinueP5].onPress = cl_ContinueP5_Pressed;
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#F2F2F2";
  this.noTint = true;
  this.tint = "#FF0000";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#AAEBFF";
}

// Callback for every clickable used
clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name);
} 

// Buttons, adding, seeing and sub stars, etc...

cl_Start_Pressed = function() {
   // add scores, etc.
   adventureManager.clickablePressed(this.name);
}
cl_Continue_Pressed = function() {

   adventureManager.clickablePressed(this.name);
}
cl_EnterChat_Pressed = function() {

   adventureManager.clickablePressed(this.name);
}
cl_Monica_Pressed = function() {

   adventureManager.clickablePressed(this.name);
}
cl_Peter_Pressed = function() {

   adventureManager.clickablePressed(this.name);
}
cl_MAns1_Pressed = function() {

   adventureManager.clickablePressed(this.name);
}
cl_MAns2_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.addStar(2);
}
cl_MAns3_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.addStar(3);
}
cl_ContinueM1_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();
}
cl_ContinueM2_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();
}
cl_ContinueM3_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();
}
cl_MAns4_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.subStar(2);
}
cl_MAns5_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.subStar(1);
}
cl_MAns6_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.addStar(2);
}
cl_ContinueM4_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();

}
cl_ContinueM5_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();
}
cl_PAns1_Pressed = function() {

   adventureManager.clickablePressed(this.name);
}
cl_PAns2_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.addStar(2);
}
cl_PAns3_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.addStar(3);
}
cl_ContinueP1_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();
}
cl_ContinueP2_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();
}
cl_ContinueP3_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();
}
cl_PAns4_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.subStar(2);
}
cl_PAns5_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.addStar(3);
}
cl_ContinueP4_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();
}
cl_ContinueP5_Pressed = function() {

   adventureManager.clickablePressed(this.name);
   starCard.getStar();
}

//-------------- STAR CARD --------//

class scoreCard {
  // loading scorecard png
  constructor () {
    this.image = loadImage("assets/StarCard.png")
    this.x = 650;
    this.y = 550;
    this.star = 0;
  }

  draw(){
    if( this.image ) {
      push();
      
      // draw star space
      imageMode(CENTER);
      image( this.image, this.x, this.y );

      // draw star symbol
      for( let i = 0; i < this.star; i++ ){
        image(starSymbol, this.x - 80 + (i*80), this.y)
      }

      pop();
    }
  }

  getStar() {
    return this.star;
  }

  // add star, check for max overflow
  addStar(amt) {
    this.star += amt;
    if( this.star > maxStars ) {
      this.star = maxStars;
    }

  }

  // sub star, check for below zero
  subStar(amt) {
    this.star -= amt;
    if( this.star < 0 ) {
      this.star = 0;
    }
  }
}


//-------------- SUBCLASSES / Scenario Screens, Results Screens ---------------//

// Defining class for Scenario Sreens
class ScenarioRoom extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom

    this.titleText = "";
    this.bodyText = "";
  }

  // should be called for each room, after adventureManager allocates
  setText( titleText, bodyText ) {
    this.titleText = titleText;
    this.bodyText = bodyText;
    this.drawY = 260;
    this.drawX = 430;
  }


  // Setting up draw layout for Scenario Screens
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title text
      fill(255);
      textAlign(LEFT);
      textFont(headlineFont);
      textSize(36);

      text(this.titleText, this.drawX , this.drawY - 120);
     
      // Draw text in a box
      //text(this.titleText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
    
      textFont(bodyFont);
      textSize(24);

      text(this.bodyText, this.drawX, this.drawY - 80, width - 480,height - (this.drawY+100) );
      
      pop();
    }
}

// Defining class for Results Sreens
class ResultsRoom extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom

    this.titleText = "";
    this.bodyText = "";
  }

  // should be called for each room, after adventureManager allocates
  setText( titleText, bodyText ) {
    this.titleText = titleText;
    this.bodyText = bodyText;
    this.drawY = 280;
    this.drawX = 270;
  }

 
  // Setting up draw layout for Results Screens
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title text
      fill(0);
      textAlign(CENTER);
      textFont(headlineFont);
      textSize(36);

      text(this.titleText, width/2 , this.drawY);
     
      // Draw text in a box
      //text(this.titleText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
    
      textFont(bodyFont);
      textSize(20);

      text(this.bodyText, this.drawX, this.drawY + 40, 770, 500);
      
      pop();
    }
}