var walls = [];

var horizontal = [];
var vertical = [];

room1h = [[-20, 40], [0, 40], [20, 40], [40, 40], [60, 40], [-20, -60], [0, -60], [40, -60], [60, -60]];
room1h.forEach(function (wall) {
	horizontal.push(wall);
});

room1v = [[-30, 30], [-30, 10], [-30, -10], [-30, -30], [-30, -50], [70, 30], [70, 10], [70, -10], [70, -50]];
room1v.forEach(function (wall) {
	vertical.push(wall);
});

var material = new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });

for (i = 0; i < horizontal.length; i++) {
	walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material));
	walls[i].position.set(horizontal[i][0], 10, horizontal[i][1]);
}

for (i = horizontal.length; i < vertical.length + horizontal.length; i++) {
	walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material));
	walls[i].position.set(vertical[i - horizontal.length][0], 10, vertical[i - horizontal.length][1]);
	walls[i].rotation.y = Math.PI / 2;
}

