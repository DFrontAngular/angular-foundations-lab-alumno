# 16 · Testing de Router y HTTP

**Tiempo orientativo:** 3–4 horas

## Tarea

Escribe pruebas de integración para `ProductLookupPage`.

Casos mínimos:

1. navegar a `/products/:productId` inicia el GET correcto;
2. una respuesta 200 representa el nombre;
3. una respuesta 404 representa un mensaje recuperable;
4. cambiar de ID genera una nueva petición;
5. no se accede a campos privados ni se llama a métodos internos.

Usa `RouterTestingHarness`, `provideRouter`, `provideHttpClient` y `provideHttpClientTesting`.

El starter contiene `it.todo`. La comprobación no se considera superada hasta reemplazarlos por pruebas ejecutables.

```bash
npm run test:exercise -- 16
```
