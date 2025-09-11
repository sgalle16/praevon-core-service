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

- **Descripción**: Iniciar sesión de un usuario.
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

### `GET /api/core-service/v1/users/me` (🔒 requiere JWT)

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

### `PUT /api/core-service/v1/properties/:id` (🔒 solo dueño)

- **Descripción**: El dueño puede editar una propiedad por su ID.
- **Path param**: id (int)

- **Body**:

```json
{
  "title": "Casa remodelada",
  "price": 3800,
  "status": "available"
}
```

- **Respuesta**:

```json
{
  "id": 5,
  "title": "Casa remodelada",
  "price": 3800,
  "status": "available"
}
```

### `DELETE /api/core-service/v1/properties/:id` (🔒 solo dueño)

- **Descripción**: El dueño puede eliminar una propiedad por su ID.
- **Path param**: id (int)
- **Respuesta**: 204
---

## 📄 Rentals

### `POST /api/core-service/v1/rentals/` (🔒 solo dueño)

- **Descripción**: Crear solicitud de renta.
- **Path param**: id (int)

- **Body**:

```json
{
  "propertyId": 12
}
```

- **Respuesta**:

```json
{
  "id": 45,
  "propertyId": 12,
  "renterId": 7,
  "status": "pending",
  "createdAt": "2025-09-11T18:25:43.511Z"
}
```

### `GET /api/core-service/v1/rentals/me` (🔒 requiere JWT)

- **Descripción**: Listar rentas del usuario autenticado.
- **Headers**: Authorization: Bearer token
- **Respuesta**:

```json
[
  {
    "id": 45,
    "propertyId": 12,
    "renterId": 7,
    "status": "pending",
    "createdAt": "2025-09-11T18:25:43.511Z",
    "property": {
      "id": 12,
      "title": "Apartamento en Bogotá",
      "city": "Bogotá",
      "price": 1200,
      "status": "available"
    }
  }
]
```

### `GET /api/core-service/v1/rentals/owner` (🔒 requiere JWT)

- **Descripción**: Listar rentas de mis propiedades (dueño).
- **Headers**: Authorization: Bearer token
- **Respuesta**:

```json
[
  {
    "id": 45,
    "propertyId": 12,
    "renterId": 7,
    "status": "pending",
    "createdAt": "2025-09-11T18:25:43.511Z",
    "property": {
      "id": 12,
      "title": "Apartamento en Bogotá",
      "city": "Bogotá",
      "price": 1200,
      "status": "available"
    },
    "renter": {
      "id": 7,
      "username": "juanperez",
      "email": "juanperez@email.com"
    }
  }
]
```

### `PATCH /api/core-service/v1//rentals/:id/status` (🔒 solo dueño)

- **Descripción**: El dueño actualiza el estado de una solicitud de renta.
- **Headers**: Authorization: Bearer token
- **Path param**: id (int)
- **Valores permitidos de Status**:
  - "accepted"

  - "rejected"

  - "cancelled"

- **Body**:

```json
{
  "status": "accepted"
}
```

- **Respuesta**:

```json
{
  "id": 45,
  "propertyId": 12,
  "renterId": 7,
  "status": "accepted",
  "createdAt": "2025-09-11T18:25:43.511Z"
}
```
