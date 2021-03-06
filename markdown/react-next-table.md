<p align="center">
   <br/>
   <h3 align="center">SmartTable.js</h3>
   <p align="center">light weight bootstrap smart table</p>
   <p align="center">
   Open Source.
   </p>
   <p align="center">
      <a href="https://packagequality.com/#?package=react-next-table">
        <img src="https://packagequality.com/shield/react-next-table.svg" alt="Package Quality"/>
      </a>
      <a href="https://bundlephobia.com/result?p=react-next-table">
        <img src="https://img.shields.io/bundlephobia/minzip/react-next-table" alt="Bundle Size"/>
      </a>
      <a href="https://www.npmtrends.com/react-next-table">
        <img src="https://img.shields.io/npm/dm/react-next-table" alt="Downloads" />
      </a>
      <a href="https://github.com/a-simplecode/react-next-table/stargazers">
        <img src="https://img.shields.io/github/stars/a-simplecode/react-next-table" alt="Github Stars" />
      </a>
      <a href="https://www.npmjs.com/package/react-next-table">
        <img src="https://img.shields.io/github/v/release/a-simplecode/react-next-table?label=latest" alt="Github Stable Release" />
      </a>
      <img src="https://img.shields.io/github/v/release/a-simplecode/react-next-table?include_prereleases&label=prerelease&sort=semver" alt="Github Prelease" />
   </p>
   <h3 align="center">
   Visit my<a href="https://www.simplecode.app">Website</a> for docs, guides, API and more!
   </h3>
   <br/><br/>
</p>

## Overview:

SmartTable.js is a complete open source solution for [React.js](https://reactjs.org) applications.

<br/>

## Getting Started:

```javascript
npm install --save react-next-table
Or
yarn add react-next-table
```

You also need to install Bootstrap package.

```javascript
npm install --save bootstrap
Or
yarn add bootstrap
```

Add the following imports to app.js

```javascript
import "bootstrap/dist/css/bootstrap.min.css";
import "react-next-table/dist/SmartTable.css";
```

This component will be upgraded and updated regularly for better use, in the smallest package with a simple smart set of codes.

<br/>

## Features:

### Flexible and easy to use

- Based on Bootstrap for css styling and classes.
- Designed to work with any react project and any react framework like [NextJs](https://nextjs.org)
- Compatible in all browsers like (chrome, safari, firefox, opera...)
- Supports sorting columns.
- Supports Custom columns.
- Supports search.
- Supports pagination if an api url added for better SEO and user experience.
- Supports external data by props data and internal data by adding the api url.

<br/>

## Props:

| prop name              |             required              | options                          | description                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | :-------------------------------: | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **headCells**          |              `true`               | Array of object                  | The **headCells** props tell the component what columns do you want to show from the array and how you want to show it. There are some required object keys: `id`, `label`, `width` (as integer in px); and other options like: `sortable` (bool), `numeric` (bool !helps to sort as number!), `render` (a custom column, html, css, javascript, react !you can do all!) |
| **data**               | `true` if `url` prop is not used  | Array of object                  | Prerendered data useful if using [NextJs](http://nextjs.org) framework for server side rendering OR `url` prop can't be used in your case...                                                                                                                                                                                                                             |
| **url**                | `true` if `data` prop is not used | String                           | fetch data on the component mount if prop `data` doesn't exist. And on search adding a query param called `search`, on row number change adding a query param called `limit` and on page change adding a query param called `page`. The best news is that they also work as a combination on the this `url` prop that will work as `paginated api`                       |
| **title**              |              `false`              | String/React component           | It's mainly to be a title or a button                                                                                                                                                                                                                                                                                                                                    |
| **searchDebounceTime** |              `false`              | Integer default is 800 in (ms)   | configure the time you need the search api to start seaching after stop typing in the search box                                                                                                                                                                                                                                                                         |
| **noPagination**       |              `false`              | Boolean                          |                                                                                                                                                                                                                                                                                                                                                                          |
| **rowsPerPage**        |              `false`              | Integer default is 10            |                                                                                                                                                                                                                                                                                                                                                                          |
| **rowsPerPageOptions** |              `false`              | array default is [5, 10, 25, 50] |                                                                                                                                                                                                                                                                                                                                                                          |

<br/>

## Example:

### Add React Component

```javascript
import SmartTable from "react-next-table";

const headCells = [
  {
    id: "email",
    numeric: false,
    label: "Email",
    width: 200,
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
    width: 150,
  },
  {
    id: "phone",
    numeric: false,
    label: "Phone",
    width: 100,
  },
  {
    id: "subject",
    numeric: false,
    label: "Subject",
    width: 300,
  },
  {
    id: "message",
    numeric: false,
    label: "Message",
    width: 700,
  },
];

const data = [
  {
    _id: "6144145976c7fe",
    email: "minageres123@gmail.com",
    name: "Mina",
    phone: "+9617099995114",
    subject: "test",
    message: "ahlannn",
    date: "2021-09-17 19:10:50",
  },
  {
    _id: "6143989f9d87cc",
    email: "as@a.com",
    name: "as",
    phone: "+9617646699991",
    subject: "as",
    message: "as",
    date: "2021-09-16 22:18:31",
  },
  {
    _id: "614397edc9177d8c8",
    email: "amine@amine.com",
    name: "amine",
    phone: "+334343439393993",
    subject: "1234",
    message: "3434",
    date: "2021-09-16 22:15:57",
  },
  {
    _id: "6143be67dfca4985c",
    email: "dominique.amine@gmail.com",
    name: "Dominique",
    phone: "+96189904686",
    subject: "Dev ",
    message: "Ohmaga",
    date: "2021-09-16 21:33:04",
  },
  {
    _id: "61141e57a7dbd8a189e",
    email: "amineamine19961996@gmail.com",
    name: "amine amine",
    phone: "+96176776341",
    subject: "qw",
    message: "qw",
    date: "2021-08-11 22:00:39",
  },
];

export default function Exemple() {
  return <SmartTable title="Emails" data={data} headCells={headCells} />;
}
```

<br/>

## License

ISC
