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
const ambientTexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
const heightTexture = textureLoader.load('textures/door/height.jpg')
const metalnessTexture = textureLoader.load('textures/door/metalness.jpg')
const normalTexture = textureLoader.load('textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('textures/door/roughness.jpg')

const bricksNormalTextures = textureLoader.load('textures/bricks/normal.jpg')
const bricksAmbientTextures = textureLoader.load('textures/bricks/ao.jpg')
// const bricksHeighTextures = textureLoader.load('textures/bricks/height.jpg')
const bricksRoughnessTextures = textureLoader.load('textures/bricks/roughness.jpg')
const bricksColorTextures = textureLoader.load('textures/bricks/albedo.jpg')

const grassColorTextures = textureLoader.load('textures/grass/color.jpg')
const grassAmbientTextures = textureLoader.load('textures/grass/ambientOcclusion.jpg')
const grassNormalTextures = textureLoader.load('textures/grass/normal.jpg')
const grassRoughnessTextures = textureLoader.load('textures/grass/roughness.jpg')


const windowColorTextures = textureLoader.load('textures/window/basecolor.jpg')
const windowAmbientTextures = textureLoader.load('textures/window/ambientOcclusion.jpg')
const windowNormalTextures = textureLoader.load('textures/window/normal.jpg')
const windowRoughnessTextures = textureLoader.load('textures/window/roughness.jpg')
const windowHeightTextures = textureLoader.load('textures/window/height.png')
const windowMetallicTextures = textureLoader.load('textures/window/metallic.jpg')
const windowAlphaTextures = textureLoader.load('textures/window/alpha.png')

grassColorTextures.repeat.set(8 , 8)
grassAmbientTextures.repeat.set(8 , 8)
grassNormalTextures.repeat.set(8 , 8)
grassRoughnessTextures.repeat.set(8 , 8)

grassColorTextures.wrapS = THREE.RepeatWrapping
grassAmbientTextures.wrapS = THREE.RepeatWrapping
grassNormalTextures.wrapS = THREE.RepeatWrapping
grassRoughnessTextures.wrapS = THREE.RepeatWrapping

grassColorTextures.wrapT = THREE.RepeatWrapping
grassAmbientTextures.wrapT = THREE.RepeatWrapping
grassNormalTextures.wrapT = THREE.RepeatWrapping
grassRoughnessTextures.wrapT = THREE.RepeatWrapping

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

// Windows
const window1 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5 , 1.5 , 100 , 100),
    new THREE.MeshStandardMaterial({
        map: windowColorTextures,
        transparent : true,
        alphaMap: windowAlphaTextures,
        aoMap: windowAmbientTextures,
        displacementMap: windowHeightTextures,
        displacementScale: 0.1,
        normalMap: windowNormalTextures,
        metalnessMap: windowMetallicTextures,
        roughnessMap: windowRoughnessTextures
    })
)

window1.geometry.setAttribute('uv2' , new THREE.Float32BufferAttribute(window1.geometry.attributes.uv.array , 2))
window1.rotation.y = 1.5708
window1.position.y = 1.5
window1.position.x = 2.02

house.add(window1)

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

// for(let i = 0 ; i < 30; i++){
//     gltfLoader.load('models/Graves/grave2.glb',
//     (gltf)=>{
//         const angle = Math.random() * Math.PI * 7
//         const radius = 4 + Math.random() * 5.3
//         gltf.scene.position.x = 5
//         gltf.scene.scale.set(0.02,0.02,0.02)

//         const x = Math.sin(angle) * radius
//         const z = Math.cos(angle) * radius + 0.02

//         gltf.scene.position.set(x , 0 , z)
//         gltf.scene.rotation.y = (Math.random() - 0.5) * 0.4

//         gltf.scene.castShadow = true
       
//         gltf.scene.traverse(function (node) {
//             if(node.isMesh){
//                 node.castShadow = true
//             }
//         })

//         graves.add(gltf.scene)

//     })
// }
//? Grave 2
// for(let i = 0 ; i < 20; i++){
//     gltfLoader.load('models/Graves/grave.glb',
//     (gltf)=>{
//         const angle = Math.random() * Math.PI * 7
//         const radius = 4 + Math.random() * 3.6
//         gltf.scene.position.x = 5
//         gltf.scene.scale.set(0.02,0.02,0.02)
//         const x = Math.sin(angle) * radius
//         const z = Math.cos(angle) * radius + 0.02

//         gltf.scene.position.set(x , 0 , z)
//         gltf.scene.rotation.y = (Math.random() - 0.5) * 0.4

