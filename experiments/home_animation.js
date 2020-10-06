//import { GLTFLoader } from '/GLTFLoader.js';

var screen = document.getElementById('mainScreen');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
screen.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var cube = new THREE.Mesh( geometry, material );
cube.position.x=0;
cube.position.y=-0.2;
cube.position.z=1;
scene.add( cube );


camera.position.z = 5;
var isFront = true;
  var animate = function () {
    requestAnimationFrame( animate );
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

    renderer.render( scene, camera );
	};

animate();
