# Integrating Google OAuth with FeathersJS involves several steps, including setting up Google OAuth credentials, configuring FeathersJS to use OAuth authentication, and implementing the authentication flow. Below are the detailed steps to achieve this:

Step 1: Setting up Google OAuth Credentials

- Go to the Google Cloud Console.
- Create a new project or select an existing one.
- Navigate to "APIs & Services" > "Credentials".
- Click on "Create Credentials" and select "OAuth 2.0 Client IDs".
- Configure the consent screen if prompted.
- Set the application type to "Web application" and configure the authorized redirect URIs (e.g., http://localhost:3030/auth/google/callback).
  > Note down the Client ID and Client Secret.
  > Step 2: Setting up FeathersJS
- Create a new FeathersJS application if you haven't already:

`npx @feathersjs/cli generate app`
Install the necessary dependencies:
`npm install @feathersjs/authentication @feathersjs/authentication-oauth passport-google-oauth20`

Step 3: Configuring Authentication

1. Open config/default.json and add the Google OAuth configuration:

`{
  "authentication": {
    "secret": "your_authentication_secret",
    "strategies": [
      "jwt",
      "local",
      "oauth"
    ],
    "path": "/authentication",
    "service": "users",
    "jwtOptions": {
      "header": { "typ": "access" },
      "audience": "https://yourdomain.com",
      "issuer": "feathers",
      "algorithm": "HS256",
      "expiresIn": "1d"
    },
    "local": {
      "usernameField": "email",
      "passwordField": "password"
    },
    "oauth": {
      "redirect": "/",
      "google": {
        "key": "your_google_client_id",
        "secret": "your_google_client_secret",
        "scope": ["profile", "email"]
      }
    }
  }
}`

2. Update the authentication.js configuration file:

`
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { OAuthStrategy } = require('@feathersjs/authentication-oauth');

module.exports = app => {
const authentication = new AuthenticationService(app);

authentication.register('jwt', new JWTStrategy());
authentication.register('local', new LocalStrategy());
authentication.register('google', new OAuthStrategy());

app.use('/authentication', authentication);
};`

Step 4: Implementing the OAuth Strategy

- Create a custom OAuth strategy to handle Google OAuth authentication.
- Create a new file src/authentication/google.js:

`const { OAuthStrategy } = require('@feathersjs/authentication-oauth');

class GoogleStrategy extends OAuthStrategy {
async getEntityData(profile) {
const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      email: profile.email,
      googleId: profile.sub,
      profilePicture: profile.picture
    };

}

async findEntity(profile) {
return this.app.service('users').find({
query: {
googleId: profile.sub
}
}).then(result => {
if (result.total > 0) {
return result.data[0];
}
return null;
});
}

async getRedirect(data) {
// Redirect the user to the home page after successful authentication
return '/';
}
}

module.exports = GoogleStrategy;`

Update the authentication.js to use the custom strategy:

js
Copy code
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { OAuthStrategy } = require('@feathersjs/authentication-oauth');
const GoogleStrategy = require('./authentication/google');

module.exports = app => {
const authentication = new AuthenticationService(app);

authentication.register('jwt', new JWTStrategy());
authentication.register('local', new LocalStrategy());
authentication.register('google', new GoogleStrategy());

app.use('/authentication', authentication);
};
Step 5: Configuring the User Service
Ensure your user service can handle the additional data from Google. Update your user service model (e.g., src/models/users.model.js) to include fields like googleId and profilePicture.

Step 6: Setting up Routes
FeathersJS automatically sets up the necessary routes for OAuth authentication. Make sure your app listens on the appropriate port and your redirect URIs match the configuration in Google Cloud Console.

Step 7: Testing
Start your FeathersJS server:
sh
Copy code
npm start
Navigate to http://localhost:3030/oauth/google to start the OAuth flow.
Example User Service (Optional)
Here's an example of what your user service might look like:

js
Copy code
const { Service } = require('feathers-memory');

class UserService extends Service {
async create(data, params) {
const { email, googleId } = data;

    if (googleId) {
      // If user logs in with Google, find or create the user based on googleId
      const user = await this.find({ query: { googleId } });
      if (user.total > 0) {
        return user.data[0];
      } else {
        return super.create(data, params);
      }
    } else {
      // Handle regular user creation
      return super.create(data, params);
    }

}
}

module.exports = function (app) {
const options = {
paginate: app.get('paginate'),
};

app.use('/users', new UserService(options));

const service = app.service('users');
service.hooks(hooks);
};
By following these steps, you should have a working Google OAuth authentication setup with FeathersJS.
