var ducatuscore = require('ducatuscore-lib');
var fs = require('fs');

// Create a new address
var privateKey = new ducatuscore.PrivateKey();
var address = privateKey.toAddress();

console.log("Wallet Address: " + address.toString());

// Output to Wallet Import Format (WIF)
console.log("WIF: " + privateKey.toWIF());

// Save the wallet to disk
fs.writeFileSync('wallet.wif', privateKey.toWIF());
