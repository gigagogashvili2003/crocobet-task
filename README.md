## Running the Project

### Prerequisites
- Docker
- Docker Compose

### Steps

1. **Clone the Repository:**
    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd <project_directory>
    ```

3. **Run Docker Compose:**
    ```bash
    docker-compose up
    ```

4. **Access the Application:**
    Once Docker Compose has finished setting up the containers, you can access the application by navigating to [http://localhost](http://localhost) in your web browser.

5. **Postman Collection:**
    You can find the Postman collection for this project [here](https://api.postman.com/collections/27198961-5c306144-37ca-4659-a9c1-b066c24dffdc?access_key=PMAT-01HTB0RC81Y5TGE9SW71JABNCC).

6. **Stopping the Application:**
    To stop the application and remove the containers, you can use the following command:
    ```bash
    docker-compose down
    ```

7. **Cleanup:**
    Optionally, you can remove any dangling Docker images and volumes using the following commands:
    ```bash
    docker image prune
    docker volume prune
    ```

That's it! You should now have the project up and running using Docker Compose.


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


![image](https://github.com/gigagogashvili2003/crocobet-task/assets/75528697/046bdd8c-c06d-4e9a-a6df-b92998422c8f)




```dbdiagram
Table users {
  id int [pk]
  name varchar
  email varchar [unique]
  password varchar
  verified boolean [default: false]
  books_id int [ref: > books.id]
  collections_id int [ref: > collections.id]
  book_page_reads_id int [ref: > book_page_reads.id]
  created_at datetime 
  updated_at datetime
}

Table collections {
  id int [pk]
  name varchar
  user_id int [ref: > users.id]
  collection_books_id int [ref: > collection_books.id]
  created_at datetime 
  updated_at datetime
}

Table books {
  id int [pk]
  name varchar
  author varchar
  user_id int [ref: > users.id]
  collection_books_id int [ref: > collection_books.id]
  book_page_reads_id int [ref: > book_page_reads.id]
  book_pages_id int [ref: > book_pages.id]
  created_at datetime 
  updated_at datetime
}

Table collection_books {
  id int [pk]
  collection_id int [ref: > collections.id]
  book_id int [ref: > books.id]
  created_at datetime 
  updated_at datetime
}

Table book_pages {
  id int [pk]
  content varchar
  book_id int [ref: > books.id]
  created_at datetime 
  updated_at datetime
}

Table book_page_reads {
  id int [pk]
  user_id int [ref: > users.id]
  book_id int [ref: > books.id]
  last_read_page_id int [ref: > book_pages.id]
  created_at datetime 
  updated_at datetime
}

Table sessions {
  id int [pk]
  refresh_token varchar [unique]
  user_id int [ref: > users.id]
  created_at datetime 
  updated_at datetime
}
