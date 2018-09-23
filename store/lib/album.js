'use strict'

import albumsList from '../db_json/albums.json'
import commentsList from '../db_json/comments.json'
import purcharsesList from '../db_json/purcharses.json'
import salesList from '../db_json/sales.json'

//albums.js
exports.getAlbums = function () {
	return albumsList
}

exports.getAlbum = function (id) {
  	return albumsList.find(album => {
		  return album.id == id
	})
}

exports.rateAlbum = function (album, comments) {
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

//comments.js
exports.getComments = function () {
	return commentsList
}

exports.getAlbumComments = function (album) {
	return commentsList.filter(comment => {
		return comment.albumId == album.id
	})
}

//stock.js
exports.albumStock = function (id) {
	let totalPQuantity = 0
  let totalSQuantity = 0
  let total = 0

	let labelAlbum = albumsList.find(album => {
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

//**Purcharses
exports.purcharses = function () {
	return purcharsesList
}

var purchasedAlbumsAll = function () {
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

exports.purchasedAlbums = function (filter) {
	let total = 0
	if(filter) {
	  let filterLabel = filter

		if (!(isNaN(filter))) {
	 	  let album = albumsList.find(album => {
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

//**Sales
exports.sales = function () {
	return salesList
}

var soldAlbumsAll = function () {
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

exports.soldAlbums = function (filter) {
	let total = 0
	if(filter)
	{
	  let filterLabel = filter

		if (!(isNaN(filter))) {
	 	  let album = albumsList.find(album => {
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


//index.js
exports.albumsList = function () {
	const albums = albumsList
	const comments = commentsList

	for (const album of albums) {
		album.rating = exports.rateAlbum({id:album.id}, comments)
	}

	 for (const album of albums) {
  	album.stock = exports.albumStock(album.id)
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

exports.bestAlbum = function () {
	const albums = albumsList

	albums.sort(function (a, b) {
  	if (a.rating < b.rating) {
    	return 1;
  	}
  	if (a.rating > b.rating) {
    	return -1;
  	}
  return 0;
	})

	return albums[0].id
}

exports.bestAlbum = function () {
	const albums = albumsList

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

exports.mostSoldAlbum = function () {
	const albums = albumsList
  
  for(const album of albums) {
  	album.solds = exports.soldAlbums(album.id)
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


