//declaring Global variables

var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var ground; 
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime = 0;

function preload(){
  
  //loading Animation and Images
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   
}

function setup() {
  
  //creating the canvas or preview screen
   createCanvas(400, 400);
  
  //creating monkey
monkey = createSprite(80, 315, 20, 20); 
  //adding moving animation to the monkey sprite
monkey.addAnimation("moving", monkey_running);  
  //scaling it
monkey.scale = 0.1;   
  
  //creating a ground
ground = createSprite(400, 350, 900, 10); 
  //setting velocity to the ground
ground.velocityX = -4;
  //making it as scrolling ground
ground.x = ground.width / 2;  
  //logging its value in console
console.log(ground.x);  
  
//creaing bananaGroup and obstacleGroup
  bananaGroup = new Group();
  obstacleGroup = new Group();

//let score  be 0
  score = 0;
  
}


function draw() {
  
  //background color as black
  background("black");
    
  //gameState condition
  if (gameState == 1){
    
    //allowing the monkey to jump if space key is pressed
    if (keyDown("space") && monkey.y >= 314) { 
    
      monkey.velocityY = -18;
            
      }
  
    //making the ground scrolling
  if (ground.x < 0){
    ground.x = ground.width / 2;  
      
  }
  
  //giving gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;

  //preventing the monkey to fall from the ground  
  monkey.collide(ground);
  
    //calling the food and Obstacle functions
    food();
    Obstacle();
    
    //destroying banana if he monkey is touching it
  if (monkey.isTouching(bananaGroup)){
        bananaGroup.destroyEach();     
    
        }
    
    //Ending the game
    if (obstacleGroup.isTouching(monkey)){
          gameState = 0;
    } 
    
    //In END state
  } else if (gameState == 0){  
    
    //stopping the ground from moving and the monkey from jumping
    ground.velocityX = 0;
    monkey.velocityY = 0;
  
    //setting the velocity as 0 for the obstacles and bananas
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
       
    //background color as white
     background("white");   
    
         
        }
    
  //drawing the sprites
  drawSprites();
  
  //showing text
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+ score, 400, 50);
  
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount / getFrameRate());
  text("Survival Time : " + survivalTime, 100, 50);
  
  stroke("black");
  textSize(24);
  fill("black");
  text("You Lost", 185, 200);
  
}

//food function
function food(){
  
  if (frameCount % 80 == 0){
    
    //creating banana after every 80 frames
    banana = createSprite(200, 360, 10, 10);
    
    //adding banana Image
    banana.addImage(bananaImage);
    //scaling the bananas
    banana.scale = 0.1;
    
    //random position of bananas
    banana.x = Math.round(random(200, 300));
    banana.y = Math.round(random(120, 200));
  
    //banana velocity and lifetime
    banana.velocityX = -5;
    banana.setLifetime = 100;
    
    //adding banana in the bananaGroup
    bananaGroup.add(banana);
  
  }
  
}

//Obstacle function
function Obstacle(){
 if(frameCount % 300 === 0) {
    
    //creating obstacles after every 80 frames
    obstacle = createSprite(400, 325, 10, 80);
   //adding obstacle Image
    obstacle.addImage(obstacleImage);
   //scaling the obstacles
    obstacle.scale = 0.12;
   
    //obstacle velocity and lifetime
    obstacle.velocityX = -5;
    obstacle.setLifetime = 100;
   
   //adding obstacle in the obstacleGroup
    obstacleGroup.add(obstacle);
   
   
   
  }
  
}