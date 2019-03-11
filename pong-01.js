function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

 ctx.font = "40px Arial";
  ctx.fillStyle = 'white'
  ctx.fillText("0", canvas.width/2 - 70, 60);
  ctx.fillText("2", canvas.width/2 + 40, 60);


ctx.beginPath();
ctx.strokeStyle = "white";
ctx.setLineDash([5,5]);
ctx.moveTo(canvas.width/2, 0);
ctx.lineTo(canvas.width/2, canvas.height);
ctx.stroke();


var raqueta = {

  width : 10,
  height : 40,

  x1 : 30,
  y_ini1 : canvas.height/2 - 40/2,

  x2 : canvas.width - 30 - 10,
  y_ini2 : canvas.height/2 - 40/2,

  y1 : 0,
  y2 : 0,

  ctx : null,

  reset : function() {
    this.x1 = this.x1;
    this.y1 = this.y_ini1;

    this.x2 = this.x2;
    this.y2 = this.y_ini2;
  },
  init : function(ctx) {
    console.log("Bola: init");
    this.reset();
    this.ctx = ctx;
  },
  draw : function() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x1, this.y1, this.width, this.height);
    this.ctx.fillRect(this.x2, this.y2, this.width, this.height);
  },
  update : function() {
    window.onkeydown = (e) => {
      e.preventDefault();

      console.log(e.key);

      if (e.key == 'a') {
          this.y1 = this.y1 - 6;
      }else if (e.key == 'z') {
        this.y1 = this.y1 + 6;
      }else if (e.key == 'k') {
        this.y2 = this.y2 - 6;
      }else if (e.key == 'm') {
        this.y2 = this.y2 + 6;
      }
    }
  }
}

// Bola
var bola = {

  x_ini : 30 + raqueta.width + 10,
  y_ini : 80,

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
raqueta.init(ctx);
raqueta.draw();

var timer = null;

var sacar = document.getElementById('sacar');

sacar.onclick = ()=> {
  console.log("Click");
  //Lanzar el timer si no estaba lanzado
  if (!timer) {
    timer = setInterval( ()=>{
      //Actualizar bola
      bola.update()
      raqueta.update()
      //Borrar canvas
      ctx.clearRect(0,0,canvas.width, canvas.height);
      bola.draw()
      raqueta.draw()

      //Condicion de terminacion
    }, 20);
  }
}
}
