<script>
import {reactive, ref} from "vue";
import axios from 'axios';
const {data} = await axios.get(`https://opentdb.com/api_category.php`);
export default {
  setup(){
    const quizData = ref(data.trivia_categories);
    const selectData = ref('');

    return{
      quizData,
      selectData
    }
  }
}
</script>

<template>
  <div>
    <select v-model="selectData">
      <option :value="v.name" v-for="(v,i) in quizData">{{ v.name }}</option>
    </select>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
