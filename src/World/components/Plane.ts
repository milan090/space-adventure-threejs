import { DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { Component } from "../Component";

export class Plane extends Mesh implements Component {
  constructor(width = 100, height = 100) {
    const geometry = new PlaneGeometry(width, height);
    const material = new MeshStandardMaterial({ side: DoubleSide });
    super(geometry, material);

    // Rotate is 90 degrees to make it a horizontal plane
    this.receiveShadow = true;
    this.rotation.x = -Math.PI / 2;
  }
}
