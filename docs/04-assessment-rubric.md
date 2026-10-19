# Rúbrica de evaluación

Puntúa cada dimensión de 0 a 3.

| Dimensión | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Corrección | No funciona | Camino parcial | Criterios principales | Casos límite y recuperación |
| Tipado | `any` o errores | Tipos decorativos | Modelo estricto | Narrowing y fronteras claras |
| Reactividad | Estado incoherente | Sincronización manual | Signals y computed correctos | RxJS/signals elegidos con criterio |
| Arquitectura | Mezcla total | Separación nominal | Responsabilidades claras | Dependencias y alcance defendibles |
| UX remota | Sin feedback | Solo loading | Loading/error/empty | Recuperación y operaciones bloqueadas |
| Formularios | Sin validación | Validación simple | Reglas compartidas | Reglas cruzadas, accesibilidad y payload |
| Testing | Ausente | Internos | Comportamiento UI | Router/HTTP y casos de riesgo |
| Accesibilidad | Bloqueante | Parcial | Operable | Semántica, foco y mensajes sólidos |
| Explicación | No puede explicar | Repite receta | Defiende decisiones | Compara alternativas y tradeoffs |

## Paso al CRUD completo

Recomendación de paso:

- ninguna dimensión crítica en 0;
- corrección, formularios, HTTP y explicación al menos en 2;
- media general igual o superior a 2;
- capacidad demostrada para modificar una parte en revisión.
