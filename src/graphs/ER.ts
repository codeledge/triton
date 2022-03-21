import { LinkResult } from "src/classes/Entity";
import * as fs from "fs";
import * as path from "path";

type MmdOptions = {
  showVerb?: boolean;
};

type ToHtmlOptions = MmdOptions & {
  fileName?: string;
};

export class ER {
  links: LinkResult[] = [];
  constructor(links: (LinkResult | LinkResult[])[]) {
    this.links = links.flat() as LinkResult[];
  }

  toMmd(options: MmdOptions = {}) {
    let mmdString = `erDiagram\n`;

    this.links.forEach(({ current, target, rel }) => {
      mmdString += `\t${formatERName(current.data.name)} ${
        ERArrows.zeroOrOneLeft
      }--${ERArrows.zeroOrOneRight} ${formatERName(target.data.name)} : ${
        options.showVerb ? `"${rel.verb}"` : `""`
      }\n`;
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

const formatERName = (name: string) => name.replace(/\s/g, "-");

export enum ERArrows {
  zeroOrOneLeft = "|o",
  zeroOrOneRight = "o|",
}
