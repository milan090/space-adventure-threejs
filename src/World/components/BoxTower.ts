import { Group } from "three";
import {
  AnimatedComponent,
  Component,
  tickChildren,
  TickData,
} from "../Component";
import { addToVertices } from "../utils/vertices";
import { Box } from "./Box";

export class BoxTower extends Group implements AnimatedComponent {
  childComponents: (AnimatedComponent | Component)[] = [];

  constructor() {
    super();

    for (let i = 0; i < 4; i++) {
      const box = new Box(1, 3, 1);
      this.childComponents.push(box);

      if (i == 0) {
        this.add(box);
      } else {
        box.position.setY(3);
        this.childComponents[i - 1].add(box);
      }
      addToVertices(box.geometry, 0, 1.5, 0);
    }
  }

  tick({ elapsedTime }: TickData) {
    const theta = Math.sin(elapsedTime);
    this.childComponents.forEach((box) => (box.rotation.z = theta));
  }
}
