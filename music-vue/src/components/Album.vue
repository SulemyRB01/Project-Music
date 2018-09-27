<template>
  <div id="album" class="albums-container">
    <h1 class="albums-container__title">Albums</h1>
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
            <th>Starts</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr  class="albums-table__body" v-for="album in albums" v-if="album.stock != 0">
            <td> {{ album.id }} </td>
            <td> {{ album.album }} </td>
            <td> {{ album.artist }} </td>
            <td> {{ album.country }} </td>
            <td>{{ album.year }} </td>
            <td>{{ album.label }} </td>
            <td>
              <div>
               <!--  {{ album.rating }} -->
                <span v-for='start in getStars(album.rating).star' class="fa fa-star checked"></span>
                <span v-if='getStars(album.rating).middle' class="fa fa-star-half checked"></span> 
              </div>
            </td>
            <td v-if="album.comments != 0">
              <button type="button" class="comments" @click="showModal(album)"> <i class="fa fa-comments fa-2x"></i></a></button>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
    <modal :album="albumForModal" v-show="isModalVisible" @close="closeModal"></modal>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import modal from '@/components/ModalComments.vue'

export default {
  name: 'albums',
  components: {
    modal,
  },

  data () {
    return {
      albums: [],
      isModalVisible: false,
      albumForModal: {}
    }
  },
  mounted () {
    store.commit('albumsList')
    this.albums = store.state.albums

    store.commit('getAlbumComments')

  },
  methods: {
    getStars (rating) {
      return {
        star: Math.trunc(rating),
        middle: rating % 1
      }
    },

    showModal(album) {
      this.albumForModal = album;
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>
<style scoped lang="sass">
</style>