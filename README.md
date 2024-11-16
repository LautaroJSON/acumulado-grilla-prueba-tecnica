# Acumulado Grilla - Prueba tecnica 🤺

## Descripción

Aplicación React Server-Side Rendered (SSR) creada como prueba técnica para el puesto de **Desarrollador de Arquitectura Frontend** en **La Nación**.

## Instalacion

1. Clonar el repositorio

```bash
  git clone https://github.com/LautaroJSON/acumulado-grilla-prueba-tecnica.git
  cd acumulado-grilla-prueba-tecnica
```

2. Una vez tengamos el repositorio, descargamos las dependencias

```bash
  yarn install // npm install
```

3. Por ultimo levantamos el proyecto con:

```bash
  yarn run start // npm run start
```

_**nota**: IMPORANTE! recordar crear el archivo ".env" con las variables de entorno de ".env.example"_

---

#### Docker:

Si desea iniciar el proyecto con docker

1. Creamos la imagen

```bash
  docker build -t acumulado:1 .
```

2. levantamos la imagen en los puertos 3001:3001

```bash
  docker run -p 3001:3001 acumulado:1
```

## Caracteristicas

Aplicacion **Server-Side Rendering (SSR)** con Express, utilizando ReactDOMServer para devolver un componente montado en el servidor, en este mismo se crean las peticiones y modifica la respuesta a una api externa para alivianar la carga del cliente y retornar un componente de react ya montado.

## Arquitectura

- **Frontend (React/Ts):**
  - Genera la interfaz de usuario utilizando React + Typescript.
  - El estado de la aplicación se gestiona principalmente a través de Context API y props, y la lógica de transformación de datos se maneja en el backend.
- **Backend (Express/NodeJS):**
  - Se encarga de manejar las solicitudes, obtener los datos desde una fuente externa, filtrar y transformar los mismo, y enviar el HTML preprocesado al cliente. (esto hace que el cliente no tenga que contruir la app como lo haria normalmente con react, dando mas velocidad y menos carga del lado del front)
  - Utiliza **ReactDOMServer** para hacer el renderizado del lado del servidor y servirlo como un archivo HTML.

**Client:** React, Typescript, css

**Server:** NodeJs, Typescript, Express

## Estructura

    ACUMULDO-GRILLA-PRUEBA-TECNICA/
    ├── public/
    │   ├── favicon.ico
    ├── src/
    │   ├── __mock__/
    │   ├── __tests__/
    │   ├── cliente/
    │   │   ├── components/
    │   │   ├── context/
    │   │   ├── layout/
    │   │   ├── models/
    │   │   ├── utils/
    │   │   ├── App.tsx
    │   │   ├── globals.css
    │   │   ├── index.html
    │   │   └── index.tsx
    │   ├── server/
    │   │   ├── controller/
    │   │   ├── models/
    │   │   ├── services/
    │   │   ├── utils/
    │   │   └── server.ts
    │   ├── global.d.ts
    ├── .dockerignore
    ├── .env.example <-- nota: reemplazar por .env
    ├── .gitignore
    ├── .prettierignore
    ├── .prettier
    ├── babel.config.json
    ├── docker-compose.yml
    ├── Dockerfile
    ├── eslint.config.mjs
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    └── webpack.config.cjs

- En la estructura del proyecto se opto por separar dentro de src/ la aplicacion react y el servidor express en las respectivas carpetas **client/** y **server/**

- **client/**: Contiene la aplicacion y los componentes de react
- **server/**: Contiene el BFF con Express

- **webpack + babel**: el proyecyo contiene los archivos de configuracion **webpack.config.cjs**, separando en este mismor archivo la configuracion para el servidor y el cliente, _serverConfig_ y _clientConfig_ respectivamente. ademas esta configuracion **babel.config.json**

- **eslint + Prettier**: utiliza eslint como linter adaptado a Prettier para no pisar estilos y mantener un codigo limpio.

## Tecnologías

- **Webpack:** Herramienta para empaquetar el código y optimizar los recursos.
- **Babel:** Para transpilar código JavaScript moderno y JSX/TSX a un formato compatible con la mayoría de los navegadores.
- **Express:** Framework web para Node.js, utilizado para manejar las solicitudes HTTP en el servidor.
- **Dotenv:** Para manejar variables de entorno (como la URL de la API).
- **Jest:** Framework de pruebas para unit test
