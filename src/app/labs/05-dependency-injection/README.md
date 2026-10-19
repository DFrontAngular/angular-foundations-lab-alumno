# 05 · Servicios e inyección de dependencias

**Tiempo orientativo:** 90–120 minutos

## Tarea

Completa un servicio de preferencias de moneda y úsalo desde la página.

- La lista de monedas se proporciona mediante `InjectionToken`.
- El servicio encapsula un signal privado y expone una lectura readonly.
- El provider tiene alcance de componente para que cada instancia sea independiente.
- Cambiar la moneda actualiza el código y el precio formateado.

## Prueba

```bash
npm run test:exercise -- 05
```
