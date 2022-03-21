export enum Verbs {
  allows = "allows",
  calls = "calls",
  can = "can",
  canBe = "canBe",
  canBecome = "canBecome",
  canHave = "canHave",
  canHaveMany = "canHaveMany",
  canHaveOne = "canHaveOne",
  cannot = "cannot",
  dependsOn = "dependsOn",
  has = "has",
  is = "is",
  must = "must",
  mustHave = "mustHave",
  of = "of",
  responds = "responds",
  should = "should",
}

export enum InverseVerbs {
  allows = "dependsOn",
  calledBy = "calls",
  calls = "calledBy",
  canBe = "is",
  canBeOf = "canHave",
  canHave = "canBeOf",
  dependsOn = "allows",
  has = "of",
  is = "canBe",
  mustBeOf = "mustHave",
  mustHave = "mustBeOf",
  of = "has",
  shouldBeOf = "shouldHave",
  shouldHave = "shouldBeOf",
}

export interface Link {
  target: Entity;
  rel: Rel;
}

export interface LinkOptions {
  data?: RelData;
  verb?: RelOptions["verb"];
  addInverse?: boolean;
  returnSingle?: boolean;
  cardinality?: number;
  skipDuplicates?: number;
}
export interface LinkResult {
  current: Entity;
  target: Entity;
  rel: Rel;
}

type EntityData = NodeData | RelData;

type LinkTargetArg = Entity | Entity[];

let currentId = 1;
export class Entity {
  id: number;
  out: Link[] = [];
  in: Link[] = [];
  data: EntityData;

  constructor(data: EntityData) {
    this.id = currentId++;
    this.data = data;
  }

  link(target: LinkTargetArg, options: LinkOptions = {}): LinkResult | LinkResult[] {
    let _targets: Entity[] = [].concat(target);

    let linkResults: Omit<LinkResult, "current">[] = [];
    _targets.forEach((_target) => {
      if (options.skipDuplicates) {
        const existingLink = this.out.find(
          ({ target: sourceTarget, rel: relItem }) =>
            _target === sourceTarget && options.verb === relItem.verb
        );
        if (existingLink) {
          if (this instanceof Node)
            console.warn(
              `"${this.data["name"]}" "${options.verb}" "${_target.data["name"]}" already existing`
            );

          linkResults.push(existingLink);
          return;
        }
      }

      const rel = new Rel(this, _target, options);
      linkResults.push({ target: _target, rel });

      if (options.addInverse && options.verb) {
        if (InverseVerbs[options.verb]) _target.link(this, { verb: InverseVerbs[options.verb] });
        else console.warn(`Could not find inverse verb for "${options.verb}"`);
      }
    });

    this.out.push(...linkResults);

    const response: LinkResult[] = linkResults.map(({ target, rel }) => ({
      current: this,
      target,
      rel,
    }));

    if (options.returnSingle && response.length === 1) return response[0];

    return response;
  }

  has(target: LinkTargetArg, options: LinkOptions = {}) {
    options.verb = Verbs.has;
    return this.link(target, options);
  }
  mustHave(target: LinkTargetArg, options: LinkOptions = {}) {
    options.verb = Verbs.mustHave;
    return this.link(target, options);
  }
  canHaveOne(target: LinkTargetArg, options: LinkOptions = {}) {
    options.verb = Verbs.canHaveOne;
    return this.link(target, options);
  }
  canHaveMany(target: LinkTargetArg, options: LinkOptions = {}) {
    options.verb = Verbs.canHaveMany;
    return this.link(target, options);
  }
  canBecome(target: LinkTargetArg, options: LinkOptions = {}) {
    options.verb = Verbs.canBecome;
    return this.link(target, options);
  }
  calls(target: LinkTargetArg, options: LinkOptions = {}) {
    options.verb = Verbs.calls;
    return this.link(target, options);
  }
  can(target: LinkTargetArg, options: LinkOptions = {}) {
    options.verb = options.verb || Verbs.can;
    return this.link(target, options);
  }
  cannot(target: LinkTargetArg, options: LinkOptions = {}) {
    options.verb = Verbs.cannot;
    return this.link(target, options);
  }
  allows(target: LinkTargetArg, options: LinkOptions = {}) {
    options.verb = Verbs.allows;
    return this.link(target, options);
  }
}

export interface NodeData {
  name: string;
  description?: string;
  [x: string]: any;
}

export type NodeOptions = {};

export class Node extends Entity {
  declare data: NodeData;

  constructor(nodeData: NodeData, _options: NodeOptions = {}) {
    super(nodeData);
  }
}

type RelData = any;

interface RelOptions {
  data?: RelData;
  verb?: Verbs | string;
}

export class Rel extends Entity {
  declare data: RelData;
  verb?: RelOptions["verb"];
  source: Entity;
  target: Entity;

  constructor(source: Entity, target: Entity, options: RelOptions = {}) {
    super(options.data);
    this.verb = options.verb;
    this.source = source;
    this.target = target;
  }
}
