var dog,sadDog,happyDog;
var changeImage;
var button1,button2;
var foodObj;
var foodS;
var fedTime,lastFed;
var foodStockVar;
var bottleImage;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();

  createCanvas(1000,600);

  changeImage = sadDog;

  dog=createSprite(800,400,150,150); 
  dog.addImage("tag",sadDog);
  dog.scale=0.15;
  
  foodObj = new Food(790,400);

  foodS=0;
}

function draw() {
  background(46,139,87);
  
  buttonDisplay();
  foodObj.display();

  fedTimeH = database.ref('Food/fedHour');
  fedTimeH.on("value",function(data){
    lastFed= data.val();
  })


  fedTimeM = database.ref('Food/fedMinute');
  fedTimeM.on("value",function(data){
    lastFedMin = data.val();
  })


  fill(255);
  textSize(20);

  if(lastFed>=12){
    if(lastFedMin<10){
      text(lastFed%12+":0"+lastFedMin+" PM",480,100);
    }

    else{
      text(lastFed%12+":"+lastFedMin+" PM",480,100);
    }
   
  }

  else if(lastFed==0){
    text("12 AM",480,100);
  }
  else if(lastFed<12){
      if(lastFedMin<10){
        text(lastFed%12+":0"+lastFedMin+" AM",480,100);
      }

      else{
        text(lastFed%12+":"+lastFedMin+" AM",480,100);
      }
  }

  var totalFood;
  var totFood = database.ref('Food/foodCount');
  totFood.on("value",function(data){
    totalFood = data.val();
  })
  foodS = totalFood;

  


  drawSprites();
  text("Last fed: ",400,100);
}

 function buttonDisplay(){
  button1 = createButton("Feed the dog");
  button1.position(100,100);
  button1.mousePressed(feedDog);
  button2 = createButton("Add food");
  button2.position(196,100);
  button2.mousePressed(addFood);
}

function feedDog(){
    dog.addImage("tag", happyDog);
    dog.scale=0.19; 
    
    var hourVar=hour();
    var minuteVAR = minute();
    database.ref('Food/').update({
      fedHour:hourVar,
      fedMinute:minuteVAR,
      foodCount:foodS - 1
    })
}


function addFood(){  
  foodS++;
  database.ref('Food/').update({
    foodCount:foodS
  })




}

