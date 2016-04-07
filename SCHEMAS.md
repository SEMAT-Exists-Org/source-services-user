## JSON Schemas and example requests

This document contains [JSON Schemas](http://json-schema.org/) for User service API resources.

It also has example requests / responses. Request domain depends on where are you running the User service.

### User register

#### Request

```json
	POST /users/register
	Headers: Content-Type: application/json
	{
    	"firstname": "John",
    	"lastname": " Smith",
    	"email": "email@address.com",
    	"password": "user-password"
    }
```
    
#### Request JSON Schema

```json
	{
    	"$schema": "http://json-schema.org/draft-04/schema#",
    	"title": "User Register Request",
    	"description": "User Register Request",
    	"type": "object",
    	"properties": {
        	"firstname": {
            	"description": "User first name field. Alphanumeric",
            	"type": "string"
        	},
        	"lastname": {
            	"description": "User last name field. Alphanumeric",
            	"type": "string"
        	},
        	"email": {
            	"description": "Users email address. It becomes unique username once registered",
            	"type": "string"
        	},        	
        	"password": {
            	"description": "User password. Alphanumeric",
            	"type": "string"
        	}
    	},
    	"required": ["firstname", "lastname", "email", "password"]
	}
```

#### Response
Success

```json
	{
    	"status": "success",
    	"firstname": "John",
    	"lastname": "Smith",
    	"email": "email@address.com",
    	"role": "user",
    	"guid":"5703f3e4e7c53a2c83000001",
    	"token": "bb079c85-5e7b-4eca-ba93-feeacf551a41"
	}
```	

Errors

```json
	{
    	"status": "error",
    	"message":"email not unique",
    	"code":"409"
	}
```

```json
	{
    	"status": "error",
    	"message":"malformed request, check JSON schema",
    	"code":"400"
	}
```

```json
	{
    	"status": "error",
    	"message":"internal error",
    	"code":"500"
	}
```


### User login

#### Request

```json
	POST /users/login
	Headers: Content-Type: application/json
	{
    	"username": "email@address.com",
    	"password": "user-password"
    }
```
    
#### Request JSON Schema

```json
	{
    	"$schema": "http://json-schema.org/draft-04/schema#",
    	"title": "User Login Request",
    	"description": "User Login Request",
    	"type": "object",
    	"properties": {
        	"username": {
            	"description": "The unique username. User email address",
            	"type": "string"
        	},
        	"password": {
            	"description": "User password",
            	"type": "string"
        	}
    	},
    	"required": ["username", "password"]
	}
```

#### Response
Success

```json
	{
    	"status": "success",
    	"firstname": "John",
    	"lastname": "Smith",
    	"email": "email@address.com",
    	"role":"user",
    	"guid":"5703ef9dedc8c6707e000001",
    	"token": "677fac2f-db89-4674-bdcf-69831370769a"
	}
```	

Errors

```json
	{
    	"status": "error",
    	"message":"unsuccessful login",
    	"code":"409"
	}
```

```json
	{
    	"status": "error",
    	"message":"malformed request, check JSON schema",
    	"code":"400"
	}
```

```json
	{
    	"status": "error",
    	"message":"internal error",
    	"code":"500"
	}
```


### User logout

#### Request

```json
	POST /users/logout
	Header: token: 677fac2f-db89-4674-bdcf-69831370769a
```

#### Response
Success

```json
	{
    	"status": "success"
	}
```	

Error


```json
	{
    	"status": "error",
    	"message":"internal error",
    	"code":"500"
	}
```

### User register

#### Request

```json
	POST /users/register
	{
    	"firstname": "John",
    	"lastname": " Smith",
    	"email": "email@address.com",
    	"password": "user-password"
    }
```
    
#### Request JSON Schema

```json
	{
    	"$schema": "http://json-schema.org/draft-04/schema#",
    	"title": "User Register Request",
    	"description": "User Register Request",
    	"type": "object",
    	"properties": {
        	"firstname": {
            	"description": "User first name field. Alphanumeric",
            	"type": "string"
        	},
        	"lastname": {
            	"description": "User last name field. Alphanumeric",
            	"type": "string"
        	},
        	"email": {
            	"description": "Users email address. It becomes unique username once registered",
            	"type": "string"
        	},        	
        	"password": {
            	"description": "User password. Alphanumeric",
            	"type": "string"
        	}
    	},
    	"required": ["firstname", "lastname", "email", "password"]
	}
```

#### Response
Success

```json
	{
    	"status": "success",
    	"firstname": "John",
    	"lastname": "Smith",
    	"email": "email@address.com",
    	"role": "user",
    	"guid":"5703f3e4e7c53a2c83000001",
    	"token": "bb079c85-5e7b-4eca-ba93-feeacf551a41"
	}
```	

Errors

```json
	{
    	"status": "error",
    	"message":"email not unique",
    	"code":"409"
	}
```

```json
	{
    	"status": "error",
    	"message":"malformed request, check JSON schema",
    	"code":"400"
	}
```

```json
	{
    	"status": "error",
    	"message":"internal error",
    	"code":"500"
	}
```

### Update Specific User (admin resource)

Admin resources can only be consumed by admin level users. Service checks the user role by validating suplied token

#### Request

```json
	PUT /users/{user-guid}	
	Headers: Content-Type: application/json
	Headers: token: 677fac2f-db89-4674-bdcf-69831370769a
	{
    	"firstname": "John",
    	"lastname": " Smith",
    	"email": "email@address.com",
    	"role": "admin"
    }
```

#### Request JSON Schema

```json
	{
    	"$schema": "http://json-schema.org/draft-04/schema#",
    	"title": "User Update Request",
    	"description": "User Update Request",
    	"type": "object",
    	"properties": {
        	"firstname": {
            	"description": "User first name field. Alphanumeric",
            	"type": "string"
        	},
        	"lastname": {
            	"description": "User last name field. Alphanumeric",
            	"type": "string"
        	},
        	"email": {
            	"description": "Users email address. Should be unique accross all users",
            	"type": "string"
        	},        	
        	"role": {
            	"description": "Users role. Currentlly supported values are user and admin. Alphanumeric",
            	"type": "string"
        	}
    	},
    	"required": ["firstname", "lastname", "email", "role"]
	}
```

#### Response
Success

```json
{
  "status": "success",
  "user": {
    "type": "sematUsers",
    "guid": "57062c5a4d74eeecb0000001",
    "fields": {
      "firstname": "Saulius",
      "lastname": "Zukauskas",
      "email": "root@email.com",
      "role": "admin"
    }
  }
}
```	

Errors

```json
	{
    	"status": "error",
    	"message":"user must relogin",
    	"code":"302"
	}
```

```json
	{
    	"status": "error",
    	"message":"bad request",
    	"code":"400"
	}
```

```json
	{
    	"status": "error",
    	"message":"internal error",
    	"code":"500"
	}
```

### Delete Specific User (admin resource)

Admin resources can only be consumed by admin level users. Service checks the user role by validating suplied token

#### Request

```json
	DELETE /users/5703f9eb5306583d5a000018
	Headers: token: 677fac2f-db89-4674-bdcf-69831370769a
```

#### Response
Success

```json
	{
    	"status": "success"
	}
```	

Errors

```json
	{
    	"status": "error",
    	"message":"user must relogin",
    	"code":"302"
	}
```

```json
	{
    	"status": "error",
    	"message":"bad request",
    	"code":"400"
	}
```

```json
	{
    	"status": "error",
    	"message":"internal error",
    	"code":"500"
	}
```

