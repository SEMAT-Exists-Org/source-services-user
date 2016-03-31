## JSON Schemas and example requests

This document contains JSON Schemas for User service API resources and example requests / responses.

### User register

#### Request

```json
	POST /users/register
	{
    	"name": "John Smith"
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
        	"name": {
            	"description": "User name field",
            	"type": "string"
        	},
        	"email": {
            	"description": "Users email address. It becomes unique username once registered",
            	"type": "string"
        	},        	
        	"password": {
            	"description": "User password",
            	"type": "string"
        	}
    	},
    	"required": ["name", "email", "password"]
	}
```

#### Response
Success

```json
	{
    	"status": "success",
    	"name": "John Smith"
    	"email": "email@address.com"
    	"token": "s34eded56464xxx"
	}
```	

Error

```json
	{
    	"status": "error",
    	"message":"email not unique"
    	"code":"403"
	}
```



### User login

#### Request

```json
	POST /users/login
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
    	"name": "John Smith"
    	"email": "email@address.com"
    	"token": "s34eded56464xxx"
	}
```	

Error

```json
	{
    	"status": "error",
    	"code":"403"
	}
```
### User logout

#### Request

```json
	POST /users/logout
	{
    	"token": "s34eded56464xxx"
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
        	"token": {
            	"description": "Token received from User service after user performed log in.",
            	"type": "string"
        	}
    	},
    	"required": ["token"]
	}
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
    	"code":"500"
	}
```
