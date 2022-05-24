import random from "random";
import { Group, Mesh, MeshStandardMaterial, PlaneBufferGeometry } from "three";
import { AnimatedComponent, Component, TickData } from "../Component";
import { Box } from "./Box";

export class BoxGrid extends Group implements AnimatedComponent {
  childComponents: AnimatedComponent[] = [];
  constructor(
    rows: number = 2,
    cols: number = 2,
    rowGap: number = 2,
    colGap: number = 2
  ) {
    super();

    for (let x = 0; x < rows; x++) {
      for (let z = 0; z < cols; z++) {
        const box = new Box();
        box.scale.setY(box.scale.y + random.float(0, 5));
        box.position.set(x * rowGap, 0, z * colGap);
        this.add(box);
        this.childComponents.push(box);
      }
    }

    const plane = new Mesh(
      new PlaneBufferGeometry(30, 50),
      new MeshStandardMaterial()
    );
    plane.rotateX(Math.PI / -2);
    plane.receiveShadow = true;
    this.add(plane);
  }
  tick(tickData: TickData) {
    this.childComponents.forEach((component) => {
      component.tick(tickData);
    });
  }
}
