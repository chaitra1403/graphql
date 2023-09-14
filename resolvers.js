const books = [
  {
    id: "1",
    title: "Initial Book",
    author: "Initial Author",
  },
];

const resolvers = {
  Query: {
    books: () => {
      console.log("Fetching list of books");
      return books;
    },
    book: (parent, args) => {
      console.log(`Fetching book with ID: ${args.id}`);
      return books.find((book) => book.id === args.id);
    },
  },
  Mutation: {
    addBook: (parent, args) => {
      const newBook = { id: String(books.length + 1), ...args };
      books.push(newBook);
      console.log(`Adding a new book with title: ${args.title}, author: ${args.author}`);
      return newBook;
    },
    updateBook: (parent, args) => {
      const book = books.find((book) => book.id === args.id);
      if (!book) {
        console.log(`Book with ID ${args.id} not found. Update failed.`);
        return null;
      }
      if (args.title) {
        book.title = args.title;
        console.log(`Updating title of book with ID ${args.id} to: ${args.title}`);
      }
      if (args.author) {
        book.author = args.author;
        console.log(`Updating author of book with ID ${args.id} to: ${args.author}`);
      }
      return book;
    },
    deleteBook: (parent, args) => {
      const index = books.findIndex((book) => book.id === args.id);
      if (index === -1) {
        console.log(`Book with ID ${args.id} not found. Deletion failed.`);
        return false;
      }
      books.splice(index, 1);
      console.log(`Deleting book with ID: ${args.id}`);
      return true;
    },
  },
};

module.exports = resolvers;
