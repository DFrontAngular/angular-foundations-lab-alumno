# 07 · Router y navegación

**Tiempo orientativo:** 90–120 minutos

## Tarea

Revisa y completa una feature con rutas hijas lazy:

- listado en `/labs/07-routing/products`;
- detalle en `/labs/07-routing/products/:productId`;
- redirección desde la raíz de la feature;
- estado «producto no encontrado» sin lanzar excepciones;
- navegación mediante `RouterLink`, no mediante `location.href`.

El starter incluye el esqueleto de rutas para centrar el ejercicio en comprender la relación entre configuración, outlet y parámetros.

## Prueba

```bash
npm run test:exercise -- 07
```
