  var tiger, tigerImg, road, roadImg, hunter, hunterImg, deer,               deerImg, obstacleGroup, foodGroup, gameOver, gameOverImg;
  var score=0;
  var food=0;
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  function preload()
{
  tigerImg = loadImage("tiger.png");
  
  roadImg = loadImage("ro.jpg");
  
  hunterImg = loadImage("hunter.jpg");
  
  deerImg = loadImage("babyDeer.jpg");
  
  gameOverImg = loadImage("gameOver.jpg")
}

  function setup() 
{
  createCanvas(windowWidth, windowHeight);
  
  tiger=createSprite(width/2,height-50);
  tiger.addImage(tigerImg);
  tiger.scale=0.475;
  tiger.visible= true;
  
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  road=createSprite(width/2,height/2);
  road.addImage(roadImg);
  road.scale=2.75;
  road.velocityY = 4.5;
  road.visible= true;
  tiger.depth = road.depth;
  tiger.depth = tiger.depth+1;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}

  function draw() 
{
  background("green");

  // reset the road
  if(road.y > height)
{
  road.y = road.height/2;
}
  road.velocityY = (4 + 3* score/200);

  if(gameState === PLAY)
{
  
  textSize(20);
  fill("black");
  score = score + Math.round(getFrameRate()/60);
  text("Score:" + score,10,50);
  
  textSize(20);
  fill("black");
  text("Food:" + food,width-75,50);
  
  spawnDeers();
  spawnHunters();
  
  if(keyDown("right"))
{
  tiger.velocityX = 4;
}
  
  if(keyDown("left"))
{
  tiger.velocityX = -4;
}
  
  if(tiger.isTouching(obstacleGroup) || tiger.x > width || tiger.x < 0)
{
  gameState= END;
}
  
}
  
  else if (gameState===END){
    road.visible = false; 
    gameOver.visible = true;
    foodGroup.setVelocityYEach(0);
    obstacleGroup.setVelocityYEach(0);
    tiger.visible= false; 
    tiger.velocityX=0;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    if(mousePressedOver(gameOver)){
      reset();
    }
  }
  
  drawSprites();
}

function reset(){
  gameState=PLAY; 
  score=0;
  food=0;
  road.visible=true; 
  gameOver.visible = false;
  tiger.visible= true;
  tiger.x=width/2;
}

  function spawnDeers()
{
  if(frameCount%150===0)
{
  deer = createSprite(width/2,-30);
  deer.addImage(deerImg);
  deer.velocityY = road.velocityY;
  deer.scale = 0.2;
  deer.x = Math.round(random(width/4,width/2))
  deer.lifetime = 150;
  
  foodGroup.add(deer);
}
  
  if(tiger.isTouching(foodGroup))
{  
  foodGroup.destroyEach();
  food = food+1;
}
}

  function spawnHunters()
{
  if(frameCount%175===0)
{
  hunter = createSprite(width/2,-30);
  hunter.addImage(hunterImg);
  hunter.velocityY = road.velocityY;
  hunter.scale = 0.05;
  hunter.x = Math.round(random(width/2,width/2+150))
  hunter.lifetime = 150;
  
  
  obstacleGroup.add(hunter);
}
}