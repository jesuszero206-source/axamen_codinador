# Blue-Eyes Card Explorer

Aplicación Angular para buscar cartas de Yu-Gi-Oh!, consultar su información y explorar el arquetipo Blue-Eyes por expansión. Los datos se obtienen en tiempo real desde la API pública de YGOPRODeck.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Ejecutar el proyecto

```bash
npm install
npm start
```

Abrir `http://localhost:4200`.

## Compilar para producción

```bash
npm run build
```

El resultado se genera en `dist/blue-eyes-card-explorer`.

## Estructura

- `core/models`: interfaces TypeScript para las respuestas de la API.
- `core/services`: comunicación HTTP con YGOPRODeck y favoritos persistentes.
- `shared`: tarjeta reutilizable y estados visuales.
- `features/search`: buscador reactivo de cartas.
- `features/card-detail`: detalle e impresiones de una carta.
- `features/blue-eyes`: colección y filtro dinámico por expansión.
- `features/favorites`: carpeta personal guardada en el navegador.

## API

- Busqueda parcial: `cardinfo.php?fname=termino`
- Colección Blue-Eyes: `cardinfo.php?archetype=Blue-Eyes`
- Detalle: `cardinfo.php?id=identificador`

La búsqueda usa `debounceTime`, `distinctUntilChanged` y `switchMap` para evitar solicitudes innecesarias.
