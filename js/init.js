function init() {

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 101);
	camera.position.x = -4;
	camera.position.z = 3.5;
	
    
	scene = new THREE.Scene();
	scene.background = new THREE.Color(000000);
	scene.fog = new THREE.Fog(000000, 0, 50);

	var light = new THREE.HemisphereLight(0x3e4247, 0x3e4247, 1.0);
	light.position.set(0.5, 1, 0.75);
	scene.add(light);

	lightLantaarn = new THREE.PointLight(0xffffff, 1, 1);
	lightLantaarn.position.set(5,5,-5);
	models.lightLantaarn.licht = lightLantaarn;
	lightLantaarnLoaded();

	controls = new THREE.PointerLockControls(camera);
	scene.add(controls.getObject());

	monster = new Monster();
	monster.position.set(220, 0, -170);

	scene.add(monster);
	objects.push(monster);


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

			case 32: // space
				if (canJump === true) velocity.y += 350;
				canJump = false;
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
				monsterTeleport = true;
				break;
			case 82: //r
				if(!health) location.reload();

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

	raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
	raycasterx = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, 5);
	raycasterz = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 5);
	raycasterx2 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, 5);
	raycasterz2 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 5);

	//AFRICA
	var listener = new THREE.AudioListener();
	camera.add( listener );

// create a global audio source
	var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer AFRICAAAAAAAAAAAAAAAAAAAAAAAAAA
	var audioLoader = new THREE.AudioLoader();
	audioLoader.load( 'sounds/Toto-Africa.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});
	// floor number : 1,4,10,23,39 best,,240best,241,243
	
	var floorTexture = new THREE.ImageUtils.loadTexture('textures/pattern_41/specular.png')
	//var floorTexture = new THREE.ImageUtils.loadTexture('textures/cookiehunger.png')//lolzies
	
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(100,100);

	var floorMaterial = new THREE.MeshBasicMaterial({
		map:floorTexture,
		side:THREE.DoubleSide
		});

	var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
	
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y= -0.5;
	floor.rotation.x= Math.PI/2;
	scene.add(floor);


	//cealing	
	//var ceilingTexture = new THREE.ImageUtils.loadTexture('textures/cookienightmare.jpg')//lolzies
	var ceilingTexture = new THREE.ImageUtils.loadTexture('textures/ceiling.png')
	ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
	ceilingTexture.repeat.set(100,100);

	var cealingMaterial = new THREE.MeshBasicMaterial({
		map:ceilingTexture,
		side:THREE.DoubleSide
		});

	var ceilingGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
	
	var ceiling = new THREE.Mesh(ceilingGeometry, cealingMaterial);
	ceiling.position.y=  20;
	ceiling.rotation.x= Math.PI/2;
	scene.add(ceiling);
	
	//lantaarn inladen
	loadOBJModel("models/", "lantern.obj", "models/", "lantern.mtl", (mesh) => {
		mesh.material = new THREE.MeshBasicMaterial;
		models.lantaarn.mesh = mesh;

		onResourcesLoaded();

	});

	loader = new THREE.JSONLoader();

    loader.load( "models/json/doors.json", function( geometry ) {
        mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
        mesh.scale.set( 10, 10, 10 );
        mesh.position.y = 150;
		mesh.position.x = 0;
		scene.add(mesh);
	} );


	walls.forEach(function(element){
		objects.push(element);
		scene.add(element);
	});

	var lastPositionx = controls.getObject().position.x;
	var lastPositionz = controls.getObject().position.z;

	window.setInterval(function(){
		if(Math.sqrt(Math.pow(controls.getObject().position.x - lastPositionx, 2) + Math.pow(controls.getObject().position.z - lastPositionz, 2)) < 10) {
			achtervolg = true;
		}
		lastPositionx = controls.getObject().position.x;
		lastPositionz = controls.getObject().position.z;
	}, 5000);	
	//

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	//
	


	window.addEventListener('resize', onWindowResize, false);

}