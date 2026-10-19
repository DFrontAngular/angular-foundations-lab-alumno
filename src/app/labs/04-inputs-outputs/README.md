# 04 · Composición con inputs y outputs

**Tiempo orientativo:** 90–120 minutos

## Tarea

Completa el flujo de favoritos entre una página contenedora y tarjetas presentacionales.

- La tarjeta recibe el producto y su estado mediante inputs.
- La tarjeta emite una intención; no modifica el estado global.
- La página mantiene los IDs favoritos en un `ReadonlySet`.
- Pulsar de nuevo elimina el favorito.
- La interfaz refleja `aria-pressed` y el contador.

## Prueba

```bash
npm run test:exercise -- 04
```
