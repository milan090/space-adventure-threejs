import { AxesHelper, GridHelper } from "three";

export function createAxesHelper() {
  const helper = new AxesHelper(3);
  helper.position.set(-3.5, 0, -3.5);
  return helper;
}

export function createGridHelper(size = 50, divisions = 10) {
  const helper = new GridHelper(size, divisions);
  return helper;
}
