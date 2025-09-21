# goit-node-rest-api

## darinakhalina / goit-node-rest-api

### Гілка hw06-email

https://goit-node-rest-api-hw-6.onrender.com

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
UKR_NET_EMAIL=email
UKR_NET_PASSWORD=password
APP_BASE_URL=http://localhost:3000
```

## Запусти веб-додаток

```bash
npm run start
```

## Запусти веб-додаток у режимі розробки

```bash
npm run dev
```

## Запустити тести

```bash
npm run test
```

## Демо

### POST auth/register

![post register](./assets/post-register.png)

![post register2](./assets/post-register2.png)

### POST auth/login without verification

![post login without verification](./assets/post-login-without-verification.png)

### POST auth/login with verification

![verification](./assets/verification.png)

![verification2](./assets/verification2.png)

![post login with verification](./assets/post-login-with-verification.png)

### Verification error with same token

![verification error with same token](./assets/verification-error-with-same-token.png)

### GET auth/current

![get current](./assets/get-current.png)

### POST auth/verify

![post verify already verified](./assets/post-verify-already-verified.png)

![post verify with validation error](./assets/post-verify-with-validation-error.png)

![post verify with wrong email](./assets/post-verify-with-wrong-email.png)

### When user exists but is not verified yet POST auth/verify

![post verify when user exists but is not verified yet](./assets/post-verify-when-user-exists-but-is-not-verified-yet.png)

![post verify when user exists but is not verified yet 2](./assets/post-verify-when-user-exists-but-is-not-verified-yet2.png)

![post verify when user exists but is not verified yet 3](./assets/post-verify-when-user-exists-but-is-not-verified-yet3.png)