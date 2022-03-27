import { Node, Rel, Verbs } from "src/classes/Entity";
import * as fs from "fs";
import * as path from "path";

type MmdOptions = {
  traverseByVerb?: Verbs | Verbs[];
  collectByVerb?: Verbs | Verbs[];
  showVerb?: boolean;
};

type ToHtmlOptions = MmdOptions & {
  fileName?: string;
};

export class Graph {
  roots: Node[] = [];
  constructor(nodes: Node[]) {
    this.roots = nodes;
  }

  toMmd(options: MmdOptions = {}) {
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
            mmdString += `\t${formatBlock(node)} ${
              GraphArrows.dottedWithTip
            }${formatVerb(rel, options)} ${formatBlock(target)}\n`;
        }

        // stop if it does not match the traverse verb
        if (options.traverseByVerb && !_traverseByVerbs.includes(rel.verb))
          return;

        mmdString += `\t${formatBlock(node)} ${
          GraphArrows.solidWithTip
        }${formatVerb(rel, options)} ${formatBlock(target)}\n`;
        addRecursive(target as Node, depth + 1);
      });
    };

    this.roots.forEach((root) => {
      if (root.out.length === 0) {
        console.warn(`Node "${root.data.name}" has no out connections?`);
        mmdString += `\t${formatBlock(root)}\n`;
      } else {
        addRecursive(root);
      }
    });

    return mmdString;
  }

  toHtml(title: string, options: ToHtmlOptions = {}) {
    let template = fs.readFileSync(
      path.resolve(__dirname, "../templates/mmd.html"),
      "utf8"
    );

    let data = template
      .replace("MMD_TITLE", title)
      .replace("MMD_CONTENT", this.toMmd(options));

    fs.writeFileSync(
      path.resolve(__dirname, `../../html/${options.fileName || title}.html`),
      data
    );
  }
}

const formatBlock = (target) => {
  return `${target.id}["${target.data.name}"]`;
};

const formatVerb = (rel, options) => {
  return options.showVerb && rel.verb ? `|${rel.verb}|` : "";
};

export enum GraphArrows {
  solidWithTip = "-->",
  solidWithoutTip = "---",
  dottedWithTip = "-.->",
  thickWithTip = "==>",
}
