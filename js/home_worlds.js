import * as THREE from '/js/three.module.js';

			var container, camera, scene, renderer, effect;

			var spheres = [];

			var mouseX = 0;
			var mouseY = 0;

      var screen = document.getElementById('mainScreen');

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			document.addEventListener( 'mousemove', onDocumentMouseMove, false );

			init();
			animate();

			function init() {


				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
				camera.position.z = 3;
				camera.focalLength = 3;

				scene = new THREE.Scene();

				var texture = new THREE.TextureLoader().load('/assets/worlds/tex_mars.jpeg');
				var texture2 = new THREE.TextureLoader().load('/assets/worlds/tex_moon.jpg');
				var texture3 = new THREE.TextureLoader().load('/assets/worlds/tex_ice.jpeg');
				var texture4 = new THREE.TextureLoader().load('/assets/worlds/tex_ice_vibrant.jpeg');
				var texture5 = new THREE.TextureLoader().load('/assets/worlds/tex_ice_ice.jpeg');
				var texture6 = new THREE.TextureLoader().load('/assets/worlds/tex_ice_blue.jpeg');
				var texture7 = new THREE.TextureLoader().load('/assets/worlds/tex_ice_black.jpeg');
				var texture8 = new THREE.TextureLoader().load('/assets/worlds/tex_dry_ice.jpeg');

				var materialA = [
				new THREE.MeshBasicMaterial({map : texture}),
				new THREE.MeshBasicMaterial({map : texture2}),
				new THREE.MeshBasicMaterial({map : texture3}),
				new THREE.MeshBasicMaterial({map : texture4}),
				new THREE.MeshBasicMaterial({map : texture5}),
				new THREE.MeshBasicMaterial({map : texture6}),
				new THREE.MeshBasicMaterial({map : texture7}),
				new THREE.MeshBasicMaterial({map : texture8})
			];

			var geometry = new THREE.SphereBufferGeometry( 0.08, 32, 16 );

				for ( var i = 0; i < 8; i ++ ) {
						 var mater = materialA[i];
						var mesh = new THREE.Mesh( geometry, mater);


					mesh.position.x = Math.random() * 10 - 6;
					mesh.position.y = Math.random() * 10 - 6;
					mesh.position.z = Math.random() * 10 - 6;

					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

					scene.add( mesh );

					spheres.push( mesh );

				}

				//

				renderer = new THREE.WebGLRenderer({alpha: true});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setClearColor( 0x000000, 0 );
				screen.appendChild(renderer.domElement);

				var width = window.innerWidth;
				var height = window.innerHeight;
				renderer.setSize( width, height );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				//effect.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 100;
				mouseY = ( event.clientY - windowHalfY ) / 100;

			}

// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
audioLoader.load( '/assets/sounds/entry.wav', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
	});

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				var timer = 0.0001 * Date.now();

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;

				camera.lookAt( scene.position );

				for ( var i = 0, il = spheres.length; i < il; i ++ ) {

					var sphere = spheres[ i ];

					sphere.position.x = 2 * Math.cos( timer + i );
					sphere.position.y = 2 * Math.sin( timer + i * 1.1 );

				}

				renderer.render( scene, camera );

			}
