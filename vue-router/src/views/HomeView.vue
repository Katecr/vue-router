<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");

const iniciar = () => {
  router.push({
	   path: "/chats",
     query: {
        variable1: 1,
      },
      replace: true,
   });
};
</script>

<template>
  <main>
    <h3>Introducción tu nombre de usuario {{ username }}</h3>
    <input placeholder="username" v-model="username" />
    <button @click="iniciar">Iniciar sesión</button>
  </main>
</template>
