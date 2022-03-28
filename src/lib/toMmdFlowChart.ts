import { Entity, Rel, Verbs } from "../classes/Entity";
interface Options {
  orientation: "LR" | "TB" | "BT" | "RL";
}
export default function toMMdFlowChart(root: Entity, options: Options) {
  let mmdString = `flowchart ${options.orientation}\n`;
  const visitedRelIds = {};

  return mmdString;
}
