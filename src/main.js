import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

// Cena, câmera e renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.set(20, 10, 10);
let usarCamera2 = false;
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'c') {
    usarCamera2 = !usarCamera2;
    controls.enabled = !usarCamera2;
    controls2.enabled = usarCamera2;
    console.log(`Câmera ativa: ${usarCamera2 ? 'Câmera 2 (satélite)' : 'Câmera 1 (nave)'}`);
  }
});
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Posição da câmera
camera.position.set(0, 5, 10);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(6, 0, 0);

const controls2 = new OrbitControls(camera2, renderer.domElement);
controls2.enableDamping = true;
controls2.enabled = false;
controls2.target.set(-5, 9, -15);

// Fundo espacial
scene.background = new THREE.Color(0x000011);

// Luzes espaciais
const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const blueLight = new THREE.PointLight(0x0066ff, 0.5, 50);
blueLight.position.set(-20, 5, 0);
scene.add(blueLight);

const redLight = new THREE.PointLight(0xff0066, 0.5, 50);
redLight.position.set(20, 5, 0);
scene.add(redLight);

// Carregador GLB/GLTF com suporte a DRACO
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
loader.setDRACOLoader(dracoLoader);

let spaceship = null;

loader.load('/models/nave-imperial.glb', (gltf) => {
  spaceship = gltf.scene;

  spaceship.scale.set(0.01, 0.01, 0.01);
  spaceship.position.set(0, 0, 0);
  spaceship.rotation.y = Math.PI / 4;

  spaceship.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(spaceship);
  console.log('Nave carregada!');
}, undefined, (error) => {
  console.error('Erro ao carregar a nave:', error);
});

//---------------- satellite ----------------------
let satellite = null;
const gltfLoader = new GLTFLoader();
gltfLoader.setPath('/models/');
gltfLoader.load('satellite.glb', (gltf) => {
  const object = gltf.scene;
  object.scale.set(9, 9, 9);
  object.rotation.y = -Math.PI / 2;

  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  box.getCenter(center);
  object.position.sub(center);

  const satelliteGroup = new THREE.Group();
  object.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  satelliteGroup.add(object);
  satelliteGroup.visible = true;
  satelliteGroup.position.set(-5, 9, -15);
  satellite = satelliteGroup;
  scene.add(satellite);

  camera2.lookAt(satellite.position);

  const vertexShader = `
  precision mediump float;
  attribute vec3 position;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

  const fragmentShader = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(0.4, 0.0, 0.0, 1.0);
  }
`;

  const customMaterial = new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  const shaderGeometry = new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16);
  const shaderBox = new THREE.Mesh(shaderGeometry, customMaterial);

  shaderBox.position.set(0, 1, 0);
  satelliteGroup.add(shaderBox);

  console.log('satellite .glb carregado e centralizado!');
});

// ----------- PLANETA -----------
let planeta = null;

const planetaTexture = new THREE.TextureLoader().load('/textures/planeta.jpeg');
const planetaMaterial = new THREE.MeshStandardMaterial({ map: planetaTexture });
const planetaGeometry = new THREE.SphereGeometry(8, 64, 64);

planeta = new THREE.Mesh(planetaGeometry, planetaMaterial);

planeta.castShadow = true;
planeta.receiveShadow = true;

planeta.position.set(-30, 5, -20);

scene.add(planeta);

// ----------- LUA COM TEXTURA E ÓRBITA -----------
let luaGroup = null;
let lua = null;
let luaAngle = 0;
let luaSpeed = 0.01;

luaGroup = new THREE.Group();

const luaTexture = new THREE.TextureLoader().load('/textures/lua.jpg');
const luaMaterial = new THREE.MeshStandardMaterial({ map: luaTexture });
const luaGeometry = new THREE.SphereGeometry(5, 32, 32);

lua = new THREE.Mesh(luaGeometry, luaMaterial);

lua.castShadow = true;
lua.receiveShadow = true;

luaGroup.add(lua);
scene.add(luaGroup);

lua.position.set(2, 0, 0);
luaGroup.position.set(15, 10, 0);

// Animação
let time = 0;
let rotationSpeed = 0.003;
let hoverSpeed = 0.01;

function animate() {
  requestAnimationFrame(animate);
  time += 0.016;

  if (spaceship) {
    spaceship.rotation.y += rotationSpeed;
    spaceship.position.y = Math.sin(time * hoverSpeed) * 0.5;
    spaceship.position.x = Math.cos(time * hoverSpeed * 0.7) * 0.3;
  }

  if (satellite?.visible) {
    satellite.rotation.y += 0.002;
    satellite.rotation.x += 0.0015;
  }

  if (luaGroup && lua) {
    luaAngle += luaSpeed;
    lua.position.x = Math.cos(luaAngle) * -4;
    lua.position.z = Math.sin(luaAngle) * -4;
  }

  if (planeta) {
    planeta.rotation.y += 0.001;
  }

  blueLight.intensity = 0.3 + Math.sin(time * 0.5) * 0.2;
  redLight.intensity = 0.3 + Math.cos(time * 0.5) * 0.2;

  controls.update();
  controls2.update();
  renderer.render(scene, usarCamera2 ? camera2 : camera);
}

animate();

