function init()
{
console.log("init");
canvas=document.getElementById('mycanvas');
pen=canvas.getContext('2d');
W=canvas.width;
H=canvas.height;
food=getrandomFood();
score=5;
game_over =false;
snake={
    init_length:5,
    color:"lightgreen",
    cells:[],
    direction:"right",
    createSnake:function()
    {
        for(var i=this.init_length-1;i>=0;i--)
        {
            this.cells.push({x:i,y:0});
        }
    },
    drawSnake:function()
    {
        for(var i=0;i<this.cells.length;i++)
        {
            pen.fillStyle=this.color;
            pen.strokeStyle="black";
            pen.lineWidth=3;
            pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
            pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
        }
    },
    updateSnake:function()
    {
      
    var headx=this.cells[0].x;
    var heady = this.cells[0].y;
 //   nextHeadX =headx+1;
 
  //  this.cells.unshift({x:nextHeadX,y:heady});  
  if(headx==food.x && heady==food.y)
  {
      food=getrandomFood();
        score+=1;
  }
  else
  {
    this.cells.pop();
  }
  if(this.direction=="right")
  {
      nextX=headx+1;
      nextY=heady;
  }
  else if(this.direction=="left")
  {
      nextX=headx-1;
      nextY=heady;
  }
  else if(this.direction=="down")
  {
      nextX=headx;
      nextY=heady+1;
  }
  else
  {
      nextX=headx;
      nextY=heady-1;
  }
  this.cells.unshift({x:nextX,y:nextY});
  var last_x=Math.round(W/10);
  var last_y=Math.round(H/10);
  
if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y)
{
    alert("Game Over");
    game_over=true;

}},

};
snake.createSnake();
// add event listerner

function keyPressed(e)
{
    console.log("you pressed key");
    console.log(e);
    if(e.key=="ArrowRight")
    {
        snake.direction="right";
    }
    else if(e.key=="ArrowLeft")
    {
        snake.direction="left";
    }
    else if(e.key=="ArrowDown")
    {
        snake.direction="down";
    }
    else
    {
        snake.direction="up";
    }
}
document.addEventListener('keydown',keyPressed)
}
function draw()
{
    pen.clearRect(0,0,W,H);
    console.log("draw");
    snake.drawSnake();
   
    pen.fillStyle=food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);
    pen.fillStyle= "white";
    pen.font="14px Roboto"
    pen.fillText("Score : "+score,10,10); 
}
function update()
{
    snake.updateSnake();
}

function gameloop()
{
    draw();
    update();
    console.log("in gameloop");
    if(game_over==true)
    {
        clearInterval(f);
    }

}
function getrandomFood()
{
    var foodx=Math.round(Math.random()*(W-10)/10);
    var foody=Math.round(Math.random()*(H-10)/10);

    foodColors =["red","green","aqua","orchid"];
    var i=Math.round(Math.random()*foodColors.length);
    var food={
        x:foodx,
        y:foody,
      color:foodColors[i]
    };
    return food;
}
init();
var f=setInterval(gameloop,100);
