<template>
  <div class="hello">
     
     <p>new 컴포넌트 시작</p>
     <new
     :msgKey="msg"
     :ageKey="age"></new>
     <!--좌측이 key , 우측이 현재 컴포넌트의 data 값-->
     <p>new 컴포넌트 끝</p> 

     <input type="text" v-model="msg">
     <h1>{{msg}}</h1>
     <input type="checkbox" v-model="check">
     <p>체크박스 상태 : {{check}}</p>

      <input type="radio" v-model="age" value="30">
      <input type="radio" v-model="age" value="20">
      <input type="radio" v-model="age" value="10">

     <p>age의 현재 값 : {{age}}</p>

     <select v-model="age">
      <option value="30">30</option>
      <option value="20">20</option>
      <option value="20">10</option>
     </select>
     
  </div>

</template>

<script>
import New from './New' //필요한 곳에 작성한다

export default {
  name: 'HelloWorld',
  components:{
    New
  },
  methods :{ //method 작성법.
    keyup(){
      alert("엔터를 클릭함.");
    },
    updateScore(param){
      this.score = param;
    },
  },
  computed:{ //동적으로 계산된 값이 반영되도록 함.
    today(){
      let date = new Date();
      return date.getDate();
    },
    plusScore(){
      return this.score;
    }
  },
  data(){
    return{
      msg1 : '',
      score : 0,
      textColor : 'blue',
      msg : '반갑습니다.', //정의된 msg는 위와 같이  바인딩 가능
      author : 'bob',
      age : 30,
      article : '<strong>Hello</strong> World!',
      check : false,
      url : 'http://google.com',
      path : '/img/logo.82b9c7a5.png',
      isActive : false,
      items : [
        {name : 'red' , age : 15},
        {name : 'blue' , age : 20},
        {name : 'green' , age : 25},
      ],
      person : {
        name : 'bob',
        age : 25,
        location : 'seoul'
      }

    }
  },
  beforeCreate(){
    console.log('beforeCreate');
    console.log(this.score);
  },
  created(){
    console.log('created');
    console.log(this.score);
  },
  beforeMount(){
    console.log('beforeMount');
    console.log(this.score);
  },
  mounted(){
    console.log('mounted');
    console.log(this.score);
  },
  beforeUpdate(){
    console.log('beforeUpdate');
    console.log(this.age);
  },
  updated(){
    console.log('updated');
    console.log(this.age);
  },
  beforeDestroy(){
    console.log('beforeDestory');
  },
  destroyed(){
    console.log('destoryed');
  }
  

  // props: {
  //   msg: String
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"> //scoped가 적용되면 해당 컴포넌트인 helloworld.vue 에만 적용되는것이다.
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
