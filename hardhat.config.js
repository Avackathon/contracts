require("@nomiclabs/hardhat-waffle");

const PRIVATE_KEY = "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027";

module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      chainId: 31337
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      // accounts: [PRIVATE_KEY]
    },
    vagrant: {
      url: "http://192.168.10.11:9650/ext/bc/subnav/rpc",
      chainId: 13213,
      accounts: [PRIVATE_KEY]
    },
  }
};
