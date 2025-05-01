import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { removePosition } from 'unist-util-remove-position';

import { remarkCssExecute } from '../../lib/index.mjs';

function removePST(ast) {
  removePosition(ast, { force: true });

  return ast.children;
}

export async function TransformSnapshot(t, input, option = {}) {
  const instance = remark().use(remarkMdx).use(remarkCssExecute, option);

  const ast = instance.parse(input);

  t.snapshot(input, 'input');
  t.snapshot(removePST(ast), 'ast');

  const tree = removePST(await instance.run(ast));

  t.snapshot(tree, 'parsed');

  const output1 = await instance
    .process(input)
    .then((file) => file.toString().trim());

  t.snapshot(output1, 'output1');

  const output2 = await instance
    .process(output1)
    .then((file) => file.toString().trim());

  t.snapshot(output2, 'output2');
}
