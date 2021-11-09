<template>
  <div class="day">
    <h1 class="day-title">
      {{$route.params.date}} <!--라우터에서 date 파라미터 받아오기-->
    </h1>
    <ul class="day-list">
      <li v-for="item in items" :key="item.id" class='day-list-item'
      :class="{'open' : item.open}"> <!--item.open true 일 때 open class명이 적용된다.-->
        <div class="time">
          <span>{{item.viewTime}}</span>
          <div class="buttons" id='initButtons'>
            <button @click="confirmInitItem(item)" id='initButton' class='cancel'>초기화</button>
          </div>
          
        </div>
        <div class="action"> 
          <p
            v-if="!item.open"
            @click="toggleOpen(item)"
          >
            {{item.action}}
            <span v-if="item.action.length === 0">내용을 작성해 주세요.</span>
          </p>
          <input v-if="item.open" type="text" placeholder="할 일을 작성해주세요." v-model="item.action">
        </div>
        <day-score
          @onUpdateScore="onUpdateScore"
          :item="item"
        ><!--props 를 통해 자식으로 현재 item 을 전달한다-->
          
        </day-score>
        <div class="note" v-if="item.open">
          <textarea v-model="item.note" placeholder="노트를 작성해 주세요.">

          </textarea>
        </div>

        <div class="buttons" v-if="item.open">
          <button class="save" @click="updateItem(item)"> <!--각 슬롯에 item 을 전달.-->
            저장  
          </button>
          <button class="cancel" @click="toggleOpen(item)">취소</button>          
        </div>
      </li>
    </ul>
    <modal v-if="showModal" @close="showModal = false" @ok = "initItem(saveInitItem)">
        <h5 slot="header">일정을 초기화 하시겠습니까?</h5>
    </modal>
  </div>

</template>

<script>

import DayScore from './DayScore'
import axios from 'axios'
import moment from 'moment'

import { mapGetters } from 'vuex'
import firebase from 'firebase'
import Modal from '@/components/Modal'

export default {
  name: 'Day',
  methods : {
    onUpdateScore(item,score){
      item.score = score; // item에 score를 대입해준다.
      //this.updateItem(item);//버튼 클릭 시 바로바로 업데이트 되도록 하기 위해
    },
    getItems(){ //ajax 요청을 통해 firebase 서버에서 데이터를 가져온다.
        let email = this.getUserId;
        let url = `https://dailyreport-2fcb2.firebaseio.com/D`
        +`ataList/${email}/.json?orderBy="$key"&startAt="${this.$route.params.date}"`
        +`&endAt="${this.$route.params.date}-22-24"`;
        axios.get(url).then((res) => { //요청 후 결과값을 가져옴.
          this.items = this.displayItems(res.data);
        });
    },
    //넘어온 데이터를 가공해서 뿌려주는 역활.
    displayItems(resData){
      //빈 슬롯까지 다 그려주고 데이터가 있는 것들은 채워넣자.
      let items = [];
      let startTime = ''; // 시작 시간
      if(this.savedSettings.starttime == null){
        startTime ='08:00';
      }else{
        startTime = this.savedSettings.starttime;
      }

      for(let i = 0 ; i < 12 ; i++){
        let dateTime = moment(this.$route.params.date + ' ' + startTime); // 라우트에서 스트링을 받아온다.
        let viewDateTime = moment(this.$route.params.date + ' ' + startTime); // 라우트에서 스트링을 받아온다.
        console.log("viewDateTime",viewDateTime);
        //시간만 표시하기 위해 format 을 정해줌.
        
        let itemKey = `${this.$route.params.date}-${dateTime.add(i*2, 'hours').format('HH')}:00`
        let viewTime = `${this.$route.params.date} ${viewDateTime.add(i*2, 'hours').format('HH')}:00`
        console.log("viewTime",viewTime);
        let item = {
          id : itemKey,
          viewTime: viewTime,  
          action : '',
          note : '',
          open : false,
          score : undefined
        }
        Object.keys(resData).map(key => { // 넘어온 response 값을 순회하면서 search한다.
          if(key === itemKey){ //key 는 object의 이름이 된다.
            item = resData[key];
          }
        });
        items.push(item);
      }
      return items; // 배열을 리턴한다.
    },

    //item 을 update 진행한다.
    updateItem(item){ 
      if(item.action == undefined || item.action ===''){
        alert("할 일을 작성해 주세요.");
        return;
      }

      //url 형식을 잘 사용해야 한다.
      let email = this.getUserId;
      let url = `https://dailyreport-2fcb2.firebaseio.com/DataList/${email}/${item.id}.json`;
      item.open = false;
      //put (url,body(item)) 형식으로 들어간다.
      axios.put(url,item).then((res)=>{
        if(res.status == 200){
          alert("저장하였습니다.");
          this.getItems();
        }else{
          alert("데이터를 가져오는 도중 문제가 발생하였습니다.");
          console.log(res.statusText);
        }
        
      });
    },
    //각각 아이템이 열려있는지 
    toggleOpen(item){
      item.open = !item.open;
    },
    confirmInitItem(item){
      if(item.action == ''){
        alert("일정이 있는 경우에만 초기화가 가능합니다.");
        return;
      }
      this.showModal = true;
      this.saveInitItem = item;
    },
    initItem(item){
      let email = this.getUserId;
      let url = `https://dailyreport-2fcb2.firebaseio.com/DataList/${email}/${item.id}.json`;
      axios.delete(url).then(
        (res) =>{
          item.action = '';
          item.note = '';
          item.open = false;
          item.score = undefined;
          this.showModal = false;
        }
      )
    }
  },
  computed : {
    ...mapGetters(['savedSettings','getUserId'])
  },
  components :{
    DayScore,
    Modal
  },
  data(){
    return{
      items:[],
      showModal : false,
      saveInitItem : undefined
    }
  },
  props : {
  },
  created(){
    this.getItems(); //화면이 수행 될 때 데이터를 가져오도록 하기 위해.
  }
  ,
  watch :{ //사용자의 컴포넌트가 변경 될 때를 감시하기 위해
    '$route' (to,from){
      this.getItems(); //라우터가 변경 될 때 확인
    } 
  }
}
</script>

<style scoped>
#initButtons{
  display: inline;
}
#initButton{
  width: 100px;
  float: right;
}
</style>
