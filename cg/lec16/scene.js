// Create scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(
	75, // fov — Camera frustum vertical field of view.
	window.innerWidth/window.innerHeight, // aspect — Camera frustum aspect ratio.
	0.1, // near — Camera frustum near plane.
	1000); // far — Camera frustum far plane. 

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create geometry
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('Yellobrk.bmp')});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var light = new THREE.DirectionalLight( 0xdddddd, 1 );
light.position.set(0, 0, 1 );
scene.add( light );

// move camera from center
camera.position.x = 2; //move right from center of scene
camera.position.y = 1; //move up from center of scene
camera.position.z = 5; //move camera away from center of scene

// import camera control and rotation library
controls = new THREE.OrbitControls( camera ); 
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.noKeys = true;

var render = function () {
   requestAnimationFrame(render);

   controls.update();
   renderer.render(scene, camera);
};

render();

