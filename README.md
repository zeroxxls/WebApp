# Luminio — Online CGI Marketplace & Viewer

<img src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3Mv" width="200" />

## 🌐 Deployment

[https://web-app-beryl-gamma.vercel.app/](https://web-app-beryl-gamma.vercel.app/)

---

## 📌 Overview

**Luminio** — это онлайн‑платформа для просмотра и продажи CGI‑контента: 3D‑моделей, 2D‑работ, а также лента новостей о мире CGI. Пользователи могут просматривать цифровые объекты, покупать и загружать работы, сохранять понравившиеся материалы и управлять своим профилем.

Платформа разработана как современное веб‑приложение с модульной архитектурой и сильным акцентом на интерактивность.

---

## ✨ Key Features

* 🔸 Просмотр **3D‑моделей** через встроенный `model-viewer`
* 🔸 Просмотр **2D‑работ** (изображения, арты)
* 🔸 **Покупка** и **продажа** CGI‑контента
* 🔸 Лента **новостей CGI‑индустрии**
* 🔸 **Загрузка** собственных работ или статей
* 🔸 **Профиль пользователя** с настройками и персональными данными
* 🔸 Добавление работ в **понравившиеся** и **сохранённые**
* 🔸 **Комментарии** под постами
* 🔸 Регистрация и авторизация (JWT)

---

## 🧩 Tech Stack

### Frontend

* React.js
* Redux
* React Router
* TailwindCSS
* Swiper
* model-viewer

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* AWS S3 Bucket (хранение медиа)

---

## 🏗 Архитектурный подход

Проект строится на **модульной архитектуре**, где каждый крупный раздел (например, Profile) представляет собой независимый модуль с собственными:

* компонентами
* хуками
* локальными API
* UI‑элементами (уникальными для модуля)
* утилитами

Каждый модуль имеет собственный `index.js`, через который наружу экспортируются только необходимые элементы. Это обеспечивает:

* **сильную связанность внутри модуля**
* **слабую связанность между модулями**
* высокую масштабируемость и удобную поддержку

Компоненты внутри модулей группируются по функциональным разделам (например, `Stats` внутри `Profile`), что создаёт ясную структуру и повышает читаемость.

---

## 🎥 Demo / Screenshots

#Hero Section
<img width="1896" height="930" alt="Screenshot_1" src="https://github.com/user-attachments/assets/da5c1b97-c748-4053-8bf2-2a9787cf4b1f" />


#Info Section
<img width="1898" height="937" alt="Screenshot_2" src="https://github.com/user-attachments/assets/678d78d6-fc1c-4577-a6db-a6ead59500b7" />


#Main Page
<img width="1898" height="943" alt="Screenshot_3" src="https://github.com/user-attachments/assets/ebfbadad-7c00-4f0f-a22e-4489cd8a82ee" />


#Product Window
<img width="1900" height="940" alt="Screenshot_4" src="https://github.com/user-attachments/assets/f576fb0a-ec3a-4d5e-af10-747254e55838" />


#3D View
<img width="1858" height="881" alt="Screenshot_5" src="https://github.com/user-attachments/assets/f006f9ad-50f7-423f-8dea-e0fc9af79f7b" />


#Sign-In
<img width="1905" height="925" alt="Screenshot_6" src="https://github.com/user-attachments/assets/60ce3b91-d126-4965-9df5-07e6f494d7c9" />


#User Profile
<img width="1896" height="940" alt="Screenshot_7" src="https://github.com/user-attachments/assets/1882d246-9cfb-4dc5-832f-417df9a5b3da" />


#Followers
<img width="1897" height="936" alt="Screenshot_8" src="https://github.com/user-attachments/assets/46770b7c-bb13-4325-959d-66e4186086f4" />


#Upload
<img width="1906" height="926" alt="Screenshot_9" src="https://github.com/user-attachments/assets/386a0c2c-0dde-49d8-960b-7c35cca74dcf" />


#Works Upload
<img width="1894" height="932" alt="Screenshot_10" src="https://github.com/user-attachments/assets/b3e8fd56-cdd7-4afa-ad9c-bee324e16460" />


#Articles Upload
<img width="1890" height="935" alt="Screenshot_11" src="https://github.com/user-attachments/assets/19301485-e5e0-423d-a0c5-7a8fbf77880b" />


#Cart Section
<img width="1873" height="924" alt="Screenshot_12" src="https://github.com/user-attachments/assets/83683977-599e-4e26-8e38-7e05dc4b993f" />


#Articles Section
<img width="1898" height="938" alt="Screenshot_13" src="https://github.com/user-attachments/assets/06cfb0d4-e508-41d1-89fe-7c88710efec6" />

---

## 🚀 Future Roadmap

*(по желанию можно заполнить позже)*

---

## 👤 Author

**Kirill Khoroshun**

GitHub: [https://github.com/zeroxxls](https://github.com/zeroxxls)

LinkedIn: [https://de.linkedin.com/in/kyrylo-khoroshun-3a2417375](https://de.linkedin.com/in/kyrylo-khoroshun-3a2417375)

---

# 📄 English Version

# Luminio — Online CGI Marketplace & Viewer

<img src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3Mv" width="200" />

## 🌐 Deployment

[https://web-app-beryl-gamma.vercel.app/](https://web-app-beryl-gamma.vercel.app/)

---

## 📌 Overview

**Luminio** is an online platform for viewing and selling CGI content — 3D models, 2D artworks, and CGI‑related news. Users can browse assets, purchase works, upload their own content, manage profiles, save favorites, and interact via comments.

---

## ✨ Features

* 3D model viewer (`model-viewer`)
* 2D artwork preview
* Buying & selling CGI works
* CGI news feed
* Uploading posts or artworks
* User profile with settings
* Favorites & Saved items
* Comment system
* JWT authentication

---

## 🧩 Tech Stack

### Frontend

* React.js
* Redux
* TailwindCSS
* React Router
* Swiper
* model-viewer

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* AWS S3 Bucket

---

## 🏗 Architecture

Luminio uses a **modular architecture** with isolated feature‑modules (e.g., Profile). Each module contains its own:

* components
* hooks
* API logic
* module‑unique UI elements
* utilities

Modules expose only what’s required through their `index.js`, enabling:

* strong internal cohesion
* weak external coupling
* easier scaling and long‑term maintenance

---

## 🎥 Demo / Screenshots

*(Add visuals later)*

---

## 👤 Author

**Kirill Khoroshun**

GitHub: [https://github.com/zeroxxls](https://github.com/zeroxxls)

LinkedIn: [https://de.linkedin.com/in/kyrylo-khoroshun-3a2417375](https://de.linkedin.com/in/kyrylo-khoroshun-3a2417375)

