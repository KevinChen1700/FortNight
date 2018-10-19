function init() {

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);
	scene.fog = new THREE.Fog(0xffffff, 0, 750);

	var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
	light.position.set(0.5, 1, 0.75);
	scene.add(light);

	controls = new THREE.PointerLockControls(camera);
	scene.add(controls.getObject());

		
	monster = new Monster();
	monster.position.set(10, 0, 10);

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
			case 88: //x
				monsterTeleport = true;
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

	raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
	raycasterx = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, 5);
	raycasterz = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 5);
	raycasterx2 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, 5);
	raycasterz2 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 5);

	// floor

	var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
	floorGeometry.rotateX(- Math.PI / 2);

	// vertex displacement

	var position = floorGeometry.attributes.position;

	for (var i = 0, l = position.count; i < l; i++) {

		vertex.fromBufferAttribute(position, i);

		vertex.x += Math.random() * 20 - 10;
		vertex.y += Math.random() * 2;
		vertex.z += Math.random() * 20 - 10;

		position.setXYZ(i, vertex.x, vertex.y, vertex.z);

	}

	floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

	position = floorGeometry.attributes.position;
	var colors = [];

	for (var i = 0, l = position.count; i < l; i++) {

		color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
		colors.push(color.r, color.g, color.b);

	}

	floorGeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

	var floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	scene.add(floor);

	// objects

	var boxGeometry = new THREE.BoxBufferGeometry(20, 20, 20);
	boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices

	position = boxGeometry.attributes.position;
	colors = [];

	for (var i = 0, l = position.count; i < l; i++) {

		color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
		colors.push(color.r, color.g, color.b);

	}

	boxGeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

	for (var i = 0; i < 500; i++) {

		var boxMaterial = new THREE.MeshPhongMaterial({ specular: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors });
		boxMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

		var box = new THREE.Mesh(boxGeometry, boxMaterial);
		box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
		box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
		box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

		scene.add(box);
		objects.push(box);

	}

	//
	var lastPositionx = controls.getObject().position.x;
	var lastPositionz = controls.getObject().position.z;

	window.setInterval(function(){
		if(Math.sqrt(Math.pow(controls.getObject().position.x - lastPositionx, 2) + Math.pow(controls.getObject().position.z - lastPositionz, 2)) < 10) {
			achtervolg = true;
		}
		lastPositionx = controls.getObject().position.x;
		lastPositionz = controls.getObject().position.z;
	}, 5000);


	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//

	window.addEventListener('resize', onWindowResize, false);


}