//         gltf.scene.traverse(function (node) {
//             if(node.isMesh){
//                 node.castShadow = true
//             }
//         })

//         graves.add(gltf.scene)

//     })
// }



// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map:grassColorTextures,
        aoMap: grassAmbientTextures,
        normalMap: grassNormalTextures,
        roughnessMap: grassRoughnessTextures
    })
)
floor.geometry.setAttribute('uv2' , new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array , 2))
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
 * Ghost
 */

const ghost1 = new THREE.PointLight('#ff00ff' , 2 , 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff' , 2 , 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00' , 2 , 3)
scene.add(ghost3)



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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Shadows
 */
moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7


ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7
/**
 * Animate
 */

// gltfLoader.load('models/Ghost/untitled.glb',
// (gltf)=>{
    
//         const angle = 3 * 0.5
//         gltf.scene.position.x = Math.cos(angle) * 4
//         gltf.scene.position.z = Math.sin(angle) * 4
//         gltf.scene.position.y = Math.sin(elapsedTimeFGhost * 3)
    
//         gltf.scene.scale.set(0.4,0.4,0.4)
//         gltf.scene.rotation.x = 1.3
//         gltf.scene.rotation.y = - 0.01
    
//         gltf.scene.castShadow = true
    
//         gltf.scene.traverse(function (node) {
//             if(node.isMesh){
//                 node.castShadow = true
//             }
//         })
    
//         scene.add(gltf.scene)

//         renderer.render(scene, camera)

//         window.requestAnimationFrame(gltf)

// })

gltfLoader.load('models/Ghost/untitled.glb', processGhost)

gltfLoader.load('models/Ghost2/untitled.glb' ,proessGhost2 )

let model = new THREE.Object3D()
let model2 = new THREE.Object3D()
let mixer = null

function processGhost(gltf) {

    mixer = new THREE.AnimationMixer(gltf.scene)
    const action = mixer.clipAction(gltf.animations[0])

    action.play()

    gltf.scene.scale.set(.5,.5,.5)
    // gltf.scene.scale.set(1.1,1.1,1.1)

    gltf.scene.castShadow = true
    
    gltf.scene.traverse(function (node) {
        if(node.isMesh){
            node.castShadow = true
        }
    })

    console.log(gltf);
    model.add(gltf.scene)

    scene.add(model)
}

function proessGhost2(gltf) {
    
    gltf.scene.scale.set(.7,.7,.7)

    gltf.scene.position.y = -0.8


    gltf.scene.castShadow = true
    
    gltf.scene.traverse(function (node) {
        if(node.isMesh){
            node.castShadow = true
        }
    })

    model2.add(gltf.scene)

    scene.add(model2)
}


const clock = new THREE.Clock()

let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime  - previousTime
    previousTime = elapsedTime

    // Ghost Animation
    // const ghostAngle = elapsedTime * 0.5
    ghost1.position.x = model.position.x
    ghost1.position.z = model.position.z
    ghost1.position.y = Math.sin(elapsedTime * 3)

    // const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = model2.position.x
    ghost2.position.z = model2.position.z
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4)  + Math.sin(elapsedTime * 2.5)

    const angle = elapsedTime * 0.5
    model.position.x = Math.cos(angle) * 4
    model.position.z = Math.sin(angle) * 4

    const angle2 = elapsedTime * 0.32
    model2.position.x = Math.cos(angle2) * 5
    model2.position.z = Math.sin(angle2) * 5

    model.rotation.y -=0.01
    // model.position.y = Math.abs(Math.sin(elapsedTime * 0.2 - 2))
    if(mixer !=null){
        mixer.update(deltaTime)
    }
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// gltfLoader.load('models/Ghost/untitled.glb', process)

// let model = new THREE.Object3D()


// animateGhost()

// function animateGhost() {

//     requestAnimationFrame(animateGhost)

//     // const angle = elapsedTimeFGhost * 0.5
//     // model.position.x = Math.cos(angle) * 4
//     // model.position.z = Math.sin(angle) * 4
//     // model.position.y = Math.sin(elapsedTimeFGhost * 3)
    
//     model.scale.set(0.4,0.4,0.4)
//     model.rotation.x = 1.3
//     model.rotation.y = - 0.01
    
//     renderer.render(scene , camera)
// }

// function process(gltf) {

//     gltf.scene.castShadow = true
    
//     gltf.scene.traverse(function (node) {
//         if(node.isMesh){
//             node.castShadow = true
//         }
//     })

//     model.add(gltf.scene)

//     scene.add(model)
// }