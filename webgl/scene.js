let showXYZHelper = true;
let showLightHelper = true;
let toggleAnimations = true;
let toggleAutoRotate = false;

function randomNum(low, high)
{
    return Math.floor((Math.random() * high) + low);
}

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

// add an event listener for the 'keypress' and 'onresize' events
document.addEventListener( 'keypress', onDocumentKeyPress, false );
window.addEventListener('resize', function(event){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect(window.innerWidth/window.innerHeight);
});

// add event listeners to all the buttons shown in index.html
document.getElementById("xyz-helper").addEventListener("click", function() {
    if (showXYZHelper) {
        showXYZHelper = false;
        scene.remove(axisHelper);
        document.getElementById("xyz-helper").innerHTML = "Show XYZ Helper";
    } else {
        showXYZHelper = true;
        scene.add(axisHelper);
        document.getElementById("xyz-helper").innerHTML = "Hide XYZ Helper";
    }
});

document.getElementById("light-helper").addEventListener("click", function() {
    if (showLightHelper) {
        showLightHelper = false;
        scene.remove(directionalLightHelper);
        document.getElementById("light-helper").innerHTML = "Show LightHelper";
    } else {
        showLightHelper = true;
        scene.add(directionalLightHelper);
        document.getElementById("light-helper").innerHTML = "Hide LightHelper";
    }
});

document.getElementById("toggle-animations").addEventListener("click", function() {
    if (toggleAnimations)
        toggleAnimations = false;
    else toggleAnimations = true;
});

document.getElementById("toggle-auto-rotate").addEventListener("click", function() {
    if (toggleAutoRotate) {
        toggleAutoRotate = false;
    }
    else {
        toggleAutoRotate = true;
    }
    controls.autoRotate = toggleAutoRotate;
});


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

let material = new THREE.MeshPhongMaterial(
    { map: brickMap }
);

let cube = new THREE.Mesh( geometry, material );
cube.position.set(2, 0.8, 2);
cube.scale.set( 2, 2, 2 );
// scene.add( cube );

// concrete buildings
let concreteBuildings = [];
let concreteMap = THREE.ImageUtils.loadTexture("img/concrete1.jpg");

