# 10 · Lecturas reactivas con httpResource

**Tiempo orientativo:** 90–120 minutos

## Tarea

Completa la representación de una consulta remota de productos.

- La URL depende de los signals de búsqueda y categoría.
- Cada cambio cancela la petición anterior cuando todavía está pendiente.
- La interfaz diferencia loading, error, vacío y resultados.
- No leas `value()` sin protegerlo con `hasValue()`.
- No uses `httpResource` para mutaciones.

## Arranque

```bash
npm run dev
```

## Prueba

```bash
npm run test:exercise -- 10
```
