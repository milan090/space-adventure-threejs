import {
  CylinderBufferGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  SphereBufferGeometry,
} from "three";
import { AnimatedComponent, TickData } from "../Component";
import { State } from "../systems/Loop.types";

export class Player extends Group implements AnimatedComponent {
  constructor() {
    super();
    const bodyGeometry = new CylinderBufferGeometry(0.5, 0.3, 1.6, 20);
    const bodyMaterial = new MeshStandardMaterial({ color: "#ffff00" });
    const body = new Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.position.y = 0.8;
    body.scale.z = 0.5;
    this.add(body);

    const headGeometry = new SphereBufferGeometry(0.3, 20, 16);
    const head = new Mesh(headGeometry, bodyMaterial);

    head.position.y = 2.0;
    this.add(head);

    this.castShadow = true;
    this.receiveShadow = false;
  }

  tick(tickData: TickData, state: State) {
    // console.log(state);
    const dt = tickData.deltaTime;
    const forward = state.key.w ? -1 : state.key.s ? 1 : 0;
    const turn = state.key.d ? -1 : state.key.a ? 1 : 0;

    if (state.key) {
      this.translateZ(forward * dt * 5);
      this.rotateY(turn * dt);
    }

    //Add camera lerping
  }
}
