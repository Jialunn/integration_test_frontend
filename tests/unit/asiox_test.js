import axios from 'axios'

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function(response) {
    // handle success
    console.log(response)
  })
  .catch(function(error) {
    // handle error
    console.log(error)
  })
  .finally(function() {
    // always executed
  })

// eslint-disable-next-line no-unused-expressions
!(async function () {
  const res = await axios.post('http://139.196.52.65:8089/webhook/event', {
    'header': {
      'event_id': 'test',
      'event_type': 'jenkins'
    },
    'event': {
      'message': {
        'message_type': 'interactive',
        'content': {
          'config': {
            'wide_screen_mode': true,
            'enable_forward': true
          },
          'elements': [
            { 'tag': 'markdown', 'content': 'content', 'href': {} }
          ],
          'header': {
            'template': 'red', 'title': { 'content': '官网挂了', 'tag': 'plain_text' }
          }
        }
      }
    },
    'groupname': '小金的一天'
  })

  console.log(res)
})()
