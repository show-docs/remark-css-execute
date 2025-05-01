import { parse } from 'markdown-code-block-meta';
import { visit } from 'unist-util-visit';

function isTarget({ type, lang, meta }) {
  return (
    type === 'code' && lang === 'css' && meta && parse(meta).has('execute')
  );
}

export function remarkCssExecute() {
  return (tree) => {
    visit(tree, isTarget, (node) => {
      node.type = 'mdxJsxFlowElement';
      node.name = 'style';

      const { value } = node;
      const raw = JSON.stringify(value);

      node.children = [
        {
          type: 'mdxFlowExpression',
          value: raw,
          data: {
            estree: {
              type: 'Program',
              sourceType: 'module',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value,
                    raw,
                  },
                },
              ],
            },
          },
        },
      ];
      delete node.value;
      delete node.lang;
      delete node.meta;
      delete node.position;
    });
  };
}
