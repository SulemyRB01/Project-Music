import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import stock from '../lib/album'
import albumsList from '../db_json/albums.json'
import purcharsesList from '../db_json/purcharses.json'
import salesList from '../db_json/sales.json'

const axiosMock = new MockAdapter(axios)

describe('Stock', () => {
  beforeEach(() => {
    axiosMock.onGet('/albums').reply(200, albumsList)
    axiosMock.onGet('/purcharses').reply(200, purcharsesList)
    axiosMock.onGet('/sales').reply(200, salesList)
  })

  afterEach(() => {
    axiosMock.reset()
  })

  it('Calculates album stock', async () => {
    const quantity = await stock.albumStock(7)
    expect(quantity).toBe(57)
  })

  describe('Purchases', () => {
    it('Keeps the count of purcharses', async () => {
      const purcharses = await stock.purcharses()
      expect(purcharses).toHaveLength(purcharsesList.length)
    })

    it('Keeps the count of albums purcharsed', async () => {
      const purcharses = await stock.purchasedAlbums()
      expect(purcharses).toBe(995)
    })

    describe('Counting specific purcharses', () => {
      it('Counts purcharses by album id', async () => {
        const purcharses = await stock.purchasedAlbums(7)
        expect(purcharses).toBe(85)
      })

      it('Counts purcharses by album label', async () => {
        const purcharses = await stock.purchasedAlbums('1998-M-ROL')
        expect(purcharses).toBe(100)
      })

      it('Invalid ids return zero', async () => {
        const purcharses = await stock.purchasedAlbums(100)
        expect(purcharses).toBe(0)
      })

      it('Invalid labels return zero', async () => {
        const purcharses = await stock.purchasedAlbums('invalid')
        expect(purcharses).toBe(0)
      })
    })
  })

  describe('Sales', () => {
    it('Keeps the count of sales', async () => {
      const sales = await stock.sales()
      expect(sales).toHaveLength(salesList.length)
    })

    it('Keeps the count of albums sold', async () => {
      const sales = await stock.soldAlbums()
      expect(sales).toBe(143)
    })

    describe('Counting specific sales', () => {
      it('Counts sales by album id', async () => {
        const sales = await stock.soldAlbums(7)
        expect(sales).toBe(28)
      })

      it('Counts sales by album label', async () => {
        const sales = await stock.soldAlbums('1998-C-B')
        expect(sales).toBe(19)
      })

      it('Invalid ids return zero', async () => {
        const sales = await stock.soldAlbums(100)
        expect(sales).toBe(0)
      })

      it('Invalid labels return zero', async () => {
        const sales = await stock.soldAlbums('invalid')
        expect(sales).toBe(0)
      })
    })
  })
})
