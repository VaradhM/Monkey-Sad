var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, collided
var FoodGroup, obstacleGroup
var ground, backgroundImage
var score, hitcount

function preload(){
  
  backgroundImage = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png",    "Monkey_02.png", "Monkey_03.png", "Monkey_05.png",  "Monkey_06.png", "Monkey_07.png", "Monkey_08.png",  "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  collidedImage = loadImage("Monkey_03.png");
  
}

function setup() {
  
  createCanvas(600,400);
 
  background1 = createSprite(0,0,400,400);
  background1.addImage(backgroundImage);
  background1.scale = 1.2
 
  monkey = createSprite(80,315,20,20);
  monkey.scale = 0.15;
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",collidedImage);
  
  ground = createSprite(400,350,900,10);
  ground.visible = false;
  
  gameState = 1;
  PLAY = 1;
  END = 0;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  hitcount = 0;
  
}

function draw() {
  background(220);
  
  if(gameState === PLAY){
   
    monkey.changeAnimation("moving",monkey_running);
    
    background1.velocityX = -7;
    
    if (background1.x < 0) {
      background1.x = background1.width / 2;
    }
    
    if(keyWentDown("space") && monkey.collide(ground)){
      monkey.velocityY = -21;
    }
    
    monkey.velocityY = monkey.velocityY + 1;
    
    obstacles();
    Foods();
  }
  
  monkey.collide(ground);
  
    if(gameState === END){
    background1.velocityX = 0;
    
   

    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    
    monkey.velocityY = 0;
    
    monkey.changeAnimation("collided",collidedImage);
    
}
  
   if(keyWentDown("enter") && gameState === END){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    gameState = PLAY;
    score = 0;
    monkey.scale = 0.15;
    hitcount = 0;
  }
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score + 2;
    hitcount = 0;
  }
  
  switch(score){
    case 10: monkey.scale = 0.17;
             break;
    case 20: monkey.scale = 0.19;
             break;
    case 30: monkey.scale = 0.21;
             break;
    case 40: monkey.scale = 0.23;
             break;
    default: break;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    monkey.scale = 0.13;
    score = score - 10;
    hitcount = hitcount + 1;
  }
  
  if(hitcount === 2){
    gameState = END;
  }
  
  drawSprites();
  
  fill("white");
  textSize(25);
  stroke("black");
  strokeWeight(1);
  text("score: "+score,260,30);
  
  if(gameState === END){
  fill("black");
  textSize(25);
  stroke("black");
  strokeWeight(1);
  text("Game Over", 250,190);
  text("Press 'Enter' to Restart", 180, 220);
  }
  
}

function obstacles(){
  if(frameCount % 320 === 0){
    var obstacle = createSprite(610,310,10,20);
    obstacle.x = Math.round(random(490,590));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX =-7
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
  }
}

function Foods(){
  if(frameCount % 170 === 0){
    var banana = createSprite(610,400,10,10);
    banana.y = Math.round(random(150,250));
    banana.addImage(bananaImage);
    banana.scale = 0.085;
    banana.velocityX =-5
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}







