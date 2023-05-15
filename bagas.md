## Endpoints

List of Available Endpoints:

- `GET /`
- `GET /genres/categories/types`
- `POST /`
- `POST /:id`
- `DELETE /:id`

### GET /

#### Description

- Get all the products data

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "message": [
      {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updatedAt": Date
      },
      ...
    ]
  }
  ```

_500 - Server Fail_

- Body
  ```json
  {
    "statusCode": 500,
    "message": "gagal"
  }
  ```

### GET /genres/categories/types

#### Description

- Get all the products and catagories data

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "message": [
        [
      {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updatedAt": Date
      },
      ...
    ],  [
            {
                "id": Integer,
                "name": String,
                "createdAt": Date,
                "updatedAt": Date
            },
            ...
        ]
    ]
  }
  ```

### POST /

#### Description

- Create new data product

- Get all the products and catagories data

_201 - OK_

- Body

  ```json
  {
    "statusCode": 201,
    "message":
      {
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer
      }
  }
  ```

  _400 - Validasi Error_

- Body

  ```json
  {
    "statusCode": 201,
    "message": ["error message", ...]
  }
  ```

  _500 - Server Error_

- Body
  ```json
  {
    "statusCode": 201,
    "message": err
  }
  ```

### GET /:id

#### Description

- Get product data where id = req.params

  _20 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "message": [
      {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updatedAt": Date
      },
      ...
    ]
  }
  ```

  _400 - Validasi Error_

- Body

  ```json
  {
    "statusCode": 201,
    "message": "Not Found"
  }
  ```

### Delete /:id

#### Description

- Delete product data where id = req.params

  _200 - OK_

- Body

  ```json
  {
    "statusCode": 200,
    "message": "<entity name> success to delete"
  }
  ```

  _404 - Data not found_

- Body
  ```json
  {
    "statusCode": 500,
    "message": "gagal"
  }
  ```
