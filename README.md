<div align="center">
  <h1>VUE </h1>
  <h2>Navegación con Vue Router</h2>
  <p> es un paquete que nos permite crear rutas en nuestra aplicación.</p>
</div>

<div style="margin-bottom:50px;"></div>

# Tabla de contenido
1. [Setup inicial](#setup-inicial)
2. [Definición de rutas](#definición-de-rutas)
3. [navegación entre rutas](#navegación-entre-rutas)
4. [Parámetros](#parámetros)
5. [Rutas anidadas](#rutas-anidadas)
6. [Navegación programática](#navegación-programática)
7. [Rutas con nombre](#rutas-con-nombre)
8. [Redirección y alias](#redirección-y-alias)
9. [Componentes y props](#componentes-y-props)
10. [Modos de historia](#modos-de-historia)
11. [Guardas de navegación](#guardas-de-navegación)
12. [Rutas con metadatos](#rutas-con-metadatos)
13. [Obtención de datos](#obtención-de-datos)
14. [Coincidencia de rutas](#coincidencia-de-rutas)

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

<div style="margin-bottom:50px;"></div>

## Parámetros

Enviar parametros dentro de las urls

1. Declarar la url con la variable despues de dos puntos

```javascript
{ path: "/chats/:chatId", component: () => import("../views/ChatsView.vue") },
```

2. Para enviar el valor se puede realizar como una variable
```javascript
<RouterLink :to="`/chats/${chat.id}`">{{ chat.name }}</RouterLink>
```

3. Dentro del componente en el template podemos validar que variables trae el router de la siguiente manera
```html
<pre> {{this.$router }}</pre>
```

4. Capturar los valores que se envia por la url
```javascript
{{  this.$router.params.namevariable }}

{{ this.$route.params.chatId }}
```

<div style="margin-bottom:50px;"></div>

## Rutas anidadas

Dentro de la ruta padre se utiliza un atributo llamado children, y ya no es necesario en la ruta hija, nombrar al padre

```javascript
{
    path: "/chats",
    component: () => import("../views/ChatsView.vue"),
    children: [
    {
        path: ":chatId",
        component: () => import("../views/ChatView.vue"),
    },
    ],
},
```

En el componente padre para mostrar el componente hijo solo basta con añadir un ```RouterView```
```javascript
<template>
  <div>
    <aside>
      <div v-for="chat in chats" :key="chat.id">
        <RouterLink :to="`/chats/${chat.id}`">{{ chat.name }}</RouterLink>
      </div>
    </aside>
    <article>
      <RouterView></RouterView>
    </article>
  </div>
</template>
```

<div style="margin-bottom:50px;"></div>

## Navegación programática

Este tipo de navegación es utilizada para redireccionar al usuario despues de una acción, sin necesidad de click

```javascript
import { ref } from 'vue';
import { useRouter } from "vue-router";

const username = ref(''); 
const router = useRouter();

const iniciar = () => {
   router.push({
	    path: "/chats",
        query: {
            variable1: 1,
        },
        replace: true,
   });
};
```

```ref``` es una función que nos permite crear una variable reactiva.

```useRouter``` es una función que nos permite acceder a las propiedades de la ruta actual.

```router.push``` es una función que nos permite agregar una nueva ruta al historial de navegación, y se le pueden agregar varios parámetros:

 - ```path``` es la ruta a la que queremos navegar.
 - ```query``` es un objeto que contiene las variables que queremos pasar a la ruta.
 - ```replace``` es un booleano que nos permite reemplazar la ruta actual por la nueva ruta.


Otras propiedades a las que se puede acceder gracias a router:

```router.replace``` es una función que nos permite reemplazar la ruta actual por una nueva ruta.

```router.go()``` es una función que nos permite navegar hacía atrás o adelante en el historial de navegación. se le pasa como atributo un número, si es negativo va hacia atras, si es positivo va ahcia adelante


<div style="margin-bottom:50px;"></div>

## Rutas con nombre

Vue router nos permite la capacidad de nombrar a las rutas con un nombres que solo será reconocido por el sistema. al igual que las vistas.

1. A la ruta se le agrega el atributo name

```javascript
{ path: "/", component: HomeView, name:'home' },
```

```javascript 
<router-link :to="{ name: 'home'}">Home</router-link>
<router-link :to="{ name: 'about'}">About</router-link>
```

2. A la vista se le agrega
```javascript 
<router-view name="register" />
``` 

3. Para tener una ruta con más de un componente se realiza de la siguiente manera:
```javascript 
{
    path: "/session",
    component: () => import("../views/SessionView.vue"),
    children: [
      { path: "/session", components:{
        default: () => import("../views/LoginView.vue"),
        register: () => import("../views/RegisterView.vue")
      }}
    ],
    name: "session",
  },
``` 

<div style="margin-bottom:50px;"></div>

## Redirección y alias

Estas dos son funcionalidades muy utiles porque nos permiten crear una mejor experiencia de navegación, estrategias de SEO.

1. **Redirección**

```javascript 
{ path: '/home', redirect:'/'},
``` 

```javascript 
{ path: '/home', redirect:'{name: 'home'}'},
``` 

2. **Alias**

```javascript 
{ path: "/", component: HomeView, name: "home", alias:'/home' },
``` 

<div style="margin-bottom:50px;"></div>

## Componentes y props

Para reutilizar componente y que no queden ligados a las variables que se reciben por la url, se utilizaran props. Y asi podemos validar si viene el prop realice algo sino reutilice la vista para otra cosa.

> https://router.vuejs.org/guide/essentials/passing-props.html

1. Definimos el prop en el componente que lo utiliza
```javascript 
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  chatId: {
    type: String,
    default: ''
  }
})

const { chatId } = toRefs(props);

const messagesFiltered = computed(() => {
    return messages.value.filter((msg) => `${msg.author}` === chatId.value)
});
```

2. Le indicamos a la ruta que trabajara con props, y todas las variables que lleguen por la url las enviara con el mismo nombre para ser utilizadas

```javascript 
{
      path: "/chats",
      component: () => import("../views/ChatsView.vue"),
      children: [
        {
          path: ":chatId",
          component: () => import("../views/ChatView.vue"),
          props: true,
        },
      ],
    },
```

3. Por otro lado, se puede declarar directamente que props va a manejar de la siguiente manera:

```javascript
props: {
  chatId: '3'
},
```

4. También se puede enviar una función
```javascript
props: (route) => {
  return {
    chatId: route.params.chatId
  }
},
```

<div style="margin-bottom:50px;"></div>

## Modos de historia

Los navegadores web tienen una API en javascript vanilla, que permiten tener el control de el historial de navegación. El servidor existen dos maneras:

1. **Navegación HTML5**: simula ser una ruta del backend pero no lo es.

```javascript
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory()
});
```

2. **Navegación Hash**: este tipo de ruta lo que hace es agregar una almohadilla (#) en la url antes de acceder a la pagina que vamos acceder. 

```javascript
import { createRouter, createWebHasHistory } from "vue-router";

const router = createRouter({
  history: createWebHasHistory()
});
```

<div style="margin-bottom:50px;"></div>

## Guardas de navegación

Cuando se necesita aplicar permisos para acceder a una ruta o no, o cualquier tipo de validación.

> https://router.vuejs.org/guide/advanced/navigation-guards.html


En el archivo index.js de router, entre la variable de rutas y el exportado creamos la función beforeEach

```javascript
router.beforeEach((to, from) => {
  if(to.path === '/'){
    return {name : 'about'}
  }

  return true
});
```

<div style="margin-bottom:50px;"></div>

## Rutas con metadatos

Si necesitas complementar la seguridad de las rutas por el rol, o por otra validación se utilizarán metadatos de la siguiente manera:

1. Debemos asignarle a la ruta un atributo meta tipo json, el cual tiene una clase llamada ```requiresAuth``` colocarla en true o false, se recomienda que solo se le añada a las rutas que se les pondra true.

```javascript
{
  path: "/chats",
  component: () => import("../views/ChatsView.vue"),
  meta:{
    requiresAuth: true
  },
  children: [
    {
      path: ":chatId",
      component: () => import("../views/ChatView.vue"),
      props: (route) => {
        return {
          chatId: route.params.chatId
        }
      },
    },
  ],
},
```

2. Para utilizarlo en ```beforeEach``` que es la función donde podemos programar los condicionales de las rutas, se hace de la siguiente manera:
```javascript
router.beforeEach((to, from) => {

  if(to.meta?.requiresAuth){
    console.log(to.path, 'requires auth');
    return '/session'
  }

  return true
});
```

3. Ejemplo con roles

```javascript
{
  path: "/chats",
  component: () => import("../views/ChatsView.vue"),
  meta:{
    requiresAuth: true,
    roles: ['admin']
  },
  children: [
    {
      path: ":chatId",
      component: () => import("../views/ChatView.vue"),
      props: (route) => {
        return {
          chatId: route.params.chatId
        }
      },
    },
  ],
},
```

```javascript
router.beforeEach((to, from) => {

  if(to.meta?.requiresAuth && to.meta.roles.includes('admin')){
    console.log(to.path, 'requires auth');
    return '/session'
  }
  return true
});
```

<div style="margin-bottom:50px;"></div>

## Obtención de datos

Para poder detectar cuando cambia la ruta de los componentes en vue


Pueden usar la herramienta que nos provee Vue llamada watchEffect(), que básicamente nos permite generar un watcher común y corriente, pero que se genere desde el primer renderizado del componente, sin esperar que cambie el valor de la propiedad observada. Es decir, hacer lo mismo que hacer la opción {inmediate: true} en el options API:

```javascript
import { watchEffect } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

watchEffect(() => {
  console.log("params", route.params);
});
```

```javascript
export default {
  data() {
    return {
      chats: [],
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (val) => {
        console.log("UPDATE PARAMS", val);
        this.chats = [
          { id: 1, name: "Ximena" },
          { id: 2, name: "Javier" },
          { id: 3, name: "Teresita" },
          { id: 4, name: "Jorge" },
          { id: 5, name: "Ramiro" },
        ];
      },
      { immediate: true }
    );
  },
};
```

<div style="margin-bottom:50px;"></div>

## Coincidencia de rutas

Cuando tenemos aplicaciones que debemos comenzar a validar una ruta dinamica.

La regla se deben realizar con expresiones regulares 

```javascript
{
  path: "/chats",
  component: () => import("../views/ChatsView.vue"),
  meta: {
    requiresAuth: true,
    roles: ["admin"],
  },
  children: [
    {
      path: ":chatId(\\d+)",
      component: () => import("../views/ChatView.vue"),
      props: (route) => {
        return {
          chatId: route.params.chatId,
        };
      },
    },
  ],
}
```

Cuando las rutas no existen se le puede redirigir a una página 404
```javascript
{ path: "/404", component: NotFound },
{ path: "/:catchAll(.*)", redirect: '/404' },
```
> recuerda agregar la ruta a un componente
