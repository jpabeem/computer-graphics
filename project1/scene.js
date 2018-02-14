// Create scene
let scene = new THREE.Scene();

// Create camera
let camera = new THREE.PerspectiveCamera(
	75, // fov — Camera frustum vertical field of view.
	window.innerWidth/window.innerHeight, // aspect — Camera frustum aspect ratio.
	0.1, // near — Camera frustum near plane.
	5000); // far — Camera frustum far plane. 

// Create renderer
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add an event listener for the 'keypress' event
document.addEventListener( 'keypress', onDocumentKeyPress, false );

let directions  = ["img/posx.jpg", "img/negx.jpg", "img/posy.jpg", "img/negy.jpg", "img/posz.jpg", "img/negz.jpg"];
let materialArray = [];
for (var i = 0; i < 6; i++)
{
   materialArray.push(
      new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture( directions[i]),
         side: THREE.DoubleSide})
   );
}
	
let skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );	
let skyMaterial = new THREE.MeshFaceMaterial( materialArray );
let skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
scene.add( skyBox );

let geometry = new THREE.BoxGeometry( 1, 1, 1 );
let brickMap = THREE.ImageUtils.loadTexture("img/brick.jpg");

let material = new THREE.MeshBasicMaterial(
    { map: brickMap },
);

let cube = new THREE.Mesh( geometry, material );
cube.position.set(2, 0.8, 2);
cube.scale.set( 2, 2, 2 );
// scene.add( cube );

// concrete buildings
let concreteBuildings = [];
let concreteMap = THREE.ImageUtils.loadTexture("img/concrete1.jpg");

material = new THREE.MeshBasicMaterial(
    { map: concreteMap }
)

let concreteHouse1 = new THREE.Mesh( geometry, material );
concreteBuildings.push( concreteHouse1 );
concreteHouse1.position.set(5, 7, -10);
concreteHouse1.scale.set( 8, 15, 14 );

let concreteHouse2 = new THREE.Mesh( geometry, material );
concreteBuildings.push( concreteHouse2 );

concreteHouse2.position.set(14, 7, -10);
concreteHouse2.scale.set( 8, 15, 14 );
concreteHouse2.rotation.x = 0;
concreteHouse2.rotation.y = 0.15;

let concreteHouse3 = new THREE.Mesh( geometry, material );
concreteBuildings.push( concreteHouse3 );

concreteHouse3.position.set(23, 7, -10);
concreteHouse3.scale.set( 8, 15, 14 );
concreteHouse3.rotation.x = 0;
concreteHouse3.rotation.y = 0.30;

let concreteHouse4 = new THREE.Mesh( geometry, material );
concreteBuildings.push( concreteHouse4 );

concreteHouse4.position.set(32, 7, -10);
concreteHouse4.scale.set( 8, 15, 14 );
concreteHouse4.rotation.x = 0;
concreteHouse4.rotation.y = 0.40;

// add concrete buildings to scene
concreteBuildings.forEach(tree => {
    scene.add( tree );
});

// tree
let leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
let leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
let leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
let stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );

let light = new THREE.DirectionalLight( 0xEEFFD3, 1 );
light.position.set( 0, 0, 1 );
scene.add( light );

light = new THREE.DirectionalLight( 0xFF0000, 0.4 );
light.position.set( 1, 0, 0 );
scene.add( light );

light = new THREE.DirectionalLight( 0xFFFFFF, 0.2 );
light.position.set( 0, 1, 0 );
scene.add( light );

let stem = new THREE.Mesh( geometry, stemMaterial );
stem.position.set( 0, 0, 0 );
stem.scale.set( 0.3, 1.5, 0.3 );

let squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
squareLeave01.position.set( 0.5, 1.6, 0.5 );
squareLeave01.scale.set( 0.8, 0.8, 0.8 );

let squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
squareLeave02.position.set( -0.4, 1.3, -0.4 );
squareLeave02.scale.set( 0.7, 0.7, 0.7 );

let squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
squareLeave03.position.set( 0.4, 1.7, -0.5 );
squareLeave03.scale.set( 0.7, 0.7, 0.7 );

let leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
leaveDark.position.set( 0, 1.2, 0 );
leaveDark.scale.set( 1, 2, 1 );

let leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
leaveLight.position.set( 0, 1.2, 0 );
leaveLight.scale.set( 1.1, 0.5, 1.1 );

let ground = new THREE.Mesh( geometry, leaveDarkDarkMaterial );
ground.position.set( 0, -1, 0 );
ground.scale.set( 2.4, 0.8, 2.4 );

let tree1 = new THREE.Group();
tree1.add( leaveDark );
tree1.add( leaveLight );
tree1.add( squareLeave01 );
tree1.add( squareLeave02 );
tree1.add( squareLeave03 );
tree1.add( ground );
tree1.add( stem );

tree1.rotation.y = 0;
tree1.rotation.x = 0;

tree1.position.set(7.8, 1.0, 0);

