# BACKSTOP FRAMEWORK

This is a framework designed to adapt to the basic needs of most projects, is
  a platform that allows continuing to expand and implementing new features
  that are easy to adapt and maintain in time and can be implemented by any QA
  in any project.

## Install dependecies

NPM:

```sh
npm install
```

Backstop:

```sh
npm install -g backstopjs
```

## How to start

First, we have to set up some parameters according to the needs of our project
like:

- [Pages and locales](#pages-and-locales)
- [Cookies](#cookies)
- [Viewports](#viewports)
- [Scenarios Data](#scenarios-data)

### Pages and Locales

Inside the configs folder we can find the file:

`pages.json`

Here, we are going to find the **_locales_** parameter into the localization object and an array of pages with their own parameters, but How does this work? We have three scenarios:

#### Without locales

When our site has (only) one locale for all pages:

```json
{
  "localization": {
    "basePath": "/intl/{locales}",
    "locales": [
    ]
  },
  "pages": [
    {
      "name": "Home",
      "paths": [
        "/home"
        ]
    }
  ]
}
```

#### Same locales for all pages

When the pages have different locales, and locales are common among all the pages. For example, our site has three locales for all pages. In this case, we are going to have:

```json
{
  "localization": {
    "basePath": "/intl/{locales}",
    "locales": [
      "es_es",
      "it_it",
      "jp_jp"
    ]
  },
  "pages": [
    {
      "name": "Home",
      "paths": [
        "/home"
        ]
    }
  ]
}
```

In the previous example, We have the home page with three locales, in case we add more pages following the same format, they will all have the same three locales as well.

#### Specific locales for some pages

When some pages have different locales than others. In this case, we are going to have:

```json
{
  "localization": {
    "basePath": "/intl/{locales}",
    "locales": [
      "es_es",
      "it_it",
      "jp_jp"
    ]
  },
  "pages": [
    {
      "name": "Home",
      "paths": [
        "/home"
      ]
    },
    {
      "name": "Auto",
      "paths": [
        "/auto"
        ],
      "locales": [
        "ru_ru"
      ]
    }
  ]
}
```

In this particular case, we are going to have a home page with three locales and an auto page with only one locale for Russian.

**_NOTE_**

- On the page of the array, we have two mandatory parameters: **_name_** and **_path_**, the name appears in the test cases and the path is to link to the base URL.
- The locales parameter on each page is optional and is only used when the page has different locales from the global ones.

IMPORTANT, the locales per page will overwrite the global locales.

#### Specific pages per locales

There are cases where the localized url is different from the base url. For example:

**Base path**: `https://www.example.com/marketing-strategies/data-and-measurement/`
**Localized path**: `https://www.example.com/intl/es-es/estrategias-de-marketing/datos-y-medicion/`

In those cases, it would be useful to organize pages based on the locale. To help with those cases, we can also use the property `paths` instead of `path` on the pages definition. For example:

```json
{
  "localization": {
    "basePath": "/intl/{locales}",
    "locales": [
      "es_es",
      "it_it",
      "jp_jp"
    ]
  },
  "pages": [
    {
      "name": "Thailand pages",
      "paths": [
        "/consumer-insights/kantar-the-new-reality-thailand-media-scene/",
        "/another-path-in-thailand"
      ],
      "locales": [
        "th_th"
      ]
    },
    {
      "name": "Spanish pages",
      "paths": [
        "/estrategias-de-marketing/datos-y-medicion/",
        "/colecciones/retail/",
        "/estrategias-de-marketing/busqueda/"
      ],
      "locales": [
        "es_es"
      ]
    }
  ]
}
```
#### Specific viewports per page

If you need to execute a specific viewports in some scenarios you can add viewports param to page, as follows:

```json
{
  "localization": {
    "basePath": "/intl/{locales}",
    "locales": [
      "es_es",
      "it_it",
      "jp_jp"
    ]
  },
"pages": [
    {
      "name": "What is android",
      "paths": [
        "/what-is-android"
      ],
      "viewports": [
        "s"
      ]
    }
  ]
}
```

**_NOTE_**
 - When you execute backstop, the scenarios with specific viewports will
   not use the viewports defined in the main,they will use those defined in
   the page as parameter.

### Cookies

Inside the configs folder, we can find the file:

`cookies.json`

Here, we are going to set up the necessary data to open a staging link.

```json
[
  {
    "domain": ".www.yourdomain.com",
    "path": "/",
    "name": "SACSID",
    "value": "~AJKiYcG5elhgzuOAvEgMEUxOhXinpf-YpRVlN7s-ZsLbXt-4RmKYWBnuNTQoJBrra",
    "expirationDate": 1798790400,
    "hostOnly": false,
    "httpOnly": false,
    "secure": false,
    "session": false,
    "sameSite": "no_restriction"
  }
]
```

In the previous example, we set up the name and the value for the cookie.

### Viewports

Inside the configs folder, we can find the file:

`viewports.json`

Here we are going to set up the different screen sizes that we are going to handle in our project.

```json
[
  {
    "label": "S",
    "width": 360,
    "height": 767
  }
]
```

In the previous example, we set up the data for one viewport with the different dimensions. The most important part is the label, this is the identifier that will be mapped from the main.

We can also specify as viewport label a device name defined in [DeviceDescriptors](https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts) to emulate the device. It will automatically add the device metrics and user agent.

```json
[
  {
    "label": "iPhone X",
    "width": 375,
    "height": 812
  },
  {
    "label": "iPad Pro",
    "width": 1024,
    "height": 1366
  }
]
```

**_NOTE_**

- Even if we are emulating a device, it is important to pass the width and the height with values greater than 0, otherwise, Backstop will fail.
- If we are emulating a device, we don't need to pass the correct width and height. We can pass `1` in both values, but it is a good practice to pass the correct width and height for the device.

### Scenarios Data

Inside the configs folder, we can find the file:

`scenariosData.json`

The data added in that file would be used globally across all scenarios. There, we can overwrite some of the options defined in <https://github.com/garris/BackstopJS#advanced-scenarios>, like

- clickSelector
- clickSelectors
- delay
- hideSelectors
- hoverSelector
- hoverSelectors
- keyPressSelectors
- misMatchThreshold
- onBeforeScript
- onReadyScript
- postInteractionWait
- readyEvent
- readySelector
- removeSelectors
- requireSameDimensions
- scrollToSelector
- selectorExpansion
- selectors

ex:

```json
{
  "delay": 1000,
  "misMatchThreshold": 0.5,
  "hideSelectors": [
    ".cookie-bar"
  ]
}
```

That data can also be overwritten in each page in the pages.json.

ex:

```json
{
  "localization": {
    "basePath": "/intl/{locales}",
    "locales": [
      "es_es",
      "it_it",
      "jp_jp"
    ]
  },
  "pages": [
    {
      "name": "Android 11",
      "path": "/android-11",
      "delay": 2000,
      "misMatchThreshold": 0.5
    },
    {
      "name": "Android Safety",
      "path": "/safety",
      "delay": 1500,
      "misMatchThreshold": 0.1
    },
    {
      "name": "Android Auto",
      "path": "/auto",
      "locales": [
        "ru_ru"
      ],
      "delay": 300,
      "misMatchThreshold": 0.2
    }
  ]
}
```

### Main

To execute and produce the backstop file with the configs that we already set up, just go to the **_main.js_** and replace params:

- Reference URL
- Test URL
- Viewports as string separeted with commas

```js
buildBackstopFile('https://www.android.com', 'https://www.androidTest.com', 's,m');
```

After that, just execute:
(This command create the backstop.json file !)

```sh
npm start
```

Backstop:reference

```sh
npm run reference
```

Backstop:test

```sh
npm test
```

Backstop:Approve
(This command should be used for update the references, Example: Copying from backstop_data/bitmaps_test to backstop_data/bitmaps_reference)

```sh
npm run approve
```

### Scrolling Page

This file is created to make scrolling inside of the page that we are running the visual automation testing.

It is helpful if you like to take the screenshot after that all animation loads. It can be used or not inside your project. If you decide to use please go to `base.json` and change the path file inside of `"onReadyScript": "scrolling_page.js". `

After that please run the following command to create again the backtop.json file.

```sh
npm start
```