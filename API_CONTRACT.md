# 📄 API Contract – Praevon

Este documento define los **endpoints** del backend para el MVP de Praevon.  

---

## 🔑 Auth

### `POST /api/core-service/v1/auth/register`

- **Descripción**: Registrar un nuevo usuario.
- **Body**

```json
{
  "username": "juanito",
  "email": "juan@example.com",
  "password": "123456",
  "phone": "+573001112233"
}
```

- **Respuesta 201 (OK)**:

```json
{
  "id": 1,
  "username": "juanito",
  "email": "juan@example.com",
  "phone": "+573001112233",
  "createdAt": "2025-09-09T15:00:00.000Z",
  "identified": false
}
```

### `POST /api/core-service/v1/auth/login`

- **Descripción**: Registrar un nuevo usuario.
- **Body**

```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

- **Respuesta 200 (OK)**:

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "username": "juanito",
    "email": "juan@example.com"
  }
}
```

## 👤 Users

### `GET /api/core-service/v1/users/me`

- **Descripción**: Obtener info del usuario actual.
- **Headers**: Authorization: Bearer token

- **Respuesta**:

```json
[
  {
    "id": 1,
    "username": "juanito",
    "email": "juan@example.com",
    "phone": "+573001112233"
  }
]
```

### `GET /api/core-service/v1/users/:id`

- **Descripción**: Obtener un usuario por su ID.
- **Respuesta**:

```json
{
  "id": 1,
  "username": "juanito",
  "email": "juan@example.com",
  "phone": "+573001112233"
}
```

---

## 🏠 Properties

### `GET /api/core-service/v1/properties`

- **Descripción**: Obtener la lista de propiedades.
- **Query params**:
  - city (string)

  - page (int, default 1)

  - limit (int, default 10)

  - q (string: búsqueda en título/desc)

- **Respuesta**:

```json
{
  "page": 1,
  "limit": 10,
  "total": 45,
  "items": [
    {
      "id": 1,
      "title": "Apartamento en Medellín",
      "city": "Medellín",
      "price": 2000,
      "status": "available",
      "owner": {
        "id": 1,
        "username": "juanito"
      }
    }
  ]
}
```

### `POST /api/core-service/v1/properties`

- **Descripción**: Obtener una propiedad por su ID.
- **Path param**: id (int)
- **Body**

```json
{
  "title": "Casa en Cali",
  "description": "Hermosa casa con jardín",
  "address": "Av. Siempre Viva 742",
  "city": "Cali",
  "price": 3500
}
```

- **Respuesta**:

```json
{
  "id": 5,
  "title": "Casa en Cali",
  "city": "Cali",
  "price": 3500,
  "status": "available",
  "ownerId": 1
}
```

### `GET /api/core-service/v1/properties/:id`

- **Descripción**: Obtener una propiedad por su ID.
- **Path param**: id (int)
- **Respuesta**:

```json
{
  "id": 1,
  "title": "Apartamento en Medellín",
  "description": "Bonito apartamento con balcón",
  "address": "Calle 123 #45",
  "city": "Medellín",
  "price": 2000,
  "status": "available",
  "owner": {
    "id": 1,
    "username": "juanito"
  },
  "rentals": []
}
```

---

## 📄 Rentals
