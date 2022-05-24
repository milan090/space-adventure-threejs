import { Object3D } from "three";
import { State } from "./systems/Loop.types";

export class Component extends Object3D {
  tick?: (tickData: TickData, state: State) => void;
  childComponents?: (Component | AnimatedComponent)[];
}

export interface AnimatedComponent extends Component {
  tick: (tickData: TickData, state: State) => void;
}

export interface TickData {
  deltaTime: number;
  elapsedTime: number;
}

export const tickChildren = (
  children: (AnimatedComponent | Component)[],
  tickData: TickData,
  state: State
) => {
  children.forEach((child) => {
    if (child.tick) child.tick(tickData, state);
  });
};
