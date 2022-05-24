import { Color, Fog, Scene } from "three";

export function createScene() {
  const scene = new Scene();

  const color = "#605050";
  // scene.background = new Color();
  // scene.fog = new Fog(color, 10, 100);

  return scene;
}
