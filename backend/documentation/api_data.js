define({ "api": [
  {
    "type": "post",
    "url": "/all_users/:page",
    "title": "Request User information",
    "name": "GetAllUsers",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>page number of the list.</p>"
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
            "field": "jwt",
            "description": "<p>jwt token of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "Users",
            "description": "<p>returns array of user objects of a user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/all_users.js",
    "groupTitle": "User"
  }
] });
