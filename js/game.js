var camera, scene, renderer, controls;

var objects = [];
var notes = [];

var raycasterF, raycasterB, raycasterL, raycasterR, raycasterX, INTERSECTED;
var composer, outlinePass, allowPickUp;

var lantern;

var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');
var deathscreen = document.getElementById('deathscreen');

var pickUp = document.getElementById('pickUp');
var hint = document.getElementById('hint');

var props;

// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {

	var element = document.body;



	var pointerlockchange = function (event) {

		if (health) {
			if ((document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) && document.readyState === "complete") {

				controlsEnabled = true;
				controls.enabled = true;
				blocker.style.display = 'none';
				pickUp.style.display = 'none';


			} else {

				controls.enabled = false;

				blocker.style.display = 'block';

				instructions.style.display = '';
				pickUp.style.display = 'none';

			}
		}

	};

	var pointerlockerror = function (event) {

		instructions.style.display = '';

	};

	// Hook pointer lock state change events
	document.addEventListener('pointerlockchange', pointerlockchange, false);
	document.addEventListener('mozpointerlockchange', pointerlockchange, false);
	document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

	document.addEventListener('pointerlockerror', pointerlockerror, false);
	document.addEventListener('mozpointerlockerror', pointerlockerror, false);
	document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

	instructions.addEventListener('click', function (event) {
		if (document.readyState === "complete") {
			instructions.style.display = 'none';

			// Ask the browser to lock the pointer
			element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
			element.requestPointerLock();
		}
	}, false);

} else {

	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}
function tryPickUp() {
	if (allowPickUp === true) {
		note++;
		scene.remove(INTERSECTED);
		notes.splice(notes.indexOf(INTERSECTED), 1);

		document.getElementById('noNotes').innerHTML = note + " out of 6 notes collected.";

		achtervolg = true;
	}
	if (note == 6) {
		hint.style.display = 'block';
	}
}
var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var crouch = false;
var sprint = false;
var health = 500;
var stamina = 1000;
var note = 0;
var win = false;
var monster;
var monsterTeleport = false;
var achtervolg = false;
var sound;
var rayXOrigin = 10;
var walkingSound;
var runningSound;
var chasingSound;
var monsterSound;
var noteSound;
var closeNote = false;
var audioFading = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();


init();

