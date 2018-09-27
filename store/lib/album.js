'use strict'

import allAlbumsList from '../db_json/albums.json'
import commentsList from '../db_json/comments.json'
import purcharsesList from '../db_json/purcharses.json'
import salesList from '../db_json/sales.json'

//albums.js
const getAlbums = function () {
	return allAlbumsList
}

const getAlbum = function (id) {
  	return allAlbumsList.find(album => {
		  return album.id == id
	})
}

const rateAlbum = function (album, comments) {
	let commentStarts =  comments.filter(comment => {
		return comment.albumId == album.id && comment.stars
	})

	if (commentStarts.length == 0) {
		return 0
	}

	let stars = commentStarts.map(function (star) {
		return star.stars
	})

	let rating = stars.reduceRight(function (valP, valI) {
		return valP + valI
	})

	return rating / stars.length
}

// //comments.js
const getComments = function () {
	return commentsList
}

const getAlbumComments = function (album) {
	return commentsList.filter(comment => {
		return comment.albumId == album.id
	})
}

// //stock.js
const albumStock = function (id) {
	let totalPQuantity = 0
  let totalSQuantity = 0
  let total = 0

	let labelAlbum = allAlbumsList.find(album => {
		return album.id == id
	}).label
 
  for(const purcharse of purcharsesList) {
  	let labelPurcharse = (purcharse.albums).filter(albums => {
  		return albums.label == labelAlbum 
  	})
    
    if(labelPurcharse.length != 0){
    	let quantityPurcharse = labelPurcharse[0].quantity; 

    	totalPQuantity = quantityPurcharse + totalPQuantity 
    }
  }

  for(const sale of salesList) {
  	let labelSale = (sale.albums).filter(albums => {
  		return albums.label == labelAlbum
  	})

  	if(labelSale.length != 0){
    	let quantitySale = labelSale[0].quantity; 

    	totalSQuantity = quantitySale + totalSQuantity 
    }
  }

  total = totalPQuantity - totalSQuantity

	return total
}

// //**Purcharses
const purcharses = function () {
	return purcharsesList
}

const purchasedAlbumsAll = function () {
	let total = 0

	for(const purcharse of purcharsesList) {
		let albumsQuantity = (purcharse.albums).map(function (album) {
				return album.quantity
		})

		let totalArray = albumsQuantity.reduceRight(function (valP, valI) {
			return valP + valI
		})
    
		total = totalArray + total
	}

	return total
}

const purchasedAlbums = function (filter) {
	let total = 0
	if(filter) {
	  let filterLabel = filter

		if (!(isNaN(filter))) {
	 	  let album = allAlbumsList.find(album => {
	 	  	return album.id == filter
			})
			if (album) {
				filterLabel = album.label
			}
		}

		for(const purcharse of purcharsesList) {
			let purcharseList = (purcharse.albums).filter(albums => {
				return albums.label == filterLabel
			})

			let albumsQuantity = purcharseList.map(function (album) {
				return album.quantity 
			})

		  let totalArray = albumsQuantity[0]
			
			if(albumsQuantity != 0)
			{
		  	total = totalArray + total
			}
		}
		return total
	}
	else {
		return total = purchasedAlbumsAll()
	}
}

// //**Sales
const sales = function () {
	return salesList
}

const soldAlbumsAll = function () {
	let total = 0

	for(const sale of salesList) {
		let albumsQuantity = (sale.albums).map(function (album) {
				return album.quantity
		})

		let totalArray = albumsQuantity.reduceRight(function (valP, valI) {
			return valP + valI
		})
    
		total = totalArray + total
	}

		return total
}

const soldAlbums = function (filter) {
	let total = 0
	if(filter)
	{
	  let filterLabel = filter

		if (!(isNaN(filter))) {
	 	  let album = allAlbumsList.find(album => {
	 	  	return album.id == filter
			})
			if (album) {
				filterLabel = album.label
			}
		}

		for(const sale of salesList) {
			let saleList = (sale.albums).filter(albums => {
				return albums.label == filterLabel
			})

			let albumsQuantity = saleList.map(function (album) {
				return album.quantity 
			})

		  let totalArray = albumsQuantity[0]
			
			if(albumsQuantity != 0)
			{
		  	total = totalArray + total
			}
		}
		return total
	}
	else{
  	return total = soldAlbumsAll()
	}
}

// //index.js
const albumsList = function () {
	const albums = allAlbumsList
	const comments = commentsList

	for (const album of albums) {
		album.rating = rateAlbum({id:album.id}, comments)
	}

	 for (const album of albums) {
  	album.stock = albumStock(album.id)
  }
  
  albums.sort(function (a, b) {
  	if (a.rating < b.rating) {
    	return 1;
  	}
  	if (a.rating > b.rating) {
    	return -1;
  	}
  return 0;
	})

	return albums
}

const bestAlbum = function () {
	const albums = albumsList()

	albums.sort(function (a, b) {
  	if (a.rating < b.rating) {
    	return 1;
  	}
  	if (a.rating > b.rating) {
    	return -1;
  	}
  return 0;
	})

	return albums[0]
}

const worstAlbum = function () {
	const albums = albumsList()

	albums.sort(function (a, b) {
  	if (a.rating > b.rating) {
    	return 1;
  	}
  	if (a.rating < b.rating) {
    	return -1;
  	}
  return 0;
	})

	return albums[0]
}

const mostSoldAlbum = function () {
	const albums = albumsList()
  
  for(const album of albums) {
  	album.solds = soldAlbums(album.id)
  }

	albums.sort(function (a, b) {
  	if (a.solds < b.solds) {
    	return 1;
  	}
  	if (a.solds > b.solds) {
    	return -1;
  	}
  return 0;
	})

	return albums[0]
}

const lessSoldAlbum = function () {
	const albums = albumsList()

	for(const album of albums) {
  	album.solds = soldAlbums(album.id)
  }

	albums.sort(function (a, b) {
  	if (a.solds > b.solds) {
    	return 1;
  	}
  	if (a.solds < b.solds) {
    	return -1;
  	}
  return 0;
	})

	return albums[0]
}


export default { 
	getAlbums,
	getAlbum,
	rateAlbum,
	getComments,
	getAlbumComments, 
	albumStock,
	purcharses, 
	purchasedAlbums, 
	sales, 
	soldAlbums,
	albumsList, 
	bestAlbum,
	mostSoldAlbum,
	lessSoldAlbum,
	worstAlbum
}