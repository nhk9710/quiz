<script>
import {quizStore} from '@/stores/quizState'
import { storeToRefs } from "pinia";
import {onBeforeMount, ref, computed} from "vue";
import axios from "axios";

export default{
  setup() {
    const store = quizStore();

    //퀴즈 홈에서 받아온 데이터
    const {count, sDifficulty, sType, qType} = storeToRefs(store);
    //퀴즈 데이터
    const quizArray = ref([]);

    //현재 퀴즈 번호
    const quizCount = ref(0);
    //퀴즈 개수
    const numberOfQuiz = ref(0);
    //선택지
    const answerArray = ref([]);
    //정답
    const correctAnswer = ref(0);
    //맞춘 문제 수
    const correctAnswers = ref(0);
    //문제
    const quizText = ref("");
    //답안1
    const quiz1 = ref('');
    //답안2
    const quiz2 = ref('');
    //답안3
    const quiz3 = ref('');
    //답안4
    const quiz4 = ref('');
    //마지막 문제 풀었을때
    const lastQuiz = ref(false);

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
              const index = quizCount.value;

              numberOfQuiz.value = quizArray.value.length;

              answerArray.value.push(quizArray.value[index].correct_answer);
              quizArray.value[index].incorrect_answers.forEach(v => {
                answerArray.value.push(v);
              })
              correctAnswer.value = quizArray.value[index].correct_answer;
              quizText.value = quizArray.value[index].question;
              quiz1.value = randomAnswerPosition();
              quiz2.value = randomAnswerPosition();
              quiz3.value = randomAnswerPosition();
              quiz4.value = randomAnswerPosition();
            })
      }
    })
    const renderQuiz = () => {
      const index = quizCount.value;

      answerArray.value.push(quizArray.value[index].correct_answer);
      quizArray.value[index].incorrect_answers.forEach(v => {
        answerArray.value.push(v);
      })
      correctAnswer.value = quizArray.value[index].correct_answer;
      quizText.value = quizArray.value[index].question;
      quiz1.value = randomAnswerPosition();
      quiz2.value = randomAnswerPosition();
      quiz3.value = randomAnswerPosition();
      quiz4.value = randomAnswerPosition();
    }

    //랜덤위치
    const randomAnswerPosition = () => {
      const randomNumber = Math.floor(Math.random() * answerArray.value.length);
      let answer = answerArray.value.splice(randomNumber, 1)[0];

      return answer;
    }

    //마지막 문제
    const chkLastQuiz = () => {
      if(quizCount.value + 1 === numberOfQuiz.value){
        // alert('마지막 입니다. 맞춘 수 : ' + correctAnswers.value + '개');
        lastQuiz.value = true;
      }else{
        return
      }
    }

    //정답확인
    const chkAnswer = (event) => {
      if(correctAnswer.value === event.target.innerText){
        alert('정답입니다');
        correctAnswers.value ++;
      }else{
        alert('오답입니다');

      }
      chkLastQuiz()
      quizCount.value ++;
      renderQuiz();
    }

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
      quizText,
      quiz1,
      quiz2,
      quiz3,
      quiz4,
      chkAnswer,
      lastQuiz,
      correctAnswers
    }
  },
}
</script>

<template>
  <div class="hello">
    <div class="quizBox">
      <template v-if="!lastQuiz">
      <progress class="quizProgress" :value="quizCount+1" min="0" max="10"></progress>
      <span style="font-weight: bold; margin: 0 auto; font-size: 1.3em" v-html="quizText"></span>
      <div class="btnLine">
      <button class="btnStyle" @click="chkAnswer($event)" v-html="quiz1"></button>
      <button class="btnStyle" @click="chkAnswer($event)" v-html="quiz2"></button>
      <button class="btnStyle" @click="chkAnswer($event)" v-html="quiz3"></button>
      <button class="btnStyle" @click="chkAnswer($event)" v-html="quiz4"></button>
      </div>
      </template>
      <template v-else>
        <span class="resultText">당신의 점수는 {{ correctAnswers }}/10점 입니다!</span>
        <router-link class="resultText" to="/" style="text-decoration-line: none;">재도전</router-link>
      </template>
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
  color: #24252f;
  border-radius: 10px;
  width: 35%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #eff0f4;
}
.quizProgress{
  appearance: none;
  margin: 0 auto;
  width: 90%;
}
.quizProgress::-webkit-progress-bar{
  background: #24252f;
  border-radius: 10px;
}
.quizProgress::-webkit-progress-value{
  border-radius: 10px;
  background: #2fe676;
}
.btnLine{
  display: flex;
  justify-content: space-around;
}
.btnStyle{
  background: #2fe676;
  font-weight: bolder;
  border:none;
  padding: 10px;
  border-radius: 9px;
  outline: none;
  cursor: pointer;
}
.resultText{
  margin: 0 auto;
  font-weight: bold;
  font-size: 1.5em;
  color: #24252f;
}
</style>