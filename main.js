import * as THREE from 'three';
import './style.css';

const main_scene = new THREE.Scene();
const vid = document.createElement('video');
vid.src = '/silver-surfer-lone-drifter.3840x2160.mp4';
vid.loop = true;
vid.muted = true;
vid.play();
const vid_tex = new THREE.VideoTexture(vid);
main_scene.background = vid_tex;
const cam = new THREE.PerspectiveCamera( 70.4, window.innerWidth / window.innerHeight, 0.132, 999.89 );
const rendering = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
const bg_music = new Audio('/CHIHIRO.mp3');
bg_music.loop = true;
bg_music.volume = 0.1;

rendering.setSize(window.innerWidth, window.innerHeight);
rendering.setAnimationLoop( animate );
rendering.render(main_scene, cam);

const geo = new THREE.BoxGeometry(1.84, 1.84, 1.84);
const tex = new THREE.TextureLoader().load('/ab67616d0000b27371d62ea7ea8a5be92d3c1f62.jpg')
const mat = new THREE.MeshBasicMaterial({map: tex});
const cube = new THREE.Mesh( geo, mat );
main_scene.add(cube);
const donut_geo = new THREE.TorusGeometry(8.5, 3.2, 14, 98);
const donut_tex = new THREE.MeshBasicMaterial({color:0xF8F8F2});
const donut = new THREE.Mesh(donut_geo, donut_tex);
main_scene.add(donut);
cam.position.setZ(52);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  cube.rotation.y += 0.0135;
  cube.rotation.z += 0.0135;
  cam.position.z = t * -0.0166;
  cam.position.x = t * -0.0000;
  cam.rotation.y = t * -0.0000;
}
document.body.onscroll = moveCamera;
moveCamera();
cam.position.x = Math.sin(Date.now() * 0.0003) * 2;
cam.lookAt(main_scene.position);

function animate() {
  donut.rotation.x += 0.0187;
  donut.rotation.y += 0.0187;
  rendering.render(main_scene, cam);
}

function add_stars() {
  const stars_geo = new THREE.SphereGeometry(0.35, 19.6, 19.6);
  const stars_mat = new THREE.MeshBasicMaterial({color:0xF8F8F2});
  const stars = new THREE.Mesh(stars_geo, stars_mat);
  const [x, y, z] = Array(3)
  .fill()
  .map(()=>THREE.MathUtils.randFloatSpread(200));
  stars.position.set(x, y, z);
  main_scene.add(stars);
}
Array(200).fill().forEach(add_stars);

function playchihiro() {
  bg_music.play();
  document.removeEventListener('click', playchihiro);
  document.removeEventListener('scroll', playchihiro);
}
document.addEventListener('click', playchihiro);
document.addEventListener('scroll', playchihiro);
