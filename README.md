# SubNav Contracts

This repository contains the Solidity contracts and Hardhat environment for the [SubNav](https://github.com/Avackathon/subnav) project.

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/Avackathon/backend.git
cd backend
yarn
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to deploy the `SubNav` contract:

```sh
npx hardhat run scripts/deploy-subnav.js --network localhost
```

You can also run this scripts to fill mock data into the contract:

```sh
npx hardhat run scripts/fill-subnav.js --network localhost
```

Tests are run with:

```sh
npx hardhat test test/SubNav.js
```

## Hardhat configuration

Hardhat is configured to interact with special networks.

```
vagrant: {
    url: "http://192.168.10.11:9650/ext/bc/subnav/rpc",
    chainId: 13213,
    accounts: [PRIVATE_KEY]
}
```

The `vagrant` network is a local Vagrant-based Avalanche network with a Subnet / Blockchain. The instructions to deploy this environment are described in the [infra](https://github.com/Avackathon/infra#local-test-network-with-vagrant-ansible-and-avalanchego) repository.

```
subnav: {
    url: "https://fuji.subnav.network/ext/bc/subnav/rpc",
    chainId: 13213,
    accounts: PRIVATE_KEYS,
},
```

The `subnav` network is the SubNav project subnet living on the Fuji network which is hosting the `SubNav.sol` solidity contract in a [subnet-evm](https://github.com/ava-labs/subnet-evm) instance. The Fuji node validator, SubNav subnet and EVM blockchain were all deployed using the [infra](https://github.com/Avackathon/infra#fuji-validator) repository.
