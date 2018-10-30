class Monster extends THREE.Group {
    constructor() {
        super();

        this.init();
    }

    init() {
        /*var g = new THREE.BoxGeometry(10, 100, 10);
        var m = new THREE.MeshPhongMaterial({ color: 0xffffff });
        this._model = new THREE.Mesh(g, m);
        this.add(this._model);*/

        var selfRef = this;
        loadOBJModel("models/", "Screamer.obj", "models/", "Screamer.mtl", (mesh) => {
            mesh.scale.set(7, 7, 7);

            //mesh.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/Naamloos.png"), side: THREE.DoubleSide });

            var textureLoader = new THREE.TextureLoader();
            var map = textureLoader.load('textures/world_war_zombie_diffuse.png');
            var material = new THREE.MeshPhongMaterial({map: map});

            mesh.traverse(function (node){
                if(node.isMesh) node.material = material;
            });

            //addPointLight(selfRef, 0xff0000, -1.2, 17.43, 3.5, 100, 0.1);
            //addPointLight(selfRef, 0xff0000, -0.4, 17.43, 3.55, 100, 0.1);
            addPointLight(selfRef, 0xff0000, -0.8, 12.25, 2.45, 100, 0.07);
            addPointLight(selfRef, 0xff0000, -0.26, 12.2, 2.5, 100, 0.07);

            selfRef.add(mesh);
        });
    }
}

function addPointLight(object, color, x, y, z, intensity, distance) {
    var light = new THREE.PointLight(color, intensity, distance);
    light.position.set(x, y, z);
    object.add(light);
}