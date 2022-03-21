export default function getPaths(root, prop) {
  const visited = {};
  const paths = [];
  const pathsRecursive = (node, path = [], depth = 0) => {
    path.push(node);

    if (visited[node.data.name]) {
      paths.push(path);
      return;
    }
    visited[node.data.name] = 1;

    node[prop]?.forEach((child) => {
      pathsRecursive(child, [...path], depth + 1);
    });

    if (!node[prop]?.length) paths.push(path);
  };

  pathsRecursive(root);

  return paths;
}
