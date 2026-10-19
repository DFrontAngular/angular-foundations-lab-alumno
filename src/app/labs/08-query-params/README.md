# 08 · Estado navegable con query params

**Tiempo orientativo:** 90–120 minutos

## Tarea

Sincroniza búsqueda y categoría con la URL.

- Al entrar con `?search=teclado&category=hardware`, los controles deben restaurarse.
- «Aplicar filtros» debe actualizar la URL sin recargar la página.
- Los valores vacíos deben desaparecer de los query params.
- La lista visible debe derivarse del estado de los controles.
- No almacenes en URL datos que no sean serializables o compartibles.

## Prueba

```bash
npm run test:exercise -- 08
```
