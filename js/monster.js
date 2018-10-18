class Monster extends THREE.Group {
    constructor() {
        super();

        this.init();
    }

    init() {
        var g = new THREE.BoxGeometry(10, 100, 10);
        var m = new THREE.MeshPhongMaterial({ color: 0xffffff });
        this._model = new THREE.Mesh(g, m);
        this.add(this._model);
    }
}