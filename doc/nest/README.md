# Learn NestJS

## Generating app

```bash
// Create our ILUVCOFFEE Application
nest new iluvcoffee

// Start Nest application
npm run start

/** 
 * Project available at PORT 3000 
 * http://localhost:3000
 */

```

## Inside NestJS Architecture

`main.ts` is the root file application

`app.services.ts` is services file of component

`app.module.ts` is modules file configuration of a module


```
main.ts
 |_ main.ts
 |_ moduleName || ./ 
    |_ moduleName.module.ts
    |_ moduleName.service.ts
    |_ moduleName.controller.ts
```


## Insomia REST API Client

## Nest Controller

```bash
nest generate controller
// or
nest g co

```