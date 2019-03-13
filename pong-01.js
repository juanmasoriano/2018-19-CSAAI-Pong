function main()
{
  console.log("Pong: Main: Start!")

  var score1 = 0;
  var score2 = 0;
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  function draw_ctx(){
    ctx.font = "40px Arial";

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.setLineDash([5,5]);
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
  }

var marcador = {
  width1 : canvas.width/2 - 70,
  width2 : canvas.width/2 + 40,

  height : 60,

  score1 : 0,
  score2 : 0,

  ctx : null,

  reset : function() {
    this.score1 = 0;
    this.score2 = 0;
  },

  init : function(ctx) {
    this.reset();
    this.ctx = ctx;
  },

  draw : function() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.score1, this.width1, this.height);
    this.ctx.fillText(this.score2, this.width2, this.height);
  },
}


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
        if (this.y1 > 0) {
          this.y1 = this.y1 - 19;
        }
      }else if (e.key == 'z') {
        if (this.y1 < canvas.height - this.height) {
          this.y1 = this.y1 + 19;
        }
      }else if (e.key == 'k') {
        if (this.y2 > 0) {
          this.y2 = this.y2 - 19;
        }
      }else if (e.key == 'm') {
        if (this.y2 < canvas.height - this.height) {
          this.y2 = this.y2 + 19;
        }
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

  radius : 4,

  reset : function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
    this.vx = 4;
    this.vy = 1;
  },

  init : function(ctx) {
    console.log("Bola: init");
    this.reset();
    this.ctx = ctx;
  },
  draw : function() {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius,0 , 2*Math.PI);
    this.ctx.fill();
  },
  update : function() {
    if (((this.x > raqueta.x2 - raqueta.width/2) && (this.x < raqueta.x2) && (this.y > raqueta.y2 - 15) && (this.y < raqueta.y2 + 40)) ||
          (this.x < raqueta.x1 + raqueta.width/2) && (this.x > raqueta.x1) && (this.y > raqueta.y1 - 15) && (this.y < raqueta.y1 + 40)){
      this.vx = - this.vx;
    }

    if (this.y > canvas.height - this.radius || this.y - this.radius < 0){
      this.vy = - this.vy;
    }
    if (this.x > canvas.width){

      marcador.score1 = marcador.score1 + 1;// Si alguien anota se reinicia la pagina.
      bola.init(ctx);
      raqueta.init(ctx);
    } else if(this.x < 0) {
      marcador.score2 = marcador.score2 + 1;
      bola.init(ctx);
      raqueta.init(ctx);
    }
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
}
draw_ctx();
marcador.init(ctx);
marcador.draw();
bola.init(ctx);
bola.draw();
raqueta.init(ctx);
raqueta.draw();

var timer = null;

var sacar = document.getElementById('sacar');

function comenzar(){
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
        marcador.draw();


      //Condicion de terminacion
      }, 10);
    }
  }
}
comenzar();
}
