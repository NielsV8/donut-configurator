import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

let donut;
const gltfLoader = new GLTFLoader();
gltfLoader.load('./assets/models/donut/scene.gltf', (gltf) => {
  donut = gltf.scene;
  gltf.scene.scale.set( 20, 20, 20 );
  scene.add(donut);
});

//add donut

const dire = new THREE.DirectionalLight(0xfffffff, 2);
dire.position.set(2, 4, 2);
scene.add(dire);
camera.position.z = 5;
camera.position.y = 1;

//mesh box
const geometry = new THREE.BoxGeometry(2, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = 0;
  cube.position.y = 1.7;
  cube.position.z = -1;
  cube.scale.x = 1;
  cube.scale.y = 0.1;
  cube.scale.z = 1;
  cube.rotation.x = 0.5;

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

document.querySelector(".random_color").addEventListener("click", () => {
	// loop over meshes
	donut.traverse((child) => {
		if (child.isMesh) {
      console.log(child);
      donut.getObjectByName("Object_6").material.color.set(Math.random() * 0xFF0000);
		}
	})
})

document.querySelector(".recolor_glaze").addEventListener("input", updateGlaze, false);
document.querySelector(".recolor_sprinkles").addEventListener("input", updateSprinkles, false);

function updateGlaze(event) {
  donut.getObjectByName("Object_6").material.color.set(event.target.value);
}

function updateSprinkles(event) {
  donut.getObjectByName("Object_8").material.color.set(event.target.value);
}

const checkbox = document.querySelector(".checkbox");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    scene.add(cube);
  } else {
    scene.remove(cube);
  }
});