animate();

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);

	//Er wordt gecheckt of de speler gewonnen heeft
	checkWin();
	if (win) {
		document.getElementById('ui').style.display = 'none';
		controlsEnabled = false;
		controls.enabled = false;
		blocker.style.display = 'block';
		winscreen.style.display = '';
	}
	//De notes worden rondgedraaid
	notes.forEach(function (note) {
		note.rotation.y += 0.01;
	});

	if (controlsEnabled === true) {
		//De health, stamina en notes worden weergegeven in de html code linksbovenin het scherm
		document.getElementById("health").innerHTML = "HP Points: " + health;
		document.getElementById("stamina").innerHTML = "Stamina: " + stamina / 10;
		document.getElementById("notes").innerHTML = "Notes: " + note;

		//De raycaster naar voren wordt geüpdate
		raycasterF.ray.origin.copy(controls.getObject().position);
		camera.getWorldDirection(raycasterF.ray.direction);
		raycasterF.ray.origin.y = 10;

		//De raycaster naar achter wordt geüpdate
		raycasterB.ray.origin.copy(controls.getObject().position);
		raycasterB.ray.direction.set(-raycasterR.ray.direction.z, 0, raycasterR.ray.direction.x);
		raycasterB.ray.origin.y = 10;

		//De raycaster naar links wordt geüpdate
		raycasterL.ray.origin.copy(controls.getObject().position);
		raycasterL.ray.direction.set(-raycasterB.ray.direction.z, 0, raycasterB.ray.direction.x);
		raycasterL.ray.origin.y = 10;

		//De raycaster naar rechts wordt geüpdate
		raycasterR.ray.origin.copy(controls.getObject().position);
		raycasterR.ray.direction.set(-raycasterF.ray.direction.z, 0, raycasterF.ray.direction.x);
		raycasterR.ray.origin.y = 10;

		//De raycaster naar voren die de notes detecteert wordt geüpdate
		raycasterX.ray.origin.copy(controls.getObject().position);
		camera.getWorldDirection(raycasterX.ray.direction);
		raycasterX.ray.origin.y = rayXOrigin;

		//De raycasters kijken of er iets (een muur) in de weg staat
		var intersectionsF = raycasterF.intersectObjects(objects);
		var intersectionsB = raycasterB.intersectObjects(objects);
		var intersectionsL = raycasterL.intersectObjects(objects);
		var intersectionsR = raycasterR.intersectObjects(objects);

		//De raycaster kijkt of er een note wordt gedetecteerd
		var intersectionsX = raycasterX.intersectObjects(notes, true);

		//De briefjes worden rood gemaakt en er verschijnt een berich op het scherm
		if (intersectionsX.length > 0) {
			if (INTERSECTED != intersectionsX[0].object) {
				if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
				INTERSECTED = intersectionsX[0].object;
				INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
				INTERSECTED.material.emissive.setHex(0xff0000);

				allowPickUp = true;

				pickUp.style.display = 'block';
			}
		} else {
			if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
			INTERSECTED = null;
			pickUp.style.display = 'none';
			allowPickUp = false;
		}

		//True als er een object wordt gedetecteerd door de raycaster
		var forwardObject = intersectionsF.length > 0;
		var backObject = intersectionsB.length > 0;
		var leftObject = intersectionsL.length > 0;
		var rightObject = intersectionsR.length > 0;

		var time = performance.now();
		var delta = (time - prevTime) / 1000;

		//Het monster kijkt naar de speler
		monster.lookAt(controls.getObject().position.x, 0, controls.getObject().position.z);

		//De snelheid van de speler wordt veranderd
		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		//Zwaartekracht (vrij nutteloos, toch leuk)
		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = massa

		//De beweegrichting wordt bepaald
		direction.z = Number(moveForward) - Number(moveBackward);
		direction.x = Number(moveLeft) - Number(moveRight);
		direction.normalize(); //Dit zorgt voor consistente bewegingen in alle richtingen

		if (moveForward || moveBackward) velocity.z -= direction.z * 100.0 * delta;
		if (moveLeft || moveRight) velocity.x -= direction.x * 100.0 * delta;

		//Als de sprint knop (shift) wordt ingedrukt en de stamina hoog genoeg is kan de speler sneller bewegen en gaat de stamina omlaag
		if (sprint && stamina > 2) {
			if (moveForward) {
				velocity.z += -1.5;
				stamina -= 3;
				//Het rengeluid wordt afgespeeld
				if (!runningSound.isPlaying) {
					if (walkingSound.isPlaying) walkingSound.stop();
					runningSound.play();
				}
			}
		}
		//Als de sprint knop (shift) niet wordt ingedrukt krijgt de speler stamina terug
		else {
			if (stamina < 1000) stamina += 1; else stamina = 1000;
			//De speler krijgt zijn stamina sneller terug als hij stilstaat
			if (!((moveForward || moveBackward) && !(moveForward && moveBackward)) && !((moveLeft || moveRight) && !(moveLeft && moveRight))) {
				if (stamina < 1000) stamina += 4; else stamina = 1000;
				if (walkingSound.isPlaying) walkingSound.stop();
				if (runningSound.isPlaying) runningSound.stop();
			}
			//Het loopgeluid wordt afgespeeld
			else if (!walkingSound.isPlaying) {
				if (runningSound.isPlaying) runningSound.stop();
				walkingSound.play();
			}
		}

		//Als de crouch knop (c) wordt ingedrukt gaat de camera en raycaster omlaag en beweegt de speler trager
		if (crouch) {
			if (camera.position.y > -5) camera.position.y -= 0.5;
			else camera.position.y = -5;
			rayXOrigin = 5;
			velocity.x = velocity.x / 1.2;
			velocity.z = velocity.z / 1.2;
		}
		//Als de crouch knop (c) niet wordt ingedrukt zitten de camera en raycaster op hun normale positie
		else {
			if (camera.position.y < 0) camera.position.y += 0.5;
			else camera.position.y = 0;
			rayXOrigin = 10;
		}

		//Als de speler te dicht bij het monster staat gaat de health van de speler omlaag
		if (Math.abs(controls.getObject().position.x - monster.position.x) < 12 && Math.abs(controls.getObject().position.z - monster.position.z) < 12) {
			health -= 1;
		}

		if (monsterTeleport) {
			achtervolg = true;
		}

		//Het monster begint te achtervolgen
		if (achtervolg) {
			//Het geluid voor het achtervolgscenario wordt afgespeeld
			chasingSound.play();
			achtervolg = false;
			//Het monster teleporteert voor de speler
			monster.position.set(controls.getObject().position.x + (raycasterX.ray.direction.x * 10), 0, controls.getObject().position.z + (raycasterX.ray.direction.z * 10));
			//Er wordt een interval gemaakt die kijkt of de speler ver genoeg wegrent van het monster en ervoor zorgt dat het monster blijft teleporteren
			var interval = window.setInterval(function () {
				if (Math.sqrt(Math.pow(controls.getObject().position.x - monster.position.x, 2) + Math.pow(controls.getObject().position.z - monster.position.z, 2)) > 50) {
					window.clearInterval(interval);
					audioFading = true;
					monster.position.set(205, 0, -169);
				}
				else {
					monster.position.set(controls.getObject().position.x + (raycasterX.ray.direction.x * 10), 0, controls.getObject().position.z + (raycasterX.ray.direction.z * 10));
				}
			}, 8000);
		}

		//Er wordt een interval gemaakt voor het wegvallen van het geluid
		if(audioFading){
			audioFading = false;
			var vol = 5;
			var audioFade = window.setInterval(function () {		
			vol--;
			if (vol == 0) {
				chasingSound.stop();
				clearInterval(audioFade);
			}
			else {
				chasingSound.setVolume(vol/10);
			}
			}, 1000);
		}

		//Collisions, als je in een muur loopt wordt je de andere kant uit gedrukt
		if (forwardObject === true) {
			velocity.z = 1;
		}
		if (backObject === true) {
			velocity.z = -1;
		}
		if (leftObject === true) {
			velocity.x = 1;
		}
		if (rightObject === true) {
			velocity.x = -1;
		}

		controls.getObject().translateX(velocity.x * delta);
		controls.getObject().translateY(velocity.y * delta);
		controls.getObject().translateZ(velocity.z * delta);

		if(controls.getObject().position.y < 10) {
			velocity.y = 0;
			controls.getObject().position.y = 10;
			canJump = true;
		}

		//Er wordt gekeken of er een note dichtbij de speler is
		notes.forEach(function (note) {
			if (note.position.distanceTo(controls.getObject().position) < 70) closeNote = true;
		});

		//Als er een note dichtbijgenoeg is, wordt er een geluid afgespeeld --> zo niet, stopt het geluid
		if (closeNote) {
			if (!noteSound.isPlaying) noteSound.play();
			closeNote = false;
		}
		else {
			if (noteSound.isPlaying) noteSound.stop();
		}

		//Als de speler geen health meer heeft komt het dood scherm in beeld
		if (health <= 0) {
			document.getElementById('ui').style.display = 'none';
			controlsEnabled = false;
			controls.enabled = false;
			blocker.style.display = 'block';
			deathscreen.style.display = '';
		}

		prevTime = time;
	}

	renderer.render(scene, camera);
}

/**
 * Er wordt gekeken of de speler heeft gewonnen
 */
function checkWin() {
	if (controls.getObject().position.x <= 205 && (controls.getObject().position.z <= -146 && controls.getObject().position.z >= -194)) {
		if (note == 6) {
			win = true;
		}
	}
	if (controls.getObject().position.x <= 283 && controls.getObject().position.z <= -155) {
		if (note != 6) {
			achtervolg = true;
		}
	}
}
