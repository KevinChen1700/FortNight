var walls = [];
var horizontal = [];
var vertical = [];

var random=[12,43,19,22,7,50,39,48];

killh = [[240,-140],[220,-140],[200,-140],[240,-200],[220,-200],[200,-200]];
killh.forEach(function (wall) {
	horizontal.push(wall);
});
//190,-170
killv = [[190,-170],[250,-150],[190,-150],[190,-190],[250,-190]];
killv.forEach(function (wall) {
	vertical.push(wall);
});

room1h = [[-20, 40], [0, 40], [20, 40], [40, 40], [60, 40], [-20, -60], [0, -60], [40, -60], [60, -60]];
room1h.forEach(function (wall) {
	horizontal.push(wall);
});

room1v = [[-30, 30], [-30, 10], [-30, -10], [-30, -30], [-30, -50], [70, 30], [70, 10], [70, -10], [70, -50]];
room1v.forEach(function (wall) {
	vertical.push(wall);
});

//niggggggggggggggggggggggger
room2H = [[140,0],[180,0],[180,60],[160,60],[140,60]];
room2H.forEach(function (wall) {
	horizontal.push(wall);
});

//whatever het is klaar jammer dan fuck de plattegrond kaart map ding dat getekend is 
room2V = [[190,10],[190,50],[130,50],[130,30],[130,10]];
room2V.forEach(function (wall) {
	vertical.push(wall);
});

//kanker three.js bestand geeft random errors kanker shit
room3H = [[40,60],[60,60],[60,100],[40,100],[120,100],[100,100],[80,60],[120,60]];
room3H.forEach(function (wall) {
	horizontal.push(wall);
});

//donezo ruk tikkele zonder ruitjes papier
room3V = [[130,70],[130,90],[30,90],[30,70]];
room3V.forEach(function (wall) {
	vertical.push(wall);
});

//wazzzap
room4H = [[-40,40],[-60,40],[-60,80],[-20,80]];
room4H.forEach(function (wall) {
	horizontal.push(wall);
});
//wajjjaahfheeennennnnn
room4V = [[-10,50],[-10,70],[-70,50],[-70,70]];
room4V.forEach(function (wall) {
	vertical.push(wall);
});

//
room5H = [];
room5H.forEach(function (wall) {
	horizontal.push(wall);
});
//
room5V = [[10,170],[10,190],[10,210]];
room5V.forEach(function (wall) {
	vertical.push(wall);
});

//JSGKAF
room6H = [[-60,-60],[-100,-60],[-60,-20],[-80,-20],[-100,-20]];
room6H.forEach(function (wall) {
	horizontal.push(wall);
});
//hjafhwefjwe aids
room6V = [[-50,-50],[-50,-30],[-110,-50],[-110,-30]];
room6V.forEach(function (wall) {
	vertical.push(wall);
});

//niggggggggggggggggger er is een probleem met gang O lolzies
room7H = [[-140,-60],[-180,-60],[-140,-20],[-160,-20],[-180,-20]];
room7H.forEach(function (wall) {
	horizontal.push(wall);
});
//mofo TAKELELELELELE
room7V = [[-130,-50],[-130,-30],[-190,-50],[-190,-30]];
room7V.forEach(function (wall) {
	vertical.push(wall);
});

