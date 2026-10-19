# 14 · Límites de arquitectura

**Tiempo orientativo:** 3–5 horas

## Contexto

`legacy-catalog-page.ts` mezcla presentación, transformación, persistencia, acceso HTTP y reglas de negocio. Funciona, pero cada cambio aumenta el coste de mantenimiento.

## Tarea

Crea una solución dentro de `refactor/` con estas responsabilidades:

```text
refactor/
├── data-access/product.repository.ts
├── state/product-catalog.store.ts
├── ui/product-list.ts
├── product-catalog-page.ts
└── ARCHITECTURE.md
```

## Reglas

- La página orquesta; no conoce detalles HTTP.
- El repositorio encapsula el contrato remoto.
- El store controla estado y valores derivados.
- La lista es presentacional y comunica intenciones.
- Ninguna capa importa desde una capa superior.
- `ARCHITECTURE.md` explica decisiones y tradeoffs, no solo el árbol de carpetas.

## Comprobación estructural

```bash
npm run test:exercise -- 14
```

La revisión definitiva sigue siendo humana: comportamiento, nombres, dependencias y capacidad de explicación.
