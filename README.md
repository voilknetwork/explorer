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

### Deploying on the server

```
npm install express express-favicon path
/// run the server.js 
node server.js
```

Create nginx record, don't forget to change the `explorer.voilk.com` with your own domain name.

```
server {
	listen 80;
	listen [::]:80;

	server_name explorer.voilk.com;
	location / {
	   proxy_pass http://127.0.0.1:3000;
	}

}
```

### Install certificate using certbot

```
certbot --nginx -d explorer.voilk.com
```

if you want help
contact us at support@voilk.com