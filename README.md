# 📚 Library Management System (Express + TypeScript + MongoDB)

A fully functional **Library Management System** API built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.  
The system allows you to manage books, borrow transactions, and retrieve analytical summaries using the **aggregation pipeline**.

---

## 🚀 Features

- 📖 **Book Management**
  - Add, update, delete, and view books
  - ISBN-based identification
  - Quantity tracking for available copies

- 📦 **Borrow Management**
  - Borrow books with due dates
  - Automatic stock quantity updates
  - Prevent borrowing if stock is unavailable

- 📊 **Data Insights**
  - Aggregation pipeline for borrowing statistics
  - Retrieve total borrowed quantities grouped by book

- 🛠 **Built-in Validations & Business Logic**
  - Schema validation with Mongoose
  - Middleware to handle pre/post database actions
  - Clear error handling with HTTP status codes

---

## 🏗 Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Tools & Utilities:** 
  - Nodemon (development)
  - ts-node
  - dotenv
  - ESLint & Prettier for code quality

---


src/
│── app/
│ ├── models/ # Mongoose models & schema definitions
│ ├── routes/ # API route definitions
│ ├── controllers/ # Request handlers
│ ├── services/ # Business logic
│ ├── utils/ # Helper functions
│── config/ # Database and environment configuration
│── index.ts # App entry point

yaml
Copy
Edit

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Create .env file
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/library_db
4️⃣ Run the project in development mode
bash
Copy
Edit
npm run dev
5️⃣ Build for production
bash
Copy
Edit
npm run build
npm start
📌 API Endpoints
📚 Books
Method	Endpoint	Description
GET	/api/books	Get all books
GET	/api/books/:id	Get book by ID
POST	/api/books	Add new book
PUT	/api/books/:id	Update book
DELETE	/api/books/:id	Delete book

📖 Borrow
Method	Endpoint	Description
POST	/api/borrow	Borrow a book
GET	/api/borrow/summary	Get borrowed books summary (aggregation)

📊 Example API Response
Borrowed Books Summary
json
Copy
Edit
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
🛡️ Error Handling
All API responses follow a consistent structure:

json
Copy
Edit
{
  "success": false,
  "message": "Book not found"
}
🧪 Running Tests
bash
Copy
Edit
npm run test
👨‍💻 Author
Rahyan Akil Edge
📧 rahyanakil89@gmail.com
💼 LinkedIn

📜 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

✅ **Why this will look perfect now**  
- Proper code fences (` ```bash`, ` ```json`) make commands and JSON readable.  
- Headings (`##`, `###`) are consistent so sections stand out.  
- Tables are used for API endpoint lists.  
- Sections are separated by `---` lines for better readability.  

If you paste this into your **README.md**, GitHub will render it clean and professional.  

---

If you want, I can also **add a premium ASCII title banner** to the top so it has that “wow” factor when someone opens your repo.  
That would make it really stand out.
