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

				var geometry = new THREE.SphereBufferGeometry( 0.08, 32, 16 );
				var texture = new THREE.TextureLoader().load('/assets/tex_mars.jpeg');
				var material = new THREE.MeshBasicMaterial({map : texture});
				var texture2 = new THREE.TextureLoader().load('/assets/tex_moon.jpg');
				var material2 = new THREE.MeshBasicMaterial({map : texture2});


				for ( var i = 0; i < 15; i ++ ) {

					if (i%2==0){var mesh = new THREE.Mesh( geometry, material2 );}
					else {
						var mesh = new THREE.Mesh( geometry, material );
					}

					mesh.position.x = Math.random() * 10 - 5;
					mesh.position.y = Math.random() * 10 - 5;
					mesh.position.z = Math.random() * 10 - 5;

					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

					scene.add( mesh );

					spheres.push( mesh );

				}

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
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

			//

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

					sphere.position.x = 5 * Math.cos( timer + i );
					sphere.position.y = 5 * Math.sin( timer + i * 1.1 );

				}

				renderer.render( scene, camera );

			}
