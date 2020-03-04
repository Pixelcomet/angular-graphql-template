# Angular + graphql template

## Prerequisites
- have [node](https://nodejs.org/en/) installed (tested on v12)
- have [mongodb](https://docs.mongodb.com/manual/installation/) up and running
- have nodemon installed globally `npm i -g nodemon`

## Starting the API
- navigate to `api/` in your terminal of choice
- install dependencies by running `npm i` (takes a while)
- run the api (restarts on code changes): `npm start`

(for the request types, see `api/insomnia/`)

## Starting the web interface
- install the cli: `npm i -g @angular/cli`
- navigate to `web/` in your terminal of choice
- install dependencies by running `npm i` (takes a while)
- compile and serve: `ng serve` (may take a long time at first start)


## Production use
### API
- nodemon is not suitable for production use, install pm2 globally `npm i -g nodemon`
- run the server via `npm run prod`
- to see running services `pm2 list`
- to stop the service again `pm2 stop <id>` (replace `<id>` with the service id from the previous step)
- edit the cors rules in `server.js` to allow requests from the web interface

### Web interface
- edit te `uri` constant in `src/app/graphql.module.ts` to point to your api endpoint on your server
- run `ng build --prod` (may take a really long time)
- place the contents of the newly created `dist/website/` directory on your web root (`var/www/html/` on apache2)
- don't forget to configure the server in a way, that redirects all requests to the interface to `index.html` since this file includes the scripts that do all the routing
- there should be a `.htaccess` in `dist/`, it can be used to redirect on an apache2 server (for nginx google `nginx angular` 😅)
