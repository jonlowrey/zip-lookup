# USPS Zip Code Translation Service
### A simple nodeJS app to wrap the United States Postal Service's CityStateLookup XML API and return a JSON object.


## Getting Started
1. You can almost instantly get a USPS api key by filling out the registration form at https://www.usps.com/business/web-tools-apis/

2. Clone this repository and create a `.env` file in the root of the project that looks like this
```
USPS_API_KEY=YOURUSERNAMEHERE
```

3. Run `npm install` then `npm start`

4. Profit



## Examples

### A request to the USPS's endpoint for the ZipCode 74801 looks like this...
```
http://production.shippingapis.com/ShippingAPI.dll?
API=APINAME&XML=<CityStateLookupRequest USERID="APIKEY">
<ZipCode ID='0'>
<Zip5>74801</Zip5>
</ZipCode>
</CityStateLookupRequest>
```

### And this is what we get in response
```
<?xml version="1.0" encoding="UTF-8"?>
<CityStateLookupResponse>
  <ZipCode ID="0">
    <Zip5>74801</Zip5>
    <City>SHAWNEE</City>
    <State>OK</State>
  </ZipCode>
</CityStateLookupResponse>
```
### Compare that to a request to our API...
``` 
http://localhost:8080/?zip=74801 
```
### And it's response
```
{
  "zipCode": "74801",
  "city": "SHAWNEE",
  "state": "OK"
}
```


## Further Reading:
https://youtu.be/SeiQUDsz-gU?t=832
