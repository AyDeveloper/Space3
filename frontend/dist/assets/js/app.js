// login();
const covalentjs = require('covalentjs');
let user;

const serverUrl = "https://vggg874qpzth.usemoralis.com:2053/server";
const appId = "ExgC7zGkIkc9KwTM1FBSwMTsakZDApaQrBbHrh4t";
Moralis.start({ serverUrl, appId });


const contractAddr = "0x23daA7b145cb7853EB25B00CB0eF2A07bB9E9b22";//your contract address here
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "numberOfTokens",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "Mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mintSpace",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_TOKENS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxMint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mintPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


async function login(){
    Moralis.Web3.enableWeb3().then(async function (){
        const chainIdHex = await Moralis.switchNetwork("0x89");
         user = await Moralis.account;
		 const options = {
			chain: "matic",
			address: user
		};
		  const balance = await Moralis.Web3API.account.getNativeBalance(options);
		  const bal = Number(balance.balance);
		  const amount = (bal / 10 ** 18 ).toFixed(2);
         dispAcctDetails(user, amount);
        console.log(user)
    });
}



const connectBtn = document.querySelector('.connectBtn');
const balDisp = document.querySelector('.balDisp');
const submitBtn = document.querySelector('.submitBtn');
connectBtn.addEventListener("click", e => {
    login();
})

const submisionForm = document.querySelector('.submisionForm');

submisionForm.addEventListener('submit', e => {
	e.preventDefault();
    const amountToMint = document.querySelector(".mintQty").value;
    console.log(amountToMint);
	const num = Number(amountToMint);
    mint(num); 
})

 function dispAcctDetails(user, balance) {
    connectBtn.innerText = addressShortener(user);
    balDisp.style.display = 'block'; 
    balDisp.innerHTML = `${balance} <span>MATIC</span>`;
}

const tokenUri = ["ipfs://QmaZh5AFXhiajsQXCHEAAvi1XG5kc2BHYWsaDyYhUwuTjm", "ipfs://QmNYHSo69EUeKj2yEgLLzuZe6FbZfTSBjp1vdj6eep2MLj", "ipfs://Qmbo8y4wnAojYg14Lm3jSFz7WnihUzXLHvTMeu5N1E7FeP"];

async function mint(amountToMint){
	const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3();
    const amount = amountToMint *  0.03;
	const strAmount = String(amount)
	console.log(amount, strAmount);
	console.log(tokenUri[getRandomInt(tokenUri.length)]);

	const signer = web3Provider.getSigner();

    const contractOptions = {
        contractAddress: contractAddr,
        abi: contractABI,
        msgValue: Moralis.Units.ETH(strAmount),
        functionName: "Mint",
        params: {
			numberOfTokens: Number(amountToMint),
            to: user,
            uri: tokenUri[getRandomInt(tokenUri.length)]
        }
    }
    try{
        const transaction = await Moralis.executeFunction(contractOptions);
        const tx = await transaction.wait();
		console.log(tx);
        const addressTo = tx.events[1].args[0];
        const amount = tx.events[1].args[1];

		console.log(addressTo, amount);
       
        displayMessage("00",`Yay! you just minted your NFT's successfully,  ${formatValue(amount)} MATIC was paid by ${addressTo}`);

		setTimeout(() => {
			const notification = document.querySelector(".notifications");
	        notification.style.display = "none";
		}, 7000);
		await getContractBalance()
    }
    catch(error){
		displayMessage("01",`Transaction reverted, see console for details`);	
        console.log(`There was an error with this message ${error}`)
		setTimeout(() => {
			const notification = document.querySelector(".notifications");
	        notification.style.display = "none";
		}, 3000);
    }
}


function displayMessage(messageType, message){
    const messages = {
        "00":`<div class="successMessage">${message}</div>`,
        "01": ` <div class="errorMessage">${message}</div> `
    }
	const notification = document.querySelector(".notifications");
	notification.style.display = "block";
    notification.innerHTML = messages[messageType];
}


// ===============
// Helper Function 
// ===============
function addressShortener(addr) {
    return addr.slice(0, 4) + '...' + addr.slice(addr.length - 5, addr.length - 1);
}
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function ipfsGetter(ipfslinkHash) {
	return (ipfslinkHash.slice(0, 4) + ipfslinkHash.slice(6, ipfslinkHash.length));
}

function formatValue(value) {
    return value / Math.pow(10, 18);
}

// =======================
// End of Helper Function 
// =======================

// =======================
// Covalent Implementation
// =======================
let imglink;
async function fetchImgLink(link) {
    let response = await fetch(link);

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.text();
        // handle data
		const nftItem = JSON.parse(data)
		imglink = nftItem.image;
		console.log(imglink);
    }
}

async function getMetaData(tokenId) {
	const SpaceUsers = [];
	for (let i = 0; i <= (tokenId - 1); i++) {	
		const result = await covalentjs.classA.getExternalNFTMetadata(137, contractAddr, i);
		console.log(result);
		const owner = result.data.items[0].nft_data[0].owner;
		const imageSrc = result.data.items[0].nft_data[0].token_url;
		console.log(owner, imageSrc);
		SpaceUsers.push({
			img: imageSrc,
			ownerAddr: owner
		})
	}

	for (let i = 0; i < SpaceUsers.length; i++) {
		const element = SpaceUsers[i];

		const image = ipfsGetter(element.img);
		const ipfsLink = `https://ipfs.io/${image}`

		await fetchImgLink(ipfsLink)


			document.querySelector(".projectContent").innerHTML += `
				<div class="projectCard">
					<div class="cardfirstDet">
						<h4>Owner</h4>
						<p>${addressShortener(element.ownerAddr)}</p>
				</div>
				<div class="imgBox">
				<img src="${imglink}" alt="Nft Image">
				</div>
		</div>
			
		`		
	}
}

let supply;
async function totalSupply(){
	const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3();
	const signer = web3Provider.getSigner();

    const contractOptions = {
        contractAddress: contractAddr,
        abi: contractABI,
        functionName: "totalSupply",
     
    }
    try{
        const transaction = await Moralis.executeFunction(contractOptions);
		supply = Number(transaction);
    }
    catch(error){
		console.log(error);
    }
}


async function getContractBalance(){
	const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3();
	const signer = web3Provider.getSigner();

    const contractOptions = {
        contractAddress: contractAddr,
        abi: contractABI,
        functionName: "getBalance",
     
    }
    try{
        const transaction = await Moralis.executeFunction(contractOptions);
		const contractBalance = Number(transaction);

		const contractBal = document.querySelector(".contractBal").innerHTML = `
		<div class="bal"> Space NFT Balance: ${formatValue(contractBalance)} MATIC</div>
		`
    }
    catch(error){
		console.log(error);
    }
}

async function makeUseOfMetaData() {
	await totalSupply()


	console.log(supply);
	if (supply > 0) {
		await getMetaData(supply);
	}
}

window.addEventListener('DOMContentLoaded', async(e) => {
	await makeUseOfMetaData();
	await getContractBalance()
})






