//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.7.0;

// We import this library to be able to use console.log
import "hardhat/console.sol";

// Main contract
contract SubNav {

  // Subnets object
  struct Subnet {
    string name;
    string description;
    string owner;
  }

  // dApp subnets object
  struct User {
    string mail;
    string twitterHandle;

    // P-chain address to signed control keys
    mapping(string => string) signedControlKeys;
  }

  // SubnetID to Subnet contract struct
  mapping(string => Subnet) public subnets;

  // C-chain address to User contract struct
  mapping(address => User) public users;

  // Register subnet
  function registerUser(string calldata mail, string calldata twitterHandle) external {
    users[msg.sender].mail = mail;
    users[msg.sender].twitterHandle = twitterHandle;
  }

  // Add a Control key signature to a user's P-chain address dictionnary
  function addControlKeySig(string calldata pChainAddress, string calldata signedControlKey) external {
    users[msg.sender].signedControlKeys[pChainAddress] = signedControlKey;
  }

  // Register Subnet
  function registerSubnet(string calldata subnetID, string calldata name, string calldata description, string calldata owner) external {
    subnets[subnetID].name = name;
    subnets[subnetID].description = description;
    subnets[subnetID].owner = owner;
  }
}
