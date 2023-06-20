# Node Google Oauth CLI

This repository contains a nodejs command that starts a simple Node.js server that provides Google OAuth 2.0 for server-side web applications. The server exchanges an authorization code for an access token, which can be used to access Google APIs.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed Node.js and npm (Node Package Manager).
* You have a Google Cloud Platform account.
* You have created a project in the Google Cloud Console.
* You have set up OAuth 2.0 credentials for your project.

## Installing Google OAuth Node.js Server

To install Google OAuth Node.js Server, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/google-oauth-nodejs-server.git
```

2. Navigate to the project directory:

```bash
cd google-oauth-nodejs-server
```

3. Install the required packages:

```
npm install
```
## Using Google OAuth Node.js Server

To use Google OAuth Node.js Server, follow these steps:

1. Replace `client_id` and `client_secret` in the script with your actual Google client ID and secret.

2. Run the server:

```bash
node server.js --client_id YOUR_CLIENT_ID --client_secret YOUR_CLIENT_SECRET
```

3. Open your browser and navigate to http://localhost:8000. The server will redirect you to the Google sign-in page.

4. Sign in with your Google account and authorize the app. Google will redirect you back to the server, and the server will exchange the authorization code for an access token.

## Parameteres

Here are the details of each option:

* `--client_id YOUR_CLIENT_ID`: This option is **required**. Replace **YOUR_CLIENT_ID** with your actual Google client ID.

* `--client_secret YOUR_CLIENT_SECRET`: This option is **required**. Replace **YOUR_CLIENT_SECRET** with your actual Google client secret.

* `--port YOUR_PORT`: This option is optional. Replace **YOUR_PORT** with the port number you want the server to listen on. If you don't specify this option, the server will **listen on port 8000 by default**.

* `--scope YOUR_SCOPE`: This option is optional. Replace **YOUR_SCOPE** with the OAuth scope you want to use. If you don't specify this option, the server will use https://www.googleapis.com/auth/analytics.readonly as the default scope.

