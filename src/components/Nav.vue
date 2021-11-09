<!--네비게이션 하단 공통 영역-->
<template>
  <div class="nav">
    <ul class="nav-list">
      <li>
        <button @click='today'>
            <i class="xi-home"></i>
            <span>오늘</span>
        </button>
      </li>
        <li>
            <router-link :to="{path : '/'+this.userId + '/calendar'}">
                <i class="xi-calendar"></i>
                <span>달력</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{path : '/'+this.userId + '/setting'}">
                <i class="xi-cog"></i>
                <span>설정</span>
            </router-link>
        </li>
        <!-- <li>
            <router-link :to="{path : '/'+this.userId + '/about'}">
                <i class="xi-emoticon-smiley"></i>
                <span>소개</span>
            </router-link>
        </li> -->
        <li>
          <button @click="showModal = true">
            <i class="xi-log-out"></i>
            <span>로그아웃</span>
          </button>
        </li>
    </ul>
    <modal v-if="showModal" @close="showModal = false" @ok = "logout()">
        <h5 slot="header">로그아웃 하시겠습니까?</h5>
    </modal>
  </div>

</template>

<script>
import moment from 'moment'
import firebase from 'firebase'
import { mapGetters } from 'vuex'
import Modal from '@/components/Modal'

export default {
  components : {
    Modal
  },
  methods : { //methods (s를 잘 붙이자)
    today() {
      let email = this.getUserId;
      let todayUrl ='/'+email+'/day/' + moment(new Date()).format('YYYY-MM-DD');
      this.$router.push(todayUrl).catch(err => {}); //해당 url로 이동하는 방법이다.
      //중복 클릭해도 예외 발생 안하도록 처리
    },
    logout(){
      this.showModal = false;
      firebase.auth().signOut().then( 
        () =>{
          //모든 쿠키 remove
          this.$cookies.keys().forEach(
            cookie => this.$cookies.remove(cookie)
          );
          this.$router.push('login');
        }
      );
    }
    
  },
  name: 'Nav',
  data(){
    return{
      userId : undefined,
      showModal : false
    }
  },
  props : {
  },
  computed : {
    ...mapGetters(['savedSettings','getUserId'])
  },
  created (){
    this.userId = this.getUserId
  }
  
}
</script>

<style scoped>
</style>