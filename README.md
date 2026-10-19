# Angular Foundations Lab

Repositorio formativo para aprender Angular de forma progresiva antes de abordar una aplicación CRUD completa.

No intenta cubrir cada API del framework. Su objetivo es comprobar que una persona entiende componentes, reactividad, routing, formularios, HTTP, estado, arquitectura y testing mediante ejercicios pequeños, acumulativos y verificables.

## Qué incluye

- Diagnóstico inicial de 90 minutos.
- 16 laboratorios progresivos y un capstone.
- Starters compilables con TODOs concretos.
- Pruebas de aceptación por ejercicio, separadas del test general.
- Portal navegable con progreso en `localStorage`.
- API CRUD local sin base de datos ni dependencias runtime.
- Angular 22, componentes standalone por defecto, OnPush y zoneless.
- Signals y nuevo control flow.
- Lecturas con `httpResource`, mutaciones con `HttpClient` y secuencias con RxJS.
- Vitest y tests orientados al comportamiento desde la UI.
- Rúbrica, matriz de competencias y política de IA.

## Formularios: dos variantes obligatorias

El laboratorio 09 resuelve **el mismo formulario de producto dos veces**:

1. Reactive Forms estrictamente tipados.
2. Signal Forms estables de Angular 22.

Ambas variantes comparten dominio, reglas, UX, payload y helper de pruebas. Así la comparación no está sesgada por ejercicios de distinta dificultad.

```bash
npm run test:exercise -- 09-reactive
npm run test:exercise -- 09-signals
```

## Requisitos

Angular 22 requiere una versión compatible de Node.js. Usa una de estas ramas:

- Node.js `22.22.3` o superior dentro de la rama 22;
- Node.js `24.15.0` o superior dentro de la rama 24;
- Node.js 26 compatible.

El repositorio incluye `.nvmrc` con Node.js `24.15.0`.

## Arranque

```bash
npm install
npm run dev
```

Abre:

- aplicación: `http://localhost:4200`;
- API: `http://localhost:3000/api/health`.

`npm run dev` inicia Angular y la API en el mismo terminal. También puedes arrancarlos por separado:

```bash
npm run api
npm start
```

La primera instalación genera `package-lock.json`. Conviene versionarlo antes de compartir el repositorio para obtener instalaciones reproducibles.

## Comandos

```bash
npm run dev                         # Angular + API local
npm start                           # solo Angular con proxy
npm run api                         # solo API
npm run list                        # lista laboratorios y comandos
npm run check                       # estructura, convenciones y sintaxis
npm run build                       # build de producción
npm test                            # smoke tests Angular
npm run test:server                 # smoke de la API local
npm run test:watch                  # Vitest en watch
npm run test:exercise -- 04         # aceptación del laboratorio 04
npm run test:exercise -- 09-reactive
npm run test:exercise -- 09-signals
npm run verify                      # check + build + tests Angular + API
```

Los tests de ejercicios no forman parte de `npm test` porque los starters están intencionadamente incompletos. Cada participante ejecuta únicamente el contrato del laboratorio en el que trabaja.

## Itinerario

1. **Fundamentos:** componentes, bindings, signals y control flow.
2. **Composición:** inputs, outputs, DI, pipes y directivas.
3. **Navegación:** Router y query params.
4. **Formularios:** mismo ejercicio con Reactive Forms y Signal Forms.
5. **HTTP:** `httpResource`, mutaciones y RxJS.
6. **Arquitectura:** estado de feature y límites.
7. **Testing:** componentes, Router y HTTP.
8. **Capstone:** Product Workspace.

Consulta [docs/01-learning-path.md](docs/01-learning-path.md) para el detalle.

## Organización

```text
src/app/
├── core/         registro de laboratorios y progreso global
├── shared/       dominio, datos demo y UI reutilizable
├── labs/         16 features lazy de aprendizaje
├── capstone/     punto de entrada del proyecto final
└── pages/        home, diagnóstico y 404

diagnostic/       enunciado y starter del diagnóstico
capstone/          alcance y criterios del proyecto final
server/            API local en memoria
scripts/           desarrollo, validación y pruebas por ejercicio
```

## Decisiones técnicas

- No se escribe `standalone: true`: es el valor predeterminado.
- Todos los componentes de aplicación usan `ChangeDetectionStrategy.OnPush`.
- No existe dependencia de Zone.js; Angular 22 es zoneless por defecto.
- No se introduce NgRx, una librería visual ni un framework CSS.
- Los laboratorios se cargan de forma lazy.
- El estado mutable se mantiene privado siempre que existe un owner claro.
- Los tests usan `fixture.whenStable()` y comportamiento observable.
- Reactive Forms se conecta con signals cuando el template necesita reactividad programática zoneless.

## Relación con otros repositorios

```text
frontend-foundations-lab
        ↓
angular-foundations-lab
        ↓
angular-practica-crud
```

- El primer repositorio valida fundamentos web.
- Este repositorio enseña Angular de forma incremental.
- El CRUD completo valida integración profesional con más variables simultáneas.

## Publicar en un repositorio nuevo

```bash
npm install
npm run check
npm run build
git init
git add .
git commit -m "chore: bootstrap angular foundations lab"
git branch -M main
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin main
```

## Referencias oficiales

- Signal Forms: `https://angular.dev/guide/forms/signals`
- Reactive Forms: `https://angular.dev/guide/forms/reactive-forms`
- Zoneless: `https://angular.dev/guide/zoneless`
- httpResource: `https://angular.dev/guide/http/http-resource`
- Testing con Vitest: `https://angular.dev/guide/testing`
- Versiones compatibles: `https://angular.dev/reference/versions`

## Licencia

MIT.
