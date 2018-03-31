define({ "api": [
  {
    "type": "GET",
    "url": "/docs",
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
    "url": "/league",
    "title": "Request to get the league",
    "name": "Get_League",
    "group": "League",
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
            "field": "League",
            "description": "<p>Returns the league object that the current user is in.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/league.js",
    "groupTitle": "League"
  },
  {
    "type": "GET",
    "url": "/league_types",
    "title": "Request to get all league types",
    "name": "Get_League_Types",
    "group": "League",
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
            "field": "League_Types",
            "description": "<p>Returns all available league types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/leagueTypes.js",
    "groupTitle": "League"
  },
  {
    "type": "GET",
    "url": "/league/:league_id",
    "title": "Request to get the league",
    "name": "Get_League_With_LeagueId",
    "group": "League",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "league_id",
            "description": "<p>ID of the requested league.</p>"
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
            "field": "League",
            "description": "<p>Returns the league object that is requested.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/league.js",
    "groupTitle": "League"
  },
  {
    "type": "POST",
    "url": "/league",
    "title": "Request to create or join a league",
    "name": "Join_Or_Create_League",
    "group": "League",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "League_Type_ID",
            "optional": false,
            "field": "ID",
            "description": "<p>League type Id.</p>"
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
            "field": "League",
            "description": "<p>Returns the league object that the current user was added to.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/league.js",
    "groupTitle": "League"
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
    "url": "/portfolio/",
    "title": "Request to get the portfolio of the current league",
    "name": "Get_Portfolio",
    "group": "Portfolio",
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
            "field": "League",
            "description": "<p>Returns the portfolio of the current league.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/portfolio.js",
    "groupTitle": "Portfolio"
  },
  {
    "type": "GET",
    "url": "/portfolio/:league_id",
    "title": "Request to get the portfolio in this league",
    "name": "Get_Portfolio_With_LeagueId",
    "group": "Portfolio",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "league_id",
            "description": "<p>ID of the requested league portfolio.</p>"
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
            "field": "League",
            "description": "<p>Returns the portfolio of the league that is requested.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/portfolio.js",
    "groupTitle": "Portfolio"
  },
  {
    "type": "GET",
    "url": "/portfolio/:league_id/:user_id",
    "title": "Request to get the portfolio in a specific league of a specific user",
    "name": "Get_Portfolio_With_LeagueId_With_UserId",
    "group": "Portfolio",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "league_id",
            "description": "<p>ID of the requested league portfolio.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>ID of the requested user.</p>"
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
            "field": "League",
            "description": "<p>Returns the portfolio in a specific league of a specific user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/portfolio.js",
    "groupTitle": "Portfolio"
  },
  {
    "type": "PUT",
    "url": "/portfolio",
    "title": "Request to update the portfolio a league",
    "name": "Update_portfolio",
    "group": "Portfolio",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "Portfolio_Object",
            "description": "<p>Updated portfolio object.</p>"
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
            "field": "Portfolio_Object",
            "description": "<p>Returns the final updated portfolio object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/portfolio.js",
    "groupTitle": "Portfolio"
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
    "type": "GET",
    "url": "/user/search",
    "title": "Request to get all the users username",
    "name": "Get_All_Usernames",
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
            "field": "Usernames",
            "description": "<p>Returns all of the username's of the current users.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
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
    "url": "/user/null_out",
    "title": "Request the null out the current league",
    "name": "Get_And_Update_User_Information",
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
    "type": "GET",
    "url": "/user/search/:username",
    "title": "Request to get the users with a similar username",
    "name": "Search_Via_Username",
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
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Username",
            "description": "<p>Username of the user for look up.</p>"
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
            "field": "Usernames",
            "description": "<p>Returns the usernames that match the given username in params.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
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
