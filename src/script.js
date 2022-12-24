import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


const gltfLoader = new GLTFLoader()

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Fog
const fog = new THREE.Fog('#262837' , 1 , 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('textures/door/color.jpg')
const alphaColorTexture = textureLoader.load('textures/door/alpha.jpg')
const ambientTexture = textureLoader.load('textures/door/ambientOcculusion.jpg')
const heightTexture = textureLoader.load('textures/door/height.jpg')
const metalnessTexture = textureLoader.load('textures/door/metalness.jpg')
const normalTexture = textureLoader.load('textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('textures/door/roughness.jpg')

const bricksNormalTextures = textureLoader.load('textures/bricks/normal.jpg')
const bricksAmbientTextures = textureLoader.load('textures/bricks/ambient.jpg')
// const bricksHeighTextures = textureLoader.load('textures/bricks/height.jpg')
const bricksRoughnessTextures = textureLoader.load('textures/bricks/roughness.jpg')
const bricksColorTextures = textureLoader.load('textures/bricks/albedo.jpg')

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

/**
 * Walls
 */

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4 , 2.5 , 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTextures,
        aoMap: bricksAmbientTextures,
        transparent: true,
        normalMap:bricksNormalTextures,
        roughnessMap: bricksRoughnessTextures,
        // displacementMap: bricksHeighTextures,        
    })
)
walls.geometry.setAttribute('uv2' , new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array , 2))
walls.position.y = 2.5 / 2
house.add(walls)

/**
 * Roof
 */

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5 , 1 , 4),
    new THREE.MeshStandardMaterial({
        color: '#b35f45'
    })
)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25

house.add(roof)

/**
 * Door
 */
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2 , 2.2 , 100 , 100),
    new THREE.MeshStandardMaterial({
       map: doorColorTexture,
       alphaMap: alphaColorTexture,
       transparent : true,
       aoMap: ambientTexture,
       displacementMap: heightTexture,
       displacementScale: 0.1,
       normalMap: normalTexture,
       metalnessMap: metalnessTexture,
       roughnessMap: roughnessTexture
    })
)
door.geometry.setAttribute('uv2' , new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array , 2))
door.position.z = 1.99
door.position.y = 1

house.add(door)

/**
 * Bushes
 */
const bushGeometry = new THREE.SphereGeometry(1 , 16 , 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#89c854'
})

const bush1 = new THREE.Mesh(bushGeometry , bushMaterial)
bush1.scale.set(0.4 , 0.4 , 0.4)
bush1.position.set(1.2 , 0.3 , 2.35)

const bush2 = new THREE.Mesh(bushGeometry , bushMaterial)
bush2.scale.set(0.25 , 0.25 , 0.25)
bush2.position.set(1.7 , 0.2 , 2.25)

const bush3 = new THREE.Mesh(bushGeometry , bushMaterial)
bush3.scale.set(0.4 , 0.4 , 0.4)
bush3.position.set(-1.2 , 0.3 , 2.35)

const bush4 = new THREE.Mesh(bushGeometry , bushMaterial)
bush4.scale.set(0.25 , 0.25 , 0.25)
bush4.position.set(-1.7 , 0.2 , 2.25)

house.add(bush1 , bush2 , bush3 , bush4)

/**
 * Graves
 */

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0 ; i < 30; i++){
    gltfLoader.load('models/Graves/grave2.glb',
    (gltf)=>{
        const angle = Math.random() * Math.PI * 7
        const radius = 4 + Math.random() * 5.3
        gltf.scene.position.x = 5
        gltf.scene.scale.set(0.02,0.02,0.02)

        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius + 0.02

        gltf.scene.position.set(x , 0 , z)
        gltf.scene.rotation.y = (Math.random() - 0.5) * 0.4

        graves.add(gltf.scene)

    })
}
//? Grave 2
for(let i = 0 ; i < 20; i++){
    gltfLoader.load('models/Graves/grave.glb',
    (gltf)=>{
        const angle = Math.random() * Math.PI * 7
        const radius = 4 + Math.random() * 3.6
        gltf.scene.position.x = 5
        gltf.scene.scale.set(0.02,0.02,0.02)
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius + 0.02

        gltf.scene.position.set(x , 0 , z)
        gltf.scene.rotation.y = (Math.random() - 0.5) * 0.4

        graves.add(gltf.scene)

    })
}



// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door Light

const doorLight = new THREE.PointLight('#ff7d46' , 1 , 7)
doorLight.position.set(0 , 2.2 , 2.7)
house.add(doorLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor('#262837')
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()