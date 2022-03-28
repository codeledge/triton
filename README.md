# Triton

Javascript powered Mermaid diagrams!

## Usage

Clone the repo

```
yarn install

```

You can now render in a variety of outputs your Triton diagrams like this example:

```
ts-node examples/myDatabase.ts

```

It will output the result in the `html` folder, which you can preview in your browser!

## Available diagrams

### ER

`new ER([link, link2, ...]])`

<img width="397" alt="Screenshot 2022-03-21 at 22 40 23" src="https://user-images.githubusercontent.com/4820803/159374767-eda88b2b-b28e-47eb-be0f-1baffe188026.png">

### Graph

`new Graph([root, root2, ...]])`

<img width="395" alt="Screenshot 2022-03-22 at 23 15 25" src="https://user-images.githubusercontent.com/4820803/159591622-665ca12a-1dda-4553-9435-87217bf5aea8.png">

## Mermaid

check the offical documentation here: https://mermaid-js.github.io/mermaid/#/

## Related packages

- https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mermaid
- https://github.com/imjuni/erdia
- https://github.com/nurdiansyah/sveltekit-markdown/blob/2fffe9287943fced8516f33d4c5b19017f22a2af/src/lib/plugins/mermaid/index.ts
- https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mermaid
- https://github.com/stechy1/ast-to-mmd
- https://github.com/stechy1/ast-to-mmd/blob/ce20811c463981a2a509cc57ea7b2600c990252d/packages/ast-to-mmd/src/app/graph-blocks/renderer/shape-renderer.ts
