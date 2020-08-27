## Voilk Block Chain explorer

It's a blockchain explorer for voilk blockchain, a react application

Here is how you can run it locally on your computer

Make sure you have `node v14`

```
git clone https://github.com/voilknetwork/voilkExplorer
cd voilkExplorer
yarn install or npm install
yarn start or npm start
```

after it's completed you can head over to `localhost:3000`
and voila you have a local instance of explorer running

if you want to deploy it on a server

```
yarn run build
or 
npm run build
```

It will create a build directory which you can then deploy on your server.
use express, and configure nginx/apache 

if you want help
contact us at support@voilk.com