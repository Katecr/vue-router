<template>
  <div>
    <aside>
      <div v-for="chat in chats" :key="chat.id">
        <RouterLink :to="`/chats/${chat.id}`">{{ chat.name }}</RouterLink>
      </div>
    </aside>
    <article>
      <h2>
        {{ this.$route.params.chatId }}
      </h2>
    </article>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const chats = reactive([
  { id: 1, name: "Ameth" },
  { id: 2, name: "Gabriel" },
  { id: 3, name: "Andres" },
  { id: 4, name: "Victor" },
  { id: 5, name: "Ronald" },
  { id: 6, name: "Ana" },
  { id: 7, name: "Maria" },
]);

</script>