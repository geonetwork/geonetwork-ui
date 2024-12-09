---
outline: deep
---

# Frequently Asked Questions

[[toc]]

### _I have deployed Application Name alongside GeoNetwork, but somehow all the HTTP requests going to GeoNetwork end up failing with a 403 error, why?_

There are several possible reasons for this:

- The attempted requests necessitate authentication (e.g. creating a record) but the session of the current user has expired; in this case, the user should log in again.
- The XSRF protection mechanism is not working correctly; this can be complicated to set up, please refer to [this part of the documentation](./deploy.md#authentication) to know more.
