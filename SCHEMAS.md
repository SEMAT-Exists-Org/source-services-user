## JSON Schemas and example requests

This document contains JSON Schemas for User service API resources and example requests / responses.

### User register
### User login

#### Request

	POST /users/login
	{
    	"username": "email@address.com",
    	"password": "user-password"
    }
    
#### Request JSON Schema

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


#### Responses
Success

	{
    	"status": "success",
    	"name": "John Smith"
    	"email": "email@address.com"
    	"token": "s34eded56464xxx"
	}
	
Error

	{
    	"status": "error",
    	"code":"403"
	}

### User logout