//done nigger aids tikkele is een kontpiraat 
hallXH = [[100,-100],[80,-20],[120, -20],[140,-20],[180,-20],[200,-20],[220,-20],[240,-20],[260,-20],[280,-20],[80,-40],[120, -40],[140, -40],[160,-40],[180,-40],[200,-40],[220,-40],[240,-40],[260,-40],[260,-160],[260,-180],[280,-180],[160,80],[160,140],[140,140],[120,140],[100,140],[80,140],[60,140],[40,140],[20,140],[140,120],[120,120],[100,120],[60,120],[40,120],[20,120]];
hallXH.forEach(function (wall) {
	horizontal.push(wall);
});
// done vuile kanker aids fuck dit fuck three.js er is een godverdomme tering tyfus reden dat er game engines zijn kanker shit
hallXv = [[90,-50],[90,-70],[90,-10],[90,10],[90,30],[90,50],[90,110],[110,-10],[110,10],[110,30],[110,50],[110,110],[70,110],[70,50],[110,-50],[110,-70],[110,-90],[270,-50],[270,-70],[270,-90],[270,-110],[270,-130],[270,-150],[290,-170],[290,-150],[290,-130],[290,-110],[290,-90],[290,-70],[290,-50],[290,-30],[170,-10],[150,-10],[150,90],[150,110],[170,90],[170,110],[170,130]];
hallXv.forEach(function (wall) {
	vertical.push(wall);
});//x =70 [90, -10] 1e y  = -10 5 stuks 40 omhoog

//nigggggger fnwefhwjuiwjehqjefjwhiwfjlwlhgdbdhgsbgskgndnjkgsdhfsdB shit fuck 
hallOH = [[-220,-60],[80,-100],[60,-100],[40,-100],[20,-100],[0,-100],[-20,-100],[-40,-100],[-60,-100],[-80,-100],[-100,-100],[-120,-100],[-140,-100],[-160,-100],[-180,-100],[-200,-100],[-220,-100],[-240,-100],[-260,-100],[-280,-100],[-300,-100],[80,-80],[60,-80],[40,-80],[0,-80],[-20,-80],[-40,-80],[-60,-80],[-100,-80],[-120,-80],[-140,-80],[-180,-80],[-200,-80],[-240,-80],[-280,-80],[-300,-60]];
hallOH.forEach(function (wall) {
	horizontal.push(wall);
});

//shceize schweinhund tikkele ist eine HOMO
hallOV = [[30,-70],[10,-70],[-70,-70],[-90,-70],[-150,-70],[-170,-70],[-210,-70],[-230,-70],[-250,-70],[-250,-50],[-250,-30],[-250,-10],[-270,-70],[-270,-50],[-270,-30],[-270,-10],[-290,-70],[-310,-70],[-310,-90]];
hallOV.forEach(function (wall) {
	vertical.push(wall);
});

//donezo tikkele is een fagetoni biatchafn msfnwefwejqkdkfwejfwenjkw
hallSQH = [[-280,0],[-300,0],[-280,20],[-300,40],[-220,0],[-220,40],[-240,40],[-240,20],[-240,60],[-220,60],[-240,80],[-220,100],[-200,80],[-200,120],[-180,100],[-180,140],[-260,80],[-160,140],[-160,120]];
hallSQH.forEach(function (wall) {
	horizontal.push(wall);
});

//ook klaaar vieze aids patientien schijt marokaan
hallSQV = [[-310,10],[-310,30],[-290,30],[-270,30],[-250,10],[-230,10],[-210,10],[-210,30],[-270,50],[-270,70],[-210,70],[-230,90],[-210,110],[-250,50],[190,30],[-190,90],[-190,130],[-170,110]];
hallSQV.forEach(function (wall) {
	vertical.push(wall);
});
//klaar?!? i dunno niks klopt aifnegkel aids iets iets iets anders iets
hallEH = [[0,100],[0,260],[-20,100],[-20,120],[-20,140],[-20,220],[-20,260],[-20,240],[-60,100],[-80,100],[-40,120],[-60,120],[-40,120],[-40,140],[-60,120],[-60,200],[-40,180],[-40,200],[-60,160],[-60,140],[-60,180],[-80,200],[-40,240],[-40,260],[-60,240],[-60,260],[-80,240],[-80,260],[-80,280],[-80,300],[-100,300],[-120,280],[-100,140],[-120,140],[-140,140],[-100,120],[-120,120],[-140,120],[-100,180],[-40,160],[-20,160],[0,160]];
hallEH.forEach(function (wall) {
	horizontal.push(wall);
});

