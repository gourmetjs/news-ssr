module.exports = {
  pages: {
    main: "./src/MainPage"
  },

  builder: {
    moduleLinks: {
      "whatwg-fetch": "client"
    }
  },

  config: {
    html: {
      headTop: [
        '<link href="//stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">',
        '<link href="//use.fontawesome.com/releases/v5.0.12/css/all.css" rel="stylesheet" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous">'
      ]
    }
  }
};
