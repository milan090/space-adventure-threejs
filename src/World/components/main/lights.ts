import { DirectionalLight, HemisphereLight, SpotLight, Vector3 } from "three";

export function createLights() {
  const ambientLight = new HemisphereLight("white", "darkslategrey", 2);

  const mainLight = new SpotLight("white", 20);
  mainLight.position.set(10, 20, 10);
  mainLight.castShadow = true;
  mainLight.shadow.camera.visible = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  return { mainLight, ambientLight };
}
