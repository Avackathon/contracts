# SubNav Backend

This repository contains the Hardhat environment for the `SubNav` project which is a Subnet Navigator.

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

Tests are runned with:

```sh
npx hardhat test test/SubNav.js
```
