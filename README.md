<div align="center">
  <h1>VUE </h1>
  <h2>Navegación con Vue Router</h2>
  <p> es un paquete que nos permite crear rutas en nuestra aplicación.</p>
</div>

<div style="margin-bottom:50px;"></div>

# Tabla de contenido
1. [Setup inicial](#setup-inicial)
2. [Definición de rutas](#definición-de-rutas)
3. [navegación entre rutas](#Navegación-entre-rutas)

<div style="margin-bottom:50px;"></div>

## Setup inicial

Instalar con vite nuestro entorno: https://vuejs.org/guide/quick-start.html#creating-a-vue-application

1. Instalar con vite, debemos agregar en la instalación Web aplication con router.
```bash
npm init vue@latest
```

2. Pasarnos a la carpeta del proyecto creado
```bash
cd project_name
```

3. Installamos npm
```bash
npm install
```

4. Inicializar el servidor
```bash
npm run dev
```

<div style="margin-bottom:50px;"></div>

## Definición de rutas

1. Se crea limpia el archivo index.js de la carpeta router

2. Importar la capacidad de crear un sistema de rutas con vue router, su return debe ser guardado en una variable

```javascript
import { createRouter } from 'vue-router';
```

3. Su return debe ser guardado en una variable, que recibe un json.

```javascript
const router = createRouter({});
```

4. Dicha variable debe hacerse pública para el proyecto y poderla importar en el main.js:

```javascript
export default router
```

5. El json mencionado en el punto 3 recibe 2 parametros:

    - **Modo de historia:** modo de historial de navegación, que va autilizar el navegador

    - **Rutas:** rutas que va a definir

```javascript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/", component: HomeView },
    {path: "/about", component: () => import("../views/AboutView.vue")},
  ],
});
```

6. Para realizar  rutas asincronicas se recomienda utilizar la sintaxis de función

```javascript
component: () => import("../views/AboutView.vue"),
```

7. Se debe conectar el componente de rutas de la siguiente manera:
```javascript
<router-view />
```

<div style="margin-bottom:50px;"></div>

## Navegación entre rutas

Vue router nos facilita el componente router-link y con el atributo  ```to``` se le indica a que ruta dirigirse

```javascript
<router-link to="/">Home</router-link>
<router-link to="/about">About</router-link>
```