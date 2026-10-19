# 01 · Componentes y bindings

**Tiempo orientativo:** 60–90 minutos

## Objetivo

Comprender el flujo `evento → actualización de estado → render` sin consultar ni modificar el DOM manualmente.

## Tarea

Completa el selector de cantidad para que:

1. incremente una unidad;
2. nunca permita bajar de `1`;
3. deshabilite el botón de reducir cuando está en el mínimo;
4. vuelva al valor inicial al pulsar «Restablecer»;
5. anuncie el valor actual de forma comprensible.

## Restricciones

- Mantén el estado en un `signal`.
- Deriva `canDecrease` con `computed()`.
- No uses `document.querySelector`, `ElementRef` ni mutación directa de texto.
- No añadas Zone.js.

## Criterios de aceptación

- [ ] La cantidad inicial es `1`.
- [ ] Incrementar actualiza el valor visible.
- [ ] Reducir nunca produce `0` ni negativos.
- [ ] El botón de reducir refleja el estado deshabilitado.
- [ ] Restablecer devuelve la cantidad a `1`.

## Prueba

```bash
npm run test:exercise -- 01
```
