# Quick Ducatus Wallet Tutorial

There is only one dependency: `ducatuscore-lib-x`

This is purely for a quick demonstration purpose, and is by no means meant to be a comprehensive example on how to deploy a system using ducatuscore-lib.

There is virtually no error checking in this example.

This demos the following:
- Creating a wallet
- Checking the wallet info, including balance
- Creating, signing, and broadcasting a transaction

## Example

Run `npm install` first.

The `create_wallet.js` file creates a new DucatusCoin address and save the WIF to a file.

Send coins to the address that it generates, then edit the values in the `create_transactions.js` file. When ran it will generate a transaction and broadcast it.
