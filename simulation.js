function loadOBJModel(modelPath, modelName, texturePath, textureName, onload) {
    new THREE.MTLLoader()
        .setPath(texturePath)
        .load(textureName, function (materials) {
            materials.preload();

            new THREE.OBJLoader()
                .setPath(modelPath)
                .setMaterials(materials)
                .load(modelName, function (object) {
                    onload(object);
                }, function () { }, function (e) { console.log("Error loading model"); console.log(e); });
        });
}

window.onload = function () {
    var camera, scene, renderer;
    var cameraControls;
    var camControls;
    var lights = new THREE.Group();
    
    function init() {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1500);
        cameraControls = new THREE.PointerLockControls(camera);
        camera.position.z = 15;
        camera.position.y = 5;
        camera.position.x = 15;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        //cameraControls.update(window.requestAnimationFrame());
        scene = new THREE.Scene();

        var blocker = document.getElementById( 'blocker' );
        var instructions = document.getElementById( 'instructions' );
        
        instructions.addEventListener( 'click', function ( event ) {

            controls.lock();

        }, false );

        controls.addEventListener( 'lock', function() {

            instructions.style.display = 'none';
            blocker.style.display = 'none';

        } );

        controls.addEventListener( 'unlock', function() {

            blocker.style.display = 'block';
            instructions.style.display = '';

        } );

        /*cameraControls.lookSpeed = 0.00004;
        cameraControls.movementSpeed = 20;
        cameraControls.noFly = true;
        cameraControls.lookVertical = true;
        cameraControls.constrainVertical = true;
        cameraControls.verticalMin = 1.0;
        cameraControls.verticalMax = 2.0;
        cameraControls.lon = -150;
        cameraControls.lat = 120;*/

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight + 5);
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);

        var geometry = new THREE.PlaneGeometry(30, 30, 32);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        var plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = Math.PI / 2.0;
        plane.position.x = 0;
        plane.position.z = 0;
        scene.add(plane);

        light = new THREE.AmbientLight(0x404040, 2);
        lights.add(light);
        scene.add(lights);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        //var t = requestAnimationFrame(animate);
        //cameraControls.update(t);
        renderer.render(scene, camera);
        lights.updateMatrix();
        lights.updateMatrixWorld();
    }

    init();
    animate();
}