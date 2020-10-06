// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Events = Matter.Events,
Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

//set responsive width for canvas
var iwidth = window.innerWidth * 0.8


var render = Render.create({
element: document.getElementById('canvas'),
engine: engine,
options: {
width: window.innerWidth,
height: window.innerHeight,
pixelRatio: 1,
background: '#fff',
wireframeBackground: '#000',
enabled: true,
wireframes: true,
showVelocity: false,
showAngleIndicator: false,
showCollisions: false
}
});

//add the walls
World.add(engine.world, [
Bodies.rectangle(window.innerWidth*0.25, window.innerHeight*0.6, window.innerWidth*0.2, 50, {isStatic: true}),
Bodies.rectangle(window.innerWidth*0.75, window.innerHeight*0.6, window.innerWidth*0.2, 50, {isStatic: true}),
Bodies.rectangle(window.innerWidth*0.50, window.innerHeight*0.5, window.innerWidth*0.4, 10, {frictionAir: 0.3, isStatic: false})
]);

var item =  Bodies.polygon(window.innerWidth*0.75, window.innerHeight*0.5, 2+Math.ceil(Math.random()*7), 30, {isStatic: true});

//adds some shapes
World.add(engine.world, item);

//add the player
var player = Bodies.circle(window.innerWidth*0.25, 100, 25, {
density: 0.001,
friction: 0.7,
frictionStatic: 0,
frictionAir: 0.01,
restitution: 0.5,
ground: false,
});

//populate world
World.add(engine.world, player);

//looks for key presses and logs them
var keys = [];
document.body.addEventListener("keydown", function(e) {
keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
keys[e.keyCode] = false;
});

//at the start of a colision for player
Events.on(engine, "collisionStart", function(event) {
var pairs = event.pairs
for (var i = 0, j = pairs.length; i != j; ++i) {
var pair = pairs[i];
if (pair.bodyA === player) {
  player.ground = true;
} else if (pair.bodyB === player) {
  player.ground = true;
}
}
});
//ongoing checks for collisions for player
Events.on(engine, "collisionActive", function(event) {
var pairs = event.pairs
for (var i = 0, j = pairs.length; i != j; ++i) {
var pair = pairs[i];
if (pair.bodyA === player) {
  player.ground = true;
} else if (pair.bodyB === player) {
  player.ground = true;
}
}
});
//at the end of a colision for player
Events.on(engine, 'collisionEnd', function(event) {
var pairs = event.pairs;
for (var i = 0, j = pairs.length; i != j; ++i) {
var pair = pairs[i];
if (pair.bodyA === player) {
  player.ground = false;
} else if (pair.bodyB === player) {
  player.ground = false;
}
}
})



//main engine update loop
Events.on(engine, "beforeTick", function(event) {
if (keys[32]) {console.log(player)};
//jump
if (keys[38] && player.ground) {
player.force = {      x: 0,      y: -0.1    };
}
//spin left and right
if (keys[37] && player.angularVelocity > -0.2) {
player.torque = -0.1;
} else {
if (keys[39] && player.angularVelocity < 0.2) {
  player.torque = 0.1;
}
}
Matter.Body.rotate( item, Math.PI/100);
//deathwall.force = { x:0.05, y:0};
});

var playerGround = false;
Events.on(engine, "collisionStart", function(event) {
//console.log(event.pairs)
//var x = event.pairs[0].activeContacts[0].vertex.x
//var y = event.pairs[0].activeContacts[0].vertex.y
playerGound = true
});

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
