const textData = `
// Import necessary libraries
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

// Configuration object
const CONFIG = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    particleCount: 10000,
    particleSize: 0.5,
    particleColor: 0xff0000,
    particleSpeed: 0.02,
    particleRotationSpeed: 0.01,
    enableFog: true,
    fogColor: 0x000000,
    fogDensity: 0.05,
    enableControls: true,
};

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, CONFIG.width / CONFIG.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(CONFIG.width, CONFIG.height);
renderer.setClearColor(CONFIG.backgroundColor);
document.body.appendChild(renderer.domElement);

// Set up fog if enabled
if (CONFIG.enableFog) {
    scene.fog = new THREE.FogExp2(CONFIG.fogColor, CONFIG.fogDensity);
}

// Create a particle system
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(CONFIG.particleCount * 3);
const velocities = new Float32Array(CONFIG.particleCount * 3);
for (let i = 0; i < CONFIG.particleCount; i++) {
    positions[i * 3] = Math.random() * 200 - 100;
    positions[i * 3 + 1] = Math.random() * 200 - 100;
    positions[i * 3 + 2] = Math.random() * 200 - 100;

    velocities[i * 3] = (Math.random() - 0.5) * CONFIG.particleSpeed;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * CONFIG.particleSpeed;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * CONFIG.particleSpeed;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

const particleMaterial = new THREE.PointsMaterial({
    color: CONFIG.particleColor,
    size: CONFIG.particleSize,
    transparent: true,
    opacity: 0.8,
});
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Set up the camera
camera.position.z = 150;

// Add orbit controls if enabled
let controls;
if (CONFIG.enableControls) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
}

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 500);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Update particle positions based on velocity
    const positions = particleGeometry.attributes.position.array;
    const velocities = particleGeometry.attributes.velocity.array;
    for (let i = 0; i < CONFIG.particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset particles that move out of bounds
        if (Math.abs(positions[i * 3]) > 100) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 100) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 100) velocities[i * 3 + 2] *= -1;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    // Rotate particles
    particles.rotation.x += CONFIG.particleRotationSpeed;
    particles.rotation.y += CONFIG.particleRotationSpeed;

    // Update controls if enabled
    if (controls) controls.update();

    // Render the scene
    renderer.render(scene, camera);
};

// Start animation
animate();

// Handle window resize
window.addEventListener('resize', () => {
    CONFIG.width = window.innerWidth;
    CONFIG.height = window.innerHeight;
    renderer.setSize(CONFIG.width, CONFIG.height);
    camera.aspect = CONFIG.width / CONFIG.height;
    camera.updateProjectionMatrix();
});

// GUI controls
const gui = new GUI();
gui.add(CONFIG, 'particleCount', 1000, 20000).step(1000).onChange(() => {
    // Update particle system on count change
    scene.remove(particles);
    particleGeometry.dispose();
    particleMaterial.dispose();
    createParticleSystem();
});
gui.add(CONFIG, 'particleSize', 0.1, 5).onChange(() => {
    particleMaterial.size = CONFIG.particleSize;
});
gui.add(CONFIG, 'particleColor').onChange(() => {
    particleMaterial.color.setHex(CONFIG.particleColor);
});
gui.add(CONFIG, 'particleSpeed', 0.01, 1).onChange(() => {
    // Update speed
    const velocities = particleGeometry.attributes.velocity.array;
    for (let i = 0; i < CONFIG.particleCount; i++) {
        velocities[i * 3] = (Math.random() - 0.5) * CONFIG.particleSpeed;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * CONFIG.particleSpeed;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * CONFIG.particleSpeed;
    }
    particleGeometry.attributes.velocity.needsUpdate = true;
});
gui.add(CONFIG, 'particleRotationSpeed', 0.001, 0.1);
gui.add(CONFIG, 'enableFog').onChange(() => {
    if (CONFIG.enableFog) {
        scene.fog = new THREE.FogExp2(CONFIG.fogColor, CONFIG.fogDensity);
    } else {
        scene.fog = null;
    }
});
gui.addColor(CONFIG, 'fogColor').onChange(() => {
    if (scene.fog) {
        scene.fog.color.setHex(CONFIG.fogColor);
    }
});
gui.add(CONFIG, 'fogDensity', 0.01, 0.1);
gui.add(CONFIG, 'enableControls').onChange(() => {
    if (CONFIG.enableControls) {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
    } else {
        if (controls) controls.dispose();
    }
});
`;

export default textData;
