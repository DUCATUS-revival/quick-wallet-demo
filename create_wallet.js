var ducatuscore = require('ducatuscore-lib');
var fs = require('fs');

// Create a new HD wallet
var hdPrivateKey = new ducatuscore.HDPrivateKey();

// This wallet can derive multiple addresses:
var derived = [];
// Let's generate a hundred new addresses
for (i = 0; i < 100; i++) {
	derived.push(hdPrivateKey.derive(0).derive(i));
}

// Now print out the public keys/addresses
for (i = 0; i < 100; i++) {
	console.log(derived[i].privateKey.toAddress().toString());
}

// Output to Wallet Import Format of a wallet (in this case, let's use the first wallet created)
console.log("WIF: " + derived[0].privateKey.toWIF());

console.log("Wallet Address: " + derived[0].privateKey.toAddress().toString());

// Save the first derived wallet to disk
fs.writeFileSync('wallet.wif', derived[0].privateKey.toWIF());
