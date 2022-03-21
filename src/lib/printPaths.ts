import getPaths from "./getPaths";

export default function printPaths(root, prop) {
  const printPath = (path, tail = false) => {
    console.info(path.map((node) => node.data.name).join(` -${prop}-> `) + (tail ? "..." : ""));
  };

  const paths = getPaths(root, prop);
  console.info();
  paths.forEach((path) => {
    printPath(path); //tail is lost here
  });
  console.info();
}
