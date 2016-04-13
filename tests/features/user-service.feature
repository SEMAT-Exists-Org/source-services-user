@core
Feature:
	User service exposes API resources to client applications for user registration,
	validation and management. As User service client I want to veryfy that service 
	is providing required funcionality

	Scenario: As a client application I should get conflict response while 
	registering new user with existing email address
		Given I set User-Agent header to cucumber-tests
		And I set Content-Type header to application/json
		And I set body to {"firstname":"Cucumber","lastname":"Test","email":"root@email.com","password":"test1234"}
		When I POST to /users/register
		Then response code should be 409
		And response body should contain email is not unique

	Scenario: As a client application I should be able to login the existing user
		Given I set User-Agent header to cucumber-tests
		And I set Content-Type header to application/json
		And I set body to {"username":"boss@email.com","password":"test1234"}
		When I POST to /users/login
		Then response code should be 200
		And response body should be valid json
		And response body should contain firstname
		And response body should contain role

	Scenario: As a client application I should be asked to relogin with expired token
		Given I set User-Agent header to cucumber-tests
		And I set Content-Type header to application/json
		And I set token header to 3e0f8f0a-c895-4749-9a6c-f29651f1c649
		When I GET /users
		Then response code should be 302
		And response body should be valid json
		And response body should contain relogin

	Scenario: As a client application I should get error for malformed request
		Given I set User-Agent header to cucumber-tests
		And I set Content-Type header to application/json
		And I set token header to $e0f8f0a-c895-4749-9a6c-f29651f1c649
		When I GET /users
		Then response code should be 400
		And response body should be valid json
		And response body should contain bad request

	Scenario: As a client application I should be asked to relogin while retrieving user details
		Given I set User-Agent header to cucumber-tests
		And I set Content-Type header to application/json
		And I set token header to 3e0f8f0a-c895-4749-9a6c-f29651f1c649
		When I GET /users/5703f9eb5306583d5a000018
		Then response code should be 302
		And response body should be valid json
		And response body should contain relogin

	Scenario: As a client application I should be asked to relogin while deleting user
		Given I set User-Agent header to cucumber-tests
		And I set Content-Type header to application/json
		And I set token header to 3e0f8f0a-c895-4749-9a6c-f29651f1c649
		When I DELETE /users/5703f9eb5306583d5a000018
		Then response code should be 302
		And response body should be valid json
		And response body should contain relogin

	Scenario: As a client application I should get error for malformed request
		Given I set User-Agent header to cucumber-tests
		And I set Content-Type header to application/json
		And I set token header to $e0f8f0a-c895-4749-9a6c-f29651f1c649
		When I DELETE /users/5703f9eb5306583d5a000018
		Then response code should be 400
		And response body should be valid json
		And response body should contain bad request











