# Сервер на Express + MongoDB

1. Сервер имеет возможность создавать пользователей. Формирует поля email, password и roles. 
Схема пользователя описана в User.js
2. Роли пока создаются автоматически и присваиваются при регистрации пользователя. Схема в Role.js
3. В auth controller описаны методы регистрации и логина пользователя, auth.service взаимодействие с базой проверка / хеширование пароляс bcrypt и jwt.
4. При регистрации и логине по роутам api/auth/login, api/auth/registration выполняется валидации передаваемых данных с помощью express-validator
