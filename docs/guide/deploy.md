---
outline: deep
---

# Deployment

This guide will offer you indications and advices for successfully deploying one or several GeoNetwork-UI applications
in your infrastructure.

## Basic principle

Applications can be built using the following command:

```shell
$ npx nx build <app-name>
# <app-name> is e.g. datahub or datafeeder
```

All build artifacts for this application will end up in the `dist/<app-name>` folder.
These artifacts can be deployed in any HTTP server (e.g. Nginx, Apache, Azure Static Website with Blob storage...).

Simply move the content of `dist/<app-name>` folder into the appropriate place for your server and adjust your configuration file (if needed).

## Web Server

Geonetwork-UI applications are using **path-based routing strategy**. This means than an application deployed on `https://my.host.org/apps/<app-name>` can handle routes such as:

- `/apps/<app-name>/records/all`
- `/apps/<app-name>/settings`
- `/apps/<app-name>/search?q=road`

All these routes should in reality end up pointing to `/apps/<app-name>/index.html`, the rest of the path being interpreted by Angular.

This requires the relevant HTTP server to have a specific configuration for this to work (otherwise 404 errors will happen very often).

The configuration must essentially let the HTTP server know that if a required resource is not available, the request must be redirected to the application `index.html` file.

### NGINX

For Nginx, edit your server configuration to redirect to the application `index.html` as fallback.

```text
server{
    listen 80;
    listen [::] 80;
    server_name www.example.com example.com;
    root /var/www/example;
    index index.html;
    location / {
        try_files $uri$args $uri$args/ /index.html;
    }
}
```

### Apache

For Apache, you first need to activate the rewrite module :

```bash
a2enmod rewrite
systemctl restart apache2
```

Then there are two options available. You can either add the following lines in an `.htaccess` file alongside the application `index.html` file, or in a directory rule inside your `httpd.conf`:

```bash
RewriteEngine On
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^ {link_to_angular}/index.html
```

Replace `{link_to_angular}/index.html` with your needs.

## Authentication

GeoNetwork-UI applications rely on the GeoNetwork authentication mechanism. This means that if the user is authenticated in GeoNetwork, they will have access to authenticated features in the corresponding GeoNetwork-UI apps.

There are a few caveats, depending on the deployment scenario:

::: details :relieved: GeoNetwork and GeoNetwork-UI are deployed on the same host

> e.g. https://my.host/geonetwork and https://my.host/datahub

In this scenario, requests from the GeoNetwork-UI app to GeoNetwork are _not_ [cross-origin requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#what_requests_use_cors), so CORS rules do not apply.

GeoNetwork has an XSRF protection by default, which _will_ make authenticated requests fail unless the following is done:

- either make sure that the XSRF cookies sent by GeoNetwork have a `path` value of `/`; this is typically done like so in GeoNetwork:

  ```diff
  --- a/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml
  +++ b/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml
  @@ -361,6 +361,7 @@
     <bean class="org.fao.geonet.security.web.csrf.CookieCsrfTokenRepository"
           id="csrfTokenRepository">
       <property name="cookieHttpOnly" value="false"/>
  +    <property name="cookiePath" value="/"/>
     </bean>
  ```

  Also make sure that the GeoNetwork API URL used by the application is _not_ an absolute URL; a relative URL should be enough in that scenario:

  ```diff
  --- a/conf/default.toml
  +++ b/conf/default.toml
  @@ -5,7 +5,7 @@
  [global]
  -geonetwork4_api_url = "https://my.host/geonetwork/srv/api"
  +geonetwork4_api_url = "/geonetwork/srv/api"
  ```

- or disable the XSRF protection selectively for non-critical endpoints of GeoNetwork, e.g. https://my.host/geonetwork/srv/api/userSelections for marking records as favorites; this is typically done like so in GeoNetwork:

  ```diff
  --- a/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml
  +++ b/web/src/main/webapp/WEB-INF/config-security/config-security-core.xml
  @@ -374,6 +374,9 @@
           <value>/[a-zA-Z0-9_\-]+/[a-z]{2,3}/csw!?.*</value>
           <value>/[a-zA-Z0-9_\-]+/api/search/.*</value>
           <value>/[a-zA-Z0-9_\-]+/api/site</value>
  +        <value>/[a-zA-Z0-9_\-]+/api/userselections.*</value>
         </set>
       </constructor-arg>
     </bean>
  ```

  ::: warning
  Please do this responsibly as this could have security implications!
  :::

::: details :sweat: GeoNetwork and GeoNetwork-UI are <u>not</u> deployed on the same host

> e.g. https://my.host/geonetwork and https://another.org/datahub

In this scenario, even if CORS settings are correctly set up on GeoNetwork side, most authenticated request will probably fail because by default they are not sent with the [`withCredentials: true`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials) option.

As such, **authenticated requests are not yet supported in GeoNetwork-UI in the case of a cross-origin deployment**; non-authenticated requests (e.g. public search) should still work provided CORS settings were correctly set up on the GeoNetwork side (see [CORS response headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers)).

Lastly, even if authenticated requests were cleared regarding CORS rules, it would still be needed to disable the XSRF mechanism for the endpoints that GeoNetwork-UI relies on; XSRF protections works by making the client read the content of an HTTP cookie, and that is forbidden in a cross-origin context

:::
