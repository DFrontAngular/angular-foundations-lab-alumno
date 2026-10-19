# 09 · El mismo formulario con dos APIs

**Tiempo orientativo:** 4–6 horas

Este bloque se resuelve dos veces sobre el mismo dominio, las mismas reglas, el mismo HTML accesible y el mismo contrato de pruebas:

- `reactive/`: Reactive Forms estrictamente tipados.
- `signals/`: Signal Forms estables de Angular 22.

No se busca declarar una API ganadora. Se busca poder comparar el modelo mental, la validación cruzada, el estado de interacción, la integración zoneless y la ergonomía de testing.

## Formulario de producto

Campos:

- nombre;
- categoría;
- subcategoría dependiente;
- tipo físico o digital;
- precio base;
- precio promocional;
- stock;
- descripción.

## Reglas compartidas

1. Nombre obligatorio, entre 3 y 80 caracteres.
2. Categoría y subcategoría obligatorias.
3. La subcategoría debe pertenecer a la categoría elegida.
4. El precio base debe ser mayor que cero.
5. El precio promocional puede ser cero; si existe debe ser inferior al precio base.
6. Un producto físico exige stock mayor que cero.
7. Un producto digital normaliza el stock a cero.
8. La descripción admite un máximo de 240 caracteres.
9. Cambiar categoría limpia una subcategoría anterior incompatible.
10. Un envío inválido muestra errores y no genera payload.

## Orden recomendado

1. Implementa Reactive Forms.
2. Ejecuta su prueba.
3. Implementa Signal Forms sin copiar mecánicamente la estructura anterior.
4. Ejecuta la misma prueba de contrato.
5. Completa la tabla de comparación en `docs/07-forms-comparison.md`.

## Pruebas

```bash
npm run test:exercise -- 09-reactive
npm run test:exercise -- 09-signals
```
