import { World } from "./World/World";

export async function main() {
  const container = document.getElementById("scene-container");
  if (!(container instanceof HTMLDivElement)) {
    throw new Error("Scene container is not found or is not a div element");
  }

  const world = new World(container);

  await world.init();

  world.start();
}

main().catch((err) => {
  console.error(err);
});
