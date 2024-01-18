## API Documentation

## ENDPOINT
(http://0.0.0.0:3000/)

## Register
- URL
    - /register
- Method
    - POST
- Request Body
    - email as string
    - password as string
    - namaNarahubung as string
    - nomorTelepon as string
- Response
```json
{
    "status": "success",
    "message": "User berhasil ditambahkan"
}
```

## Login
- URL
    - /authentications
- Method
    - POST
- Request Body
    - email as string
    - password as string
- Response
```json
{
    "status": "success",
    "message": "Authentication berhasil ditambahkan",
    "loginResult": {
        "userId": "user-6_mDbPMJhay0D3MC",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLTZfbURiUE1KaGF5MEQzTUMiLCJpYXQiOjE3MDU1OTA1Njh9.xlVCmiP52QR7LPx2zDPnlELtrLbjnr-QojfDAWDTDMQ"
    }
}
```