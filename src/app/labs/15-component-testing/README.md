# 15 · Testing de componentes con Vitest

**Tiempo orientativo:** 2–3 horas

## Tarea

Corrige y prueba un disclosure accesible.

Comportamiento esperado:

- el botón expone `aria-expanded`;
- el panel se crea y destruye con `@if`;
- el click alterna el estado;
- el output notifica el nuevo valor;
- los tests interactúan con el DOM y esperan `fixture.whenStable()`;
- no se llama a métodos internos desde el test.

El starter incluye una prueba de aceptación mínima. Añade casos de cierre, contenido proyectado y output.

## Prueba

```bash
npm run test:exercise -- 15
```
