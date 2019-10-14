var ducatuscore = require('ducatuscore-lib');
var request = require('request');

var fs = require('fs');
var INSIGHT_URL = 'http://insight.ducatus.io/insight-lite-api/';

// Address to send coins to
var TARGET_ADDRESS = 'Lw1NncBEFdJZ8QvJsDZN5HT5oQvr5UCczk';

// Load our previous made wallet
var privateKey = ducatuscore.PrivateKey.fromWIF(fs.readFileSync('wallet.wif', 'utf8'));
var address = privateKey.toAddress();

console.log("Wallet Address: " + address.toString());

// Get wallet info/status
request(INSIGHT_URL + "addr/" + address.toString(), {}, function(err, res, body) {
	if (err) {
		console.log('error: ', err);
		return;
	};

	var walletInfo = JSON.parse(body);
	console.log("Wallet Info:\n" + JSON.stringify(walletInfo, null, 4));
	console.log(`Wallet Balance:  ${walletInfo.balance} DUC`);

	if (walletInfo.balance === 0) {
		console.log("Not enough funds");
		return;
	}

	// Get unspent outputs
	request(INSIGHT_URL + "addr/" + address.toString() + "/utxo", {}, function(err, res, body) {
		if (err) {
			console.log('error: ', err);
			return;
		};
		var utxos = JSON.parse(body);

		// Create a transaction
		var tx = ducatuscore.Transaction();
		tx.from(utxos);
		tx.to(TARGET_ADDRESS, 1000000); // (Address, amount in satoshis)
		tx.change(address.toString()); // Where to send the "change" of the transaction
		tx.sign(privateKey); // Sign the transaction

		// Broadcast the transaction to the blockchain
		request.post({
			uri: `${INSIGHT_URL}tx/send`,
			method: 'POST',
			json: { 
				"rawtx": tx.serialize() // Serialize the transaction
			}
		}, function (err, res, body) {
			if (err) {
				console.log('error: ', err);
				return;
			};

			// Returns the transaction ID
			console.log("Transaction ID: " + body.txid);
		});

	});
});
