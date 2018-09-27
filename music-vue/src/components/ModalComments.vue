<template>
   <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            <slot name="header">
              <h1> {{ album.album }} </h1>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="albums-container__table-container">
                <table class="albums-table">
                  <thead>
                    <tr class="albums-table__head">
                      <th>Comment</th>
                      <th>Stars</th>
                    </tr>
                </thead>
                <tbody>
                  <tr class="albums-table__body" v-for="comment in album.comments">
                    <td> {{ comment.comment }} </td>
                    <td class="stars"> 
                      <span v-for='start in comment.stars' class="fa fa-star checked"></span>
                    </td>
                  </tr>
                </tbody>
                </table>
              </div>
            </slot>
          </div>
          <div class="modal__footer">
            <slot name="footer">
              <button class="close" @click="$emit('close')">
                Ok
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
    name: 'modal',
    props: ['album'],

    data () {
      return {
      }
    }, 

    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>
<style lang="sass" scoped>
  @import '~@/assets/style/app'

  .albums-table
    width: 100%;

  .stars
    min-width: 130px;

  .modal
    &__mask 
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;

    &__wrapper 
      display: table-cell;
      vertical-align: middle;

    &__container 
      width: 90%;
      height: 400px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;

    &__header h3 
      margin-top: 0;
      color: #42b983;
    
    &__body
      margin: 20px 0;


  .close
    margin: 5px;
    padding: 10px 15px;
    border-radius: 2px;
    float: right;

  .modal-enter 
    opacity: 0;

  .modal-leave-active 
    opacity: 0;


  .modal-enter .modal-container,
  .modal-leave-active .modal-container 
    -webkit-transform: scale(1.1);
    transform: scale(1.1);


</style>


