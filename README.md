# URL Shortener
-----

Free custom URL Shortener and branded URLs with advanced links tracking and Link Management Platform & API. Shorten and replace long URL to short link.

Made with the MEEN Stack
* Extra E for EJS (View)

## Get Started

##### Install

```javascript
yarn install
//or
npm install
```

##### Change credentials database (.env)

```
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
```


##### Run

```javascript
yarn start
//or
npm start
```

##### Routes

| Route           | Type                    | Status               |
| -------------   |:-------------:          |              -----:  |
| /               | GET                     | :white_check_mark:   |
| /shorten      | POST                    |   :white_check_mark: |
| /file/:filename      | GET                     |   Optional |
| /:shortUrl      | GET                     |   :white_check_mark: |
| /delete/:shortUrl      | GET                     |   Optional |