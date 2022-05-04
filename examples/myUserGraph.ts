import { Graph } from "../src/graphs/Graph";
import { Node } from "../src/classes/Entity";
//import mermaid from "mermaid"; //ESM not working!

const LonelyUser = new Node({ name: "Visitor" });
const User = new Node({ name: "Joe" });
const Post1 = new Node({ name: "Hot Post" });
const Post2 = new Node({ name: "Another Post" });

const Comment1 = new Node({ name: "Nice Comment" });
const Comment1Like1 = new Node({ name: "First Like" });
const Comment1Like2 = new Node({ name: "Second Like" });

User.link(Post1);
User.has(Post2);
Post1.link(Comment1);
Comment1.link(Comment1Like1);
Comment1.link(Comment1Like2);

new Graph([LonelyUser, User]).toHtml("myUserGraph", {
  showVerb: true,
  fontFamily: "Courier New",
  darkMode: true,
  //theme: mermaid.mermaidAPI.Theme.Default,
});
