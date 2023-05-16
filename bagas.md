# Branded Things API Documentation

## Endpoints :

List of available endpoints:

- `GET /`
- `GET /product`
- `POST /product`
- `DELETE /product/delete/:id`
- `GET /product/category`
- `GET /product/:id`

&nbsp;

## 1. GET /

Description:

- ////

## 2. GET /product

Description:

- Get all product from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  "statusCode": 200,
  "message": [{
    "statusCode": 200,
    "message": [
      {
        "id": integer,
        "name": string,
        "description": string,
        "price": integer,
        "stock": integer,
        "imgUrl": string,
        "categoryId": integer,
        "authorId": integer,
        "createdAt": string,
        "updatedAt": string
      },
      ...,
    ]
  }]
]
```

&nbsp;
_Response (500 - gagal)_

```json
[
  "statusCode": 500,
  "message": "gagal"
]
```

&nbsp;

## 3. POST /product

Description:

- Create data for product

Request:

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (201 - OK)_

```json
[
  "statusCode": 201,
  "message": [{
    "statusCode": 201,
    "message": [
      {
        "id": integer,
        "name": string,
        "description": string,
        "price": integer,
        "stock": integer,
        "imgUrl": string,
        "categoryId": integer,
        "authorId": integer,
        "createdAt": string,
        "updatedAt": string
      },
      ...,
    ]
  }]
]
```

&nbsp;

_Response (400 - fail data not found)_

```json
[
  "statusCode": 400,
  "message": ["error validator message", ...,
  ]
]
```

&nbsp;

_Response (500 - fail server error)_

```json
[
  "statusCode": 500,
  "message": "server error"
]
```

&nbsp;

## 4. DELETE /product/delete/:id

Description:

- Delete data from product where id

Request:

- body:

```json
{
  "product_id": "req.params"
}
```

_Response (200 - OK)_

```json
[
  "statusCode": 200,
  "message": "product.name success to delete"
]
```

&nbsp;

_Response (404 - fail data not found)_

```json
[
  "statusCode": 404,
  "message": "Not Found"
]
```

&nbsp;

_Response (500 - gagal)_

```json
[
  "statusCode": 500,
  "message": "server error"
]
```

&nbsp;

## 5. GET /product/category

Description:

- Get all product and category from database

_Response (200 - OK)_

```json

[
  "statusCode": 200,
  "message": [{
    "statusCode": 200,
    "message": [
      [
        {
          "id": integer,
          "name": string,
          "description": string,
          "price": integer,
          "stock": integer,
          "imgUrl": string,
          "categoryId": integer,
          "authorId": integer,
          "createdAt": string,
          "updatedAt": string
        },
        ...,
      ],
      [
        {
          "id": integer,
          "name": string,
          "description": string,
          "createdAt": date,
          "updatedAt": date

        }

      ]
    ]
  }]
]
```

&nbsp;

_Response (500 - gagal)_

```json
[
  "statusCode": 500,
  "message": "gagal"
]
```

## 6. GET /product/:id

- Get product from database where id

Request:

- headers:

```json
{
  "product_id": "req.params"
}
```

_Response (200 - OK)_

```json
[
  "statusCode": 200,
  "message": [{
    "statusCode": 200,
    "message": [
      {
        "id": integer,
        "name": string,
        "description": string,
        "price": integer,
        "stock": integer,
        "imgUrl": string,
        "categoryId": integer,
        "authorId": integer,
        "createdAt": string,
        "updatedAt": string
      },
      ...,
    ]
  }]
]
```

&nbsp;
_Response (500 - gagal)_

```json
[
  "statusCode": 500,
  "message": "Not Found"
]
```
