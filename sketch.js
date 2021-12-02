
var trex ,trex_running;
var edges;
var solo ,solo_running;
var solo2;
var claudia;
var cat1, cat2, cat3, cat4, cat5, cat6;
var estadodojogo = "JOGAR"
var nuvem;
var cacta;
var pnt = 0;
var go;
var golimg;
var recarregar;
var rcg;
var sp,sc,sptc;
var vl=0
var ana;

function preload(){ // funç~;ao que carregar todas as imagens e animações
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  solo_running = loadImage('ground2.png')
  claudia = loadImage("cloud.png")
  cat1 = loadImage("obstacle1.png")
  cat2 = loadImage("obstacle2.png")
  cat3 = loadImage("obstacle3.png")
  cat4 = loadImage("obstacle4.png")
  cat5 = loadImage("obstacle5.png")
  cat6 = loadImage("obstacle6.png")
  golimg = loadImage("gameOver.png")
  rcg = loadImage("restart.png")
  sp = loadSound("jump.mp3")
  sc = loadSound("die.mp3")
  sptc = loadSound ("checkPoint.mp3")
  ana = loadAnimation("trex_collided.png")

}

function setup(){ // todas as configuraçoes dos objetos
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("ana",ana);
  trex.scale = 0.5;
  //trex.debug = true
  trex.setCollider("circle",0,0,40)
  edges = createEdgeSprites();
 
  solo2 = createSprite(300,200,600,10);
  solo2.visible = false 
  solo = createSprite(300,190,600,20);
  solo.addImage(solo_running       )

  nuvem = new Group()
  cacta = new Group()

  go = createSprite(300,100,20,20)
  go.addImage(golimg)
  go.scale = 0.5
  go.visible = false

 recarregar = createSprite(300,140,20,20)
 recarregar.addImage(rcg)
 recarregar.scale = 0.5
 recarregar.visible = false

}

function draw(){
  background("white");

 if(estadodojogo==="JOGAR"){

  if(keyDown("space")&&trex.y>160 ){
    trex.velocityY = -12;
  sp.play()
 }
  trex.velocityY = trex.velocityY + 0.5; // gravidade

  solo.velocityX = -(4+vl)
  if(solo.x<0){
  solo.x = solo.width/2

  }
  cloud()
 cact()  
  if(trex.isTouching(cacta)){
    estadodojogo = "ENCERRAR"
  sc.play()
  }
  pnt+=1
  if(pnt%100===0){
    sptc.play(    )
    vl=vl+1
  }
 }else if(estadodojogo==="ENCERRAR"){
 solo.velocityX = 0;
 nuvem.setVelocityXEach(0);
 cacta.setVelocityXEach(0);
 trex.velocityY = 0;
 nuvem.setLifetimeEach(-1)
 cacta.setLifetimeEach(-1)
 go.visible = true;
 trex.changeAnimation("ana",ana)
 recarregar.visible = true;
 if(mousePressedOver(recarregar)){
   estadodojogo = "JOGAR"
   cacta.destroyEach()
   nuvem.destroyEach()
   pnt=0
   trex.changeAnimation("running",trex_running)
   go.visible = false;
   recarregar.visible = false;
 }


 }
  
  trex.collide(solo2)
  


  drawSprites();
 text("pontuacao: "+pnt, 500,30)



}

function cloud (){
   if(frameCount%60===0){
  var cloudi = createSprite(600,50,30,30)
  cloudi.velocityX = -3
  cloudi.lifetime = 215;
  cloudi.y = Math.round(random(30,100))
cloudi.addImage(claudia)
nuvem.add(cloudi);
 cloudi.depth=trex.depth
 trex.depth+=1
 }
}
function cact(){
  if(frameCount%60===0){
  var kat = createSprite(600,175,20,60)
  kat.velocityX = -(4+vl)
  kat.scale = 0.5
  kat.lifetime = 215;
  var c = Math.round(random(1,6))
  cacta.add(kat);
  switch(c) {
 case 1: kat.addImage(cat1)
break
case 2: kat.addImage(cat2)
break
case 3: kat.addImage(cat3)
break
case 4: kat.addImage(cat4)
break
case 5: kat.addImage(cat5)
break
case 6: kat.addImage(cat6)
break





 }
 }
}



