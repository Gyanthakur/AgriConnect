<div align="center">
   
![agriConnect](https://github.com/user-attachments/assets/a7535a3d-f540-4fcc-9c18-46e0b080b6ca)
</div>

# 🌱 Agriconnect

Agriconnect is a modern, full-stack web application designed to streamline agricultural services for farmers and merchants. It provides dedicated **Farmer Login** and **Merchant Login** pages with features tailored for their needs.

---

## 🌟 Features

- **Two Authentication Methods**: Farmer and Merchant Sign In/Sign Up powered by Clerk.
- **Responsive Design**: Optimized for all devices.
- **Interactive UI**: Modern components built with React and Tailwind CSS.
- **Dashboard Pages**: Separate dashboards for Farmers and Merchants.
- **Server API Integration**: RESTful APIs for farmers and merchants.

---

## ⚙️ Installation & Setup


1. Clone this repository:
   ```
   git clone https://github.com/Gyanthakur/AgriConnect.git
   ```


## 🗂️ Project Structure
   ```
client/
│── src/
│   ├── assets/                     # Images and other static assets
│   ├── components/                 # Reusable components
│   │   ├── FarmerDashboard.jsx     # Farmer Dashboard
│   │   ├── MerchantDashboard.jsx   # Merchant Dashboard
│   │   ├── Navbar.jsx              # Navigation Bar
│   │   ├── Footer.jsx              # Footer Component
│   ├── context/                    # Context API state management
│   ├── pages/                      # Application Pages
│   │   ├── FarmerLogin.jsx         # Farmer Login Page
│   │   ├── MerchantLogin.jsx       # Merchant Login Page
│   │   ├── Home.jsx                # Home Page
│   │   ├── Services.jsx            # Services Page
│   │   ├── About.jsx               # About Us Page
│   │   ├── Contact.jsx             # Contact Page
│   │   ├── Signup.jsx              # Signup Page
│   ├── sign-up/                    # Reusable sign-up components
│   ├── App.js                      # Main React Component
│   ├── index.js                    # Entry Point
│   ├── .env                        # Environment variables
│   └── README.md                   # Project documentation
```

## Server Side (Backend)

```
Server/
│── config/
│   ├── mongoDb.js                  # MongoDB configuration
│   ├── cloudinary.js               # Cloudinary config for image uploads
│── controllers/
│   ├── farmerController.js         # Farmer-specific controllers
│   ├── merchantController.js       # Merchant-specific controllers
│── middlewares/
│   ├── authMerchant.js             # Middleware for merchant authentication
│   ├── farmerUser.js               # Middleware for farmer user logic
│   ├── multer.js                   # File upload configuration
│── models/
│   ├── farmerModel.js              # Farmer data model
│   ├── merchantModel.js            # Merchant data model
│── routes/
│   ├── farmerRoute.js              # Farmer routes
│   ├── merchantRoute.js            # Merchant routes
│── server.js                       # Main server entry point
│── .env                            # Environment variables
│── package.json                    # Backend dependencies
│── README.md                       # Documentation
```

## 📸 Preview
![image](https://github.com/user-attachments/assets/0fe89c6e-0590-4b50-b325-996966de37c8)

![image](https://github.com/user-attachments/assets/1c40d5db-5574-4373-b57c-f42b2b7baa3a)
![image](https://github.com/user-attachments/assets/447b13ab-ddf3-46ba-a6ff-e6f683b13b5a)


## ✨ Made with ❤️ by Gyan Pratap Singh ✨

## 🌐 Connect with Us

Contact Us:  📲<a href="https://wa.me/918957818597?text=Hey%20%F0%9F%91%8B%2C%20how%20can%20I%20help%20you%3F">
    <img src="https://img.shields.io/badge/WhatsApp-Click%20Me-25D366?style=for-the-badge&logo=whatsapp" alt="WhatsApp" />
  </a>

GitHub Repository: [Agriconnect](https://github.com/Gyanthakur/AgriConnect.git)

