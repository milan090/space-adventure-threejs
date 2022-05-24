import {
  BoxGeometry,
  BufferGeometry,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { AnimatedComponent, TickData } from "../Component";

export class Box extends Mesh implements AnimatedComponent {
  constructor(width: number = 1, height: number = 1, depth: number = 1) {
    const geometry = new BoxGeometry(width, height, depth, 16, 16);
    const material = new MeshStandardMaterial({ color: "white" });
    super(geometry, material);

    this.castShadow = true;
    this.receiveShadow = true;
  }

  tick({ deltaTime }: TickData) {
    // this.rotation.y += deltaTime * Math.PI * 0.2;
  }
}
