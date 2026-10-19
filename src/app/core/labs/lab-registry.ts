export type LabId =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | 'capstone';

export type LabLevel = 'base' | 'intermedio' | 'integración';

export interface LabDefinition {
  readonly id: LabId;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly duration: string;
  readonly level: LabLevel;
  readonly block: string;
  readonly concepts: readonly string[];
}

export const LABS: readonly LabDefinition[] = [
  {
    id: '01',
    slug: '01-bindings',
    title: 'Componentes y bindings',
    summary: 'Comprende el ciclo evento → estado → render sin manipular el DOM.',
    duration: '60–90 min',
    level: 'base',
    block: 'Fundamentos del framework',
    concepts: ['componente', 'interpolación', 'property binding', 'event binding'],
  },
  {
    id: '02',
    slug: '02-signals-computed',
    title: 'Signals y estado derivado',
    summary: 'Separa estado fuente y valores calculados evitando duplicaciones.',
    duration: '75–105 min',
    level: 'base',
    block: 'Fundamentos del framework',
    concepts: ['signal', 'computed', 'update', 'inmutabilidad'],
  },
  {
    id: '03',
    slug: '03-control-flow',
    title: 'Control flow y listas',
    summary: 'Representa colecciones, estados vacíos y variantes de UI con identidad estable.',
    duration: '75–105 min',
    level: 'base',
    block: 'Fundamentos del framework',
    concepts: ['@if', '@for', '@empty', '@switch', 'track'],
  },
  {
    id: '04',
    slug: '04-inputs-outputs',
    title: 'Composición con inputs y outputs',
    summary: 'Divide una pantalla en componentes con flujo de datos unidireccional.',
    duration: '90–120 min',
    level: 'base',
    block: 'Composición',
    concepts: ['input.required', 'output', 'componentes presentacionales'],
  },
  {
    id: '05',
    slug: '05-dependency-injection',
    title: 'Servicios e inyección de dependencias',
    summary: 'Modela configuración y estado compartido con providers de alcance controlado.',
    duration: '90–120 min',
    level: 'intermedio',
    block: 'Composición',
    concepts: ['inject', 'servicios', 'InjectionToken', 'providers'],
  },
  {
    id: '06',
    slug: '06-pipes-directives',
    title: 'Pipes y directivas',
    summary: 'Extrae transformación presentacional y comportamiento reutilizable.',
    duration: '90–120 min',
    level: 'intermedio',
    block: 'Composición',
    concepts: ['pipe puro', 'directiva de atributo', 'host bindings'],
  },
  {
    id: '07',
    slug: '07-routing',
    title: 'Router y navegación',
    summary: 'Construye listado y detalle con rutas lazy y parámetros tipados.',
    duration: '90–120 min',
    level: 'intermedio',
    block: 'Navegación',
    concepts: ['loadChildren', 'RouterLink', 'parámetros de ruta', '404 local'],
  },
  {
    id: '08',
    slug: '08-query-params',
    title: 'Estado navegable con query params',
    summary: 'Sincroniza filtros con la URL y restaura el estado al recargar.',
    duration: '90–120 min',
    level: 'intermedio',
    block: 'Navegación',
    concepts: ['queryParamMap', 'navigate', 'estado serializable'],
  },
  {
    id: '09',
    slug: '09-forms',
    title: 'El mismo formulario con dos APIs',
    summary: 'Resuelve un formulario de producto idéntico con Reactive Forms y Signal Forms.',
    duration: '4–6 h',
    level: 'intermedio',
    block: 'Formularios',
    concepts: ['Reactive Forms', 'Signal Forms', 'validación cruzada', 'campos dependientes'],
  },
  {
    id: '10',
    slug: '10-http-resource',
    title: 'Lecturas reactivas con httpResource',
    summary: 'Consume una API y representa loading, error, vacío y resultados.',
    duration: '90–120 min',
    level: 'intermedio',
    block: 'HTTP y asincronía',
    concepts: ['httpResource', 'hasValue', 'isLoading', 'cancelación'],
  },
  {
    id: '11',
    slug: '11-http-mutations',
    title: 'Mutaciones con HttpClient',
    summary: 'Implementa alta y borrado con feedback, bloqueo y recarga coherente.',
    duration: '2–3 h',
    level: 'integración',
    block: 'HTTP y asincronía',
    concepts: ['HttpClient', 'POST', 'DELETE', 'firstValueFrom', 'feedback'],
  },
  {
    id: '12',
    slug: '12-rxjs-signals',
    title: 'RxJS e interoperabilidad con signals',
    summary: 'Modela una secuencia temporal con debounce, cancelación y recuperación.',
    duration: '2–3 h',
    level: 'integración',
    block: 'HTTP y asincronía',
    concepts: ['toObservable', 'toSignal', 'switchMap', 'debounceTime'],
  },
  {
    id: '13',
    slug: '13-feature-state',
    title: 'Estado de feature',
    summary: 'Encapsula estado mutable y expone una API readonly orientada a acciones.',
    duration: '2–3 h',
    level: 'integración',
    block: 'Arquitectura',
    concepts: ['store local', 'signals privados', 'computed', 'provider de ruta'],
  },
  {
    id: '14',
    slug: '14-architecture',
    title: 'Límites de arquitectura',
    summary: 'Refactoriza una feature funcional pero acoplada hacia responsabilidades claras.',
    duration: '3–5 h',
    level: 'integración',
    block: 'Arquitectura',
    concepts: ['shell', 'feature', 'data access', 'UI compartida', 'facade'],
  },
  {
    id: '15',
    slug: '15-component-testing',
    title: 'Testing de componentes con Vitest',
    summary: 'Prueba comportamiento observable desde el DOM en un entorno zoneless.',
    duration: '2–3 h',
    level: 'integración',
    block: 'Testing',
    concepts: ['TestBed', 'Vitest', 'whenStable', 'selectores semánticos'],
  },
  {
    id: '16',
    slug: '16-routing-http-testing',
    title: 'Testing de Router y HTTP',
    summary: 'Verifica navegación y contratos HTTP sin acoplarte a detalles internos.',
    duration: '3–4 h',
    level: 'integración',
    block: 'Testing',
    concepts: ['RouterTestingHarness', 'HttpTestingController', 'errores HTTP'],
  },
  {
    id: 'capstone',
    slug: 'capstone',
    title: 'Product Workspace',
    summary: 'Integra routing, formularios, HTTP, estado, accesibilidad y tests.',
    duration: '16–24 h',
    level: 'integración',
    block: 'Proyecto final',
    concepts: ['aplicación completa', 'decisiones defendibles', 'revisión'],
  },
] as const;

export function getLab(id: LabId): LabDefinition {
  const lab = LABS.find((candidate) => candidate.id === id);

  if (!lab) {
    throw new Error(`No existe la definición del laboratorio ${id}.`);
  }

  return lab;
}
