report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/0455662611_Home_0_document_0_xl.png",
        "test": "../bitmaps_test/20230519-141737/0455662611_Home_0_document_0_xl.png",
        "selector": "document",
        "fileName": "0455662611_Home_0_document_0_xl.png",
        "label": "Home",
        "misMatchThreshold": 0.1,
        "url": "https://www.google.com/?hl=de",
        "referenceUrl": "https://www.google.com/",
        "expect": 0,
        "viewportLabel": "xl",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.74",
          "analysisTime": 57
        },
        "diffImage": "../bitmaps_test/20230519-141737/failed_diff_0455662611_Home_0_document_0_xl.png"
      },
      "status": "fail"
    }
  ],
  "id": ""
});