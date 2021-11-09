<template>
  <transition name="modal">
    <div class="modal-mask" id='modal-template'>
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <!-- default body -->
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <!-- default footer -->
              <button class="modal-default-button" @click="$emit('close')">
                아니오
              </button>
              <button class="modal-default-button" @click="$emit('ok')">
                예
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Modal', //컴포넌트의 이름이다.
  data(){
    return{
      showModal : false
    }
  },
  methods: {
    
  },
  props : {
    msgKey : String,
    ageKey : Number
  }
}
</script>
<style scoped lang="css" src="../assets/css/modal.css"></style>

