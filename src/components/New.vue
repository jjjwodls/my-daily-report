<template>
  <div class="hello">
    <h1>New 컴포넌트 변경되는건지 확인</h1>
    <p>HelloWord 에서 넘어온 msg {{msgKey}}</p>
    <p>HelloWord 에서 넘어온 age {{ageKey}}</p>
  </div>

</template>

<script>
export default {
  name: 'New', //컴포넌트의 이름이다.
  data(){
    return{
    }
  },
  props : {
    msgKey : String,
    ageKey : Number
  }
}
</script>
