import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a light source
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Create a grid helper (optional for reference)
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// Load the glb model using GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load(
    'whisky_3d_model.glb',  // Replace with your model's path
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0, 0, 0); // Position the model as needed
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Display loading progress
    },
    function (error) {
        console.error('An error happened', error); // Handle errors
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
