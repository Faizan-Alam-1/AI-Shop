import { loadGLTF } from "/libs/loader.js";

const THREE = window.MINDAR.FACE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
   

    const mindarThree = new window.MINDAR.FACE.MindARThree({
      // container: document.body,
      container: document.querySelector("#My-ar"),
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const occluder = await loadGLTF("/sparkar-occluder/headOccluder.glb");
    const occluderMaterial = new THREE.MeshBasicMaterial({ colorWrite: false });
    occluder.scene.scale.set(0.065, 0.065, 0.065);
    occluder.scene.position.set(0, -0.3, 0.15);
    occluder.scene.traverse((o) => {
      if (o.isMesh) {
        o.material = occluderMaterial;
      }
    });
    occluder.scene.renderOrder = 0;

    const occluderAnchor = mindarThree.addAnchor(164); 
    occluderAnchor.group.add(occluder.scene);

    const glasses = await loadGLTF("../Product_model/Rayban-Sunglasses/scene.gltf");
    glasses.scene.scale.set(0.8, 0.8, 0.8);
    glasses.scene.renderOrder = 1;

    const anchor = mindarThree.addAnchor(164);
    anchor.group.add(glasses.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  start();
});
