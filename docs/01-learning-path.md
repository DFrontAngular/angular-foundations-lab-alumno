# Itinerario de aprendizaje

## Principio

La secuencia reduce dificultad accidental. Cada laboratorio introduce una o dos ideas nuevas y reutiliza las anteriores.

| Bloque | Laboratorios | Resultado esperado |
|---|---:|---|
| Fundamentos | 01–03 | Entiende render reactivo, signals y control flow |
| Composición | 04–06 | Divide responsabilidades e inyecta dependencias |
| Navegación | 07–08 | Modela rutas y estado compartible en URL |
| Formularios | 09A–09B | Resuelve el mismo dominio con ambas APIs |
| HTTP | 10–12 | Distingue lectura, mutación y secuencia temporal |
| Arquitectura | 13–14 | Encapsula estado y define límites de feature |
| Testing | 15–16 | Prueba desde UI, Router y frontera HTTP |
| Integración | Capstone | Construye una feature completa y defendible |

## Ritmo recomendado

No uses las horas como objetivo de productividad. Una persona avanza cuando puede explicar y modificar su solución sin depender de una receta.

### Punto de entrada

- Sin experiencia Angular: laboratorio 01.
- Angular inicial pero inseguro: diagnóstico y laboratorio 02 o 04 según resultado.
- Experiencia previa: diagnóstico y bloques 09, 12, 14 y 16 como comprobación.

## Criterio de salida

Antes de pasar a `angular-practica-crud`, la persona debe poder:

- construir una feature lazy;
- distinguir estado fuente y derivado;
- componer componentes con inputs y outputs tipados;
- resolver y probar un formulario;
- representar todos los estados remotos;
- elegir entre `httpResource`, `HttpClient` y RxJS;
- mantener estado de feature con una API explícita;
- justificar ubicación y dependencias de cada pieza;
- probar comportamiento desde el DOM;
- depurar una petición y explicar los errores encontrados.
