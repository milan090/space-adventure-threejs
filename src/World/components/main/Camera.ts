import { PerspectiveCamera } from "three";
import { Component, TickData } from "../../Component";

export class Camera extends PerspectiveCamera implements Component {
  constructor(aspectRatio: number) {
    const fov = 35;
    super(fov, aspectRatio, 0.1, 30000);
    this.position.set(0, 5, 10);
  }
  tick?: (tickData: TickData) => void;
}
