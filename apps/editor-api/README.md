# Editor API
This is a NestJs backend to serve a REST API for geonetwork editor.

# Setup
## Database
Create a Postgres database which to belongs to a user.
If the user is not superuser, then you need to add an extension within the database:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
## API
Run 
```shell
nx serve editor-api
```
This will generate the database and run the API on developement mode.
A swagger is available at http://localhost:3333/api/
Generate a new resource
```
nx g @nrwl/nest:resource organisations --project=editor-api --directory=app --type=rest --crud=true
```
