<script setup>
import { ref } from 'vue';

const username = ref("");
</script>

<template>
  <main>
    <h3>Introducción tu nombre de usuario {{ username }}</h3>
    <input placeholder="username" v-model="username" />
  </main>
</template>
