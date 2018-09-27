<template>
  <div id='additionals' class="albums-container">
  <h1 class="albums-container__title">Additional Information</h1>
    <div class="albums-container__table-container">
      <table class="albums-table">
        <thead>
          <tr class="albums-table__head">
            <th>less sold disc</th>
            <th>less valued</th>
          </tr>
        </thead>
        <tbody>
          <tr class="albums-tabke__body">
            <td> {{ lessSold.label }} </td>
            <td> {{ lessValued.label }} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'additional',

  data () {
    return {
      lessSold: [],     
      lessValued: [],
    }
  },

  mounted () {
    // store.commit('getAlbums')
    store.commit('lessSoldAlbum')
    this.lessSold = store.state.lessSoldAlbum

    store.commit('worstAlbum')
    this.lessValued = store.state.worstAlbum

  },
}
</script>
<style lang="sass" scoped>
  //@import '~@/assets/style/vars'  
</style>