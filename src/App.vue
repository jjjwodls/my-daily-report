<template>
  <div id="app">
    <div v-if="isLogin()">
      <Nav ></Nav>
    </div>
    <router-view/>
  </div>
</template>

<script>

import Nav from '@/components/Nav'

import axios from 'axios';
import firebase from 'firebase'

import { mapGetters, mapActions } from 'vuex'; //vuex 에서 두개의 메소드를 등록해준다.

export default {
  components :{
    Nav
  },
  data () {
    return{
      loginPageChk : false
    }
  },
  methods : {
    ...mapActions(['actionSaveSettings','actionSaveUserId']), //saveSettings 메소드가 등록이 된것.
    init(){
      // 매번 컴포넌트가 created 될 때 마다 데이터를 가져올 필요가 없으므로 분기처리
      if(this.$cookies.get('userId') != '' && this.getUserId === undefined){
        this.getSettings(); 
      }
    },
    isLogin(){
      let chkLogin = this.$route.path;
      if(chkLogin.indexOf('login') >= 0){
        return false;
      }
      return true;
    },
    getSettings(){
       let email = this.$cookies.get('userId');
       this.actionSaveUserId(email);

       let settings = this.$cookies.get("settings");
       this.actionSaveSettings(settings);
      //  let url = `https://dailyreport-2fcb2.firebaseio.com/${email}/settings.json`;
      //  axios.get(url).then((res)=>{
      //    if(res.status != 200){
      //      alert('데이터를 가져오는데 문제가 발생하였습니다.');
      //    }else{
           
      //    }

      // }); 
    }
  },
  computed : {
    ...mapGetters(['savedSettings','getUserId']),
  },
  created(){
    this.init();
  }
}
</script>
 

<style lang="scss" src="./assets/css/style.scss"></style>

