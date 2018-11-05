function init() {
	pickUp.style.display = 'none';
	deathscreen.style.display = 'none';
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 101);

	//De scene wordt aangemaakt
	scene = new THREE.Scene();
	scene.background = new THREE.Color(000000);
	scene.fog = new THREE.Fog(000000, 0, 62);

	//De controls worden ingeladen
	controls = new THREE.PointerLockControls(camera);
	scene.add(controls.getObject());

	//Het monster wordt ingeladen en wordt in de kill room gezet
	monster = new Monster();
	monster.position.set(205, 0, -169);

	scene.add(monster);
	objects.push(monster);

	//De lantaarn wordt ingeladen met models en textures
	lantern = new THREE.Group();
	loadOBJModel("models/", "lantern.obj", "models/", "lantern.mtl", (mesh) => {
		mesh.material = new THREE.MeshPhongMaterial();
		mesh.scale.set(2, 4, 2);
		mesh.position.x = 3;
		mesh.position.z = -3;
		lantern.add(mesh);

		var l = new THREE.PointLight(0xffd6aa, 1, 60);
		l.castShadow = true;
		l.shadow.mapSize.width = 512;  // default
		l.shadow.mapSize.height = 512; // default
		l.shadow.camera.near = 0.5;       // default
		l.shadow.camera.far = 500      // default
		lantern.add(l);
	});
	scene.add(lantern);
	camera.add(lantern);

	//De nutteloze objecten worden ingeladen
	props = new THREE.Group();
	loadObjects();
	objects.push(props);
	scene.add(props);

	//De toetsen van het toetsenbord worden geïnitialiseerd voor de controls
	var onKeyDown = function (event) {

		switch (event.keyCode) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true; break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;
			case 67: //c
				crouch = true;
				break;
			case 16: //shift
				sprint = true;
				break;
			case 70: //f
				fly = true;
				break;
			case 88: //x
				win = true;
				break;
			case 82: //r
				if (!health || win) location.reload();
			case 69: //e
				tryPickUp();
				break;
		}
	};

	var onKeyUp = function (event) {

		switch (event.keyCode) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;
			case 67: //c
				crouch = false;
				break;
			case 16: //shift
				sprint = false;
				break;
			case 88: //x
				monsterTeleport = false;
				break;
		}
	};

	document.addEventListener('keydown', onKeyDown, false);
	document.addEventListener('keyup', onKeyUp, false);

	//De raycasters worden ingeladen
	raycasterF = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 6); //F = naar voren
	raycasterB = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 6); //B = naar achteren
	raycasterL = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, 6); //L = naar links
	raycasterR = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, 6); //R = naar rechts

	//De raycaster voor het detecteren van de notes wordt ingeladen
	raycasterX = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 0), 0, 15);

	//De listener wordt ingeladen voor het geluid in de game
	var listener = new THREE.AudioListener();
	camera.add(listener);

	//De audio wordt geïnitialiseerd
	sound = new THREE.Audio(listener);
	walkingSound = new THREE.Audio(listener);
	runningSound = new THREE.Audio(listener);
	chasingSound = new THREE.Audio(listener);
	monsterSound = new THREE.Audio(listener);
	//Positional audio geeft 3D surround sound
	noteSound = new THREE.PositionalAudio(listener);

	//Er wordt een geluid ingeladen uit de sounds folder en als buffer gezet voor de audio
	var audioLoader = new THREE.AudioLoader();
	audioLoader.load('sounds/Background_Music.mp3', function (buffer) {
		sound.setBuffer(buffer);
		sound.setLoop(true);
		sound.setVolume(0.5);
		sound.play();
	});

	audioLoader.load('sounds/Walking_Steps.mp3', function (buffer) {
		walkingSound.setBuffer(buffer);
		walkingSound.setLoop(true);
		walkingSound.setVolume(0.5);
	});

	audioLoader.load('sounds/Running_Steps.mp3', function (buffer) {
		runningSound.setBuffer(buffer);
		runningSound.setLoop(true);
		runningSound.setVolume(0.5);
	});

	audioLoader.load('sounds/Chase_Music.mp3', function (buffer) {
		chasingSound.setBuffer(buffer);
		chasingSound.setLoop(true);
		chasingSound.setVolume(0.5);
	});

	audioLoader.load('sounds/Monster_Growl.mp3', function (buffer) {
		monsterSound.setBuffer(buffer);
		monsterSound.setLoop(false);
		monsterSound.setVolume(0.8);
	});

	audioLoader.load('sounds/Note_Sound.mp3', function (buffer) {
		noteSound.setBuffer(buffer);
		noteSound.setLoop(true);
		noteSound.setVolume(0.5);
		noteSound.setRefDistance(20);
	});

	//De texture van de grond wordt ingeladen
	// floor number : 1,4,10,23,39 best,,240best,241,243
	var textureLoader = new THREE.TextureLoader();
	var floorTexture = textureLoader.load('textures/pattern_41/specular.png');
	//var floorTexture = new THREE.ImageUtils.loadTexture('textures/cookiehunger.png')//lolzies

	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(100, 100);

	var floorMaterial = new THREE.MeshPhongMaterial({
		map: floorTexture,
		side: THREE.DoubleSide
	});

	var floorGeometry = new THREE.PlaneBufferGeometry(700, 700, 1, 1);

	//De grond wordt ingeladen in de wereld
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	floor.receiveShadow = true;
	scene.add(floor);


	//Het plafond wordt ingeladen
	//var ceilingTexture = new THREE.ImageUtils.loadTexture('textures/cookienightmare.jpg')//lolzies
	var ceilingTexture = textureLoader.load('textures/ceiling.png')
	ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
	ceilingTexture.repeat.set(100, 100);

	var cealingMaterial = new THREE.MeshPhongMaterial({
		map: ceilingTexture,
		side: THREE.DoubleSide
	});

	var ceilingGeometry = new THREE.PlaneBufferGeometry(700, 700, 1, 1);

	var ceiling = new THREE.Mesh(ceilingGeometry, cealingMaterial);
	ceiling.position.y = 20;
	ceiling.rotation.x = Math.PI / 2;
	scene.add(ceiling);

	loader = new THREE.JSONLoader();

	loader.load("models/json/doors.json", function (geometry) {
		mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
		mesh.scale.set(10, 10, 10);
		mesh.position.y = 150;
		mesh.position.x = 0;
		scene.add(mesh);
	});

	//De muren worden ingeladen --> world.js
	walls.forEach(function (element) {
		objects.push(element);
		scene.add(element);
	});

	//De positie wordt opgeslagen om te kijken of de speler niet te lang stilstaat
	var lastPositionx = controls.getObject().position.x;
	var lastPositionz = controls.getObject().position.z;

	//Er wordt een interval gemaakt om te kijken of de speler genoeg beweegt --> zo niet, begint het monster met achtervolgen
	window.setInterval(function () {
		if (Math.sqrt(Math.pow(controls.getObject().position.x - lastPositionx, 2) + Math.pow(controls.getObject().position.z - lastPositionz, 2)) < 40) {
			if (controlsEnabled == true && document.readyState === "complete") {
				achtervolg = true;
			}
		}
		lastPositionx = controls.getObject().position.x;
		lastPositionz = controls.getObject().position.z;
	}, 12000);

	//Het geschreeuw van het monster wordt elke minuut afgespeeld
	window.setInterval(function () {
		monsterSound.play();
	}, 60000);

	//De renderer wordt ingeladen in de wereld
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	//Deze drie variabelen zorgen ervoor dat de briefjes rood worden
	composer = new THREE.EffectComposer(renderer);
	var renderPass = new THREE.RenderPass(scene, camera);
	composer.addPass(renderPass);
	outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
	composer.addPass(outlinePass);

	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);

	//De notes worden ingeladen
	var notePlane = new THREE.PlaneGeometry(1.5, 3);
	var noteMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
	var noteObj = new THREE.Mesh(notePlane, noteMaterial);

	for (i = 0; i < 6; i++) {
		notes.push(noteObj.clone());
		scene.add(notes[i]);
		notes[i].add(noteSound);
	}
	//De notes worden op hun positie gezet
	notes[0].position.set(139, 8, 26);
	notes[1].position.set(-80, 10, -20.5);
	notes[2].position.set(-160, 1, -47);
	notes[3].position.set(-36, 3, 47);
	notes[4].position.set(-3, 4, 166);
	notes[5].position.set(51, 6, 78.7);
}