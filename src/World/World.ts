import { AnimatedComponent, Component, TickData } from "./Component";

import { Camera } from "./components/main/Camera";
import { createLights } from "./components/main/lights";
import { createScene } from "./components/main/scene";
import { Controls } from "./systems/Controls";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { GrannyKnot } from "three/examples/jsm/curves/CurveExtras";
import {
  CubeTexture,
  CubeTextureLoader,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  TubeBufferGeometry,
} from "three";

export class World {
  private components: Component[];
  private camera;
  private scene;
  private renderer;
  private loop;
  private controls;

  constructor(container: HTMLDivElement) {
    const aspectRatio = container.clientWidth / container.clientHeight;
    this.components = [];
    this.camera = new Camera(aspectRatio);
    this.scene = createScene();
    this.renderer = createRenderer();
    const { mainLight, ambientLight } = createLights();

    container.append(this.renderer.domElement);

    this.controls = new Controls(this.camera, this.renderer.domElement);

    new Resizer(container, this.camera, this.renderer);

    this.loop = new Loop(this.camera, this.scene, this.renderer);

    // Add items to scene
    const curve = new GrannyKnot();
    const geometry = new TubeBufferGeometry(curve, 100, 2, 16, true);
    const material = new MeshStandardMaterial({
      color: "#fff",
      wireframe: true,
      side: DoubleSide,
    });
    const tube = new Mesh(geometry, material);
    this.add(tube);

    this.camera.tick = ({ elapsedTime }: TickData) => {
      const loopTime = 20;
      const t = (elapsedTime % loopTime) / loopTime;
      const t2 = ((elapsedTime + 0.1) % loopTime) / loopTime;

      const pos = tube.geometry.parameters.path.getPointAt(t);
      const pos2 = tube.geometry.parameters.path.getPointAt(t2);

      this.camera.position.copy(pos);
      this.camera.lookAt(pos2);
    };

    this.add(ambientLight, mainLight, mainLight.target, this.camera);

    this.controls.addEventListener("change", () => {
      this.render();
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  add(...components: (Component | AnimatedComponent)[]) {
    components.forEach((component) => {
      this.scene.add(component);
      this.components.push(component);
      if (component.tick) {
        this.loop.add(component as AnimatedComponent);
      }
    });
  }

  stop() {
    this.loop.stop();
  }

  async init() {
    await this.initSkyBox();
  }

  async initSkyBox() {
    const loader = new CubeTextureLoader();
    const texture = await new Promise<CubeTexture>((resolve, reject) => {
      loader.load(
        [
          "assets/textures/kurt/space_ft.png",
          "assets/textures/kurt/space_bk.png",
          "assets/textures/kurt/space_up.png",
          "assets/textures/kurt/space_dn.png",
          "assets/textures/kurt/space_rt.png",
          "assets/textures/kurt/space_lf.png",
        ],
        (texture) => {
          resolve(texture);
        },
        () => {},
        (err) => reject(err)
      );
    });
    this.scene.background = texture;
  }
}
