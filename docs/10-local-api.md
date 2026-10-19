# API local

Base mediante proxy Angular: `/api`.

| Método | Ruta | Uso |
|---|---|---|
| GET | `/api/health` | Salud |
| GET | `/api/categories` | Categorías y subcategorías |
| GET | `/api/products` | Listado con `search`, `category`, `page`, `limit`, `sort` |
| GET | `/api/products/:id` | Detalle |
| POST | `/api/products` | Alta |
| PATCH | `/api/products/:id` | Edición parcial |
| DELETE | `/api/products/:id` | Borrado |
| GET | `/api/suggestions?q=` | Autocomplete |
| POST | `/api/reset` | Restaurar seed |

## Estados simulados

- Busca exactamente `error` para recibir un `500` en el listado.
- La API añade una latencia aleatoria configurable mediante `API_DELAY_MIN_MS` y `API_DELAY_MAX_MS`.
- Los datos viven en memoria y se restauran al reiniciar.
