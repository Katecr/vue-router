<template>
  <div>
    <aside>
      <div v-for="chat in chats" :key="chat.id">
        <router-link :to="`/chats/${chat.id}`">{{ chat.name }}</router-link>
      </div>
    </aside>
    <article>
      <router-view></router-view>
    </article>
  </div>
</template>

<script setup>
import { ref, watch  } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const chats = ref();

// watchEffect(() => {
//   console.log("params", route.params);
// });

watch( () => route.params, (val) => {
  console.log('update params', val);
  chats.value = [
    { id: 1, name: "Ameth" },
    { id: 2, name: "Gabriel" },
    { id: 3, name: "Andres" },
    { id: 4, name: "Victor" },
    { id: 5, name: "Ronald" },
    { id: 6, name: "Ana" },
    { id: 7, name: "Maria" },
  ];
}, {inmediate: true});
</script>