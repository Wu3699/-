<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
               <p>详情 | 2018-4-19</p>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <p class="af">{{$route.params.id.content}}</p>
              </slot>
            </div>
            <div class="modal-footer" >
              <slot name="footer">  
                <router-link to="/detail/publish">返回</router-link>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
  import Vue from 'vue'

  export default {
    data(){
         return{
         }
       }
}
</script>

<style scoped>

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: block;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 1300px;
    height: calc(100vh - 38px * 2);
    margin: 0 auto;
    margin-top: 40px;
    margin-left: 20px;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .af{
    width: 1200px;
    font-size: 20px;
  }
</style>