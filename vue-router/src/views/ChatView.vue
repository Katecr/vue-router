<template>
    <div v-for="msg in messagesFiltered" :key="msg.id">
        {{  msg.text }}
    </div>
</template>

<script setup>
import { ref, computed, toRefs, defineProps } from 'vue';

const props = defineProps({
  chatId: {
    type: String,
    default: ''
  }
});


const { chatId } = toRefs(props);

const messages = ref([
    { id: 1, text: 'Mensaje 1', author: 1 },
    { id: 2, text: 'Mensaje 2', author: 2 },
    { id: 3, text: 'Mensaje 3', author: 3 },
    { id: 4, text: 'Mensaje 4', author: 3 },
    { id: 5, text: 'Mensaje 5', author: 4 },
    { id: 6, text: 'Mensaje 6', author: 4 },
    { id: 7, text: 'Mensaje 7', author: 5 },
]);

const messagesFiltered = computed(() => {
    return messages.value.filter((msg) => `${msg.author}` === chatId.value)
});

</script>