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
  "documents": [
    {
      "id": 1,
      "storageUrl": "https://domainName.blob.core.windows.net/documents/property_photo/randomImage.jpg",
      "type": "PROPERTY_PHOTO",
      "originalName": "house.jpg"
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

### `POST /api/core-service/v1/rentals/`

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
---

## 📂 Documents

### `POST /api/core-service/v1/documents/upload-url` (🔒 requiere JWT)

- **Descripción:** Solicita un "permiso" para subir un archivo. Devuelve una URL segura y de un solo uso para subir el archivo directamente a la nube.
- **Headers**: Authorization: Bearer token

- **Body**:

```json
{
  "originalName": "mi_foto_de_propiedad.jpg",
  "mimeType": "image/jpeg",
  "size": 123456,
  "type": "PROPERTY_PHOTO",
  "propertyId": 1
}
```

- **Valores permitidos de type**:
  - TENANT_ID_FRONT

  - TENANT_ID_BACK

  - TENANT_INCOME_PROOF

  - PROPERTY_PHOTO

  - PROPERTY_DEED

- **Respuesta**:

```json
{
  "uploadUrl": "https://<AZURE_STORAGE_URL_CON_SAS_TOKEN>",
  "documentId": 2
}
```

### `PUT` a la URL de Azure (Frontend)

-   **Descripción**:  El frontend realiza esta petición `PUT` directamente a la `uploadUrl` recibida  anteriormente. Esta petición NO se hace a la API de Praevon.
-   **URL**: La `uploadUrl` completa proporcionada por el endpoint anterior.
-   **Headers**:
    -   `Content-Type`: Debe coincidir con el `mimeType` enviado en la petición de `upload-url`, ej: `image/jpg`
    -   `x-ms-blob-type`: `BlockBlob`
    -   **Importante:** NO incluir el header `Authorization: Bearer Token`.
-   **Body**: El contenido binario del archivo a subir.
-   **Respuesta Exitosa (de Azure)**: `201 Created` con un body vacío.

### `POST /api/core-service/v1/documents/:id/upload-complete` (🔒 requiere JWT)

- **Descripción:** Se llama después de que la petición PUT a la `uploadURL` de Azure fue exitosa. Confirma y finaliza el proceso en nuestro sistema.

- **Headers**: Authorization: Bearer token

- **Path param**: id (int) - El documentId

- **Respuesta**:

```json
{
    "id": 2,
    "uniqueFileName": "property_photo/70987a17-7677-445f-b887-f75a3a018b3d.jpg",
    "originalName": "mi_foto_de_propiedad.jpg",
    "mimeType": "image/jpeg",
    "storageUrl": "https://praevonsgsa.blob.core.windows.net/documents/property_photo/...",
    "size": 123456,
    "type": "PROPERTY_PHOTO",
    "status": "PENDING_VALIDATION",
    "createdAt": "2025-09-13T17:07:52.742Z",
    "updatedAt": "2025-09-13T17:15:25.632Z",
    "uploadedById": 1,
    "propertyId": 1
}
```

### `PATCH /api/core-service/v1/documents/:id/review` (🔒 requiere JWT)

- **Descripción:** Permite a un usuario autorizado (generalmente un propietario en este caso) aprobar o rechazar un documento que ha sido subido.

- **Headers**: Authorization: Bearer token

- **Path param**: id (int) - El documentId

- **Body**:

```json
{
  "status": "APPROVED"
}
```

- **Valores permitidos de status**:
  - APPROVED

  - REJECTED

- **Respuesta**:

```json
{
    "id": 2,
    // ... otros campos del documento
    "status": "APPROVED",
    "updatedAt": "2025-09-13T17:27:45.507Z"
}
```


### `GET /api/core-service/v1/documents/:id/download-url` (🔒 requiere JWT)

- **Descripción:** Obtiene una URL segura y temporal para descargar un documento. Se aplican reglas de autorización estrictas.

- **Headers**: Authorization: Bearer token

- **Path param**: id (int) - El documentId

- **Respuesta**:

```json
{
  "downloadUrl": "https://<AZURE_STORAGE_URL_CON_SAS_TOKEN_DE_LECTURA>"
}
```

### `GET /api/core-service/v1/documents/me` (🔒 requiere JWT)

- **Descripción:** Obtiene la lista de todos los documentos que el usuario autenticado ha subido.

- **Headers**: Authorization: Bearer token

- **Respuesta**:

```json
[
    {
        "id": 2,
        "originalName": "mi_foto_de_propiedad.jpg",
        "type": "PROPERTY_PHOTO",
        "status": "APPROVED",
        "createdAt": "2025-09-13T17:07:52.742Z",
        // ... otros campos
    }
]
```

### `DELETE /api/core-service/v1/documents/:id` (🔒 requiere JWT)
-   **Descripción**: Elimina un documento. Solo el usuario que subió el documento puede realizar esta acción.
-   **Path param**: `id` (int) - El ID del documento a eliminar.
-   **Respuesta 204 (No Content)**: El cuerpo de la respuesta estará vacío, indicando que la eliminación fue exitosa.

## ✒️ Contracts

### `GET /api/core-service/v1/contracts` (🔒 requiere JWT)

- **Descripción:** Obtiene una lista de todos los contratos en los que el usuario autenticado es parte (ya sea como propietario o como inquilino).
- **Headers**: Authorization: Bearer token

- **Respuesta**:

```json
{
  [
  {
    "id": 1,
    "rentalId": 45,
    "propertyId": 12,
    "tenantId": 3,
    "landlordId": 1,
    "startDate": "2025-09-15T00:00:00.000Z",
    "endDate": "2026-09-15T00:00:00.000Z",
    "monthlyRent": 2500000,
    "status": "PENDING_SIGNATURE",
    "contractPdfUrl": "https://praevonsgsa.blob.core.windows.net/documents/contracts/6cc8207c-488a-46cb-81e1-ed7ccd7713aa.pdf",
    "blockchainTxHash":null,
    "title":"Apartamento Acogedor en Laureles",
    "address":"Calle 573 # 70-10"},
    "property": {
        "id": 1,
        "title": "Apartamento con Vista al Parque"
    },
    "tenant": {
        "id": 3,
        "username": "Ana Inquilina"
    },
    "landlord": {
        "id": 1,
        "username": "Carlos Propietario"
    }
  }
]
}
```


### `GET /api/core-service/v1/contracts/:id` (🔒 requiere JWT)

- **Descripción:** Obtiene el detalle de un contrato específico. Solo el propietario o el inquilino de ese contrato pueden acceder.
- **Headers**: Authorization: Bearer token
- **Path param**: id (int) - El contractId

- **Respuesta**:

```json
{
  [
  {
    "id": 1,
    "rentalId": 45,
    "propertyId": 12,
    "tenantId": 3,
    "landlordId": 1,
    "startDate": "2025-09-15T00:00:00.000Z",
    "endDate": "2026-09-15T00:00:00.000Z",
    "monthlyRent": 2500000,
    "status": "PENDING_SIGNATURE",
    "contractPdfUrl": "https://praevonsgsa.blob.core.windows.net/documents/contracts/...pdf",
    "property": {
        "id": 1,
        "title": "Apartamento con Vista al Parque"
    },
    "tenant": {
        "id": 3,
        "username": "Ana Inquilina"
    },
    "landlord": {
        "id": 1,
        "username": "Carlos Propietario"
    }
  }
]
}
```

### `POST /api/core-service/v1/contracts/generate-pdf` (🔒 requiere JWT)

- **Descripción:** Genera el documento PDF oficial del contrato, lo   sube de forma segura a la nube y actualiza el estado del contrato a PENDING_SIGNATURE.
- **Headers**: Authorization: Bearer token
- **Path param**: id (int) - El contractId

- **Respuesta**:

```json
{
  {
  "message": "PDF generated and uploaded successfully",
  "contract": {
    "id": 1,
    // ... otros campos del contrato
    "status": "PENDING_SIGNATURE",
    "contractPdfUrl": "https://praevonsgsa.blob.core.windows.net/documents/contracts/...pdf"
  }
}
}
```

### `GET /api/core-service/v1/contracts/download-url` (🔒 requiere JWT)

- **Descripción:** Obtiene una URL segura y temporal (válida por 10 minutos) para descargar el PDF del contrato. Solo las partes del contrato pueden acceder.
- **Headers**: Authorization: Bearer token
- **Path param**: id (int) - El contractId

- **Respuesta**:

```json
{
  {
  "downloadUrl": "https://praevonsgsa.blob.core.windows.net/documents/contracts/...?sv=...&sig=..."
  }
}
```
