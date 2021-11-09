<template>
  <div class="calendar">
    <full-calendar
    :config="config"
    @day-click="dayClick">


    </full-calendar>
  </div>

</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
import 'fullcalendar/dist/locale/ko' //한국어 사용을 위해

import {mapGetters} from 'vuex'

export default {
  name: 'Calendar',
  components : {
    FullCalendar
  },
  methods :{
    dayClick(date) {
      let email = this.getUserId;
      let url = `/${email}/day/${date.format('YYYY-MM-DD')}`;
      this.$router.push(url);
    },
    applySettings(){
      this.config['locale'] = this.savedSettings.lang;
    }
  },
  data(){
    return{
      config :{
        defaultView : 'month',
        header : {
          left : 'prev',
          center : 'title',
          right : 'next'
        },
        height : 500,
        //locale : this.savedSettings.lang 데이터에는 다이나믹한 것을 적용 불가
        locale : 'ko'
      }
    }
  },
  computed : {
    ...mapGetters(['savedSettings','getUserId'])
  },
  props : {
  },
  created(){
    this.applySettings();
  }
}
</script>

<style scoped>
</style>