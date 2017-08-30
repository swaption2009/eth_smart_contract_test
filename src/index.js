let app = document.querySelector('#app')

var Web3 = require('web3');
var web3 = new Web3();
window.web3 = web3;

web3.setProvider(
  new Web3.providers.HttpProvider('http://localhost:8545')
  );

app.innerHTML = '<h2>Welcome to hello-counter</h2>'
