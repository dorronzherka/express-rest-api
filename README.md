# Express REST API with Mocha and Chai.js
An express REST API witch uses test driven development with Mocha and Chai.js

## Techonologies used:
* Server side platform: Node.js
* Test framework: Mocha
* Assertion library: Chai.js



## Getting Started
### Prerequisites
 * NodeJS
 * Git
 

## Installation of prerequisites
#### Install Node.js with package manager:
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install git:
```
sudo apt-get install git
```

### Execute commands
```
  npm install
  node app.js
```


### Testing commands
```
  mocha
```

## API Documenation
**Localhost base URL: http://localhost:3000**
 **Note: In order to test REST API Endpoints you need to use an HTTP Client Tool, Postman is recommended**

### Show users sort by likes
* **URL**

        /most-liked
* **Method**

        GET
* **Success Response**
    * Code: 200
    ``` 
    JSON
    [
         {
        "_id": "5c1af5dae6736822dfb5a495",
        "username": "blla",
        "likes": 1
        }
    ]
    ```
### Sign up 
* **URL**

        /signup
* **Method**

        POST
* **Body Data (Application/json)**
        
        {
	        "username": "dorron",
	        "password":"123456",
	        "confirmPassword":"123456"
        }
* **Success Response**
    * Code: 200
    ```
        JSON
        {
            success : true,
            msg: "User added"
        }
    ```

### Login 
* **URL**

        /login
* **Method**

        POST
* **Body Data (Application/json)**
        
        {
	        "username": "dorron",
	        "password":"123456",
        }
* **Success Response**
    * Code: 200
    ```
        JSON
        {
            success: true,
            token: 'JWT ' + token,
            user: {
                id: 5c1af5dae6736822dfb5a495,
                username: dorron,
            }
        }
    ```

### Show current loggedin user
* **URL**

        /me
* **Method**

        GET
* **Headers**

        Authorization: token
* **Success Response**
    * Code: 200
    ``` 
    JSON
     {
        "_id": "5c1af5dae6736822dfb5a495",
        "username": "blla",
        "likes": 1
    }
    ```

### Change password 
* **URL**

        /me/update-user
* **Method**

        POST
* **Body Data (Application/json)**
        {
	        "password":"123456",
	        "confirmPassword":"123456",
        }
* **Success Response**
    * Code: 200
    ```
        JSON
        {
            success : true,
            msg: Password updated"
        }
    ```


### Show specifed user
* **URL**

        /user/:id
* **Method**

        GET
        
* **Success Response**
    * Code: 200
    ``` 
    JSON
         {
        "_id": "5c1af5dae6736822dfb5a495",
        "username": "blla",
        "likes": 1
        }
    ```

### Like user
* **URL**

        /user/:id/like
* **Method**

        POST
* **Headers**

        Authorization: token
* **Success Response**
    * Code: 200
    ``` 
    JSON
      {
            success : true,
            msg: "You like"
        }
    ```

### Unlike user
* **URL**

        /user/:id/unlike
* **Method**

        POST
* **Headers**

        Authorization: token
* **Success Response**
    * Code: 200
    ``` 
    JSON
      {
            success : true,
            msg: "You unliked"
        }
    ```

    
Developed with ♥ by [Dorron Zherka](http://github.com/dorronzherka)