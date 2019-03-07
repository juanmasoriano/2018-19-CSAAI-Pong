function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  window.onkeydown = (e) => {
    e.preventDefault();

    console.log(e.key);

    if (e.key == 'a') {
      console.log("Tecla a");
    }
  }

 //-- Raquetas
 ctx.fillStyle = 'white';
 ctx.fillRect(50,100, 10, 40)

 ctx.fillStyle = 'white';
 ctx.fillRect(550,100, 10, 40)

 ctx.font = "80px Arial";
  ctx.fillStyle = 'white'
  ctx.fillText("0", 200, 80);

  ctx.font = "80px Arial";
   ctx.fillStyle = 'white'
   ctx.fillText("2", 350, 80);


ctx.beginPath();
ctx.strokeStyle = "white";
ctx.setLineDash([5,5]);
ctx.moveTo(canvas.width/2, 0);
ctx.lineTo(canvas.width/2, canvas.height);
ctx.stroke();


// Bola
var bola = {

  x_ini : 50,
  y_ini : 50,

  x : 0,
  y : 0,

  vx : 4,
  vy : 1,

  Dirx : 1,
  DirY : 1,

  ctx : null,

  width : 8,
  height : 8,

  reset : function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
  },

  init : function(ctx) {
    console.log("Bola: init");
    this.reset();
    this.ctx = ctx;
  },
  draw : function() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  update : function() {
    if (this.x > canvas.width - this.width || this.x < 0) {
      this.vx = - this.vx;
    }

    if (this.y > canvas.height - this.height || this.y < 0){
      this.vy = - this.vy;
    }
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

  }
}

bola.init(ctx);
bola.draw();

var timer = null;

var sacar = document.getElementById('sacar');

sacar.onclick = ()=> {
  console.log("Click");
  //Lanzar el timer si no estaba lanzado
  if (!timer) {
    timer = setInterval( ()=>{
      //Actualizar bola
      bola.update()
      //Borrar canvas
      ctx.clearRect(0,0,canvas.width, canvas.height);
      bola.draw()

      //Condicion de terminacion
    }, 20);
  }
}












}
