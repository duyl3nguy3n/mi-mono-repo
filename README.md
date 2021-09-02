# mi-mono-repo

## GETTING STARTED

- Install [nvm-windows](https://github.com/coreybutler/nvm-windows) so we can install and use multiple [NodeJs](https://nodejs.org/en/) versions

- Install workspace NodeJs

```npm
nvm install 14.17.6
nvm use 14.17.6
```

- Install workspace CLI

```npm
npm install -g @nrwl/cli@12.8.0
npm install -g @angular/cli@12.2.4
npm install -g firebase-tools@9.17.0
```

- Setup firebase for deployment

```firebase
firebase login        # Sign into Firebase using Google account
firebase use default  # Specify firebase to use default project in .firebaserc
```

## DEVELOP

```npm
npm start
```

## DEPLOYMENT

```npm
npm run fb:deploy:silo-ngx-doc-app
```
