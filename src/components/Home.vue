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
    const numberOfQuestion = ref(10);
    const difficulty = ref(['easy','medium','hard']);
    const selectDifficulty = ref('easy');
    const quizType = ref([{name:'True&False', value: 'boolean'},{name:'multiple', value: 'multiple'},{name:'any',value: ''}])
    const selectType = ref('');
    const store = quizStore();
    let { count, sDifficulty, sType, qType } = storeToRefs(store);
    const inputData = () => {
        count.value = numberOfQuestion.value;
        sDifficulty.value = selectDifficulty.value;
        sType.value = selectData.value;
        qType.value = 'multiple';
    }
    const returnHere = () => {
      alert('퀴즈 종류를 선택해주세요!');
    }

    return{
      data,
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
          <span style="color: #24252f; font-size: 2.5em; font-weight: bolder">퀴즈</span>
        </div>
        <div class="flex">
          <span>퀴즈 종류 : </span>
          <select class="selectBox" v-model="selectData">
            <option :value="v.id" v-for="(v,i) in quizData">{{ v.name }}</option>
          </select>
        </div>
        <div class="flex">
          <span>퀴즈 숫자 : </span>
          <input class="selectBox" type="number" v-model="numberOfQuestion" min="1" max="50">
        </div>
        <div class="flex">
          <span>퀴즈 난이도 : </span>
          <select class="selectBox" v-model="selectDifficulty">
            <option :value="v" v-for="(v,i) in difficulty">{{ v }}</option>
          </select>
        </div>
        <div style="display: flex; width: 100%; justify-content: center; margin-bottom: 2%;">
          <button type="button" class="btn" style="font-size: 1.5em">
            <template v-if="selectData === ''">
            <router-link to="/"
                         style="text-decoration-line: none;"
                         class="routerLink"
                         @click="returnHere"
            >Start!</router-link>
            </template>
            <template v-else>
              <router-link to="/question"
                           style="text-decoration-line: none;"
                           class="routerLink"
                           @click="inputData"
              >Start!</router-link>
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
  border-radius: 10px;
}
.innerBox{
  width: 97%;
  height: 95%;
  margin: 0 auto;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #eff0f4;
}

.flex{
  display: flex;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  color: #24252f;
  font-size: 1.7em;
}
.selectBox{
  border-radius: 10px;
  border: none;
  cursor: pointer;
}


.btn{
  background: none;
  border: none;
  border-radius: 20px;

}

.routerLink{
  color: #24252f;
  padding: 10px;
  background: #2fe676;
  border-radius: 10px;
}




</style>
