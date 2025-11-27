# 🛒 MeShop – Shopping Cart Application  
A fully functional shopping cart application built using **HTML, CSS, and Advanced JavaScript** as part of the AccioJob F3 (Advanced JS) module project.

This project covers authentication, API integration, filtering, cart management, and responsive UI — all implemented with vanilla JavaScript and browser storage APIs.

---

## 🚀 Features

### 🔐 User Authentication
- Signup with first name, last name, email, password, and confirm password
- Login with email and password
- Prevent duplicate email registrations
- Token-based login (stored in localStorage)
- Auth protection for shop, cart, and profile pages
- Logged-in user details stored in localStorage

---

### 🛍️ Shop Page Features
- Fetch products from **FakeStoreAPI**
- Dynamically assign random colors & sizes to products
- Category filtering (Mens, Womens, Jewellery, Electronics)
- Sidebar filters:
  - Search by product name/category
  - Filter by price ranges
  - Filter by rating
  - **Bonus:** Filter by color
  - **Bonus:** Filter by size
- Displays “No products found” message when no match
- Add to Cart functionality with duplicate prevention

---

### 🛒 Cart Page Features
- View all added products
- Remove items from cart
- Displays item list + price breakdown
- Total price calculation
- Checkout using Razorpay test integration
- Clears cart after successful payment
- Handles empty cart states gracefully

---

### 👤 Profile Page Features
- Show logged-in user details
- Update first and last name
- Change password with validation
- Save updated data to localStorage
- Logout functionality

---

### 🎨 UI & Styling
- Clean and responsive layout using pure CSS
- Modern Inter font (Google Fonts)
- Matching design based on Figma reference
- Hover animations on product cards and buttons
- Sticky navbar and fixed sidebar
- Mobile-friendly layout for shop and cart pages

---

## 🧑‍💻 Technologies Used
- **HTML5**  
- **CSS3**  
- **Vanilla JavaScript (ES6+)**  
- **LocalStorage API**  
- **FakeStoreAPI**  
- **Razorpay Payments (Test Mode)**  

---

## 📁 Pages Included
- `index.html` (Home)
- `signup.html`
- `login.html`
- `shop.html`
- `cart.html`
- `profile.html`

---

## 📦 Project Highlights
This project demonstrates:
- Real-world authentication flow
- Strong DOM manipulation skills
- Clean, modular JavaScript logic
- Working with APIs using `fetch`
- State management using LocalStorage
- Responsive and user-friendly UI

---

## 🏁 How to Run Locally
1. Clone this repository  
   ```sh
   git clone <your-repo-url>

2 Open index.html in your browser
3 Sign up, log in, and explore the shop!

## 🎯 Purpose of the Project

### This project was built as the final submission for the AccioJob Advanced JavaScript module, covering:

- Promises and async/await
- Browser APIs
- Complex DOM Manipulation
- Storage APIs
- Real-world form handling
- API integration
- Payment gateway basics
- It demonstrates practical application of core frontend skills.
