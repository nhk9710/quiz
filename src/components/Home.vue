<script>
import {reactive, ref} from "vue";
import axios from 'axios';
import {quizStore} from '@/stores/quizState'
import { storeToRefs } from "pinia";

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
    const store = quizStore();
    let { count, sDifficulty, sType, qType } = storeToRefs(store);
    const inputData = () => {
        count.value = numberOfQuestion;
        sDifficulty.value = selectDifficulty;
        sType.value = selectData;
        qType.value = selectType;
    }
    const returnHere = () => {
      alert('퀴즈 종류를 선택해주세요!');
    }

    return{
      returnHere,
      count,
      inputData,
      store,
      quizData,
      selectData,
      numberOfQuestion,
      difficulty,
      selectDifficulty,
      quizType,
      selectType,
    }
  }
}
</script>

<template>
  <div class="wrapBox">
    <div class="borderBox">
      <div class="innerBox">
        <div style="display: flex; width: 100%; justify-content: center; margin-bottom: 2%;">
          <span style="color: white; font-size: 2.5em">퀴즈</span>
        </div>
        <div class="flex">
          <span>퀴즈 종류 : </span>
          <select class="selectBox" v-model="selectData">
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
          <button type="button" class="btn" style="font-size: 2.5em">
            <template v-if="selectData === ''">
            <router-link to="/"
                         style="text-decoration-line: none;"
                         class="routerLink"
                         @click="returnHere"
            >시작!</router-link>
            </template>
            <template v-else>
              <router-link to="/question"
                           style="text-decoration-line: none;"
                           class="routerLink"
                           @click="inputData"
              >시작!</router-link>
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapBox{
  background: #24252f;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@keyframes animationGlow {
  0%{background-position:0 50%}
  50%{background-position:100% 50%}
  100%{background-position:0 50%}
}
.borderBox{
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: scale(0.75);
  border-radius: 10px;
  background: linear-gradient(270deg, #0fffc1, #7e0fff);
  background-size: 200% 200%;
  animation: animationGlow 10s infinite;
}
.innerBox{
  width: 97%;
  height: 94%;
  margin: 0 auto;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(36,37,47,1);
}

.flex{
  display: flex;
  justify-content: space-between;
  margin-bottom: 1%;
  padding-left: 5%;
  padding-right: 5%;
  color: white;
}
.selectBox{
  outline-color: red;
  border: 1px solid red;
}
.btn{
  background: none;
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 12px 4px #0fffc1;
  transition: 1.5s;

}
.btn:hover{
  color: #7e0fff;
  box-shadow:  0 0 20px 18px #7e0fff;
}

.routerLink{
  color: #0fffc1;
  transition: 1.5s;
}
.routerLink:hover{
  color: #7e0fff;
}




</style>
