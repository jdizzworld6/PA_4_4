const express = require('express');
const app = express();

const bookRoute = express.Router();
let Book = require('../model/Book');

// Get all Books
bookRoute.route('/').get((req, res) => {
  Book.find().then((response) => {
    res.status(200).json(response);
  })
    .catch((error) => {
      console.error(`Could not get books: ${error}`);
    })
})

// // Get a Book
bookRoute.route('/update-book/:id').get((req, res) => {
  const itemID = req.params.id;

  Book.findById(itemID).then((response) => {
    res.status(200).json(response)
  })
    .catch((error) => {
      console.error(`Could not get book: ${error}`);
    })
})

// Add a book
bookRoute.route('/add-book').post((req, res) => {
  Book.create(req.body).then(() => {
    console.log('Book added sucessfully.')
    res.status(200)
  })
    .catch((error) => {
      console.error(`Could not save book: ${error}`);
    })
})

// // Update A Book
// bookRoute.route('/update-book/:id').put((req, res) => {
//   Book.create(req.body).then(() => {
//     console.log(`Book updated sucessfully.`)
//     Book.findByIdAndUpdate(req.params.id).then(){
//       console.log(200)
//       res.status(200)
//     }
//   })
//     .catch((error) => {
//       console.error(`Could not update book: ${error}`)
//     })
// })

// Delete a book
bookRoute.route('/delete-book/:id').delete((req, res) => {
  console.log(`Preparing to delete: ${req.params.id}`);
  Book.findByIdAndDelete(req.params.id).then(() => {
    console.log('Book deleted successfully.');
    res.status(200);
  })
    .catch((error) => {
      console.error(`Could not delete book: ${error}`);
    })
})


module.exports = bookRoute;