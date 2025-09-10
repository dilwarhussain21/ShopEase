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
<img width="1307" height="741" alt="1 1" src="https://github.com/user-attachments/assets/4972570e-df6e-425d-81a8-5b0abcca17e2" />
<img width="1920" height="877" alt="2 1" src="https://github.com/user-attachments/assets/c8e5b9ec-0c2c-402d-bda8-5b0ae5e15681" />
<img width="1920" height="877" alt="3" src="https://github.com/user-attachments/assets/8e4f23f9-9f9f-4353-a6b0-4f6b56376315" />
<img width="1920" height="875" alt="4" src="https://github.com/user-attachments/assets/62ca10a7-cc07-461e-8aff-7d9a3b188c60" />
<img width="1918" height="522" alt="5" src="https://github.com/user-attachments/assets/df6a4b4e-4374-4c12-b516-10ba470edfb9" />
<img width="1920" height="877" alt="6" src="https://github.com/user-attachments/assets/4e487d09-7198-4210-8746-ed3cffeae8e2" />
<img width="1920" height="877" alt="7" src="https://github.com/user-attachments/assets/6a88f20e-5fe8-48f1-9fbb-261961217b2c" />
<img width="1920" height="875" alt="8" src="https://github.com/user-attachments/assets/19aa96f7-de18-4992-b699-21a1e336649b" />
<img width="1920" height="877" alt="9" src="https://github.com/user-attachments/assets/18b923ec-9940-4a4d-ac6b-d2ce50214330" />
<img width="1920" height="877" alt="10" src="https://github.com/user-attachments/assets/54c1ad36-256f-44ce-8230-2fc7da521277" />
<img width="1920" height="881" alt="11" src="https://github.com/user-attachments/assets/0bd9cd87-9e07-40d8-9479-1e1f6f5a8b4e" />
<img width="1918" height="875" alt="12" src="https://github.com/user-attachments/assets/04a414c9-c9a6-4b55-a158-8fbba69df701" />
<img width="1920" height="880" alt="13" src="https://github.com/user-attachments/assets/027d25e7-54a2-415c-a80f-22204f04361d" />
<img width="1817" height="492" alt="14" src="https://github.com/user-attachments/assets/dff24bcc-e328-4aad-bcef-4f5ce745ab75" />
<img width="1920" height="875" alt="15" src="https://github.com/user-attachments/assets/b16b4161-fdfa-4b58-8a80-f330d8c210d4" />
<img width="1920" height="882" alt="16" src="https://github.com/user-attachments/assets/e5cae2e4-602f-40ec-ba93-1f33e7dff258" />
<img width="1910" height="486" alt="17" src="https://github.com/user-attachments/assets/03551fa6-340f-4784-88b3-1bdab8b9b1f5" />
<img width="1907" height="596" alt="18" src="https://github.com/user-attachments/assets/16e5e59e-9b38-4389-bcab-974668dbd28a" />
<img width="1122" height="668" alt="19" src="https://github.com/user-attachments/assets/16bae36d-7a61-499d-82e0-3d3023c2bc03" />
<img width="1055" height="776" alt="20 1" src="https://github.com/user-attachments/assets/28af333a-968d-425a-adf2-5c93e460dd77" />
<img width="1920" height="873" alt="21" src="https://github.com/user-attachments/assets/03857635-b73f-40ae-be74-0f27ae084116" />
<img width="1177" height="837" alt="22" src="https://github.com/user-attachments/assets/ab62591c-f2e0-4880-865d-ecbd5150841f" />
<img width="1107" height="708" alt="23" src="https://github.com/user-attachments/assets/49d78472-9bd0-4bcc-97be-768318c0c734" />
<img width="1576" height="840" alt="24" src="https://github.com/user-attachments/assets/ebfb6c6e-50b7-49d7-8b48-859d2d4c2479" />
<img width="1633" height="832" alt="25" src="https://github.com/user-attachments/assets/e94637c6-a352-47e8-94f2-9d989b2a59f7" />
<img width="1001" height="710" alt="26" src="https://github.com/user-attachments/assets/6b243048-c97a-4859-aa92-1047cd11e494" />

---

<img width="1920" height="1003" alt="Eclipse screenshoot" src="https://github.com/user-attachments/assets/f015ba32-9cf3-4bbe-99ef-dccb5973a5e3" />
<img width="1920" height="1001" alt="VS screenshot" src="https://github.com/user-attachments/assets/fca1d800-310c-4cda-84da-eeb71f0b71b9" /> 

---


## 👨‍💻 Author

- **Dilwar Hussain**  
  B.Tech CSE, Full Stack Developer  

---

