# Development Setup

## Firebase

To connect to the Firebase backend, create a ```.env``` file at the project root and fill it with the appropriate environment variables. These can be found in the Firebase console for the ptv-web-console Firebase app.

```
REACT_APP_API_KEY=xxxxx
REACT_APP_AUTH_DOMAIN=xxxxx
REACT_APP_DATABASE_URL=xxxxx
REACT_APP_PROJECT_ID=xxxxx
REACT_APP_STORAGE_BUCKET=xxxxx
REACT_APP_MESSAGING_SENDER_ID=xxxxx
REACT_APP_APP_ID=xxxxx
REACT_APP_MEASUREMENT_ID=xxxxx
```

If you would like to have a separate Firebase app for development and production, create ```.env.development``` and ```.env.production``` and fill them with the corresponding environment variables. The file corresponding to the specified environment is chosen automatically.

## ESLint

By default, the linter will indicate what errors are present before you can commit.

If you wish to run the linter on a specific file, use ```npx eslint [file/directory]``` to invoke it.

For more information, visit: https://eslint.org/docs/user-guide/getting-started

### Automatically lint your code with ESLint on VS Code

To more productively comply with our ESLint rules, we can underline the problem areas and enable autoformatting on save.

Install the ESLint plugin: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Then add the following to your ```.vscode/settings.json``` (create it if it doesn't exist):

```json
{
  "javascript.format.enable": false,
  "eslint.autoFixOnSave": true,
  "eslint.run": "onSave",
  "files.eol": "\n"
}
```

### Block commiting changes that do not comply with our ESLint rules

Add a git pre-commit hook to your ```.git/hooks``` folder. Ask Leo for the file.

### (Windows) Prevent git from converting LF to CRLF

Add the following to your ```.gitattributes``` (create it if it doesn't exist):

```
*.js text eol=lf
```

## Useful Commands

Start a local development server with hot reloading:
```npm start```

Create a production build:
```npm run build```

Run unit tests:
```npm run test```

Create a production build and deploy to a local Firebase server:
```npm run server```

Create a production build and deploy on Firebase Hosting:
```npm run deploy```
