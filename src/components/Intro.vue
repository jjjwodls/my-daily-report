<template>
  <div class="intro">
    <div class="intro-inner">
      <h1>Daily<br/>Report</h1>
      <router-link class='button' :to="todayUrl"> <!-- :to 콜론이 중요 -->
        START
      </router-link>
    </div>
  </div>

</template>

<script>

import moment from 'moment'
import {mapGetters} from 'vuex'

export default {
  name: 'Intro',
  data(){
    return{
    }
  },
  props : {
  },
  computed :{
    todayUrl(){
      let email = this.getUserId;
      let todayUrl2 = moment(new Date()).format('YYYY-MM-DD');
      return `/${email}/day/${todayUrl2}`; 
    },
    ...mapGetters(['savedSettings','getUserId'])
  }
}
</script>

<style scoped>
</style>
