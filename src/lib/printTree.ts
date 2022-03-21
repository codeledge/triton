const visited = {};
const printRecursive = (node, prop: string | string[], depth: number = 0) => {
  const isVisited = visited[node.data.name];
  const indentation = depth ? "  ".repeat(depth) : "";

  const isSingleProp = typeof prop === "string";
  const showProps = isSingleProp ? prop !== "children" : prop.includes("children");

  console.info(
    `${indentation}${showProps && depth ? prop + " " : ""}${node.data.name}${
      isVisited ? "..." : ""
    }`
  );

  if (visited[node.data.name]) {
    //console.info("visited", node.data.name);
    return;
  }
  visited[node.data.name] = 1;

  if (typeof prop === "string") {
    node[prop]?.forEach((child) => {
      printRecursive(child, prop, depth + 1);
    });
  } else {
    prop.forEach((prop) => {
      //console.info(node[prop], prop);

      node[prop]?.forEach((child) => {
        printRecursive(child, prop, depth + 1);
      });
    });
  }
};

const printTree = (root, prop: string | string[]) => {
  console.info();
  printRecursive(root, prop);
  console.info();
};

export default printTree;
