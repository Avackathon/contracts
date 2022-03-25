# Hardhat Hackathon Boilerplate

This repository contains a sample project that you can use as the starting point
for your Ethereum project. It's also a great fit for learning the basics of
smart contract development.

This project is intended to be used with the
[Hardhat Beginners Tutorial](https://hardhat.org/tutorial), but you should be
able to follow it by yourself by reading the README and exploring its
`contracts`, `tests`, `scripts` and `frontend` directories.

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/Avackathon/backend.git
cd backend
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Tests are runned with:

```sh
npx hardhat test test/SubNav.js
```

## Local test network

```sh
# Install Ansible collection
ansible-galaxy collection install git+https://github.com/Nuttymoon/ansible-avalanche-collection.git

# Bootstrap network
ansible-playbook nuttymoon.avalanche.bootstrap_local_network -i inventories/local

# Create subnet with predefined private key
curl -X POST --data '{
	"jsonrpc": "2.0", "id": 1, "method" :"platform.importKey",
	"params" : {
		"username" :"ewoq", "password": "I_l1ve_@_Endor",
		"privateKey": "PrivateKey-fRj9WBGk1nYJGbY9CTpoyf8Hu58cr24j2WJwThePLas5bu8eU"
	}
}' -H 'content-type:application/json;' 192.168.10.11:9650/ext/bc/P
ansible-playbook nuttymoon.avalanche.create_local_subnet -i inventories/local \
  --extra-vars '{"subnet_control_keys": ["P-local15sjkrydv6nze23uguanupg4plgut9dzuvxq5je"]}'

# Whitelist subnet
ansible-playbook nuttymoon.avalanche.bootstrap_local_network -i inventories/local -e avalanche_whitelisted_subnets=2omKR2BxV5AyuEuQUqEwGBkPdHBGiZFoZPdNSpJ6JbhguGPPVz

# Create blockchain
ansible-playbook nuttymoon.avalanche.create_local_blockchains -i inventories/local -e subnet_id=2omKR2BxV5AyuEuQUqEwGBkPdHBGiZFoZPdNSpJ6JbhguGPPVz
```
