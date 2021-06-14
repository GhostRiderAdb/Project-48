
var score = 0;
var gameState = "START";

function preload(){
  bgImage = loadImage("Background 2.jpg");
  bombImage = loadImage("Bomb 1.png");
  bombBlastImage = loadImage("BombBlast.png");
  EggImage = loadImage("Golden Egg 2.png");
  HammerImage = loadImage("Hammer New.png");
  monsterHeadImage = loadImage("Monster Head.png");
  HammerRightImage = loadImage("Hammer Right.png");
  HammerLeftImage = loadImage("Hammer Left.png")
  gameOverSound = loadSound("game over sound.mp3");
  monsterWackSound = loadSound("Hit sound.mp3");
  backgroundSound = loadSound("Background sound.mp3");
  bombBlastSound = loadSound("bomb explode.mp3");
  eggHitSound = loadSound("Egg hit.mp3");
  winSound = loadSound("win.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bombGroup = createGroup();
  eggGroup = createGroup();
  monsterGroup = createGroup();
  // monster = createSprite(500,470,10,10);
  // monster.addImage(monsterHeadImage);
  // monster.scale = 0.2;

  hammer = createSprite(400,400,10,10);
  hammer.addImage(HammerImage);
  hammer.scale = 0.08;
  hammer.visible = false;
  backgroundSound.play();
  
  
 
}

function draw() {

 
  if(gameState === "START"){
    background("#B4FEE7");
    textSize(60);
    fill("#059DC0");
    strokeWeight(2);
    stroke("#2F5061");
    text("HAMMER HEADS", 500,150);
    fill("#A16AE8");
    strokeWeight(2);
    stroke("#FD49A0");
    text("PRESS SPACE TO START",400,350);
    textSize(30);
    text("Monster Hit: +5 Points ", 530,500);
    text("Bomb Hit: -10 Points ", 530,550);
    text("Golden Egg Hit: +15 Points ", 530,600);
    text("You Lose at -50 Points ", 530,650);
    text("You Win at 500 Points ", 530,700);
    if(keyDown("SPACE")){
      gameState = "PLAY";
    }
  }
  if(gameState === "PLAY"){
  
    background(bgImage);
    hammer.visible = true;
  fill("black");
  ellipse(500,500,100,40);
  ellipse(1200,400,100,40);
  ellipse(730,360,100,40);
  ellipse(990,340,100,40);
  ellipse(867,553,100,40);
  ellipse(1028,456,100,40);
  ellipse(1194,628,100,40);
  ellipse(1250,300,100,40);
  ellipse(630,660,100,40);
  ellipse(730,500,100,40);

  hammer.x = mouseX;
  hammer.y = mouseY;
  // if(mousePressedOver(monster)){
  //   hammer.addImage(HammerLeftImage);

  // }else{
  //   hammer.addImage(HammerImage);
  // }

  hammer.onMousePressed = function(){ 
    if(hammer.x<=width/2){ 
      hammer.addImage(HammerLeftImage); 
    }
     else {
        hammer.addImage(HammerRightImage); 
      }
     if(monsterGroup.isTouching(hammer)){
       monsterGroup.destroyEach();
        score = score + 5; 
        monsterWackSound.play();
        } else if(eggGroup.isTouching(hammer)){
          eggGroup.destroyEach();
          score = score + 15;
          eggHitSound.play();
        } else if(bombGroup.isTouching(hammer)){
          bombGroup.destroyEach();
          score = score - 10;
          bombBlastSound.play();
          
        }
       }
       
        hammer.onMouseReleased = function(){
           console.log("release")
            hammer.addImage(HammerImage); 
          }

          if(score <= -50){
            gameState = "END";
            backgroundSound.stop();
            gameOverSound.play();
          }
          if(score >= 500){
            gameState = "WIN";
            backgroundSound.stop();
            winSound.play();
          }

  spawnMonsters();
  spawnEggs();
  spawnBombs();
  textSize(25);
  fill("black");
  strokeWeight(0);
  text("Score:"+score,450,40);
        }
  if(gameState==="END"){
    background(bgImage);
    monsterGroup.destroyEach();
    eggGroup.destroyEach();
    bombGroup.destroyEach();
    hammer.destroy();
   
    fill(255,0,0);
    textSize(60);
    strokeWeight(2);
    stroke(0,0,255);
    text("GAME OVER, YOU LOSE",600,430)

    textSize(25);
  fill("black");
  strokeWeight(0);
  text("Score:"+score,450,40);
    
  }
  if(gameState === "WIN"){
    background(bgImage);
    monsterGroup.destroyEach();
    eggGroup.destroyEach();
    bombGroup.destroyEach();
    hammer.destroy();
   
    fill(255,0,0);
    textSize(60);
    strokeWeight(2);
    stroke(0,0,255);
    text("GAME OVER, YOU WIN",600,430)

    textSize(25);
  fill("black");
  strokeWeight(0);
  text("Score:"+score,450,40);
  }

  
  drawSprites();
  

 
  
  //  text(mouseX+","+mouseY,mouseX,mouseY);
}



function spawnMonsters(){
  if(frameCount%40===0){
    monster = createSprite(500,470,10,10);
    monster.addImage(monsterHeadImage);
    monster.scale = 0.2;
    monster.lifetime = 30;
    var rand = Math.round(random(1,10));
    switch(rand){
      case 1:
        monster.x = 500;
        monster.y = 470;
        break;
      case 2:
        monster.x = 1200;
        monster.y = 370;
        break;
      case 3:
        monster.x = 730
        monster.y = 330
        break;
      case 4:
        monster.x = 990
        monster.y = 310
        break;
      case 5:
        monster.x = 867
        monster.y = 523
        break;
      case 6:
        monster.x = 1028
        monster.y = 426
        break;
      case 7:
        monster.x = 1194
        monster.y = 598
        break;
      case 8:
        monster.x = 1250
        monster.y = 270
        break;
      case 9:
        monster.x = 630
        monster.y = 630
        break; 
      case 10:
          monster.x = 730
          monster.y = 470
    }
    hammer.depth = monster.depth+5;
    monster.setCollider("rectangle",0,0,50,50);
    monsterGroup.add(monster);
    // monster.debug = true;

  }
}

  function spawnEggs(){
    if(frameCount%380===0){
      egg = createSprite(500,470,10,10);
      egg.addImage(EggImage);
      egg.scale = 0.14;
      egg.lifetime = 30
      var rand = Math.round(random(1,10));
      switch(rand){
        case 1:
          egg.x = 500;
          egg.y = 470;
          break;
        case 2:
          egg.x = 1200;
          egg.y = 370;
          break;
        case 3:
          egg.x = 730
          egg.y = 330
          break;
        case 4:
          egg.x = 990
          egg.y = 310
          break;
        case 5:
          egg.x = 867
          egg.y = 523
          break;
        case 6:
          egg.x = 1028
          egg.y = 426
          break;
        case 7:
          egg.x = 1194
          egg.y = 598
          break;
        case 8:
          egg.x = 1250
          egg.y = 270
          break;
        case 9:
          egg.x = 630
          egg.y = 630
          break; 
        case 10:
          egg.x = 730
          egg.y = 470
      }
      eggGroup.add(egg);
      
      
    }
  }

  function spawnBombs(){
    
    if(frameCount%300===0){
      bomb = createSprite(500,470,10,10);
      bomb.addImage(bombImage);
      bomb.scale = 0.048;
      bomb.lifetime = 30
      var rand = Math.round(random(1,10));
      switch(rand){
        case 1:
          bomb.x = 500;
          bomb.y = 470;
          break;
        case 2:
          bomb.x = 1200;
          bomb.y = 370;
          break;
        case 3:
          bomb.x = 730
          bomb.y = 330
          break;
        case 4:
          bomb.x = 990
          bomb.y = 310
          break;
        case 5:
          bomb.x = 867
          bomb.y = 523
          break;
        case 6:
          bomb.x = 1028
          bomb.y = 426
          break;
        case 7:
          bomb.x = 1194
          bomb.y = 598
          break;
        case 8:
          bomb.x = 1250
          bomb.y = 270
          break;
        case 9:
          bomb.x = 630
          bomb.y = 630
          break; 
        case 10:
          bomb.x = 730
          bomb.y = 470
      }
      bombGroup.add(bomb);
    }
  }

  
  

