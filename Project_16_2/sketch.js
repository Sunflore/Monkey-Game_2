var monkey,monkey_running;
var bananaImage,obstacleImage;
var foodGroup,obstacleGroup;
var score;
var survivalTime;

function preload()
{
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
}

function setup()
{
  createCanvas(600,400);
  
  //Monkey Spirte 
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.13;
  
  //Ground Sprite
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  //Create groups
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
  monkey.setCollider("circle",0,0,260);
  //monkey.debug=true;
  
  survivalTime=0;
  score=0;
}
function draw() 
{ 
  background(0);
  
  //ground infinite loop
  ground.velocityX=-4;
  if(ground.x<0)
  {
    ground.x=ground.width/2;
  }
  
  //Monkey jump,gravity, and collide
  if(keyDown("space")&& monkey.y >=100)
  {
    monkey.velocityY=-10;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  bananas();
  obstacle();
  
  monkey.collide(ground);
  
  drawSprites();
  
  //Score text
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  //Survival Time
  stroke("lightGray");
  textSize(20);
  fill("lightGray");
  survivalTime=Math.ceil(frameCount/frameRate()); 
  text("Survival Time: "+survivalTime,100,50);
}
function bananas()
{
  if(frameCount%80===0)
  {
    banana=createSprite(600,300,10,10);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=800;
    
    foodGroup.add(banana);
  }
}

function obstacle()
{
  if(frameCount%300===0)
  {
    obstacles=createSprite(600,330,10,10);
    obstacles.addImage(obstacleImage);
    obstacles.scale=0.1;
    obstacles.velocityX=-4;
    obstacles.lifetime=800;
    
    obstacleGroup.add(obstacles);
  }
}