hallEV = [[-70,130],[-70,170],[10,110],[10,150],[10,230],[10,250],[-10,130],[-10,230],[-30,170],[-50,90],[-30,90],[-70,290],[-90,270],[-90,170],[-90,150],[-90,110],[-30,210],[-90,210],[-90,230],[-110,190],[-110,210],[-110,230],[-110,250],[-110,270],[-110,290]];
hallEV.forEach(function (wall) {
	vertical.push(wall);
});


//wall number: 8,12,41best,182best,

//tga resource texture loader
var loader2 = new THREE.TextureLoader();
var texture2 = loader2.load('textures/pattern_08/specular.tga');

// continuation with loading tga texture
var materialtga = new THREE.MeshPhongMaterial({
	color:0xffffff,
	map: texture2
})

//loading of textures for wall
var textureLoader = new THREE.TextureLoader();
	wallTexture = textureLoader.load("textures/doubledoorexit.png");
	wall2Texture = textureLoader.load("textures/pattern_182/diffuse.png");	
	//wall2Texture = textureLoader.load("textures/cookiemonster.jpg")//lolzies
	extrawallTexture = textureLoader.load("textures/doubledoor.png");
	slenderwallTexture = textureLoader.load("textures/enderwall.png");
	tikkelewallTexture =  textureLoader.load("textures/tikkelewall.png");
	bloodwallTexture =  textureLoader.load("textures/bloodwall.png")
	leftdoorTexture =  textureLoader.load("textures/leftdoor.png");
	rightdoorTexture =  textureLoader.load("textures/rightdoor.png");
	bewareoftikkeleTexture =  textureLoader.load("textures/bewareoftikkele.png");

//wall making 
var material = new THREE.MeshPhongMaterial({
	//color:0x38383a,
	 side: THREE.DoubleSide,	
	 map:wallTexture
	});
	
var material2 = new THREE.MeshPhongMaterial({
	side: THREE.DoubleSide,
	map:wall2Texture
	});

var bewareoftikkele = new THREE.MeshPhongMaterial({
	//color:0x38383a,
	side: THREE.DoubleSide,	
	map:bewareoftikkeleTexture
	});
	
var extrawall = new THREE.MeshPhongMaterial({
	//color:0x38383a,
	side: THREE.DoubleSide,
	map:extrawallTexture
	});

var slenderWall = new THREE.MeshPhongMaterial({
	//color:0x38383a,
	side: THREE.DoubleSide,
	map:slenderwallTexture
	});

var tikkelewall = new THREE.MeshPhongMaterial({
	side: THREE.DoubleSide,
	map:tikkelewallTexture
	});
	
var bloodwall = new THREE.MeshPhongMaterial({
	side: THREE.DoubleSide,
	map:bloodwallTexture
	});

var leftdoor = new THREE.MeshPhongMaterial({
	side: THREE.DoubleSide,
	map:leftdoorTexture
	});

var 
	rightdoor = new THREE.MeshPhongMaterial({
	side: THREE.DoubleSide,
	map:rightdoorTexture
	});

//horizontal walls
for (i = 0; i < horizontal.length; i++) {
	if( i == 34 || i == 41 || i ==56)
	{
		walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), extrawall));
	}	
	else if( i == 0||i == 1||i == 2||i == 3||i == 4||i == 5)
	{		
	walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), slenderWall));//de werkende slenderwall
	}
	else if( i == 51||i == 69||i == 74||i == 99||i == 111||i == 158||i == 165||i == 131||i == 145||i == 134||i == 157 ||i == 29||i == 12||i == 31||i == 47||i == 59||i == 18)
	{		
	walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), bloodwall));//de werkende slenderwall
	}	
	else if( i == 53||i == 61||i == 79||i == 92||i == 120||i == 158||i == 160||i == 121||i == 150||i == 139||i == 157 ||i == 141||i == 19||i == 31||i == 41||i == 59||i == 18)
	{		
	walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), bewareoftikkele));//de werkende slenderwall
	}	
	else
	{
	walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material2));
	}

	walls[i].position.set(horizontal[i][0], 10, horizontal[i][1]);
}

