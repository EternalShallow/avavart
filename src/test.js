const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');
const solanaRpcUrl = 'https://api.mainnet-beta.solana.com';
const solanaClient = new solanaWeb3.Connection(solanaRpcUrl);
// 生成密钥对：
const newAccount = solanaWeb3.Keypair.generate();
// 保存密钥对：
const secretKey = newAccount.secretKey;
fs.writeFileSync('mywallet.json', JSON.stringify(secretKey));
// 读取密钥对：
const secretKey = JSON.parse(fs.readFileSync('mywallet.json', 'utf8'));
const myKeypair = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(secretKey));
async function mintNft(candyMachineAddress) {
	const { nft } = await solanaClient.candyMachines().mint({
		candyMachine,
		collectionUpdateAuthority: candyMachine.authorityAddress,
	});
}
mintNft()
