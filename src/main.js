import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

// Cena, câmera e renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

// Fundo espacial
scene.background = new THREE.Color(0x000011);



// Luzes espaciais
const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Luz azul do lado esquerdo (efeito espacial)
const blueLight = new THREE.PointLight(0x0066ff, 0.5, 50);
blueLight.position.set(-20, 5, 0);
scene.add(blueLight);

// Luz vermelha do lado direito
const redLight = new THREE.PointLight(0xff0066, 0.5, 50);
redLight.position.set(20, 5, 0);
scene.add(redLight);



// Carregador GLB/GLTF com suporte a DRACO
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
loader.setDRACOLoader(dracoLoader);

let spaceship = null;

// Carregamento da nave
loader.load('/models/nave-imperial.glb', (gltf) => {
  spaceship = gltf.scene;
  
  // Redimensionar a nave
  spaceship.scale.set(0.01, 0.01, 0.01); // Muito pequena, ajuste conforme necessário
  
  // Posicionar no centro
  spaceship.position.set(0, 0, 0);
  
  // Rotação inicial
  spaceship.rotation.y = Math.PI / 4;
  
  // Habilitar sombras
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


//---------------- PORSCHE ----------------------
let f1Car = null;
const gltfLoader = new GLTFLoader();
gltfLoader.setPath('/models/');
gltfLoader.load('tanque.glb', (gltf) => {
  const object = gltf.scene;
  object.scale.set(0.9, 0.9, 0.9);
  object.rotation.y = -Math.PI / 2;

  // Centralizar bounding box
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  box.getCenter(center);
  object.position.sub(center);

  const carGroup = new THREE.Group();
  object.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  carGroup.add(object);
  carGroup.visible = false;

  f1Car = carGroup;
  scene.add(f1Car);
  console.log('Carro .glb carregado e centralizado!');
});

// Animação
let time = 0;
let rotationSpeed = 0.003;
let hoverSpeed = 0.01;

// Loop de animação
function animate() {
  requestAnimationFrame(animate);
  time += 0.016;

  if (spaceship?.visible) {
    spaceship.rotation.y += rotationSpeed;
    
    // Movimento de hover (sobe e desce)
    spaceship.position.y = Math.sin(time * hoverSpeed) * 0.5;
    spaceship.position.x = Math.cos(time * hoverSpeed * 0.7) * 0.3;
  }

  if (f1Car?.visible) {
    f1Car.rotation.y += 0.002;
  }

  blueLight.intensity = 0.3 + Math.sin(time * 0.5) * 0.2;
  redLight.intensity = 0.3 + Math.cos(time * 0.5) * 0.2;

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Botões: alternar objetos
window.mostrarNave = () => {
  if (spaceship) spaceship.visible = true;
  if (f1Car) f1Car.visible = false;
};

window.mostrarCarro = () => {
  if (spaceship) spaceship.visible = false;
  if (f1Car) f1Car.visible = true;
};

