
DB Structure

### Users
The `User` entity represents individuals who interact with the application. Users have attributes such as name, email, password, and a verification status. They can own collections of books and track their reading progress.

### Collections
The `Collection` entity represents a grouping of books curated by a user. Each collection has a name and is associated with a specific user. Users can create, manage, and view collections of books.

### Books
The `Book` entity represents individual books within the application. Books have attributes such as name, author, and are owned by a user. Users can add books to their collections, and each book can be associated with multiple collections.

### CollectionBooks
The `CollectionBook` entity represents the relationship between collections and books. It allows users to add books to their collections. Each collection book entry links a specific book to a specific collection.

### BookPages
The `BookPage` entity represents the pages of a book. It stores the content of each page and is associated with a specific book. Books can have multiple pages.

### BookPageReads
The `BookPageRead` entity tracks the last page read by a user for each book. It records the user's progress within a book, storing the user, the book, and the last read page. This enables users to resume reading from where they left off.
