# goit-node-rest-api

## darinakhalina / goit-node-rest-api

### Гілка 04-auth
https://goit-node-rest-api-hw-04.onrender.com

## Запуск

### Встанови залежності

```bash
npm install
```

## Створи файл .env

```bash
DATABASE_DIALECT=postgres
DATABASE_NAME=name
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_HOST=host
DATABASE_PORT=port
JWT_SECRET=secret
```

## Запусти веб-додаток

```bash
npm run start
```

## Запусти веб-додаток у режимі розробки

```bash
npm run dev
```


## Демо

### POST /api/auth/register

![post-auth-register](./assets/post-auth-register.png)

![post-auth-register-email-error](./assets/post-auth-register-email-error.png)

![post-auth-register-duplicate-error](./assets/post-auth-register-duplicate-error.png)

### POST /api/auth/login

![post-auth-login](./assets/post-auth-login.png)

![post-auth-login-pass-error](./assets/post-auth-login-pass-error.png)

![post-auth-login-email-error](./assets/post-auth-login-email-error.png)

### GET /api/auth/current

![get-auth-current](./assets/get-auth-current.png)

![get-auth-current-no-token-error](./assets/get-auth-current-no-token-error.png)

### POST /api/auth/logout

![post-auth-logout](./assets/post-auth-logout.png)

### PATCH /api/auth/subscription

![patch-auth-subscription](./assets/patch-auth-subscription.png)

![patch-auth-subscription-error](./assets/patch-auth-subscription-error.png)

### GET /api/contacts/

![get-contacts](./assets/get-contacts.png)

### GET /api/contacts/:id

![get-contacts-id](./assets/get-contacts-id.png)

### POST /api/contacts/

![post-contacts](./assets/post-contacts.png)

### PUT /api/contacts/:id

![put-contacts-id](./assets/put-contacts-id.png)

### PATCH /api/contacts/:id/favorite

![patch-contacts-id-favorite](./assets/patch-contacts-id-favorite.png)

### DELETE /api/contacts/:id

![delete-contacts-id](./assets/delete-contacts-id.png)

### Basic pagination

![get-contacts-pagination](./assets/get-contacts-pagination.png)

### Second page

![get-contacts-pagination-page-2](./assets/get-contacts-pagination-page-2.png)

### Filter by favorite (true)

![get-contacts-filter-favorite-true](./assets/get-contacts-filter-favorite-true.png)

### Search

![get-contacts-search-name](./assets/get-contacts-search-name.png)

### Combined filter (favorite + name)

![get-contacts-filter-favorite-true-name](./assets/get-contacts-filter-favorite-true-name.png)

### Empty result

![get-contacts-empty-result](./assets/get-contacts-empty-result.png)

### Not authorized

![get-contacts-not-authorized](./assets/get-contacts-not-authorized.png)
