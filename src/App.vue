<script>
import {reactive, ref} from "vue";
import axios from 'axios';
const {data} = await axios.get(`https://opentdb.com/api_category.php`);
export default {
  setup(){
    const quizData = ref(data.trivia_categories);
    const selectData = ref('');
    const numberOfQuestion = ref(1);
    const difficulty = ref(['easy','medium','hard']);
    const selectDifficulty = ref('easy');
    const quizType = ref(['True&False','multiple','any'])
    const selectType = ref('any');

    return{
      quizData,
      selectData,
      numberOfQuestion,
      difficulty,
      selectDifficulty,
      quizType,
      selectType
    }
  }
}
</script>

<template>
  <div class="wrapBox">
    <div class="innerBox">
      <div style="display: flex; width: 100%; justify-content: center; margin-bottom: 2%;">
        <span style="color: white; font-size: 2.5em">퀴즈</span>
      </div>
    <div class="flex">
      <span>퀴즈 종류 : </span>
    <select v-model="selectData">
      <option :value="v.name" v-for="(v,i) in quizData">{{ v.name }}</option>
    </select>
    </div>
    <div class="flex">
      <span>퀴즈 숫자 : </span>
    <input type="number" v-model="numberOfQuestion" min="1" max="50">
    </div>
    <div class="flex">
      <span>퀴즈 난이도 : </span>
    <select v-model="selectDifficulty">
      <option :value="v" v-for="(v,i) in difficulty">{{ v }}</option>
    </select>
    </div>
      <div class="flex">
        <span>퀴즈 타입 : </span>
        <select v-model="selectType">
          <option :value="v" v-for="(v,i) in quizType">{{ v }}</option>
        </select>
      </div>
      <div style="display: flex; width: 100%; justify-content: center; margin-bottom: 2%;">
        <button type="button" class="btn btn-primary" style="font-size: 2.5em">시작!</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.innerBox{
  width: 35%;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.wrapBox{
  background: #24252f;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flex{
  display: flex;
  justify-content: space-between;
  margin-bottom: 1%;
  color: white;
}

</style>
