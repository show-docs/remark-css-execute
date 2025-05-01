import test from 'ava';

import { TransformSnapshot } from './helper/lib.mjs';

test(
  'no execute',
  TransformSnapshot,
  `
\`\`\`css
body {
  color: red;
}
\`\`\`
`,
);

test(
  'execute',
  TransformSnapshot,
  `
\`\`\`css abc execute
body {
  color: red;
}
\`\`\`
`,
);

test(
  'xss',
  TransformSnapshot,
  `
\`\`\`css abc execute
<script></script>
\`\`\`
`,
);