material = new THREE.MeshPhongMaterial(
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
concreteHouse2.rotation.y = 0.15;

let concreteHouse3 = new THREE.Mesh( geometry, material );
concreteBuildings.push( concreteHouse3 );

concreteHouse3.position.set(23, 7, -10);
concreteHouse3.scale.set( 8, 15, 14 );
concreteHouse3.rotation.y = 0.30;

let concreteHouse4 = new THREE.Mesh( geometry, material );
concreteBuildings.push( concreteHouse4 );

concreteHouse4.position.set(32, 7, -10);
concreteHouse4.scale.set( 8, 15, 14 );
concreteHouse4.rotation.y = 0.40;

// add concrete buildings to scene
concreteBuildings.forEach(tree => {
    scene.add( tree );
});

/*
    Trees
*/
let trees = [];

/* define tree */
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

// first tree
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

trees.push(tree1);

// second tree
let tree2 = tree1.clone();
tree2.position.set(18.2, 1.0, -1);
tree2.rotation.y = 0.15;

trees.push(tree2);


// third tree
let tree3 = tree1.clone();
tree3.position.set(28.6, 1.0, -1.5);
tree3.rotation.y = 0.30;

trees.push(tree3);

// fourth tree
let tree4 = tree1.clone();
tree4.position.set(38, 1.0, -2);
tree4.rotation.y = 0.40;

trees.push(tree4);

// add trees to scene
trees.forEach(tree => {
    scene.add(tree);
});

/*
    Pavements
*/
let pavements = [];

/* define pavements */
let pavementMap = THREE.ImageUtils.loadTexture("img/broken_pavement.jpg");

material = new THREE.MeshPhongMaterial(
    { map: pavementMap }
)

// pavement 1
let pavement1 = new THREE.Mesh( geometry, material );
pavements.push( pavement1 );
pavement1.position.set(5, -0.8, 1);
pavement1.scale.set( 8, 0.8, 8 );

// pavement 2
let pavement2 = new THREE.Mesh( geometry, material );
pavements.push( pavement2 );
pavement2.position.set(15.6, -0.8, 0.93);
pavement2.scale.set( 8, 0.8, 8 );
pavement2.rotation.y = 0.15;

// pavement 3
let pavement3 = new THREE.Mesh( geometry, material );
pavements.push( pavement3 );
pavement3.position.set(26.3, -0.8, 0.50);
pavement3.scale.set( 8, 0.8, 8 );
pavement3.rotation.y = 0.30;

// pavement 4
let pavement4 = new THREE.Mesh( geometry, material );
pavements.push( pavement4 );
pavement4.position.set(36.2, -0.8, 0.05);
pavement4.scale.set( 8, 0.8, 8 );
pavement4.rotation.y = 0.40;

// add pavements to scene
pavements.forEach(pavement => {
    scene.add( pavement );
});

/*
    Street lanterns
*/
let lanterns = [];

/* define street lanterns */
let lanternMaterial = new THREE.MeshPhongMaterial( { color: 0xB0C4DE } );

let lanternStem = new THREE.Mesh( geometry, lanternMaterial );
lanternStem.position.set( 0, 4, 0 );
lanternStem.scale.set( 0.3, 10, 0.3 );

let lanternEnd = new THREE.Mesh( geometry, lanternMaterial );
lanternEnd.position.set( 0, 8.0, -0.3 );
lanternEnd.scale.set( 0.3, 0.3, 0.4 );

lanternMaterial = new THREE.MeshLambertMaterial({color: 0xB0C4DE, transparent: true, opacity: 0.5});
let lanternGeometry = new THREE.SphereGeometry(1,32,24, Math.PI/2, Math.PI*2, 5000, Math.PI);
lanternMaterial.side = THREE.DoubleSide;

let lanternSphere = new THREE.Mesh( lanternGeometry, lanternMaterial );
lanternSphere.position.set( 0, 7.9, -1.5 );
lanternSphere.scale.set( 1, 1, 1 );

// lantern 1
let lantern1 = new THREE.Group();
lantern1.add( lanternStem );
lantern1.add( lanternEnd );
lantern1.add( lanternSphere );
lantern1.position.set(0, 0.3, 15);

lanterns.push( lantern1 );

// lantern 2
let lantern2 = lantern1.clone();
lantern2.position.set(15, 0.3, 15);
lanterns.push( lantern2 );

// lantern 3
let lantern3 = lantern1.clone();
lantern3.position.set(30, 0.3, 15);
lanterns.push( lantern3 );

// lantern 4
let lantern4 = lantern1.clone();
lantern4.position.set(45, 0.3, 15);
lanterns.push( lantern4 );

// add lanterns to scene
lanterns.forEach(lantern => {
    scene.add( lantern );
});

// floor
let floor = new THREE.Mesh( geometry, leaveDarkDarkMaterial );
floor.position.set( 0, -1, 0 );
floor.scale.set( 100, 0.8, 100 );

scene.add( floor );
  
let ambient = new THREE.AmbientLight( 0x404040 );
scene.add( ambient );

// light , light helpers & axis helpers
let axisHelper = new THREE.AxisHelper( 5 );
scene.add( axisHelper );

scene.add( new THREE.AmbientLight( 0x00020 ) );

light = new THREE.DirectionalLight( 0xFFFFFF, 0.2 );
light.position.set( -50, 500, 50 );
scene.add( light );

let directionalLightHelper = new THREE.DirectionalLightHelper ( light );
scene.add( directionalLightHelper )

/*
    Loading JSON models
*/
let loader = new THREE.JSONLoader();
/* 
    Used to retrieve the angle for a certain building
    "key" : "value" corresponds to:
    house number : angle 
*/
let rotationDictionary = { 
    0: 0,
    1: 0.10,
    2: 0.30,
    3: 0.40
};

// Concrete house (with balcony and glass windows)
loader.load( 'json/house-2.json', function ( geometry ) {
    let house2Map = THREE.ImageUtils.loadTexture("img/house-tex-2.jpg");
    let house2Mat = new THREE.MeshPhongMaterial(
        { map: house2Map,side: THREE.DoubleSide }
    );


    for(let i = 0; i < 5; i++)
    {
        let house2Mesh = new THREE.Mesh( geometry, house2Mat );

        house2Mesh.scale.set(2.8,2.8,2.8);

        house2Mesh.rotation.y = 3.1;

        house2Mesh.position.x = -3.3 + (i * -9.3);
        house2Mesh.position.y = 0;
        house2Mesh.position.z = -9;

        scene.add(house2Mesh);
    }
});

// Lantern
loader.load( 'json/Lantern.json', function ( geometry ) {
    let lanternMap = THREE.ImageUtils.loadTexture("img/lantern-tex.png");

    let lanternMesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial(
        { map: lanternMap }
    ) );

    let totalHouses = 4;
    let initialX = 1.5;
    let lanternXDictionary = {
        0: 1.5,
        1: 12,
        2: 22.5,
        3: 32.5
    }

    for(i = 0; i < totalHouses; i++) {
        let tempLantern = lanternMesh.clone();
        tempLantern.scale.set(1, 2, 1);
        tempLantern.position.set(lanternXDictionary[i], -0.5, 0);
        tempLantern.rotation.y = rotationDictionary[i];
        scene.add(tempLantern);
    }
});

