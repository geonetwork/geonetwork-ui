---
outline: deep
---

# Editor draft system

The editor feature in GeoNetwork-UI relies on a draft system. 

The original purpose was to let the user keep their ongoing edition, even when the GeoNetwork session expires. The edition can then be restored, even several days later. This can add complexity for the user, as they need to decide how to resolve conflict when saving from an outdated draft, and they also need to manage the draft status of their records, and be able to rollback.

## Disabling

In case the added complexity is not wanted, there are two ways to disable the draft system:

- **For the whole application**<br>
  This can be done by setting the `DISABLE_DRAFT` injection token to true:<br>
  ```
  provideGn4({ disableDraft: true })
  ```
- **For a single route**<br>
  This can be done by setting the `disableDraft` property to `true` in the data of the resolver:<br>
  ```
  {
    path: 'light-edit/:uuid',
    component: LightEditPageComponent,
    resolve: { record: EditRecordResolver },
    data: {
      disableDraft: true,
    },
  }
  ```
