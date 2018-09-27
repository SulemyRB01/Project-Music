<template>
  <div id="purcharseAlbum" class="albums-container">
    <h1 class="albums-container__title"> Purcharse </h1>
    <div class="albums-container__table-container">
      <table class="albums-table">
        <thead>
          <tr class="albums-table__head">
            <th>Id</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Country</th>
            <th>Year</th>
            <th>Label</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr class="albums-table__body" v-for="album in albums">
            <td> {{ album.id }} </td>
            <td> {{ album.album }} </td>
            <td> {{ album.artist }} </td>
            <td> {{ album.country }} </td>
            <td> {{ album.year }} </td>
            <td> {{ album.label }} </td>
            <td> {{ album.quantity }} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import store from '@/store'

export default {
  name: 'purcharse',

  data () {
    return {
      albums: [],
    }
  },
  mounted () {
    store.commit('getAlbums')
    this.albums = store.state.albums

    store.commit('purchasedAlbums')
  },
}
</script>
<style scoped lang="sass">
  // @import '~@/assets/style/app'
</style>
