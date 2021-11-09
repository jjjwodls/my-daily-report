<template>
  <div class="score">
    <button v-for="button in buttons" @click="updateScore(button.score)"
    :key="button.score"
    :class="{'active':button.score === item.score}"
    >
        {{button.label}}
    </button>
  </div>

</template>

<script>
export default {
  name: 'DayScore',
  data(){
    return{
        buttons:[
            {label : 'GOOD' , score : 3},
            {label : 'SOSO' , score : 2},
            {label : 'BAD' , score : 1},
        ]
    }
  },
  methods:{
      updateScore(score){
          //2개의 파라미터를 전송하여 각각 item의 score를 업데이트 해보자.
          this.$emit("onUpdateScore",this.item,score);
      }
  },
  props : [
      'item'
  ]
}
</script>

<style scoped>
</style>