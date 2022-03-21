import { Node } from "../src/classes/Entity";
import { ER } from "../src/graphs/ER";

const User = new Node({ name: "User" });
const Post = new Node({ name: "Post" });
const Comment = new Node({ name: "Comment" });

new ER([
  User.canHaveMany(Post),
  User.can(User, { verb: "Subscribe to" }),
  User.can(User, { verb: "Block" }),
  Post.canHaveMany(Comment),
  Post.mustHave(User, {
    cardinality: 2,
  }),
]).toHtml("myDatabase", { showVerb: true });
