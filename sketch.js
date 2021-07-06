var army,armyGroup;
var wizard,oldWizard, jewel,jewelGroup;
var bombardom;
var gameState=0;
var spark;
var score=0;
var sparkGroup;
var bombardomMaxima;
var spark1;
function preload(){
  dayBackImg=loadImage("dayback.jfif")
  oldWizardImg=loadImage("oldwizard.png")
  jewelImg1=loadImage("coi.png");
  jewelImg2=loadImage("rs.png");
  jewelImg3=loadImage("ew.png");
  soldierImg=loadAnimation("s1.png","s2.png","s3.png","s4.png","s5.png","s6.png");
  sparkImg=loadImage("spark.png");
  wizardImg=loadImage("wizard.png");
}
function setup() {
  createCanvas(800,400);
  wizard=createSprite(400, 50, 50, 50);
  oldWizard=createSprite(750,80,50,50);
  oldWizard.addImage(oldWizardImg)
  oldWizard.scale=0.6;
  oldWizard.visible=false;
  wizard.addImage(wizardImg)
  wizard.scale=0.8;
  bombardom=createButton('Bombardom');
  armyGroup=new Group();
  sparkGroup=new Group();
  jewelGroup=new Group();
}

function draw() {
  background(dayBackImg);  
  if (gameState===0){
    bombardom.position(50,100);
  bombardom.mousePressed(function(){
  
  spark=createSprite(400,50)
    spark.addImage(sparkImg)
    spark.scale=0.6;
    spark.velocityY=3;
    spark.lifetime=80
    sparkGroup.add(spark);
    
  })
  

  for (var i = 0; i < armyGroup.length; i++) { 
    if (armyGroup.get(i).isTouching(sparkGroup)) { 
      armyGroup.get(i).destroy(); 
      score = score + 1; 
      
    } 
  }
  
  
  if(score===10){
    bombardomMaxima=createButton('Bombardom Maxima');
    bombardomMaxima.position(50,150);
   
   bombardomMaxima.mousePressed(function(){
    spark1=createSprite(400,50)
    spark1.addImage(sparkImg)
    spark1.scale=1;
    spark1.velocityY=3;
    spark1.lifetime=80
    sparkGroup.add(spark1);
   
  })
  
}
spawnArmy();
  spawnJewel();
if (sparkGroup.isTouching(jewelGroup)){
  gameState=1;
  
  sparkGroup.destroyEach();
}
  }

  
  if (gameState===1){
    bombardom.hide();
    bombardomMaxima.hide();
    textSize(30);
    fill("red");
    text("GAME OVER" , 310,180)
    armyGroup.destroyEach();
    jewelGroup.destroyEach();
    wizard.destroy();
  }

  
  
  
  drawSprites();
  fill("white");
  textSize(24);
  text("SCORE: " + score, 670, 30);
}
function spawnArmy()
{
  
  if(frameCount % 30===0){
    army=createSprite(10,350,30,30)
    army.addAnimation("Img",soldierImg);
    army.velocityX=1.5;;
    armyGroup.add(army);
    army.lifetime=600;
  }
}
function spawnJewel()
{
  
  if(frameCount % 500===0){
    jewel=createSprite(10,285,30,30)
    
    jewel.scale=0.25;
    jewel.velocityX=1.5;
    jewelGroup.add(jewel);
    jewel.lifetime=600;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: jewel.addImage(jewelImg1);
              break;
      case 2: jewel.addImage(jewelImg2);
              break;
      case 3: jewel.addImage(jewelImg3);
              break;
      default: break;
    }
  }
}
