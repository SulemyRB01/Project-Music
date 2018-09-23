import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import store from '../lib/album'
import albumsList from '../db_json/albums.json'
import commentsList from './comments.json'
import purcharsesList from './purcharses.json'
import salesList from './sales.json'

const axiosMock = new MockAdapter(axios)

describe('Store', () => {
  beforeEach(() => {
    axiosMock.onGet('/albums').reply(200, albumsList)
    axiosMock.onGet('/comments').reply(200, commentsList)
    axiosMock.onGet('/purcharses').reply(200, purcharsesList)
    axiosMock.onGet('/sales').reply(200, salesList)
  })

  afterEach(() => {
    axiosMock.reset()
  })

  it('Gets rated albums', async () => {
    const albums = await store.albumsList()
    albums.forEach((album) => {
      expect(album).toHaveProperty('rating')
    })
  })

  it('Gets albums stock', async () => {
    const albums = await store.albumsList()
    albums.forEach((album) => {
      expect(album).toHaveProperty('stock')
    })
  })

  it('Albums are ordered by rating', async () => {
    const albums = await store.albumsList()
    let ordered = true
    let lastRating = 5
    albums.forEach((album) => {
      if (album.rating > lastRating) {
        ordered = false
      }
      lastRating = album.rating 
    })   
    expect(ordered).toBe(true)
  })

  it('Gets best album', async () => {
    const album = await store.bestAlbum()
    expect(album).toMatchObject({ id: 6 })
  })

  it('Gets most sold album', async () => {
    const album = await store.mostSoldAlbum()
    expect(album).toMatchObject({ id: 3 })
  })
})
