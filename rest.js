const axios = require('axios');
const blessed = require('blessed');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'MagickML text based ui for the rest agents.';

var form = blessed.form({
  parent: screen,
  keys: true,
  left: 0,
  top: 0,
  width: 'half',
  height: 'half',
  content: 'Submit?'
});

var apiKeyLabel = blessed.text({
  parent: form,
  top: 0,
  left: 0,
  content: 'API Key:'
});

var apiKeyBox = blessed.textbox({
  parent: form,
  name: 'apiKey',
  top: 1, 
  left: 0,
  height: 3,
  inputOnFocus: true,
  border: { type: 'line' },
  style: {
    fg: 'white',
    bg: 'black',
    border: { fg: 'blue' }
  }
});

var entityIdLabel = blessed.text({
  parent: form,
  top: 4,
  left: 0,
  content: 'Entity ID:'
});

var entityIdBox = blessed.textbox({
  parent: form,
  name: 'entityId',
  top: 5,
  left: 0,
  height: 3,
  inputOnFocus: true,
  border: { type: 'line' },
  style: {
    fg: 'white',
    bg: 'black',
    border: { fg: 'blue' }
  }
});

form.on('submit', data => {
  const { apiKey, entityId } = data;

  axios.get(`https://api.crunchbase.com/api/v4/entities/organizations/${entityId}`, {
    headers: {
      accept: 'application/json',
      'X-cb-user-key': apiKey
    }
  })
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
});
var submitButton = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: { left: 1, right: 1 },
  left: 0,
  top: 8,
  name: 'submit',
  content: 'submit',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

submitButton.on('press', () => {
  form.submit();
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

apiKeyBox.focus();

screen.render();