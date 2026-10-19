import { readFileSync } from 'node:fs';

const path = 'src/app/labs/16-routing-http-testing/product-lookup-page.exercise.spec.ts';
const source = readFileSync(path, 'utf8');
const errors = [];

if (/\bit\.todo\s*\(/.test(source)) errors.push('Sustituye todos los it.todo por pruebas ejecutables.');
if (!source.includes('RouterTestingHarness')) errors.push('Utiliza RouterTestingHarness.');
if (!source.includes('HttpTestingController')) errors.push('Utiliza HttpTestingController.');
if ((source.match(/\bit\s*\(/g) ?? []).length < 3) errors.push('Incluye al menos tres casos de prueba.');
if (!source.includes('flush(')) errors.push('Controla respuestas HTTP mediante flush().');
if (!source.includes('verify()')) errors.push('Verifica que no queden peticiones HTTP pendientes.');

if (errors.length > 0) {
  console.error('El laboratorio 16 todavía no cumple el contrato:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('La estructura de tests del laboratorio 16 está completa. Ejecutando Vitest…');
