//Create variables here
var dog;
var dogIMG;
var happyDog;
var happyDogIMG;
var database;
var foodS;
var foodStock;
var feed,add;
var fedTime,lastFed;
var foodObj;
var position;
function preload()
{

  //load images here
  dogIMG=loadImage("images/dogImg.png")
  happyDogIMG=loadImage("images/dogImg1.png")
}

function setup() {
  database= firebase.database();
  createCanvas(500, 500);
  dog=createSprite(250,300,150,150);
  dog.addImage(dogIMG);
  dog.scale = 0.4;
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  add=createButton("Add more food");
  add.position(800,95);
  add.mousePressed(addFoods);

  foodObj=new Food();
}


function draw() {  
  background(46,136,87);

  
  //if(keyWentDown(UP_ARROW)){
   // writeStock(foodS);
    //dog.addImage(happyDogIMG);
  //}

  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  drawSprites();
  
  fill(255,255,254);
  text ("Food remaining : "+ foodS,200,150);

  stroke("red");
  textSize(17);
  text("Note:Press up arrow key To Feed Drago!",130,20);
  //add styles here

}

function readStock (data){
  foodS = data.val ();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }


  database.ref("/").update({
    Food:x
  })
}

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);
  
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function addFoods(){
position++
database.ref('/').update({
  Food:position
}

)
}
function feedDog(){

dog.addImage(happyDogIMG)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}






