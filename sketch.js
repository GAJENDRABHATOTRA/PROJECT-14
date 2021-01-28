var PLAY = 1;
var END = 0;
var gameState = 1;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var end,endImg;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  


  //creating boy running
  boy = createSprite(70,530,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  
  end = createSprite(200,300)
  end.addAnimation("gameOverImage",endImg)
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

  
}

function draw() {

  background(0);
  
  if(gameState === PLAY){
    
    boy.x = World.mouseX;
    
    //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
    }
    path.velocityY = 4;
    

    boy.visible = true;
    end.visible = false; 
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection +50 ;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection +150 ;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection +100 ;
    }
      
    
    if(swordGroup.isTouching(boy)) {
        gameState = END;
      }
    
  }else if(gameState === END){
    path.velocityY = 0;
    jwelleryG.destroyEach();
    jwelleryG.setVelocityEach (0);
    swordGroup.destroyEach();
    swordGroup.setVelocityEach (0);
    cashG.destroyEach();
    cashG.setVelocityEach (0);
    diamondsG.destroyEach();
    diamondsG.setVelocityEach (0);
  
    boy.visible = false;
    end.visible = true;
    
    if(keyDown("space")){
        gameState = PLAY;
    }
    
  }
  
  
  edges= createEdgeSprites();
  boy.collide(edges);

  drawSprites();
  
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,50);

  
}

function createCash() {
  if (World.frameCount % 50 === 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 150 === 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 100 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 5;
  sword.lifetime = 200; 
  swordGroup.add(sword);
  }
}


