<template>
  <div class="setting">
    <div class="setting-inner">
      <h1>설정 (언어 선택 시 달력언어만 변경됩니다.)</h1>
        <form @submit.prevent="saveSettings"> <!--form 을 submit 진행하며 prevent 를 통해 페이지 전환을 막음.-->
          <fieldset>
            <label for="starttime">시작 시간</label> <!--8시로 스태틱 하게 설정된 시간을 변경 하게 한다-->
            <select id="starttime"
            v-model="settings.starttime">
              <option value="08:00">08:00</option>
              <option value="10:00">10:00</option>
              <option value="12:00">12:00</option>
            </select>
          </fieldset>
          <fieldset>
              <label for="">달력 언어</label>
              <select id="lage" v-model="settings.lang">
                <option value="ko">한국어</option>
                <option value="en">영어</option>
              </select>
          </fieldset>
          <fieldset class="subbmit">
            <button type="submit" class='save'>저장</button>
          </fieldset>
        </form>      
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import {mapActions, mapGetters} from 'vuex';

export default {
  
  name: 'Setting',
  methods : {
    ...mapActions(['actionSaveSettings','actionSaveUserId']),
    saveSettings(){
       let email = this.getUserId;
       let url = `https://dailyreport-2fcb2.firebaseio.com/${email}/settings.json`;
       axios.put(url,this.settings).then(
         (res)=>{
          if(res.status == 200){
            this.actionSaveSettings(this.settings);
            this.$cookies.set("settings",this.settings);
            alert('저장이 완료 되었습니다.');
          }
        }
      );
    },
    // 이미 등록된 값만 받아오니까 
    getSettings(){
      if(this.savedSettings != null){
        this.settings = this.savedSettings;
      }
      
    }
  },
  data(){
    return{
      settings: {
        starttime : '08:00',
        lang :'ko'
      }
    }
  },
  computed :{
    ...mapGetters(['savedSettings','getUserId'])
  },
  created() {
    this.getSettings();
  }
}
</script>

<style scoped>
</style>