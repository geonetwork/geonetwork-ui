# GeoNetwork OpenAPI Javascript client

GeoNetwork API is described by an OpenAPI specification document (see https://localhost:8080/geonetwork/srv/api/doc.yml). This document is temporarily stored in `libs/gn-api/src/lib/gn4/spec.yml`.

The [openapi-generator](https://openapi-generator.tech/) converts the OpenAPI specification to a `typescript-angular` client. The client is in the `gn-api` library folder and is the `ApiModule`. It contains the services and model definitions. Update and build the library using:

```shell script
curl -o libs/gn-api/src/lib/gn4/spec.yml https://localhost:8080/geonetwork/srv/api/doc.yml
npm run generate-api -- gn4
```

The api `baseUrl` is stored in the api specification document, and overwritten via Angular injection:

```typescript
import { Configuration } from '@geonetwork-ui/data-access/gn4'

// ...

@NgModule({
  exports: [
    // ...
  ],
  declarations: [
    // ...
  ],
  imports: [
    // ...
  ],
  providers: [
    {
      provide: Configuration,
      useValue: new Configuration({
        basePath: '/geonetwork/srv/api'
      }),
    },
    // ...
  ],
})
export class MyModule {
```

This might need to be changed for further deployment, it is used in dev mode environment only for the moment.

> Note: libs should **not** rely on the `BASE_PATH` token as it will not be available in Web Components! Use the `Configuration`
> injectable class from the `@geonetwork-ui/data-access/gn4` module instead.
