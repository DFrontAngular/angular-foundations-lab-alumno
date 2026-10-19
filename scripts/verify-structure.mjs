import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function moduleExists(base) {
  return [base, `${base}.ts`, `${base}.d.ts`, join(base, 'index.ts')].some(existsSync);
}

function resolvesLocalModule(fromFile, effectiveFile, specifier) {
  if (specifier.startsWith('.')) {
    return [
      resolve(dirname(fromFile), specifier),
      resolve(dirname(effectiveFile), specifier),
    ].some(moduleExists);
  }

  let base;
  if (specifier.startsWith('@app/')) {
    base = resolve('src/app', specifier.slice('@app/'.length));
  } else if (specifier.startsWith('@core/')) {
    base = resolve('src/app/core', specifier.slice('@core/'.length));
  } else if (specifier.startsWith('@shared/')) {
    base = resolve('src/app/shared', specifier.slice('@shared/'.length));
  } else {
    return true;
  }

  return moduleExists(base);
}

function sourceLocation(path) {
  const parts = path.split(/[\\/]/);
  const filesIndex = parts.lastIndexOf('files');
  return filesIndex >= 0 ? join(...parts.slice(filesIndex + 1)) : path;
}

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

const required = [
  'angular.json',
  'package.json',
  'src/main.ts',
  'src/app/app.routes.ts',
  'server/index.mjs',
  'docs/01-learning-path.md',
  'diagnostic/README.md',
  'capstone/README.md',
];
for (const path of required) {
  if (!existsSync(path)) throw new Error(`Falta el archivo obligatorio ${path}.`);
}

const labFolders = [
  '01-bindings', '02-signals-computed', '03-control-flow', '04-inputs-outputs',
  '05-dependency-injection', '06-pipes-directives', '07-routing', '08-query-params',
  '09-forms', '10-http-resource', '11-http-mutations', '12-rxjs-signals',
  '13-feature-state', '14-architecture', '15-component-testing', '16-routing-http-testing',
];
for (const folder of labFolders) {
  const readme = `src/app/labs/${folder}/README.md`;
  if (!existsSync(readme)) throw new Error(`Falta ${readme}.`);
}

const formsContractFiles = [
  'src/app/labs/09-forms/product-form.domain.ts',
  'src/app/labs/09-forms/product-form-test.contract.ts',
  'src/app/labs/09-forms/reactive/reactive-product-form-page.exercise.spec.ts',
  'src/app/labs/09-forms/signals/signal-product-form-page.exercise.spec.ts',
];
for (const path of formsContractFiles) {
  if (!existsSync(path)) throw new Error(`El laboratorio dual de formularios necesita ${path}.`);
}

const conventionFiles = [
  ...filesUnder('src').filter((path) => ['.ts', '.html'].includes(extname(path))),
];
for (const path of conventionFiles) {
  const source = readFileSync(path, 'utf8');
  if (source.includes('standalone: true')) throw new Error(`${path}: no escribas standalone: true.`);
  if (/\*ng(?:If|For|Switch)/.test(source)) throw new Error(`${path}: utiliza el nuevo control flow.`);
  if (source.includes('zone.js')) throw new Error(`${path}: el proyecto debe ser zoneless.`);
}

const componentFiles = conventionFiles.filter(
  (path) => path.endsWith('.ts') && !path.endsWith('.spec.ts') && readFileSync(path, 'utf8').includes('@Component'),
);
for (const path of componentFiles) {
  const source = readFileSync(path, 'utf8');
  if (!source.includes('ChangeDetectionStrategy.OnPush')) {
    throw new Error(`${path}: falta ChangeDetectionStrategy.OnPush.`);
  }
}

for (const path of ['angular.json', 'package.json', 'proxy.conf.json', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.spec.json']) {
  try {
    JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new Error(`${path}: JSON inválido (${error instanceof Error ? error.message : String(error)}).`);
  }
}

const moduleFiles = [
  ...filesUnder('scripts').filter((path) => path.endsWith('.mjs')),
  ...filesUnder('server').filter((path) => path.endsWith('.mjs')),
  ...filesUnder('tests').filter((path) => path.endsWith('.mjs')),
];
for (const path of moduleFiles) {
  execFileSync(process.execPath, ['--check', path], { stdio: 'pipe' });
}

const markdownFiles = [
  'README.md',
  ...filesUnder('docs'),
  ...filesUnder('diagnostic'),
  ...filesUnder('capstone'),
  ...filesUnder('src/app/labs'),
].filter((candidate) => candidate.endsWith('.md'));
const markdownErrors = [];
for (const path of markdownFiles) {
  const source = readFileSync(path, 'utf8');
  for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (/^(?:https?:|mailto:|#)/.test(target)) continue;
    const normalized = decodeURIComponent(target.split('#')[0].split('?')[0]);
    if (!normalized) continue;
    const resolved = resolve(dirname(path), normalized);
    if (!existsSync(resolved)) markdownErrors.push(`${path}: enlace roto a ${target}.`);
  }
}
if (markdownErrors.length > 0) {
  throw new Error(`Enlaces Markdown no resueltos:\n${markdownErrors.join('\n')}`);
}

let typescript;
try {
  typescript = await import('typescript');
} catch {
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const globalRoot = execFileSync(npmCommand, ['root', '-g'], { encoding: 'utf8' }).trim();
  typescript = await import(pathToFileURL(join(globalRoot, 'typescript/lib/typescript.js')).href);
}
const ts = typescript.default ?? typescript;
const tsFiles = conventionFiles.filter((path) => path.endsWith('.ts'));
const syntaxErrors = [];
for (const path of tsFiles) {
  const source = readFileSync(path, 'utf8');
  const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const diagnostic of parsed.parseDiagnostics) {
    syntaxErrors.push(`${path}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
  }
}
if (syntaxErrors.length > 0) {
  throw new Error(`Errores sintácticos TypeScript:\n${syntaxErrors.join('\n')}`);
}

const dependencyErrors = [];
for (const path of tsFiles) {
  const source = readFileSync(path, 'utf8');
  const parsed = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const effectivePath = sourceLocation(path);

  function visit(node) {
    let specifier;
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      specifier = node.moduleSpecifier.text;
    } else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      specifier = node.arguments[0].text;
    }

    if (specifier && !resolvesLocalModule(path, effectivePath, specifier)) {
      dependencyErrors.push(`${path}: no se resuelve ${specifier}.`);
    }
    ts.forEachChild(node, visit);
  }

  visit(parsed);

  for (const match of source.matchAll(/(?:templateUrl|styleUrl):\s*['"]([^'"]+)['"]/g)) {
    const assets = [
      resolve(dirname(path), match[1]),
      resolve(dirname(effectivePath), match[1]),
    ];
    if (!assets.some(existsSync)) {
      dependencyErrors.push(`${path}: no existe ${match[1]}.`);
    }
  }
}

if (dependencyErrors.length > 0) {
  throw new Error(`Dependencias locales no resueltas:\n${dependencyErrors.join('\n')}`);
}

console.log(
  `Estructura validada: ${labFolders.length} laboratorios, ${componentFiles.length} componentes OnPush, ` +
  `${tsFiles.length} archivos TypeScript, ${moduleFiles.length} módulos Node y enlaces Markdown correctos.`,
);
