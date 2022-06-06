Contributing
===

If you'd like to contribute to this Vtex App here are a few tips.

### Develop

- login with `vtex login`
- create or use a development environment, eg: `vtex use dev1`
- run `vtex link` to sync local changes with remote
- perform the changes
- test test test

### Test and Release

**Important**: the `vtex` commands will take care of the versioning so there's no need to create a new version entry on [CHANGELOG.md](https://github.com/pushnews/vtex-app/blob/main/CHANGELOG.md) or edit the version number on [manifest.json](https://github.com/pushnews/vtex-app/blob/main/manifest.json).

- release the new version with: `vtex release major stable`
- publish the new version with: `vtex publish`
- deploy it with: `vtex deploy pushnewsbr.pushnews@1.0.0` (replace 1.0.0 with the version you created)
- install it on a production environment:
  - `vtex use master --production`
  - `vtex install pushnewsbr.pushnews@1.0.0`

### Submit for review

- `vtex plugins add submit` 
- `vtex submit`

---

Relevant links

- https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-preparing-your-app-distribution 
- https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-submitting-your-app-in-the-vtex-app-store 
