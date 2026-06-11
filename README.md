# WoodenMaster — Интернет-магазин мебельной фурнитуры

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 📌 О проекте

WoodenMaster — интернет-магазин для продажи мебельной фурнитуры. Проект разработан в рамках дипломной работы по специальности 09.02.07 «Информационные системы и программирование».

**Ключевой функционал:**
- Просмотр каталога товаров с фильтрацией по категориям и материалам
- Добавление товаров в корзину, изменение количества, удаление
- Оформление заказа с указанием контактных данных
- История заказов для зарегистрированных пользователей
- Административная панель (управление товарами, категориями, материалами, заказами)
- Аутентификация и авторизация (JWT) с разграничением ролей (USER / ADMIN)

## 🛠 Технологический стек

### Бэкенд
| Технология | Назначение |
|------------|------------|
| Node.js | Среда выполнения JavaScript на сервере |
| Express | Веб-фреймворк для создания REST API |
| PostgreSQL | Реляционная база данных |
| Sequelize | ORM для взаимодействия с БД |
| JWT | Аутентификация (JSON Web Tokens) |
| bcrypt | Хеширование паролей |
| express-fileupload | Загрузка изображений товаров |

### Фронтенд
| Технология | Назначение |
|------------|------------|
| React | Библиотека для построения пользовательского интерфейса |
| Vite | Сборщик проекта (быстрая разработка) |
| React Router DOM | Маршрутизация (SPA) |
| Zustand | Управление глобальным состоянием |
| Axios | HTTP-запросы к серверу |
| CSS | Стилизация (минималистичный дизайн) |

### Требования
- Node.js 18+
- PostgreSQL 15+
- Git

📡 API Эндпоинты (основные)
Метод	URL	Описание	Доступ

POST	/api/user/registration	Регистрация	Все

POST	/api/user/login	Вход	Все

GET	/api/products	Список товаров (с фильтрацией)	Все

GET	/api/products/:id	Детали товара	Все

POST	/api/products	Добавление товара	ADMIN

PUT	/api/products/:id	Редактирование товара	ADMIN

DELETE	/api/products/:id	Удаление товара	ADMIN

GET	/api/cart	Получение корзины	Авторизованные

POST	/api/cart	Добавление в корзину	Авторизованные

PUT	/api/cart/:id	Изменение количества	Авторизованные

POST	/api/cart/delete	Удаление из корзины	Авторизованные

POST	/api/order	Оформление заказа	Авторизованные

GET	/api/order/user/:id	История заказов	Авторизованные

GET	/api/order	Все заказы	ADMIN

PUT	/api/order/:id	Изменение статуса	ADMIN

DELETE	/api/order/:id	Удаление заказа	ADMIN

GET	/api/productType	Список категорий	Все

POST	/api/productType	Добавление категории	ADMIN

GET	/api/material	Список материалов	Все

POST	/api/material	Добавление материала	ADMIN


👤 Автор
Рочев Даниил Викторович
01-23.ИСИП.ОД-11
ХекслетКолледж
