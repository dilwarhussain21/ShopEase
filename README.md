# 🛒 ShopEase - E-Commerce Web Application

ShopEase is a **full-stack e-commerce web application** built with **Spring Boot (backend)** and **React + Vite + Tailwind (frontend)**.  
It provides a seamless shopping experience with **user authentication, product management, cart, checkout, and payment integration (Razorpay)**.

---

## 🛠️ Tech Stack :

### Backend 
- ![Java](https://img.shields.io/badge/Java-ED8B00?logo=java&logoColor=white)
- ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=white)
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
- Spring Data JPA  
- Maven  

### Frontend 
- ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
- Razorpay JS SDK  

---

## 🚀 Features :

✅ User Authentication (Sign Up, Sign In)  
✅ Role-based access (Admin & Customer)  
✅ Product Management (Add, Update, Delete, View Products)  
✅ Shopping Cart (Add/Remove products)  
✅ Checkout & Order Summary  
✅ Payment Gateway Integration (Razorpay)  
✅ Responsive UI with Dark/Light Mode  
✅ Secure Backend APIs (Spring Boot + JPA + MySQL)  

---

## 📂 ShopEase Project Structure :

```
SalesSavvy/ (Backend)
├── src/main/java/salesSavvy/
│   ├── controller/       # REST Controllers
│   ├── dto/              # Data Transfer Objects
│   ├── entity/           # JPA Entities
│   ├── repository/       # JPA Repositories
│   ├── service/          # Service Layer
│   └── SalesSavvyApplication.java  # Main Spring Boot App
├── src/main/resources/
│   ├── application.properties      # DB Config & App Settings
│   ├── static/
│   └── templates/
└── pom.xml               # Maven Dependencies

DEC-PROJ-FRONTEND/ (Frontend)
├── public/
├── src/
│   ├── pages/            # React Pages (Admin, Customer, Cart, Checkout, etc.)
│   ├── utils/            # Razorpay integration
│   ├── App.jsx           # Main App
│   ├── main.jsx          # Entry Point
│   └── index.css
├── package.json          # Dependencies & Scripts
├── tailwind.config.js    # Tailwind Config
└── vite.config.js        # Vite Config
```

---

## ⚙️ Setup Instructions :

### 🔹 Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)  
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (17 or 22)  
- [MySQL](https://dev.mysql.com/downloads/)  

---

### 🔹 Backend Setup (Spring Boot)

1. Clone the repository:
   ```bash
   git clone https://github.com/dilwarhussain21/sales-savvy.git
   cd sales-savvy/backend
   ```

2. Configure **MySQL Database** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/salessavvy
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start at: `http://localhost:8080`

---

### 🔹 Frontend Setup (React + Vite)

1. Navigate to frontend:
   ```bash
   cd ../DEC-PROJ-FRONTEND
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run at: `http://localhost:5173`

---

## 🔑 Payment Integration (Razorpay)

- The app uses **Razorpay** for handling secure payments.  
- Ensure you configure your Razorpay `KEY_ID` and `KEY_SECRET` in the backend.  
- The frontend uses `loadRzp.js` utility for payment checkout.  

---

## 📡 API Endpoints :

### Authentication
- `POST /api/auth/SignUp` → Register new user  
- `POST /api/auth/SignIn` → User login  

### Products
- `GET /api/products` → Get all products  
- `GET /api/products/{id}` → Get product by ID  
- `POST /api/products` → Add new product (Admin only)  
- `PUT /api/products/{id}` → Update product (Admin only)  
- `DELETE /api/products/{id}` → Delete product (Admin only)  

### Cart & Orders
- `POST /api/cart/add` → Add item to cart  
- `GET /api/cart` → View cart items  
- `DELETE /api/cart/{id}` → Remove item from cart  
- `POST /api/orders/checkout` → Place an order  
- `GET /api/orders/{id}` → View order details  

### Payment
- `POST /api/payment/create-order` → Create Razorpay order  
- `POST /api/payment/verify` → Verify payment signature  

---

## 📸 Screenshots :
<br>
<img width="1920" height="890" alt="1" src="https://github.com/user-attachments/assets/2bb9da8a-2915-4cae-89ae-2a3ab9c9ab77" />


---

## 👨‍💻 Author

- **Dilwar Hussain**  
  B.Tech CSE, Full Stack Developer  

---

