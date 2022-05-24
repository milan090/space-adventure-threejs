import { Camera, Clock, Scene, WebGLRenderer } from "three";
import { AnimatedComponent } from "../Component";

import { State } from "./Loop.types";

export class Loop {
  private camera;
  private scene;
  private renderer;
  state: State = {
    // Default state
    key: {
      w: false,
      a: false,
      s: false,
      d: false,
    },
  };
  animatedComponents: AnimatedComponent[] = [];
  clock;

  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.clock = new Clock();

    this.state = {
      // Default state
      key: {
        w: false,
        a: false,
        s: false,
        d: false,
      },
    };
    console.log("Setting up state");
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
    console.log("Setting up event listeners");
    this.initEventListeners();
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  add(...animatedComponents: AnimatedComponent[]) {
    animatedComponents.forEach((component) => {
      this.animatedComponents.push(component);
    });
  }

  tick() {
    const deltaTime = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    this.animatedComponents.forEach((component) => {
      component.tick({ deltaTime: deltaTime, elapsedTime }, this.state);
    });
  }

  initEventListeners() {
    const canvas = document;
    canvas.addEventListener("keydown", this.onKeyDown);
    canvas.addEventListener("keyup", this.onKeyUp);
  }

  removeEventListeners() {
    const canvas = document;
    console.log("Setting event listeners");
    canvas.removeEventListener("keydown", this.onKeyDown);
    canvas.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (ev: KeyboardEvent) => {
    console.log("Down", this.state.key);
    this.state.key[ev.key] = true;
  };

  onKeyUp = (ev: KeyboardEvent) => {
    console.log("up", this.state.key);
    this.state.key[ev.key] = false;
  };
}
