import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import albums from '../lib/album'
import albumsList from '../db_json/albums.json'

const axiosMock = new MockAdapter(axios)

describe('Albums', () => {
  beforeEach(() => {
    axiosMock.onGet('/albums').reply(200, albumsList)
    axiosMock.onGet(/\/albums\/\d+/).reply((config) => {
      const id = parseInt(config.url.split('/')[2], 10)
      const album = albumsList.find(_album => _album.id === id)
      return [200, album]
    })
  })

  afterEach(() => {
    axiosMock.reset()
  })

  it('Retrives albums list', async () => {
    const list = await albums.getAlbums()
    expect(list).toHaveLength(albumsList.length)
  })

  it('Retrives specific album', async () => {
    const album = await albums.getAlbum(6)
    expect(album).toMatchObject({ id: 6 })
  })

  describe('Albums rating', () => {
    it('Albums without comments have no rating', () => {
      const rating = albums.rateAlbum({}, [])
      expect(rating).toBe(0)
    })

    it('Albums ignore others comments', () => {
      const rating = albums.rateAlbum({ id: 1 }, [{ albumId: 2, stars: 5 }])
      expect(rating).toBe(0)
    })

    it('Albums get rated', () => {
      const comments = [
        { albumId: 1, stars: 5 },
        { albumId: 1, stars: 4 },
        { albumId: 1, stars: 3 },
        { albumId: 2, stars: 5 }
      ]
      const rating = albums.rateAlbum({ id: 1 }, comments)
      expect(rating).toBe(4)
    })

    it('Stars are optional', () => {
      const comments = [
        { albumId: 1, stars: 5 },
        { albumId: 1, stars: 4 },
        { albumId: 1 }
      ]
      const rating = albums.rateAlbum({ id: 1 }, comments)
      expect(rating).toBe(4.5)
    })
  })
})
