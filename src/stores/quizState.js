import { ref } from 'vue'
import { defineStore } from 'pinia'

export const quizStore = defineStore('quizStore', () => {
    const count = ref(0);
    const qType = ref('');
    const sType = ref('');
    const sDifficulty = ref('');

    return { count, qType, sType, sDifficulty }
})
