<template>
   <div class="container">
		 <div class="login">
		      <div class="modal-dialog login animated">
    		      <div class="modal-content">
    		         <div class="modal-header">
                        <h4 class="modal-title" v-if="!formFlag">다른 계정으로 로그인</h4>
                        <h4 class="modal-title" v-if="formFlag">계정 만들기</h4>
                    </div>
                    <div class="modal-body">
                        <div class="box" v-if="!formFlag">
                             <div class="content">
                                <div class="social">
                                    <img src='../assets/image/btn/btn_google_signin_light_focus_web.png' @click="googleSignIn()">
                                </div>
                                <div class="division">
                                    <div class="line l"></div>
                                      <span>또는</span>
                                    <div class="line r"></div>
                                </div>
                                <div class="error"></div>
                                <div class="form loginBox">
                                    <input id="email" class="form-control" type="text" placeholder="이메일" v-model="loginEmail">
                                    <input id="password" class="form-control" type="password" placeholder="비밀번호" @keyup.enter="signIn()" v-model="loginPwd">
                                    <input class="btn btn-default btn-login" type="button" value="로그인" @click="signIn()">
                                </div>
                             </div>
                        </div>
                        <div class="box" v-if="formFlag">
                            <div class="content registerBox" v-if="formFlag">
                             <div class="form">
                                <input id="email" class="form-control" type="text" placeholder="이메일" v-model="signUpEmail">
                                <input id="password" class="form-control" type="password" placeholder="비밀번호" v-model="signUpPwd">
                                <input id="password_confirmation" class="form-control" type="password" placeholder="비밀번호 확인" v-model="signUpPwdChk">
                                <input class="btn btn-default btn-register" @click="signUp()" type="button" value="생성하기" name="commit">
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="forgot login-footer" v-if="!formFlag">
                            계정이 없으신 분들은
                            <span class='createAccountStyle'>
                                 <a @click='createAccount()'>여기</a>
                            </span>
                            를 클릭해주세요.
                        </div>
                        <div class="forgot register-footer" v-if="formFlag">
                             <span>이미 계정이 있으신 분은</span>
                             <span class='createAccountStyle'>
                               <a @click='createAccount()'> 로그인</a>
                             </span>
                        </div>
                    </div>
    		      </div>
		      </div>
		  </div>
    </div>

</template>

<script>

import firebase from 'firebase'
import {mapActions, mapGetters} from 'vuex';
import axios from 'axios'
import moment from 'moment'

