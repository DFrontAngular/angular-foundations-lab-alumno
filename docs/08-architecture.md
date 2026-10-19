# Arquitectura del laboratorio

## Capas prácticas

```text
app shell
├── core        configuración y servicios realmente globales
├── shared      dominio y UI sin conocimiento de features
├── labs        features lazy autocontenidas
└── capstone    aplicación final
```

Dentro de una feature más grande:

```text
feature/
├── pages/       composición ligada a rutas
├── data-access/ frontera HTTP o persistencia
├── state/       estado y acciones de la feature
├── ui/          componentes presentacionales
└── models/      tipos exclusivos del dominio local
```

No es obligatorio crear todas las carpetas. Se crean cuando existe esa responsabilidad.

## Dependencias

- `shared` no importa desde una feature.
- `data-access` no conoce componentes.
- `ui` no ejecuta HTTP.
- la página puede orquestar store, router y UI;
- el store no debe convertirse en un contenedor de cualquier lógica.

## Shell

El shell de aplicación vive en `src/app/app.*`. Los shells de feature, como formularios o routing, viven dentro de su feature porque controlan navegación y providers locales.
