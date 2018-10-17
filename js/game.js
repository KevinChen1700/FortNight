var camera, scene, renderer, controls;

			var objects = [];

			var raycaster;

			var lightLantaarn;

			var blocker = document.getElementById( 'blocker' );
			var instructions = document.getElementById( 'instructions' );

			// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

			var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

			if ( havePointerLock ) {

				var element = document.body;

				var pointerlockchange = function ( event ) {

					if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

						controlsEnabled = true;
						controls.enabled = true;

						blocker.style.display = 'none';

					} else {

						controls.enabled = false;

						blocker.style.display = 'block';

						instructions.style.display = '';

					}

				};

				var pointerlockerror = function ( event ) {

					instructions.style.display = '';

				};

				// Hook pointer lock state change events
				document.addEventListener( 'pointerlockchange', pointerlockchange, false );
				document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

				document.addEventListener( 'pointerlockerror', pointerlockerror, false );
				document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
				document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

				instructions.addEventListener( 'click', function ( event ) {

					instructions.style.display = 'none';

					// Ask the browser to lock the pointer
					element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
					element.requestPointerLock();

				}, false );

			} else {

				instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

			}

			var controlsEnabled = false;

			var moveForward = false;
			var moveBackward = false;
			var moveLeft = false;
			var moveRight = false;
			var canJump = false;
			var crouch = false;
			var sprint = false;

			var prevTime = performance.now();
			var velocity = new THREE.Vector3();
			var direction = new THREE.Vector3();
			var vertex = new THREE.Vector3();
			var color = new THREE.Color();

			// Models index
            var models = {
	        lantaarn: {
		    obj:"models/lantern.obj",
		    mtl:"models/lantern.mtl",
		    mesh: null
			},
			lightLantaarn:{
				licht: null
			}
			};
			
			// Meshes index
            var meshes = {};

			init();
			animate();

			function lightLantaarnLoaded(){
				meshes["lightLantaarn"] = models.lightLantaarn.licht.clone();
				scene.add(meshes["lightLantaarn"]);
			}

			function onResourcesLoaded(){
				meshes["lantaarn"] = models.lantaarn.mesh.clone();
				meshes["lantaarn"].position.set(0, 10, 0);
				meshes["lantaarn"].scale.set(2.5,4.5,4.5);
				scene.add(meshes["lantaarn"]);
			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				

				requestAnimationFrame( animate );

				if ( controlsEnabled === true ) {

					

					raycaster.ray.origin.copy( controls.getObject().position );
					raycaster.ray.origin.y -= 10;

					var intersections = raycaster.intersectObjects( objects );

					var onObject = intersections.length > 0;

					var time = performance.now();
					var delta = ( time - prevTime ) / 1000;

					velocity.x -= velocity.x * 10.0 * delta;
					velocity.z -= velocity.z * 10.0 * delta;

					velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

					direction.z = Number( moveForward ) - Number( moveBackward );
					direction.x = Number( moveLeft ) - Number( moveRight );
					direction.normalize(); // this ensures consistent movements in all directions

					if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
					if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

					if( sprint ) {
						if( moveForward ){
							velocity.z = velocity.z * 1.11;
						}
					}

					if( crouch ) {
						if( camera.position.y > -5 ) camera.position.y -= 0.5;
						else camera.position.y = -5;
						velocity.x = velocity.x / 1.2;
						velocity.z = velocity.z / 1.2;
					}
					else {
						if( camera.position.y < 0 ) camera.position.y += 0.5;
						else camera.position.y = 0;
					}

					if ( onObject === true ) {

						velocity.y = Math.max( 0, velocity.y );
						canJump = true;

					}

					controls.getObject().translateX( velocity.x * delta );
					controls.getObject().translateY( velocity.y * delta );
					controls.getObject().translateZ( velocity.z * delta );

					if ( controls.getObject().position.y < 10 ) {

						velocity.y = 0;
						controls.getObject().position.y = 10;

						canJump = true;

					}

					//lantaarn in first person view
					meshes["lantaarn"].position.set(
						controls.getObject().position.x ,
						controls.getObject().position.y ,
						controls.getObject().position.z 
					);

					meshes["lantaarn"].rotation.set(
						controls.getObject().rotation.x,
						controls.getObject().rotation.y,
						controls.getObject().rotation.z,
					);

					//licht van het lantaarn
					meshes["lightLantaarn"].position.set(
						controls.getObject().position.x ,
						controls.getObject().position.y ,
						controls.getObject().position.z 
					);
					meshes["lightLantaarn"].rotation.set(
						controls.getObject().rotation.x ,
						controls.getObject().rotation.y ,
						controls.getObject().rotation.z 
					);

					prevTime = time;

				}

				renderer.render( scene, camera );

			}