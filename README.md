# Funda Neighbourhoods &middot; ![](https://github.com/nikitaindik/funda-neighbourhoods/workflows/Node.js%20CI/badge.svg)

Chrome / Edge extension that adds useful info about a neighbourhood to funda.nl pages.

**Adds info about**:

- how old are houses in the neighbourhood
- average income of residents
- residents age statistics
- marital status of residents
- immigration background statistics
- other stuff

Data comes from Dutch census bureau (CBS) API and is from 2015.

---

### Install extension

**Chrome**: https://chrome.google.com/webstore/detail/funda-neighbourhoods/jibdjhaojkpiagiccmolddmlhllancgj  
**Edge**: https://microsoftedge.microsoft.com/addons/detail/ndloapdppofpipoclcpehfijapbfbpip

---

### Commands

`npm run build` - build for production  
`npm run start` - build for development (no minification, uses webpack watch mode)  
`npm run test` - build for testing with Puppeteer (same as production, but uses a mocked Funda page) and run test  
`npm run test:ci` - used by CI to build and run tests  
`npm run zip` - pack build folder into a ZIP, so it can be uploaded to extensions store dashboard

---

### Tools used

**Extension code**: Vanilla JS  
**Bundling**: Webpack 4  
**Tests**: Puppeteer + Jest  
**Zipcode API**: AWS Lambda + DynamoDB  
**Neighbourhood info API**: http://geodata.nationaalgeoregister.nl/

---

### Future plans

- [ ] Find / build a more up-to-date API for neighbourhood info
- [ ] Add badges to map view