scene.add( tree1 );

// second tree
let tree2 = tree1.clone();
tree2.position.set(18.2, 1.0, -1);
tree2.rotation.y = 0.15;

scene.add( tree2 );

// third tree
let tree3 = tree1.clone();
tree3.position.set(28.6, 1.0, -1.5);
tree3.rotation.y = 0.30;

scene.add( tree3 );

// fourth tree
let tree4 = tree1.clone();
tree4.position.set(38, 1.0, -2);
tree4.rotation.y = 0.40;

scene.add( tree4 );

// pavements
let pavements = [];
let pavementMap = THREE.ImageUtils.loadTexture("img/broken_pavement.jpg");

material = new THREE.MeshBasicMaterial(
    { map: pavementMap }
)

let pavement1 = new THREE.Mesh( geometry, material );
pavements.push( pavement1 );
pavement1.position.set(5, -0.8, 1);
pavement1.scale.set( 8, 0.8, 8 );

let pavement2 = new THREE.Mesh( geometry, material );
pavements.push( pavement2 );
pavement2.position.set(15.6, -0.8, 0.93);
pavement2.scale.set( 8, 0.8, 8 );
pavement2.rotation.y = 0.15;

let pavement3 = new THREE.Mesh( geometry, material );
pavements.push( pavement3 );
pavement3.position.set(26.3, -0.8, 0.50);
pavement3.scale.set( 8, 0.8, 8 );
pavement3.rotation.y = 0.30;

let pavement4 = new THREE.Mesh( geometry, material );
pavements.push( pavement4 );
pavement4.position.set(36.2, -0.8, 0.05);
pavement4.scale.set( 8, 0.8, 8 );
pavement4.rotation.y = 0.40;


pavements.forEach(pavement => {
    scene.add ( pavement )
});

// line (vectors)
material = new THREE.LineBasicMaterial({ color: 0x0000ff });

vectorGeometry = new THREE.Geometry();
vectorGeometry.vertices.push(new THREE.Vector3(0, -0.3, 5.7));
vectorGeometry.vertices.push(new THREE.Vector3(40, -0.3, 5.7));
// vectorGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));

line = new THREE.Line(vectorGeometry, material);

scene.add(line);

// floor
let floor = new THREE.Mesh( geometry, leaveDarkDarkMaterial );
floor.position.set( 0, -1, 0 );
floor.scale.set( 100, 0.8, 100 );

scene.add( floor );
  
let ambient = new THREE.AmbientLight( 0x404040 );
scene.add( ambient );

let axisHelper = new THREE.AxisHelper( 5 );
scene.add( axisHelper );

// let light = new THREE.DirectionalLight( 0xffffff, 1.5 );
// light.position.set(0, 0, 1 );
// scene.add( light );

hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 ); 
hemiLight.position.set( 500, 500, 0 );
scene.add(hemiLight);

let loader = new THREE.JSONLoader();
loader.load( 'json/House.json', function ( geometry ) {
    let houseMap = THREE.ImageUtils.loadTexture("img/house-tex.png");

    let houseMesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial(
        { map: houseMap }
    ) );

    scene.add(houseMesh);
});
loader.load( 'json/Lantern.json', function ( geometry ) {
    let lanternMap = THREE.ImageUtils.loadTexture("img/lantern-tex.png");

    let lanternMesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial(
        { map: lanternMap }
    ) );

    lanternMesh.position.x = -6;
    lanternMesh.position.y = 0;
    lanternMesh.position.z = 0;

    scene.add(lanternMesh);
});
loader.load( 'json/Tree.json', function ( geometry ) {
    let treeMap = THREE.ImageUtils.loadTexture("img/tree-tex.png");

    let treeMesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial(
        { map: treeMap }
    ) );

    treeMesh.position.x = -4;
    treeMesh.position.y = 0;
    treeMesh.position.z = 0;

    scene.add(treeMesh);
});

// move camera from center
camera.position.x = 2; //move right from center of scene
camera.position.y = 1; //move up from center of scene
camera.position.z = 5; //move camera away from center of scene

// import camera control and rotation library
controls = new THREE.OrbitControls( camera ); 
controls.autoRotate = false;
controls.autoRotateSpeed = 2;
controls.noKeys = false;

function onDocumentKeyPress( event ) {

    var keyCode = event.which;
    var positionDelta = 10;
    var rotationDelta = 0.1;
    
    // left arrow
    if ( keyCode == 37 )
    {
        console.log("Left rotation")
        camera.position.x += rotationDelta;
    }
    // up arrow
    else if ( keyCode == 38 )
    {
        camera.position.z += rotationDelta;
    }
    // right arrow
    else if ( keyCode == 39 )
    {
        camera.position.x -= rotationDelta;
    }
    // down arrow
    else if ( keyCode == 40 )
    {
        camera.position.z -= rotationDelta;
    }
}

let render = function () {
   requestAnimationFrame(render);

   controls.update();
   renderer.render(scene, camera);
};

render();