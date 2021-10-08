var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "half orbit alpha basket suspect cradle until blue sheriff violin shove flock";
module.exports = {
  rpc: {
    host: "127.0.0.1",
    port: '7545'
  },
  networks: {
    ganache_cli: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ganache_ui: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    volta: {
      provider: () => new HDWalletProvider(mnemonic, "https://volta-rpc.energyweb.org"),
      network_id: 73799,
      gas: 4000000,
      skipDryRun: true,
    },
  },
  mocha: {
    useColors: true
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: 'NPIT4183DK8BMGVZDT9C4R14S1QMEHIT88',
    // etherscan: 'A2HNWK3VKZNQFAGU254HW1DAG4RPB8FI8T',
    bscscan: 'A2HNWK3VKZNQFAGU254HW1DAG4RPB8FI8T'
  },
  compilers: {
    solc: {
      version: "0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 600
        },
        // evmVersion: "byzantium"
      }
    }
  },
};