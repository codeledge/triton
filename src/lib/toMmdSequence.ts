import { Entity, Rel, Verbs } from "../classes/Entity";

interface Options {
  showVerb?: boolean;
}

export default function toMmdSequence(root: Entity, options: Options = {}) {
  let mmdString = `sequenceDiagram\n`;

  root.out.forEach(({ target }) => {
    mmdString += `\t${(target as Rel).source.data.name}${getArrow(
      (target as Rel).data.verb
    )}${(target as Rel).target.data.name}: ${
      options.showVerb ? (target as Rel).data.verb + " " : ""
    }${target.data.body ? JSON.stringify(target.data.body) : "..."}\n`;
  });

  return mmdString;
}

export enum SequenceArrows {
  solidWithoutTip = "->",
  dottedWithoutTip = "-->",
  solidWithTip = "->>",
  dottedithTip = "-->>",
}

const getArrow = (verb: Verbs) => {
  switch (verb) {
    case Verbs.has:
      return SequenceArrows.solidWithoutTip;
    case Verbs.is:
      return SequenceArrows.dottedWithoutTip;
    case Verbs.responds:
      return SequenceArrows.solidWithTip;
    case Verbs.calls:
      return "-->>"; //Dotted line with arrowhead
    case Verbs.calls:
      return "-x"; //Solid line with a cross at the end
    case Verbs.calls:
      return "--x"; //Dotted line with a cross at the end.
    case Verbs.calls:
      return "-)"; //Solid line with an open arrowat the end (async)
    case Verbs.calls:
      return "--)"; //Dotted line with a open arrow at the end (async)
    default:
      return "-->>";
  }
};
