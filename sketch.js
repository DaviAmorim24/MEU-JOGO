const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;


var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var macaco1, cavalo1, camelo1;
var numberOfArrows = 10;

var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.jpg");
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  camelo1 = new Camelo (width - 300, 330, 50, 200);
  macaco1 = new Macaco (width - 400, 200, 50, 200);
  cavalo1 = new Cavalo (width - 500, 100, 50, 200);

}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display();

  camelo1.display(
  macaco1.display(
  cavalo1.display()
  )
  )

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

      var board1Collision = Matter.SAT.collides(
        camelo1.body,
        playerArrows[i].body
      );

      var board2Collision = Matter.SAT.collides(
        macaco1.body,
        playerArrows[i].body
      );

      /*if (board1Collision || board2Collision) {
        score += 5;
      }*/

      /*if (board1Collision.collided && board2Collision.collided) {
        score += 5;
      }*/

      if (board1Collision.collided || board2Collision.collided) {
        score += 5;
      
      if (score %30 == 0){
        numberOfArrows +=3;
      }
      
      }

      /*if (board1Collision.collided || board2Collision.collided) {
        score = 5;
      }*/

      
      var posX = playerArrows[i].body.position.x;
      var posY = playerArrows[i].body.position.y;

      if (posX > width || posY > height) {
        if (!playerArrows[i].isRemoved) {
          playerArrows[i].remove(i);
        } else {
          playerArrows[i].trajectory = [];
        }
      }
    }
  }

  // Título
  fill("#000000");
  textAlign("center");
  textSize(40);
  text("ARQUEIRO ÉPICO", width / 2, 100);

  // Contagem de Flechas
  fill("#000000");
  textAlign("center");
  textSize(30);
  text("Flechas Restantes: " + numberOfArrows, 200, 100);
  
  // Pontuação
  fill("#000000");
  textAlign("center");
  textSize(30);
  text("Pontuação: " + score, width - 200, 100);

  /*if (numberOfArrows == 5) {
    gameOver();
  }*/

  if (numberOfArrows == 0) {
    gameOver();
  }

  /*if (numberOfArrows = 0) {
    gameOver();
  }*/

  /*if (numberOfArrows == 0) {
    gameOver;
  }*/

}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
     title: `Fim de Jogo!!!`,
      text: "Obrigado por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