// Solar panel
loader.load( 'json/Solarpanel.json', function ( geometry ) {
    let sunPanelMap = THREE.ImageUtils.loadTexture("img/zonpaneel-tex.jpg");

    let sunPanelMesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial(
        { map: sunPanelMap }
    ) );

    sunPanelMesh.position.x = -6;
    sunPanelMesh.position.y = 0;
    sunPanelMesh.position.z = 3;

    let houseCount = 3; /* amount of houses (left to right) equipped with solar panels */
    let rowCount = 3; /* amount of rows with solar panels per house */
    let columnCount = 3; /* amount of solar panels per row */
    let initialX = 2.5; /* starting point on X-axis for every house*/
    let initialZ = -14;  /* starting point on Z-axis */

    let initialXDictionary = {
        1: 2.5,
        2: 12,
        3: 21,
        4: 28
    }

    // Create solar panels for every house
    for(houseNumber = 1; houseNumber <= houseCount; houseNumber++) {
        for(row = 1; row <= rowCount; row++) {
            initialX = initialXDictionary[houseNumber];
            for(i = 1; i <= columnCount; i++ ) {
                let tempSolarPanel = sunPanelMesh.clone();
                tempSolarPanel.scale.set(2, 1, 2);
                tempSolarPanel.position.set(initialX, 14.5, initialZ);
                tempSolarPanel.rotation.y = rotationDictionary[houseNumber - 1];
                scene.add(tempSolarPanel);
                initialX += 2.5;
            }
            initialZ += 4;
        }
        initialZ = -14;
    }
});

// Ward (custom designed model)
let wardMesh;
loader.load( 'json/Ward.json', function ( geometry ) {
    let wardMap = THREE.ImageUtils.loadTexture("img/ward-tex.png");
    let wardMat = new THREE.MeshPhongMaterial(
        { map: wardMap }
    );

    wardMat.transparent = true;

    wardMesh = new THREE.Mesh( geometry, wardMat);

    wardMesh.position.x = -30;
    wardMesh.position.y = 0;
    wardMesh.position.z = 3;

    scene.add(wardMesh);
});

// Tree
loader.load( 'json/Tree.json', function ( geometry ) {
    let treeMap = THREE.ImageUtils.loadTexture("img/tree-tex.png");
    let treeMat = new THREE.MeshPhongMaterial(
        { map: treeMap }
    );

    // Draw a forest of trees
    for(let i = 0; i < 17; i++)
    {
        let treeMesh = new THREE.Mesh( geometry, treeMat );

        let scale = 5 + randomNum(0, 5);

        treeMesh.scale.set(scale, scale, scale);

        treeMesh.rotation.y = randomNum(0,4);

        treeMesh.position.x = -50 + i * 6;
        treeMesh.position.y = 0;
        treeMesh.position.z = 20 + randomNum(0, scale);

        scene.add(treeMesh);
    }
    for(let i = 0; i < 17; i++)
    {
        let treeMesh = new THREE.Mesh( geometry, treeMat );

        let scale = 5 + randomNum(0, 5);

        treeMesh.scale.set(scale, scale, scale);

        treeMesh.rotation.y = randomNum(0,4);

        treeMesh.position.x = -50 + i * 6;
        treeMesh.position.y = 0;
        treeMesh.position.z = 30 + randomNum(0, scale);

        scene.add(treeMesh);
    }
    for(let i = 0; i < 17; i++)
    {
        let treeMesh = new THREE.Mesh( geometry, treeMat );

        let scale = 5 + randomNum(0, 5);

        treeMesh.scale.set(scale, scale, scale);

        treeMesh.rotation.y = randomNum(0,4);

        treeMesh.position.x = -50 + i * 6;
        treeMesh.position.y = 0;
        treeMesh.position.z = -(25 + randomNum(0, scale));

        scene.add(treeMesh);
    }
    for(let i = 0; i < 17; i++)
    {
        let treeMesh = new THREE.Mesh( geometry, treeMat );

        let scale = 5 + randomNum(0, 5);

        treeMesh.scale.set(scale, scale, scale);

        treeMesh.rotation.y = randomNum(0,4);

        treeMesh.position.x = -50 + i * 6;
        treeMesh.position.y = 0;
        treeMesh.position.z = -(35 + randomNum(0, scale));

        scene.add(treeMesh);
    }
});

// move camera from center
camera.position.x = 2; //move right from center of scene
camera.position.y = 1; //move up from center of scene
camera.position.z = 5; //move camera away from center of scene
// import camera control and rotation library
controls = new THREE.OrbitControls( camera ); 
controls.autoRotate = false;
controls.autoRotateSpeed = 4;
controls.noKeys = false;

camera.position.set(  -15, 40, 30);

controls.update();

// method that gets executed when the corresponding event was fired
function onDocumentKeyPress( event ) {

    var keyCode = event.which;
    var positionDelta = 10;
    var rotationDelta = 0.1;
    
    // left arrow
    if ( keyCode == 37 )
    {
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

let rot = 0;
let render = function () {
   requestAnimationFrame(render);
   
   if (wardMesh !== undefined && toggleAnimations) {
        rot += 0.05;
        wardMesh.position.x += Math.cos(rot) / 3;
        wardMesh.position.z += Math.sin(rot) / 3;
   }

   controls.update();
   renderer.render(scene, camera);
};

render();