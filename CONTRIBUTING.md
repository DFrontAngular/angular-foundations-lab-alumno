# Contribuir

## Flujo recomendado

1. Crea una rama por ejercicio o mejora.
2. Mantén los cambios centrados en una única competencia.
3. Ejecuta `npm run check` antes de abrir una pull request.
4. Cuando las dependencias estén instaladas, ejecuta `npm run verify`.
5. Explica qué comportamiento has añadido y cómo lo has comprobado.

## Convenciones

- Componentes standalone por defecto; no escribas `standalone: true`.
- `ChangeDetectionStrategy.OnPush` en componentes de aplicación.
- Estado local con signals y valores derivados con `computed()`.
- Sin `Zone.js`.
- Nuevo control flow (`@if`, `@for`, `@switch`).
- Tipado estricto y sin `any` en código de aplicación.
- Tests desde la interfaz, usando selectores semánticos o `data-testid`.
- Evita llamar métodos privados o protegidos desde los tests.

## Commits orientativos

```text
feat(lab-04): compose product cards with inputs and outputs
test(lab-09): cover reactive product form contract
refactor(lab-13): expose readonly feature state
```
