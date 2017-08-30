let app = document.querySelector('#app')

var Web3 = require('web3');
var web3 = new Web3();
window.web3 = web3;

web3.setProvider(
  new Web3.providers.HttpProvider('http://localhost:8545')
  );

window.checkBalance = function() {
  web3.eth.personal.getAccounts().then(accounts => {
    console.log('accounts', accounts);

    web3.eth.getBalance(accounts[0]).then(balance => {
      console.log('balance[0]', balance);
    });
  });
};

app.innerHTML = `
  <h2>Welcome to hello-counter</h2>
  <button
    type="button" onClick="checkBalance();">
    check balance
  </button>
`;