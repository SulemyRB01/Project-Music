import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import comments from '../lib/album'
import commentsList from '../db_json/comments.json'

const axiosMock = new MockAdapter(axios)

describe('Comments', () => {
  beforeEach(() => {
    axiosMock.onGet('/comments').reply(200, commentsList)
  })

  afterEach(() => {
    axiosMock.reset()
  })

  it('Retrives comments list', async () => {
    const list = await comments.getComments()
    expect(list).toHaveLength(commentsList.length)
  })

  it('Retrives album\'s comments', async () => {
    const albumComments = await comments.getAlbumComments({ id: 1 })
    expect(albumComments).toHaveLength(6)
  })

  it('Returns no comments on invalid album', async () => {
    const albumComments = await comments.getAlbumComments({ id: 100 })
    expect(albumComments).toHaveLength(0)
  })

  it.skip('Album\'s comments are empty on network error', async () => {
    axiosMock.onGet('/comments').networkError()
    const albumComments = await comments.getAlbumComments({ id: 1 })
    expect(albumComments).toHaveLength(0)
  })
})
