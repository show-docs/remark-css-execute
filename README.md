# remark-css-execute

Remark plugin for converting CSS code blocks to MDX style.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/remark-css-execute
[npm-badge]: https://img.shields.io/npm/v/remark-css-execute.svg?style=flat-square&logo=npm
[github-url]: git+https://github.com/show-docs/remark-css-execute
[github-badge]: https://img.shields.io/npm/l/remark-css-execute.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/remark-css-execute.svg?style=flat-square&colorB=green&logo=node.js

## Why use this plugin?

MDX 2+ has limited support in many code formatters. This plugin provides a solution by allowing you to use CSS in standard Markdown (.md) files. You can write CSS code blocks with the `execute` meta tag, and they'll be automatically transformed into MDX `<style>` elements during processing, avoiding formatting issues that occur with direct MDX syntax.

## Example

````md
Turn:

```css execute
button {
  color: red;
}
```

Into:

<style>
  {"button {\\n  color: red;\\n}"}
</style>
````

## Installation

```bash
npm install remark-css-execute --save-dev
```

## Usage

```mjs
import readFileSync from 'node:fs';

import { remark } from 'remark';
import { remarkCssExecute } from 'remark-css-execute';

const markdownText = readFileSync('example.md', 'utf8');

remark()
  .use(remarkCssExecute)
  .process(markdownText)
  .then((file) => console.info(file))
  .catch((error) => console.warn(error));
```

## Related

- [markdown-code-block-meta](https://github.com/show-docs/markdown-code-block-meta)
- [rehype-extended-table](https://github.com/show-docs/rehype-extended-table)
- [remark-code-example](https://github.com/show-docs/remark-code-example)
- [remark-docusaurus](https://github.com/show-docs/remark-docusaurus)
- [remark-kroki](https://github.com/show-docs/remark-kroki)
