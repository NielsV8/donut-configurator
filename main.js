import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

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
  const rechthoekTexture = new THREE.TextureLoader().load('./assets/textures/sky.avif');
  const rechthoekGeometry = new THREE.BoxGeometry(2, 1, 1);
  const rechthoekMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: rechthoekTexture, side: THREE.FrontSide });
  const rechthoek = new THREE.Mesh(rechthoekGeometry, rechthoekMaterial);
  rechthoek.position.x = 0;
  rechthoek.position.y = 1.7;
  rechthoek.position.z = -1;
  rechthoek.scale.x = 1;
  rechthoek.scale.y = 0.1;
  rechthoek.scale.z = 1;
  rechthoek.rotation.x = 0.5;

  const vierkantGeometry = new THREE.BoxGeometry(1, 1, 1);
  const vierkantMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const vierkant = new THREE.Mesh(vierkantGeometry, vierkantMaterial);
  vierkant.position.x = 0;
  vierkant.position.y = 1.62;
  vierkant.position.z = -1;
  vierkant.scale.x = 1;
  vierkant.scale.y = 0.1;
  vierkant.scale.z = 1;
  vierkant.rotation.x = 0.5;

const cirkelGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1, 32);
const cirkelMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cirkel = new THREE.Mesh(cirkelGeometry, cirkelMaterial);
cirkel.position.x = 0;
cirkel.position.y = 1.6;
cirkel.position.z = -1;
cirkel.scale.x = 1;
cirkel.scale.y = 0.1;
cirkel.scale.z = 1;
cirkel.rotation.x = 0.5;

const ovaalGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1, 32);
const ovaalMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const ovaal = new THREE.Mesh(ovaalGeometry, ovaalMaterial);
ovaal.position.x = 0;
ovaal.position.y = 1.7;
ovaal.position.z = -1;
ovaal.scale.x = 2;
ovaal.scale.y = 0.1;
ovaal.scale.z = 1;
ovaal.rotation.x = 0.5;



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

const checkboxRechthoek = document.querySelector("#rechthoek");
const checkboxVierkant = document.querySelector("#vierkant");
const checkboxCirkel = document.querySelector("#cirkel");
const checkboxOvaal = document.querySelector("#ovaal");

checkboxRechthoek.addEventListener("change", () => {
  if (checkboxRechthoek.checked) {
    scene.remove(vierkant);
    scene.remove(cirkel);
    scene.remove(ovaal);
    scene.add(rechthoek);
  } else {
    scene.remove(rechthoek);
  }
});

checkboxVierkant.addEventListener("change", () => {
  if (checkboxVierkant.checked) {
    scene.remove(rechthoek);
    scene.remove(cirkel);
    scene.remove(ovaal);
    scene.add(vierkant);
  } else {
    scene.remove(vierkant);
  }
});

checkboxCirkel.addEventListener("change", () => {
  if (checkboxCirkel.checked) {
    scene.remove(rechthoek);
    scene.remove(vierkant);
    scene.remove(ovaal);
    scene.add(cirkel);
  } else {
    scene.remove(cirkel);
  }
});

checkboxOvaal.addEventListener("change", () => {
  if (checkboxOvaal.checked) {
    scene.remove(rechthoek);
    scene.remove(vierkant);
    scene.remove(cirkel);
    scene.add(ovaal);
  } else {
    scene.remove(ovaal);
  }
});

