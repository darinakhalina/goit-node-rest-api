# goit-node-rest-api

## GET /api/contacts

![GET_contacts](./assets/GET_contacts.png)

## POST /api/contacts

```bash
{ "name": "John Doe", "email": "john.doe@example.com", "phone": "(123) 456-7890" }
```

![POST_contacts](./assets/POST_contacts.png)

## GET /api/contacts/:id

### Знайдено

![GET_contacts_id_found](./assets/GET_contacts_id_found.png)

### Не знайдено

![GET_contacts_id_not_found](./assets/GET_contacts_id_not_found.png)

## DELETE /api/contacts/:id

### Видалено

![DELETE_contacts_id_deleted](./assets/DELETE_contacts_id_deleted.png)

### Не знайдено

![DELETE_contacts_id_not_found](./assets/DELETE_contacts_id_not_found.png)

## POST /api/contacts

### Немає name

![POST_contacts_id_no_name](./assets/POST_contacts_id_no_name.png)

### Немає phone

![POST_contacts_id_no_phone](./assets/POST_contacts_id_no_phone.png)

### Невірний email

![POST_contacts_id_invalid_email](./assets/POST_contacts_id_invalid_email.png)

### Невірний phone

![POST_contacts_id_invalid_phone](./assets/POST_contacts_id_invalid_phone.png)

## PUT /api/contacts/:id

### Оновлено

![PUT_contacts_id_updated](./assets/PUT_contacts_id_updated.png)

### Пусте тіло

![PUT_contacts_id_empty_body](./assets/PUT_contacts_id_empty_body.png)

### Невалідний phone

![PUT_contacts_id_invalid_phone](./assets/PUT_contacts_id_invalid_phone.png)

### Невалідний email

![PUT_contacts_id_invalid_email](./assets/PUT_contacts_id_invalid_email.png)

### Невалідний name

![PUT_contacts_id_invalid_name](./assets/PUT_contacts_id_invalid_name.png)