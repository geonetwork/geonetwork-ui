---
outline: deep
---

# Deploy

After building your app, you can deploy it in any HTTP server (e.g Nginx, Apache, Azure Static Website with Blob storage ...).

Move the content of `dist/` folder into your server and adjust your configuration file (if needed).  

## Reverse Proxy
Geonetwork-UI apps are using path based routing strategy. HTTP server needs some modifications to make application work

If resource is not available, the request must be redirected to angular's `index.html`.

### NGINX

For Nginx, edit your server configuration to redirect to index.html as fallback.

```bash
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

For Apache, you will need to activate the rewrite module :
```bash
a2enmod rewrite
systemctl restart apache2
```

Then there's two solutions. You will need to add thoses lines in a `.htaccess` file along the `index.html` or in a directory rule inside your `httpd.conf`
```bash
RewriteEngine On
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^ {link_to_angular}/index.html
```

Replace `{link_to_angular}/index.html` with your needs.
