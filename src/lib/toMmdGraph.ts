import { Node, Verbs } from "../classes/Entity";

interface Options {
  traverseByVerb?: Verbs | Verbs[];
  collectByVerb?: Verbs | Verbs[];
  showVerb?: boolean;
}

export enum GraphArrows {
  solidWithTip = "-->",
  solidWithoutTip = "---",
  dottedWithTip = "-.->",
  thickWithTip = "==>",
}

export default function toMmdGraph(root: Node, options: Options = {}) {
  let mmdString = `graph\n`;
  const visitedRelIds = {};

  const _collectByVerbs: string[] = options.collectByVerb
    ? [].concat(options.collectByVerb)
    : [];
  const _traverseByVerbs: string[] = options.traverseByVerb
    ? [].concat(options.traverseByVerb)
    : [];

  const addRecursive = (node: Node, depth = 0) => {
    node.out.forEach(({ target, rel }) => {
      if (visitedRelIds[rel.id]) return;
      visitedRelIds[rel.id] = 1; //avoid the graph becoming a tree

      if (options.collectByVerb) {
        if (_collectByVerbs.includes(rel.verb))
          mmdString += `\t${formatBlock(node)} ${GraphArrows.dottedWithTip}${
            options.showVerb ? `|${rel.verb}|` : ""
          } ${formatBlock(target)}\n`;
      }

      // stop if it does not match the traverse verb
      if (options.traverseByVerb && !_traverseByVerbs.includes(rel.verb))
        return;

      mmdString += `\t${formatBlock(node)} ${GraphArrows.solidWithTip}${
        options.showVerb ? `|${rel.verb}|` : ""
      } ${formatBlock(target)}\n`;
      addRecursive(target as Node, depth + 1);
    });
  };

  if (root.out.length === 0) console.warn("Root node has no out connections?");

  addRecursive(root);

  return mmdString;
}

const formatBlock = (target) => {
  return `${target.id}["${target.data.name}"]`;
};
