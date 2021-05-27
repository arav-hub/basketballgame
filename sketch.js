const Engine = Matter.Engine 
const World = Matter.World
const Body = Matter.Body
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint
var engine, world
var ballobj
var basketball,Basketballhoop,meter
var basketballimg,Basketballhoopimg,meterimg
var groundobj
var launcher
var topedge,leftedge,leftedge,bottomedge
var wall
var court
var line1obj
var line2obj
var score= 0
var flag = 0
function preload(){
  basketballimg = loadImage("images/Basketball.png")
 court = loadImage("images/Court.jpg")
  Basketballhoopimg = loadImage("images/Hoop.png")
  meterimg = loadImage("images/Meter.png")

}


function setup() {
engine = Engine.create()
world = engine.world
ballobj = Bodies.circle(800,600,20,{friction:1,restitution:.5,density:1})
World.add(world,ballobj)
groundobj = Bodies.rectangle(800,780,1600,40,{isStatic:true})
World.add(world,groundobj)
line1obj = Bodies.rectangle(190,300,5,70,{isStatic:true,angle:330,density:1000})
line2obj =   Bodies.rectangle(80,300,5,70,{isStatic:true,angle:30,density:1000})
World.add(world,line1obj)
topedge = Bodies.rectangle(800,10,1600,40,{isStatic:true,density:1000,friction:1.2})
World.add(world,topedge)
rightedge = Bodies.rectangle(1580,400,40,800,{isStatic:true,density:1000,friction:1.2})
World.add(world,rightedge)
leftedge = Bodies.rectangle(20,400,40,800,{isStatic:true,density:1000,friction:1.2})
World.add(world,leftedge)
wall = Bodies.rectangle(58,200,20,200,{isStatic:true,friction:0.0,density:1000})
World.add(world,wall)
Basketballhoop = createSprite(100,230,20,80)
Basketballhoop.addImage(Basketballhoopimg)
Basketballhoop.scale = 1

basketball = createSprite(775,760,50,50)
basketball.addImage(basketballimg)
basketball.scale = .1
var options = {
  pointA : {x:1200,y:500},
  bodyB:ballobj,
  stiffness:1.5,
  length:12

}
launcher = Constraint.create(options)
World.add(world,launcher)

//basketball hoop at 1300,200


  createCanvas(1600,800);
}

function draw() {
 // console.log(ballobj.position.y)
  Engine.update(engine)
  basketball.x = ballobj.position.x
  basketball.y = ballobj.position.y
  if(basketball.y>260&&flag ==0){

  if(basketball.x >=60&&basketball.x <=190){
    score = score+1
    flag = 1
  }

} 
  background(court);  
  rectMode(CENTER);
  fill("orange");
  rect(800,780,1600,40);
  rect(800,20,1600,40);
  rect(10,400,40,800);
  rect(1580,400,40,800);
  drawSprites();
  fill ("white")
  strokeWeight(4)
  console.log(ballobj.velocity.y)
  if(launcher.bodyB){
  line(launcher.pointA.x,launcher.pointA.y,ballobj.position.x,ballobj.position.y)
  //console.log(ballobj.position.y)
  }
  fill("black")
  text("Score: "+score,770,80)
//text(mouseX+","+mouseY,200,200)
}
function mouseDragged(){
Body.setPosition(ballobj,{x:mouseX,y:mouseY})
}
function mouseReleased(){
  launcher.bodyB = null
}