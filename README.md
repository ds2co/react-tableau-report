# react-tableau-report
React component to embed Tableau reports in a web application using Tableau JS API.

## Install

```
npm install react-tableau-report --save
```

## Basic Usage
```js
import TableauReport from 'tableau-react';

...

render() {
    return {
        <TableauReport url="http://public.tableau.com/views/RegionalSampleWorkbook/Storms" />
    }
}
```

## Advanced Usage
You can add a token, options, filters, and parameters to your TableauReport components to utilizate the features available in the Tablea Api.

[Click Here](https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#vizcreateoptions_record) to view the full list of options that can be passed to the report. 

Example:
```js
const token = "<TABLEAU_TOKEN>";

const options = {
  height: 100,
  width: 100,
  hideTabs: false,
  hideToolbar: true
};

const filters = {
  Colors: ['Blue', 'Red'],
  Sizes: ['Small', 'Medium']
};

const parameters = {
  Param1: 'Value',
  Param2: 'Other Value'
};

const MyReport = props => (
  <TableauReport
    url="http://public.tableau.com/views/RegionalSampleWorkbook/Storms"
    token={token}
    filters={filters}
    parameters={parameters}
    options={options}
  />
)
```

## Dependencies

- react
- react-dom
- tableau-api
- url

## Future Releases
* Remove dependencies on tableau-api and url packages.
* Enhance filters functionality.
* Write documentation for filters and parameters.
* etc...
