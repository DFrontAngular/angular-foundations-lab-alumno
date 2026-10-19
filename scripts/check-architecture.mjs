import { readFileSync, existsSync } from 'node:fs';

const required = [
  'src/app/labs/14-architecture/refactor/data-access/product.repository.ts',
  'src/app/labs/14-architecture/refactor/state/product-catalog.store.ts',
  'src/app/labs/14-architecture/refactor/ui/product-list.ts',
  'src/app/labs/14-architecture/refactor/product-catalog-page.ts',
  'src/app/labs/14-architecture/refactor/ARCHITECTURE.md',
];

const missing = required.filter((path) => !existsSync(path));
if (missing.length > 0) {
  console.error('Faltan entregables del refactor:');
  for (const path of missing) console.error(`- ${path}`);
  process.exit(1);
}

const withTodo = required.filter((path) => readFileSync(path, 'utf8').includes('TODO'));
if (withTodo.length > 0) {
  console.error('Todavía quedan marcadores TODO en:');
  for (const path of withTodo) console.error(`- ${path}`);
  process.exit(1);
}

const architecture = readFileSync(required.at(-1), 'utf8');
if (architecture.trim().split(/\s+/).length < 80) {
  console.error('ARCHITECTURE.md debe explicar decisiones y tradeoffs con suficiente detalle.');
  process.exit(1);
}

console.log('Estructura mínima del laboratorio 14 completada. Continúa con la revisión humana.');
