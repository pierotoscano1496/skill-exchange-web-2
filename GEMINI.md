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
  "fechaNacimiento": "2025-07-23",
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

- Endpoint: GET /usuario/own/skills/info
  Response body:

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "descripcion": "string",
    "nombreSubCategoria": "string",
    "nombreCategoria": "string"
  }
]
```

- Endpoint: GET /usuario/own/skills
  Response body:

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "descripcion": "string",
    "idSubCategoria": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
]
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

- Endpoint: POST /skill
  Request body:`

```json
{
  "descripcion": "string",
  "idSubcategoria": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

Response body:

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "descripcion": "string",
  "idSubcategoria": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

- Endpoint: GET /skill/sub-categoria/{idSubcategoria}
  Response body:

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "descripcion": "string",
    "idSubCategoria": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
]
```

- Endpoint: GET /categoria
  Response body:

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "nombre": "string",
    "subCategorias": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "nombre": "string",
        "idCategoria": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "skills": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "descripcion": "string",
            "idSubCategoria": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
          }
        ]
      }
    ]
  }
]
```

- Endpoint: GET /sub-categoria/categoria/{idCategoria}
  Response body:

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "nombre": "string",
    "idCategoria": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "skills": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "descripcion": "string",
        "idSubCategoria": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ]
  }
]
```

- Endpoint: GET /skill/sub-categoria/{idSubcategoria}
  Response body:

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "descripcion": "string",
    "idSubCategoria": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
]
```

## Endpoint: POST /servicio

### Request body:

```json
{
  "data": {
    "titulo": "string",
    "descripcion": "string",
    "precio": 0,
    "idProveedor": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "tipoPrecio": "fijo",
    "precioMinimo": 0,
    "precioMaximo": 0,
    "ubicacion": "string",
    "modalidad": "presencial",
    "aceptaTerminos": true,
    "skills": [
      {
        "idServicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "idSkill": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ],
    "disponibilidades": [
      {
        "idServicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "dia": "lunes",
        "horaInicio": {
          "hour": 0,
          "minute": 0,
          "second": 0,
          "nano": 0
        },
        "horaFin": {
          "hour": 0,
          "minute": 0,
          "second": 0,
          "nano": 0
        }
      }
    ],
    "modalidadesPago": [
      {
        "tipo": "yape",
        "cuentaBancaria": "string",
        "numeroCelular": "string",
        "url": "string"
      }
    ]
  },
  "multimedia": ["string"],
  "yapeMultimedia": "string"
}
```

### Código de Spring Boot para el endpoint POST /servicio:

```java
@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
@Operation(summary = "Guarda un servicio con su metadata", description = "Guarda primero los archivos de los recursos multimedia de un servicio a S3: imágenes, videos cortos, métodos de pago, etc. y la información del servicio adicionalmente con: habilidades, disponibilidades y modalidades de pago")
public ServicioRegisteredResponse registrar(@RequestPart("data") CreateServicioBody requestBody,
        @RequestPart(value = "multimedia", required = false) List<MultipartFile> recursosMultimedia,
        @RequestPart(value = "yapeMultimedia", required = false) MultipartFile yapeFile) {
    try {
        ServicioRegisteredResponse response = service.registrar(requestBody, recursosMultimedia, yapeFile);
        logger.info("Registro de servicio exitoso. ID generado: {}", response.getId());
        return response;
    } catch (DatabaseNotWorkingException | NotCreatedException | IOException | InvalidFileException
            | FileNotUploadedException e) {
        if (e instanceof IOException) {
            logger.error("Error al registrar el servicio: {}", e.getMessage(), e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al registrar el servicio");
        } else {
            logger.error("Respuesta de error del servicio: {}", e.getMessage(), e);
        }
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    }
}
```

### Response body:

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

## Endpoint: PATCH /servicio/{idServicio}

### Request body:

## Endpoint: POST /usuario/own/match

### Request body:

```json
{
  "idServicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "mensaje": "string"
}
```

### Response body:

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "idServicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "idCliente": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fecha": "2025-08-28T01:51:47.225Z",
  "fechaInicio": "2025-08-28T01:51:47.225Z",
  "fechaCierre": "2025-08-28T01:51:47.225Z",
  "estado": "solicitado",
  "puntuacion": 0,
  "costo": 0
}
```

## Endpoint: PATCH /match/accept/{idMatch}

### Request body:

```json
{
  "fechaInicio": "2025-09-16T00:35:49.396Z"
}
```

### Response body:

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "idServicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "idCliente": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fecha": "2025-09-16T00:35:49.416Z",
  "fechaInicio": "2025-09-16T00:35:49.416Z",
  "fechaCierre": "2025-09-16T00:35:49.416Z",
  "estado": "solicitado",
  "puntuacion": 0,
  "costo": 0
}
```

## Endpoint: GET /usuario/proveedor/match

### Response body:

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "servicio": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "proveedor": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "dni": "string",
        "carnetExtranjeria": "string",
        "tipoDocumento": "dni",
        "introduccion": "string",
        "correo": "string",
        "nombres": "string",
        "apellidos": "string",
        "fechaNacimiento": "2025-09-16",
        "perfilLinkedin": "string",
        "perfilFacebook": "string",
        "perfilInstagram": "string",
        "perfilTiktok": "string",
        "skillsAsignados": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "descripcion": "string",
            "nombreSubCategoria": "string",
            "nombreCategoria": "string",
            "nivelConocimiento": 0,
            "descripcionDesempeno": "string"
          }
        ]
      },
      "titulo": "string",
      "descripcion": "string",
      "precio": 0,
      "precioMaximo": 0,
      "precioMinimo": 0,
      "tipoPrecio": "fijo",
      "ubicacion": "string",
      "modalidad": "presencial",
      "aceptaTerminos": true,
      "disponibilidades": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "idServicio": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "dia": "lunes",
          "horaInicio": {
            "hour": 0,
            "minute": 0,
            "second": 0,
            "nano": 0
          },
          "horaFin": {
            "hour": 0,
            "minute": 0,
            "second": 0,
            "nano": 0
          }
        }
      ],
      "modalidadesPago": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "tipo": "yape",
          "cuentaBancaria": "string",
          "numeroCelular": "string",
          "url": "string"
        }
      ],
      "urlImagePreview": "string"
    },
    "cliente": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dni": "string",
      "carnetExtranjeria": "string",
      "tipoDocumento": "dni",
      "introduccion": "string",
      "correo": "string",
      "nombres": "string",
      "apellidos": "string",
      "fechaNacimiento": "2025-09-16",
      "perfilLinkedin": "string",
      "perfilFacebook": "string",
      "perfilInstagram": "string",
      "perfilTiktok": "string",
      "skillsAsignados": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "descripcion": "string",
          "nombreSubCategoria": "string",
          "nombreCategoria": "string",
          "nivelConocimiento": 0,
          "descripcionDesempeno": "string"
        }
      ]
    },
    "fecha": "2025-09-16T03:57:49.749Z",
    "fechaInicio": "2025-09-16T03:57:49.749Z",
    "fechaCierre": "2025-09-16T03:57:49.749Z",
    "estado": "solicitado",
    "puntuacion": 0,
    "costo": 0,
    "mensaje": "string"
  }
]
```
