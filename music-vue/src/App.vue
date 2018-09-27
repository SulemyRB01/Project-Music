<template>
  <div id="app">
    <div class="menu">
      <router-link to="/" class="menu__link">Albums</router-link>
      <router-link to="/stock" class="menu__link">Stocks</router-link>
      <router-link to="/sale" class="menu__link">Sales</router-link>
      <router-link to="/purcharse" class="menu__link">Purchases</router-link>
      <router-link to="/additional" class="menu__link">Additional information</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script> 

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="sass" scoped>
  @import '~@/assets/style/vars'
  .menu
    margin: 0px;
    background-color: $gray;
    padding: 20px;
    font-size: 20px;

    &__link 
      padding: 30px; 
      font-weight: bold;
  a
    text-decoration: none;
 
</style>
