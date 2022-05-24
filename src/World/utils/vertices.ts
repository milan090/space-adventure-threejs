import { BufferGeometry } from "three";

export const addToVertices = (
  geometry: BufferGeometry,
  x = 0,
  y = 0,
  z = 0
) => {
  const position = geometry.getAttribute("position");

  for (let i = 0; i < position.array.length / 3; i++) {
    position.setX(i, position.getX(i) + x);
    position.setY(i, position.getY(i) + y);
    position.setZ(i, position.getZ(i) + z);
  }
};
