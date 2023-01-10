# self-service-portal-node

## INSTALLATION

- Duplicate the file `.env.example` and rename it `.env`
- Replace the values in `.env` with the ones corresponding to your environment (reach out to your project manager to get them)
  - Remember that `.env.example` is giving you examples for those as well
- Run `npm install`

### Available ENV variables with examples

- PUBLIC_URL=/ssp/front
  - The path in the host url for the frontend after the domain
- REACT_APP_SSP_MID_PUBLIC_URL=/ssp/api
  - The path in the host url for middleware after the domain
- SSP_MID_PORT=5000
  - The port on which the app will be exposed
- SSP_MID_ENV_CRED=Username:Password
  - The credentials for logging to the environment - in case your Wynsure app os protected behind global auth
- SSP_API_URL=https://you-wynsure-env-api-endpoint/restapi/api
  - The complete url of the wynsure api
- SSP_MID_NODE_ENV=prod
  - dev and prod supported

## START THE APP SERVER

- Run `npm run start`
- Open [http://localhost:5000](http://localhost:5000) to view it in the browser. (port subject to change based on your configuration)

The page will reload if you make edits.
You will also see any lint errors in the console.

## COMMENT

This project was bootstrapped Express JS powered by NodeJS.
