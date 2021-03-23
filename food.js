class Food{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.image = loadImage("Milk.png");
      
    }
    display(){
        var totalFood;
        var totFood = database.ref('Food/foodCount');
        totFood.on("value",function(data){
          totalFood = data.val();
        })
        var foodStock = totalFood;        
var x;
var y = 400;
        imageMode(CENTER);

        if(foodStock!=0){
            for( var i = 0; i < foodStock; i++){                
                    x = (30*i);                
                image(this.image,200+x,y,50,50);
            
            }
        }
        
    }
    
  
     
}