# goit-node-rest-api

## darinakhalina / goit-node-rest-api

### Гілка 03-postgresql
https://goit-node-rest-api-06hj.onrender.com

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

### GET /api/contacts

![get-contacts](./assets/get-contacts.png)

### POST /api/contacts

![post-contacts](./assets/post-contacts.png)

### GET /api/contacts/:contactId

![get-contact-by-id](./assets/get-contact-by-id.png)

### PUT /api/contacts/:contactId

![put-contact-by-id](./assets/put-contact-by-id.png)

### PATCH /api/contacts/:contactId/favorite

![patch-contact-favorite](./assets/patch-contact-favorite.png)

### DELETE /api/contacts/:contactId

![delete-contact-by-id](./assets/delete-contact-by-id.png)

### GET /api/contacts/9999 → 404

![get-contact-by-id-404](./assets/get-contact-by-id-404.png)

### DELETE /api/contacts/9999 → 404

![delete-contact-by-id-404](./assets/delete-contact-by-id-404.png)

### PUT /api/contacts/9999 → 404

![put-contact-by-id-404](./assets/put-contact-by-id-404.png)

### PATCH /api/contacts/9999/favorite → 404

![patch-contact-favorite-404](./assets/patch-contact-favorite-404.png)

### POST /api/contacts з {} → 400

![post-contacts-400](./assets/post-contacts-400.png)

### POST /api/contacts з некоректним email → 400

![post-contacts-400-email](./assets/post-contacts-400-email.png)

### POST /api/contacts з некоректним phone → 400

![post-contacts-400-phone](./assets/post-contacts-400-phone.png)

### PATCH /api/contacts/{id}/favorite з {} → 400

![patch-contact-favorite-400](./assets/patch-contact-favorite-400.png)
