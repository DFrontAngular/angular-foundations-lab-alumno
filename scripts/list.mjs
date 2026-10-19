const labs = [
  ['01', 'Componentes y bindings', 'npm run test:exercise -- 01'],
  ['02', 'Signals y estado derivado', 'npm run test:exercise -- 02'],
  ['03', 'Control flow y listas', 'npm run test:exercise -- 03'],
  ['04', 'Inputs y outputs', 'npm run test:exercise -- 04'],
  ['05', 'Dependency Injection', 'npm run test:exercise -- 05'],
  ['06', 'Pipes y directivas', 'npm run test:exercise -- 06'],
  ['07', 'Router', 'npm run test:exercise -- 07'],
  ['08', 'Query params', 'npm run test:exercise -- 08'],
  ['09-reactive', 'Formulario con Reactive Forms', 'npm run test:exercise -- 09-reactive'],
  ['09-signals', 'Formulario con Signal Forms', 'npm run test:exercise -- 09-signals'],
  ['10', 'httpResource', 'npm run test:exercise -- 10'],
  ['11', 'Mutaciones HttpClient', 'npm run test:exercise -- 11'],
  ['12', 'RxJS y signals', 'npm run test:exercise -- 12'],
  ['13', 'Estado de feature', 'npm run test:exercise -- 13'],
  ['14', 'Arquitectura', 'npm run test:exercise -- 14'],
  ['15', 'Testing de componentes', 'npm run test:exercise -- 15'],
  ['16', 'Testing de Router y HTTP', 'npm run test:exercise -- 16'],
];

console.log('\nAngular Foundations Lab\n');
for (const [id, title, command] of labs) {
  console.log(`${id.padEnd(11)} ${title.padEnd(38)} ${command}`);
}
console.log('\nDesarrollo: npm run dev');
console.log('Verificación general: npm run verify\n');
