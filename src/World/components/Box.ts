import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { Component } from "../Component";

export class Box extends Mesh implements Component {
  constructor(width: number = 1, height: number = 1, depth: number = 1) {
    const geometry = new BoxGeometry(width, height, depth, 16, 16);
    const material = new MeshStandardMaterial({ color: "white" });
    super(geometry, material);

    this.castShadow = true;
    this.receiveShadow = true;
  }
}