var provider = new firebase.auth.GoogleAuthProvider();
var resultUser = undefined;
export default {
  name: 'Login', //컴포넌트의 이름이다.,
  data(){
    return{
      formFlag : false,
      signUpEmail : '',
      signUpPwd : '',
      signUpPwdChk : '',
      loginEmail :'',
      loginPwd : '',
      settings: {
        starttime : '08:00',
        lang :'ko'
      },
      showModal : false
    }
  },
  methods : {
    ...mapActions(['actionSaveUserId','actionSaveSettings']),
    createAccount(){
      this.formFlag = !this.formFlag;
    },
    signUp : function(){
      if(this.signUpEmail == '' || this.signUpPwd == '' || this.signUpPwdChk == ''){
        alert("정보를 모두 입력해 주세요.");
      }

      if(this.signUpPwd != this.signUpPwdChk){
        alert("비밀번호가 일치하지 않습니다. 확인해주세요.");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(this.signUpEmail,this.signUpPwd).then(
        (user) =>{
          alert("아이디가 생성되었습니다.");
          let email = this.signUpEmail.replace("@","").replace(".","");
          let url = `https://dailyreport-2fcb2.firebaseio.com/${email}/settings.json`;
          axios.put(url,this.settings).then(
            (res)=>{
            if(res.status == 200){
            this.actionSaveSettings(this.settings);
            this.$cookies.set("settings",this.settings);
            }
          })
         this.formFlag = !this.formFlag;  
          
        },
        function(err){
          console.log(err,err.message);
          if(err.code.indexOf('weak-password') >= 0){
            alert("6자리 이상의 패스워드로 설정해주세요.");
            return;
          }
          if(err.code.indexOf("auth/email-already-in-use") >= 0){
            alert("이미 존재하는 이메일 입니다.");
            return;
          }
          if(err.code.indexOf("auth/invalid-email") >= 0){
            alert("이메일 형식으로 입력해 주세요.");
            return;
          }
          
        }
      )
    },
    signIn(){
      if(this.loginEmail == ''){
        alert("아이디를 입력해 주세요.");
        return;
      }else if(this.loginPwd == ''){
        alert("비밀번호를 입력해 주세요.");
        return;
      }

      firebase.auth().signInWithEmailAndPassword(this.loginEmail,this.loginPwd).then(
        (user) => {
          this.$cookies.set("idToken",user.user.ma);
          this.$cookies.set("refreshToken",user.user.refreshToken);
          let email = firebase.auth().currentUser.email;
          email = email.replace("@","").replace(".","");
          this.$cookies.set("userId",email);
          this.actionSaveUserId(email);
          let url = `https://dailyreport-2fcb2.firebaseio.com/${email}/settings.json`;
          axios.get(url).then((res)=>{
            if(res.status != 200){
              alert('데이터를 가져오는데 문제가 발생하였습니다.');
            }else{
              this.actionSaveSettings(res.data);
              this.$cookies.set("settings",res.data);
            }
          });
          
          // firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
          //   console.log("idtoken",idToken);
          // }).catch(function(error) {
          //   // Handle error
          // });
          // firebase.auth().onIdTokenChanged(function(user) {
          //   if (user) {
          //     console.log("new id token" + user.idToken);
          //   }
          // });

          // console.log("user",user);
          // console.log("test",firebase.auth().currentUser);
          //let todayUrl ='/day/' + moment(new Date()).format('YYYY-MM-DD');
          let todayUrl ='/intro/'+email;
          this.$router.push(todayUrl).catch(err => {}); //해당 url로 이동하는 방법이다.
        },
        (err) => {
          var errCode = err.code;
          if(errCode.indexOf("auth/wrong-password") >= 0 || errCode.indexOf("auth/user-not-found") >= 0){
            alert("아이디 또는 비밀번호를 확인해주세요.");
          }else if(errCode.indexOf("auth/invalid-email" >=0)){
            alert("이메일 형식의 아이디를 입력해 주세요.");
          }
          console.log("err",err);
        }
      );
      
    },
    googleSignIn(){
      firebase.auth().signInWithPopup(provider).then( (result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        
        firebase.auth().fetchSignInMethodsForEmail(result.user.email)
        .then(
          (signInMethods) => { // this 사용하기 위해
          //signInMethods 가 undefind 이거나 빈 string 또는 빈 배열 경우 아이디는 존재하지 않는것이다.
          if(signInMethods == null || signInMethods == undefined || signInMethods.length == 0){
            this.formFlag = !this.formFlag;
            this.signUpEmail = result.user.email; 
            alert("비밀번호를 설정해 주세요.");
          }else{
             var retunMethodLen = signInMethods.length;
             var flag = false;
             for(var i = 0 ; i < retunMethodLen ; i++){
               if(signInMethods[i] === "password"){
                  flag = true;
               }
             }
             if(!flag){
               this.formFlag = !this.formFlag;
               this.signUpEmail = result.user.email; 
               alert("비밀번호를 설정해 주세요."); 
               return;
             }
             this.$cookies.set("idToken",user.ma);
             this.$cookies.set("refreshToken",user.refreshToken);
             let email = user.email;
             email = email.replace("@","").replace(".","");
             this.$cookies.set("userId",email);
             this.actionSaveUserId(email);
             let url = `https://dailyreport-2fcb2.firebaseio.com/${email}/settings.json`;
             axios.get(url).then((res)=>{
                if(res.status != 200){
                  alert('데이터를 가져오는데 문제가 발생하였습니다.');
                }else{
                  this.actionSaveSettings(res.data);
                  this.$cookies.set("settings",res.data);
                }
             });

             let todayUrl ='/intro/'+email;
             this.$router.push(todayUrl).catch(err => {}); //해당 url로 이동하는 방법이다.
          }
        })
        .catch( (error) => {
          console.log("error = " + error);
        });
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    }
  },
  props : {
    msgKey : String,
    ageKey : Number
  },computed :{
    ...mapGetters(['getUserId'])
  },
  created() {
    
  }
}
</script>
<!-- scoped를 통해 현재 컴포넌트에만 css 적용되도록 변경함. -->
<style scoped lang="css" src="../assets/css/bootstrap.css"></style>
<style scoped lang="css" src="../assets/css/bootstrap-vue.css"></style>
<style scoped lang="css" src="../assets/css/login-register.css"></style>
<style scoped>
.createAccountStyle{
  color: blue;
}
</style>