import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Controls extends OrbitControls {
  constructor(camera: Camera, canvas: HTMLCanvasElement) {
    super(camera, canvas);
    this.enableDamping = true;
    this.enablePan = true;
  }

  tick() {
    this.update();
  }
}
