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

<img width="1896" height="930" alt="Screenshot_1" src="https://github.com/user-attachments/assets/da5c1b97-c748-4053-8bf2-2a9787cf4b1f" />


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

