let app = document.querySelector('#app')

// require web3.js
var Web3 = require('web3');
var web3 = new Web3();
window.web3 = web3;

// set up rpc protocol with Ethereum blockchain
web3.setProvider(
  new Web3.providers.HttpProvider('http://localhost:8545')
  );

// copy ABI file to interact with smart contract
let counterAbi = require('./counter_sol_Counter_abi.json');
console.log(counterAbi); // check if file is loaded

// set existing contract address
let contractAddr = "0x8f64b88682aefcaaa919f5d4fe0ec16861e761df";
// set eth personal account
let fromAccount = "0x82494f3149b8eb83eb1928f9d02ea54bec463082";

// create a contract object with 2 params, ie. counterAbi and contract address
var counterContract = new web3.eth.Contract(
  counterAbi,
  contractAddr
  );

// render to window
window.counterContract = counterContract;


// get Account and Balance info from Ethereum blockchain
window.checkBalance = function() {
  web3.eth.personal.getAccounts().then(accounts => {
    console.log('accounts', accounts);

    web3.eth.getBalance(accounts[0]).then(balance => {
      console.log('balance[0]', balance);
    });
  });
};

// get contract method from Ethereum blockchain
window.checkCounter = function() {
  counterContract.methods.get().call().then(count => {
    document.getElementById('counterValue').innerText = count;
  });
};

// implement increment function from smart contract
window.incrementCounter = function() {
  counterContract.methods.increment().send({
    from: fromAccount,
    gas: 1000000});
};

// render UI to web browser
app.innerHTML = `
  <h2>Welcome to hello-counter</h2>
  <button
    type="button" onClick="checkBalance();">
    check balance
  </button>
  </br>

  <div>
    The counter value is: <tt id="counterValue"></tt>
  </div>
  <button
    type="button" onClick="checkCounter();">
    check counter
  </button>
  </br>

  <button
    type="button" onClick="incrementCounter();">
    increment counter
  </button>
`;