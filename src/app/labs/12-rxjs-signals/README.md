# 12 · RxJS e interoperabilidad con signals

**Tiempo orientativo:** 2–3 horas

## Tarea

Implementa un buscador de sugerencias remotas.

- El texto del control vive en un signal.
- Convierte el signal a observable para modelar el tiempo.
- Espera 250 ms, elimina valores repetidos y cancela la petición anterior.
- No consulta con menos de 2 caracteres.
- Recupera errores devolviendo una lista vacía.
- Convierte el resultado final a signal para la plantilla.

## Prueba

```bash
npm run test:exercise -- 12
```
