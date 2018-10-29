var camera, scene, renderer, container;
var mesh, stats;
var mouse = new THREE.Vector2(),
  mouseClick = new THREE.Vector2(),
  INTERSECTED,
  raycaster;
var doors = [];

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 600;
  camera.position.x = 1;
  camera.position.y = 1;

  scene = new THREE.Scene();

  // lambert materials have shading, but don't work without a light in the scene
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  var door = {
    width: 100,
    height: 100,
    depth: 10
  };
  // use geometry for a door mesh many times
  var geometry = new THREE.CubeGeometry(door.width, door.height, door.depth);
  // this offsets the pivot point so doors don't rotate around their center
  geometry.applyMatrix(
    new THREE.Matrix4().makeTranslation(door.width / 2, 0, 0)
  );

  // make doors!
  for (let i = 0; i < 30; i += 1) {
    let material = new THREE.MeshLambertMaterial({
      color: 0xffffff * Math.random()
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    doors.push(mesh);

    // arrange in a grid
    mesh.position.x = -300 + i % 6 * (door.width + door.depth);
    mesh.position.y = 150 + Math.floor(i / 6) * -(door.height + door.depth);
  }

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  //renderer.sortObjects = false;
  container.appendChild(renderer.domElement);

  stats = new Stats();
  stats.domElement.style.position = "absolute";
  stats.domElement.style.top = "0px";
  container.appendChild(stats.domElement);

  raycaster = new THREE.Raycaster();

  window.addEventListener("resize", onWindowResize, false);
  window.addEventListener("mousemove", onDocumentMouseMove, false);
  window.addEventListener("click", onDocumentClick, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentClick(event) {
  // event.preventDefault();
  mouseClick.x = event.clientX / window.innerWidth * 2 - 1;
  mouseClick.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // figure out which objects in the scene were clicked
  raycaster.setFromCamera(mouseClick, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  var degToRad = Math.PI / 180;

  // make clicked things open/close with a tweened animation
  intersects.forEach(clickedObject => {
    // is door open or closed already?
    var targetAngle = clickedObject.object.rotation.y === -100 * degToRad
      ? 0
      : -100 * degToRad;

    new TWEEN.Tween(clickedObject.object.rotation)
      .easing(TWEEN.Easing.Circular.Out)
      .to(
        {
          y: targetAngle
        },
        500
      )
      .start();
  });
}

function animate(time) {
  // let Tween engine know it is time to animate stuff
  TWEEN.update(time);

  stats.update();

  // handle mouseover interactions
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xff0000);
    }
  } else {
    if (INTERSECTED)
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

    INTERSECTED = null;
  }
  renderer.render(scene, camera);

  // request the next frame to draw in a few milliseconds
  requestAnimationFrame(animate);
  //setTimeout(animate, 250);
}
