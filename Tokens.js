const { ethers } = require("ethers");

USDT_TOKEN = "0xdac17f958d2ee523a2206206994597c13d831ec7";
UNISWAP_TOKEN = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const api = "https://mainnet.infura.io/v3/API_KEY";

const userWalletAddrss = "Your Wallet Address";

async function fatchToken() {
  const provider = new ethers.providers.JsonRpcProvider(api);
  const etherBl = await provider.getBalance(userWalletAddrss);
  const EthereumToken = ethers.utils.formatEther(etherBl);

  console.log("Balance of Ethereum Address:", EthereumToken);

  // uniswap token

  const uniswap = await new ethers.Contract(USDT_TOKEN, ERC20_ABI, provider);
  const UniswapBal = await uniswap.balanceOf(userWalletAddrss);
  const UniswapToken = ethers.utils.formatEther(UniswapBal);

  console.log("Balance of Uniswap Token:", UniswapToken);

  // USDT token

  const USDT = await new ethers.Contract(UNISWAP_TOKEN, ERC20_ABI, provider);
  const USDTBal = await USDT.balanceOf(userWalletAddrss);
  const USDTToken = ethers.utils.formatEther(USDTBal);

  console.log("Balance of USDT Token:", USDTToken);

  const Token_of_Wallet = [
    {
      Id: "1",
      Token_Name: "ETH",
      Balance: EthereumToken,
    },
    {
      Id: "2",
      Token_Name: "UNI",
      Balance: UniswapToken,
    },
    {
      Id: "3",
      Token_Name: "USDT",
      Balance: USDTToken,
    },
  ];

  return Token_of_Wallet;
}

fatchToken();
