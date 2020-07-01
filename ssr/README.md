# GeoNetwork Server Side Rendering applications

This directory contains SSR applications, relying on the same code as the full GeoNetwork UI, and which target Search Engine Optimization concerns.

The goal is that all html content (static and dynamic) is rendered by the server and not on angular bootstrap usually done by the client.

All components initialization and rendering are already done before page loading, even HTTP requests. This way, all SE can easily crawl the content of the page.
This will be used for instance for metadata detailed pages (formatters).

To prevent client bootstrap to play again the HTTP request already sent by the server we use `TransferHttpCacheModule` to manage cache and transfer data from server to client.

To run a SRR application, run e.g. `ng run ssr-formatter:serve-ssr`.

Watch it at http://localhost:4200

> Note: all this implementation is done for development mode ONLY, it is not production ready
