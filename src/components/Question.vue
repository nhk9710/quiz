<script>
import {quizStore} from '@/stores/quizState'
import { storeToRefs } from "pinia";
import {onBeforeMount, ref, computed} from "vue";
import axios from "axios";

export default{
  setup() {
    const store = quizStore();

    const {count, sDifficulty, sType, qType} = storeToRefs(store);
    const quizArray = ref([]);

    //현재 퀴즈 번호
    const quizCount = ref(0);
    //퀴즈 개수
    const numberOfQuiz = ref(0);
    //선택지
    const answerArray = ref([]);

    const incNum = () => {
      if(quizCount.value === count.value){
        alert('마지막 문제입니다!');
        return false;
      }else{
        quizCount.value++;
      }
    }

    //문제 타입에 의한 데이터 리스폰스
    onBeforeMount(async () => {
      if (qType.value === '') {
        await axios.get(`https://opentdb.com/api.php?amount=${count.value}&category=${sType.value}&difficulty=${sDifficulty.value}`)
            .then(response => {
              quizArray.value = response.data.results.map(v => {
                return {
                  test: v
                }
              })
            })
      } else {
        await axios.get(`https://opentdb.com/api.php?amount=${count.value}&category=${sType.value}&difficulty=${sDifficulty.value}&type=${qType.value}`)
            .then(response => {
              quizArray.value = response.data.results;
              const index = quizCount;

              answerArray.value.push(quizArray.value[index].correct_answer);
              quizArray.value[index].incorrect_answers.forEach(v => {
                answerArray.value.push(v);
              })
            })
      }

    })
    return {
      answerArray,
      numberOfQuiz,
      quizCount,
      count,
      sDifficulty,
      sType,
      qType,
      store,
      quizArray,
      incNum,
    }
  },
}
</script>

<template>
  <div class="hello">
    <div class="quizBox">
<!--      <span v-html="quizArray.data.results[quizCount].question"></span>-->
      <pre>{{ quizArray }}</pre>
      <div class="btnBox">
      <button @click="incNum">정답확인</button>
      </div>
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
  border: 1px solid white;
  border-radius: 10px;
  width: 40%;
  height: 50%;
  display: flex;
  flex-direction: column;
}

.btnBox{
  display: flex;
  justify-content: end;
}
</style>