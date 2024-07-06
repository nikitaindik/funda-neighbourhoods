# Funda Neighbourhoods &middot; ![](https://github.com/nikitaindik/funda-neighbourhoods/workflows/Node.js%20CI/badge.svg)

**UPD: ⚠️ I don't have time to support this extension anymore, so I have archived the repo and unpublished the extension from stores.**

Since I have received a copyright infringement claim from Funda, I'd like to mention that I have no affiliation to Funda and this is not an official Funda extension.

```
All trademarks and tradenames related to Funda, amongst which domain name www.funda.nl
that is registered for Funda’s benefit and a protected and well-known trademark FUNDA
belong to Funda B.V., Funda Real Estate B.V. and Funda Intellectual Property B.V. (“Funda”),
with its registered office in Amsterdam, Piet Heinkade 167, 1019GM Amsterdam.
```

---

Chrome / Edge / Firefox extension that adds useful info about a neighbourhood to funda.nl pages.

**Adds info about**:

- how old are houses in the neighbourhood
- average income of residents
- residents age statistics
- marital status of residents
- immigration background statistics
- other stuff

Data comes from Dutch census bureau (CBS) API.

---

### Install extension

**Chrome**: ~~https://chrome.google.com/webstore/detail/funda-neighbourhoods/jibdjhaojkpiagiccmolddmlhllancgj~~  
**Edge**: ~~https://microsoftedge.microsoft.com/addons/detail/ndloapdppofpipoclcpehfijapbfbpip~~  
**Firefox**: ~~https://addons.mozilla.org/en-US/firefox/addon/funda-neighbourhoods/~~

---

### Commands

`npm run build` - build for production  
`npm run start` - build for development (no minification, uses webpack watch mode)  
`npm run test` - build for testing with Puppeteer (same as production, but uses a mocked Funda page) and run test  
`npm run test:ci` - used by CI to build and run tests  
`npm run release` - pack build folder into a ZIP, so it can be uploaded to extensions store dashboard

---

### Tools used

**Extension code**: Vanilla JS  
**Bundling**: Webpack 4  
**Tests**: Puppeteer + Jest  
**Neighbourhood info API**: http://geodata.nationaalgeoregister.nl/

---

### Future plans

- [ ] Make options page easily discoverable
- [ ] Add badges to map view
