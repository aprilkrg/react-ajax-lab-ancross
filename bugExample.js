const axios = require('axios')

(async () => {
    try {
      const response = await axios.get('http://acnhapi.com/v1/villagers/')
      console.log(response.data)
    } catch(err) {
      console.warn(err)
    }
  })() // immediately invoked