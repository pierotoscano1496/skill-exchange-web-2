- Cuando realices cambios en el código, asegura de que no haya errores de eslint.

# Documentación de los endpoints:

- Endpoint: POST /usuario

```json
{
  "dni": "string",
  "carnetExtranjeria": "string",
  "tipoDocumento": "dni",
  "correo": "string",
  "nombres": "string",
  "apellidos": "string",
  "tipo": "cliente",
  "fechaNacimiento": "2025-07-13",
  "clave": "string",
  "perfilLinkedin": "string",
  "perfilFacebook": "string",
  "perfilInstagram": "string",
  "perfilTiktok": "string",
  "introduccion": "string",
  "skills": [
    {
      "idSkill": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "nivelConocimiento": 0,
      "descripcion": "string"
    }
  ]
}
```

- Endpoint: POST /auth/login
  Request body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response headers:

```http
Authorization: Bearer {token}
```

- Endpoint: GET /usuario
  Response body:

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dni": "string",
  "carnetExtranjeria": "string",
  "tipoDocumento": "dni",
  "correo": "string",
  "nombres": "string",
  "apellidos": "string",
  "tipo": "cliente",
  "fechaNacimiento": "2025-07-10",
  "perfilLinkedin": "string",
  "perfilFacebook": "string",
  "perfilInstagram": "string",
  "perfilTiktok": "string",
  "introduccion": "string",
  "skills": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "nivelConocimiento": 0,
      "descripcion": "string"
    }
  ]
}
```

- Endpoint: GET /chat/own-last-message
  Response body:

  ```json
  [
    {
      "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "contact": {
        "idContact": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "fullName": "string",
        "email": "string"
      },
      "lastMessage": {
        "sentBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "fecha": "2025-07-06T00:23:44.166Z",
        "mensaje": "string",
        "resourceUrl": "string"
      }
    }
  ]
  ```

- Endpoint: GET /chat/{idConversation}
  Response body:

```json
{
  "conversationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "otherContact": {
    "idContact": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fullName": "string",
    "email": "string"
  },
  "messages": [
    {
      "sentBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fecha": "2025-07-06T01:36:48.555Z",
      "mensaje": "string",
      "resourceUrl": "string"
    }
  ]
}
```
