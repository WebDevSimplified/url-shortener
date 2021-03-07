#URL Shortener
-----

Free custom URL Shortener and branded URLs with advanced links tracking and Link Management Platform & API. Shorten and replace long URL to short link.

Made with NodeJS + EJS (View) 👊

##Get Started

##### Install

```javascript
yarn install
//or
npm install
```

##### Change credentials database (.env)

```
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.kseg8.mongodb.net/<database>?retryWrites=true&w=majority
```


##### Run

```javascript
yarn devStart
//or
npm run devStart
```

##### Routes

| Route           | Type                    | Status               |
| -------------   |:-------------:          |              -----:  |
| /               | GET                     | :white_check_mark:   |
| /shortUrls      | POST                    |   :white_check_mark: |
| /:shortUrl      | GET                     |   :white_check_mark: |