<script>
import {quizStore} from '@/stores/quizState'
import { storeToRefs } from "pinia";

export default{
  setup(){
    const store = quizStore();

    const { count, sDifficulty, sType, qType } = storeToRefs(store);

    return{
      count,
      sDifficulty,
      sType,
      qType,
      store
    }
  }
}
</script>

<template>
  <div class="hello">
    <span>hello</span>
    <span>{{ count }}</span>
    <span>{{ sDifficulty }}</span>
    <span>{{ sType }}</span>
    <span>{{ qType }}</span>
  </div>
</template>

<style scoped>
.hello{
  width: 100vw;
  height: 100vh;
  background: white;
}
</style>