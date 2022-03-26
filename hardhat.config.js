require("@nomiclabs/hardhat-waffle");
require("hardhat-tracer");

const PRIVATE_KEYS = [
  "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
];

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      // accounts: [PRIVATE_KEY]
    },
    vagrant: {
      url: "http://192.168.10.11:9650/ext/bc/subnav/rpc",
      chainId: 13213,
      accounts: PRIVATE_KEYS,
    },
  },
};
