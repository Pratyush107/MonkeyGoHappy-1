var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup
var ground
var score = 0


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
createCanvas(600,200)

monkey = createSprite(50,180,20,50);
monkey.addAnimation("running", monkey_running);
monkey.scale=0.085
  

ground = createSprite(200,195,1200,20)
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*score/100);
ground.shapeColor = "brown"  



foodGroup = new Group();
obstaclesGroup = new Group();
}


function draw() {
background("green")
  
stroke("black")
fill("black")
textSize(19)
text("Survival Time: "+ score, 430,30);

  
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    monkey.collide(ground)
  
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
  
    if(keyDown("space") && monkey.y >= 158.905) {
      monkey.velocityY = -12;
    }
    
    //console.log(monkey.y)
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  
monkey.collide(ground)
  
if (ground.x < 0){
ground.x = ground.width/2;
}
obstaclesGroup.setLifetimeEach(-1);
foodGroup.setLifetimeEach(-1);
  
if (monkey.isTouching(obstaclesGroup)){
  monkey.collide(obstaclesGroup)
  ground.velocity = 0
  
}  
  
spawnFood();  
spawnObstacles();  
  
drawSprites();
}

function spawnFood(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,168,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    //adding animation to the obstacles
    obstacle.addImage(obstacleImage)
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
}
}  


