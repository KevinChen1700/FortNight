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
            mesh.scale.set(10, 10, 10);

            //mesh.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/Naamloos.png"), side: THREE.DoubleSide });

            var textureLoader = new THREE.TextureLoader();
            var map = textureLoader.load('textures/world_war_zombie_diffuse.png');
            var material = new THREE.MeshPhongMaterial({map: map});

            mesh.traverse(function (node){
                if(node.isMesh) node.material = material;
            });
            selfRef.add(mesh);
        });
    }
}