//vertical walls
for (i = horizontal.length; i < vertical.length + horizontal.length; i++) {	
	if( i == horizontal.length)//exit door at slenderlair
	{//wtf horizontal.length = 176
	walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material));
	}	
	else if(i == 1 +horizontal.length||i == 2+horizontal.length||i == 3+horizontal.length||i == 4+horizontal.length)
	{
		walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), slenderWall));
	}
	//needs to be higher then 176 and lower then 313
	else if(i == 190 ||i == 230||i == 43||i == 237||i == 210||i == 337||i == 270||i == 254||i == 245||i == 290||i == 237||i == 199||i == 183||i == 218||i == 300)
	{
		walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), tikkelewall));
	}
	else
	{
	walls.push(new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material2));
	}
	
	
	walls[i].position.set(vertical[i - horizontal.length][0], 10, vertical[i - horizontal.length][1]);
	walls[i].rotation.y = Math.PI / 2;
	walls[i].receiveShadow = true;
	walls[i].castShadow = false;
	//end of loop

	function loadObjects () {
   
		//alle modellen inladen

		loadOBJModel("models/", "bookshelf.obj", "models/", "bookshelf.mtl", (mesh) => {
			mesh.scale.set(8,8,8);
			mesh.material = new THREE.MeshBasicMaterial;
			mesh.position.set(-26,2,32);
			props.add(mesh);

			var mesh2 = mesh.clone();
			mesh2.position.set(245,3,-155);
			mesh2.rotation.z = 1.5;
			props.add(mesh2);

			var mesh3 = mesh.clone();
			mesh3.position.set(-60,2,52);
			props.add(mesh3);
		});
		loadOBJModel("models/", "lamp.obj", "models/", "lamp.mtl", (mesh) => {
			mesh.scale.set(2.5,2,2);
			mesh.material = new THREE.MeshBasicMaterial;
			mesh.position.set(-25,12,15);
			props.add(mesh);

			var mesh2 = mesh.clone();
			mesh2.position.set(-2,12,138);
			props.add(mesh2);

			var mesh3 = mesh.clone();
			mesh3.rotation.z = 1.5;
			mesh3.position.set(-152,2,-40);
			props.add(mesh3);

			var mesh4 = mesh.clone();
			mesh4.position.set(-60,12,62);
			props.add(mesh4);
		});
		loadOBJModel("models/", "shackles.obj", "models/", "shackles.mtl", (mesh) => {
			mesh.scale.set(0.5,0.5,0.5);
			mesh.material = new THREE.MeshBasicMaterial;
			mesh.position.set(-22,0,-35);
			props.add(mesh);
		});
		loadOBJModel("models/", "window.obj", "models/", "window.mtl", (mesh) => {
			mesh.scale.set(15,15,15);
			mesh.material = new THREE.MeshBasicMaterial;
			mesh.rotation.z = 1.5;
			mesh.position.set(15,1,-35);
			props.add(mesh);

			var mesh2 = mesh.clone();
			mesh2.position.set(200,1,-160);
			props.add(mesh2);

			var mesh3 = mesh.clone();
			mesh3.position.set(-55,1,72);
			props.add(mesh3);
		});
		loadOBJModel("models/", "window2.obj", "models/", "window2.mtl", (mesh) => {
			mesh.scale.set(40,40,40);
			mesh.material = new THREE.MeshBasicMaterial;
			mesh.position.set(69,3,-15);
			props.add(mesh);
		});
		loadOBJModel("models/", "benchBroken.obj", "models/", "benchBroken.mtl", (mesh) => {
			mesh.scale.set(20,20,20);
			mesh.material = new THREE.MeshBasicMaterial;
			mesh.position.set(65,5,25);
			mesh.rotation.set(1,0,0);
			props.add(mesh);
		});
		loadOBJModel("models/", "shovel.obj", "models/", "shovel.mtl", (mesh) => {
		 mesh.scale.set(15,15,15);
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.position.set(120,4,-22);
		 mesh.rotation.x = 5;
		 props.add(mesh);
	 });
	 loadOBJModel("models/", "tafel.obj", "models/", "tafel.mtl", (mesh) => {
		 mesh.scale.set(5,5,5);
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.position.set(140,3,25);
		 props.add(mesh);

		 var mesh2 = mesh.clone();
		 mesh2.position.set(220,3,-180);
		 mesh2.rotation.z = 1.5;
		 mesh2.rotation.y = 1.5;
		 props.add(mesh2);
	 });

	 loadOBJModel("models/", "gravestoneDebris.obj", "models/", "gravestoneDebris.mtl", (mesh) => {
		 mesh.scale.set(20,20,20);
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.position.set(185,1,35);
		 props.add(mesh);
	 });
	 loadOBJModel("models/", "cross.obj", "models/", "cross.mtl", (mesh) => {
		 mesh.scale.set(10,10,10);
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.position.set(280,1,-180);
		 props.add(mesh);
	 });
	 loadOBJModel("models/", "lanternGlass.obj", "models/", "lanternGlass.mtl", (mesh) => {
		 mesh.scale.set(8,8,8);
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.position.set(75,12,138);
		 props.add(mesh);
	 });
	 loadOBJModel("models/", "gravestoneBroken.obj", "models/", "gravestoneBroken.mtl", (mesh) => {
		 mesh.scale.set(20,20,20);
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.rotation.y = 1.5
		 mesh.position.set(50,1,75);
		 props.add(mesh);
	 });
	 loadOBJModel("models/", "detailChalice.obj", "models/", "detailChalice.mtl", (mesh) => {
		 mesh.scale.set(10,10,10);
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.position.set(-300,3.5,-70);
		 props.add(mesh);
	 });
	 loadOBJModel("models/", "bed.obj", "models/", "bed.mtl", (mesh) => {
		 var textureLoader = new THREE.TextureLoader();
				 var map = textureLoader.load('models/bedTexture.png');
				 var material = new THREE.MeshPhongMaterial({map: map});
	 
				 mesh.traverse(function (node){
					 if(node.isMesh) node.material = material;
				 });
		 
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.position.set(-6,3,167);
		 props.add(mesh);

		 var mesh2 = mesh.clone();
		 mesh2.rotation.x = 1.5;
		 mesh2.rotation.z = 1.5;
		 mesh2.position.set(-92,5,-40);
		 props.add(mesh2);
		 
		 var mesh3 = mesh.clone();
		 mesh3.position.set(-35,2,47);
		 props.add(mesh3);
	 });
	 
	 loadOBJModel("models/", "Sedia.obj", "models/", "Sedia.mtl", (mesh) => {
		 var textureLoader = new THREE.TextureLoader();
				 var map = textureLoader.load('models/Sedia.png');
				 var material = new THREE.MeshPhongMaterial({map: map});
	 
				 mesh.traverse(function (node){
					 if(node.isMesh) node.material = material;
				 });
		 mesh.scale.set(0.3,0.3,0.3);
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.rotation.y = 1.5;
		 mesh.position.set(-300,3.5,-70);
		 props.add(mesh);
	 });
	 
	 loadOBJModel("models/", "body.obj", "models/", "cross.mtl", (mesh) => {
		 var textureLoader = new THREE.TextureLoader();
				 var map = textureLoader.load('models/body.png');
				 var material = new THREE.MeshPhongMaterial({map: map});
	 
				 mesh.traverse(function (node){
					 if(node.isMesh) node.material = material;
				 });
		 mesh.scale.set(0.09,0.09,0.09);
		 mesh.material = new THREE.MeshBasicMaterial;
		 mesh.rotation.x = 4.65;
		 mesh.position.set(-17,2.3,72);
		 props.add(mesh);
	 });
}
}

	
	







