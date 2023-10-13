---
outline: deep
---

# Editor

## My organization

The "my organization" tab contains filtered records owned by the organization of the logged in user. Note that this page will not display any records if no user is logged in.
The page is made of :

- The organization name and logo, fetched from `organisations$` in the `OrganizationServiceInterface`.
- A table with the filtered records. The table is from the component `md-editor-records-list`, which does the fetching of the records.
- Two links :
  - The first link is the count of published records for this organization. It leads to the datahub, where the filter by organization will be activated to only show the user's organization. The filter is set through the URL directly with the name from `organisations$`.
  - The second link is the count of users for this organization. It leads to a new page in the dashboard. The page is also made of the organization's name and logo, and of a table presenting the users and their details. These users are fetched from the observables `user$` (logged in user), and `allUsers$` (all users of geonetwork) in the `AuthService`. `allUsers$` are then filtered by their organization to be displayed here. The table in this page is also from the component `md-editor-records-list`, which detects if an input `users` (containing the list of filtered users) was received and creates the table accordingly.

It's important to know that a user with an organization must be logged in for this component to work. If not, or in the case where the organization doesn't own any records, a message will be displayed instead of the table, to inform the user.

## Chapter 2
