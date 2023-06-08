<script>
import {quizStore} from '@/stores/quizState'
import { storeToRefs } from "pinia";
import {onBeforeMount, ref} from "vue";
import axios from "axios";

export default{
  setup() {
    const store = quizStore();

    const {count, sDifficulty, sType, qType} = storeToRefs(store);
    const quizArray = ref([]);

    onBeforeMount(async () => {
      if (qType.value === '') {
        quizArray.value = await axios.get(`https://opentdb.com/api.php?amount=${count.value}&category=${sType.value}&difficulty=${sDifficulty.value}`)
      } else {
        quizArray.value = await axios.get(`https://opentdb.com/api.php?amount=${count.value}&category=${sType.value}&difficulty=${sDifficulty.value}&type=${qType.value}`)
      }
    })

    return {
      count,
      sDifficulty,
      sType,
      qType,
      store,
      quizArray,
    }
  },
}
</script>

<template>
  <div class="hello">
    <div class="quizBox">
      {{ quizArray }}
    </div>
  </div>
</template>

<style scoped>
.hello{
  width: 100vw;
  height: 100vh;
  background: #24252f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.quizBox{
  color: white;
}
</style>