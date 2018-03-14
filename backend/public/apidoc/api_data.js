define({ "api": [
  {
    "type": "GET",
    "url": "/apidoc",
    "title": "Request the documentation for the backend",
    "name": "Documentation",
    "group": "Documentation",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Redirect",
            "optional": false,
            "field": "Index_File_ApiDoc",
            "description": "<p>Redirects the user to the Index file for the apidocs.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apidoc.js",
    "groupTitle": "Documentation"
  },
  {
    "type": "GET",
    "url": "/",
    "title": "Get the index file",
    "name": "Index",
    "group": "Index",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Redirect",
            "optional": false,
            "field": "Index_File",
            "description": "<p>Redirects the user to the Index file.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Index"
  },
  {
    "type": "GET",
    "url": "/market",
    "title": "Request the market data",
    "name": "Market",
    "group": "Market",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JWT token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Coin_Data",
            "description": "<p>Returns an array of the top 100 coins based on the chasing_coin.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/market.js",
    "groupTitle": "Market"
  },
  {
    "type": "GET",
    "url": "/news",
    "title": "Request the news data",
    "name": "News",
    "group": "News",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JWT token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "News_Data",
            "description": "<p>Returns an array of the top 15 news related to cryptocurrency.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/newsapi.js",
    "groupTitle": "News"
  },
  {
    "type": "GET",
    "url": "/auth/facebook",
    "title": "Login using Facebook",
    "name": "Authentication_Facebook",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Redirect",
            "optional": false,
            "field": "User",
            "description": "<p>Redirects the user to Facebook for login.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/auth/facebook/callback",
    "title": "Callback route from Facebook Login",
    "name": "Authentication_Facebook_Callback",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Facebook_Profile",
            "optional": false,
            "field": "Profile",
            "description": "<p>Profile for the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JWT",
            "optional": false,
            "field": "JWT",
            "description": "<p>Returns the JWT token for the current user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/auth/google",
    "title": "Login using Google",
    "name": "Authentication_Google",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Redirect",
            "optional": false,
            "field": "User",
            "description": "<p>Redirects the user to Google for login.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/auth/google/callback",
    "title": "Callback route from Google Login",
    "name": "Authentication_Google_Callback",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Google_Profile",
            "optional": false,
            "field": "Profile",
            "description": "<p>Profile for the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JWT",
            "optional": false,
            "field": "JWT",
            "description": "<p>Returns the JWT token for the current user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/validate_user",
    "title": "Request to validate that the username does not already exists",
    "name": "Check_User_Information",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "User_Object",
            "optional": false,
            "field": "User",
            "description": "<p>User object with updated information.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JWT token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Exists",
            "description": "<p>Returns a boolean value based on if the username already exists.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/validateUser.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/all_users/:page",
    "title": "Request the User information for the leader board",
    "name": "Get_All_Users",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Page",
            "description": "<p>Page number of the list.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JWT token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "User[]",
            "description": "<p>Returns an array of user object for a particular page.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/all_users.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/total_users",
    "title": "Request to get the total number of users",
    "name": "Get_Total_Number_Of_Users",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JWT token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Number",
            "description": "<p>Returns the total number of users in the database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/totalUsers.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/user",
    "title": "Request the user information",
    "name": "Get_User_Information",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JWT token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "JWT",
            "description": "<p>Returns the updated JWT token of the current user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/user_rank",
    "title": "Request the current User's rank",
    "name": "Get_User_Rank",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JWT token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "Rank",
            "description": "<p>Returns the rank of the user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/userRank.js",
    "groupTitle": "User"
  },
  {
    "type": "PUT",
    "url": "/user",
    "title": "Request to update the user's information",
    "name": "Update_User_Information",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "User_Object",
            "optional": false,
            "field": "User",
            "description": "<p>User object with updated information.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>JWT token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "JWT",
            "description": "<p>Returns the updated JWT token of the current user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  }
] });
