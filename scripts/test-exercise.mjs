import { spawnSync } from 'node:child_process';

const id = process.argv[2];
const includes = {
  '01': 'app/labs/01-bindings/**/*.exercise.spec.ts',
  '02': 'app/labs/02-signals-computed/**/*.exercise.spec.ts',
  '03': 'app/labs/03-control-flow/**/*.exercise.spec.ts',
  '04': 'app/labs/04-inputs-outputs/**/*.exercise.spec.ts',
  '05': 'app/labs/05-dependency-injection/**/*.exercise.spec.ts',
  '06': 'app/labs/06-pipes-directives/**/*.exercise.spec.ts',
  '07': 'app/labs/07-routing/**/*.exercise.spec.ts',
  '08': 'app/labs/08-query-params/**/*.exercise.spec.ts',
  '09-reactive': 'app/labs/09-forms/reactive/**/*.exercise.spec.ts',
  '09-signals': 'app/labs/09-forms/signals/**/*.exercise.spec.ts',
  '10': 'app/labs/10-http-resource/**/*.exercise.spec.ts',
  '11': 'app/labs/11-http-mutations/**/*.exercise.spec.ts',
  '12': 'app/labs/12-rxjs-signals/**/*.exercise.spec.ts',
  '13': 'app/labs/13-feature-state/**/*.exercise.spec.ts',
  '15': 'app/labs/15-component-testing/**/*.exercise.spec.ts',
  '16': 'app/labs/16-routing-http-testing/**/*.exercise.spec.ts',
};

if (!id) {
  console.error('Indica el ejercicio. Ejemplo: npm run test:exercise -- 09-reactive');
  process.exit(1);
}

if (id === '14') {
  const result = spawnSync(process.execPath, ['scripts/check-architecture.mjs'], { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}

if (id === '16') {
  const check = spawnSync(process.execPath, ['scripts/check-testing-lab.mjs'], { stdio: 'inherit' });
  if (check.status !== 0) process.exit(check.status ?? 1);
}

const include = includes[id];
if (!include) {
  console.error(`Ejercicio desconocido: ${id}`);
  console.error(`Disponibles: ${[...Object.keys(includes), '14'].join(', ')}`);
  process.exit(1);
}

const windows = process.platform === 'win32';
const ngCommand = windows ? 'ng.cmd' : 'ng';
const result = spawnSync(ngCommand, ['test', '--watch=false', `--include=${include}`], {
  stdio: 'inherit',
  shell: windows,
});
process.exit(result.status ?? 1);
