class Monster extends THREE.Mesh {
    /**
     * Constructor, maakt een monster aan
     */
    constructor() {
        super();

        this.init();
    }

    /**
     * Init laadt de textures van het monster in en voegt poinlights toe
     */
    init() {
        var selfRef = this;
        //Hier worden het model en de texture ingeladen uit ./models/Screamer.obj en ./models/Screamer.mtl
        loadOBJModel("models/", "Screamer.obj", "models/", "Screamer.mtl", (mesh) => {
            mesh.scale.set(7, 7, 7);

            //De kleuren van de texture worden ingeladen
            var textureLoader = new THREE.TextureLoader();
            var map = textureLoader.load('textures/world_war_zombie_diffuse.png');
            var material = new THREE.MeshPhongMaterial({map: map});

            mesh.traverse(function (node){
                if(node.isMesh) node.material = material;
            });

            //Er worden 2 pointlights toegevoegd bij de ogen van het monster
            addPointLight(selfRef, 0xff0000, -0.8, 12.25, 2.45, 100, 0.07);
            addPointLight(selfRef, 0xff0000, -0.26, 12.2, 2.5, 100, 0.07);

            selfRef.add(mesh);
        });
    }
}

/**
 * De methode om een pointlight toe te voegen aan een object
 * @param {object} object 
 * @param {hex} color 
 * @param {decimal} x 
 * @param {decimal} y 
 * @param {decimal} z 
 * @param {int} intensity 
 * @param {decimal} distance 
 */
function addPointLight(object, color, x, y, z, intensity, distance) {
    var light = new THREE.PointLight(color, intensity, distance);
    light.position.set(x, y, z);
    object.add(light);
}