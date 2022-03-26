//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;
pragma abicoder v2;

// We import this library to be able to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Main contract
contract SubNav {
  enum OwnershipRequestStatus { Pending, Validated, Denied }

  // Subnets object
  struct Subnet {
    string name;
    string description;
    address owner;
  }

  // User object
  struct User {
    string mail;
    string twitterHandle;

    // P-chain address => signature made with P-Chain address
    mapping(string => string) signedControlKeys;
  }

  // SubnetID => Subnet
  mapping(string => Subnet) public subnets;

  // Array of SubnetIDs known by the contract
  string[] subnetIDs;

  // C-chain address to User contract struct
  mapping(address => User) public users;
  // SubnetID => C-Chain address
  mapping(string => address) public subnetOwners;

  event SubnetOwnershipRequest(
    address indexed ownerAddress,
    string subnetID,
    string status
  );

  // Register User
  function registerUser(string calldata mail, string calldata twitterHandle) external {
    users[msg.sender].mail = mail;
    users[msg.sender].twitterHandle = twitterHandle;
  }

  // Add a Control key signature to a user's P-chain address dictionnary
  function addControlKeySig(string calldata pChainAddress, string calldata signedControlKey) external {
    users[msg.sender].signedControlKeys[pChainAddress] = signedControlKey;
  }

  // Request ownership of a subnet
  // TO DO: create a request object to be validated by external authority based on P-Chain signature
  function requestSubnetOwnership(string calldata subnetID) external {
    emit SubnetOwnershipRequest(msg.sender, subnetID, 'Pending');

    validateSubnetOwnership(subnetID, msg.sender);
  }

  // Validate ownership of a subnet
  // TO DO: function to be called by a script after P-Chain signature verification
  function validateSubnetOwnership(string calldata subnetID, address ownerAddress)
    public
    // onlyOwner
  {
    subnetOwners[subnetID] = ownerAddress;

    emit SubnetOwnershipRequest(ownerAddress, subnetID, 'Validated');
  }

  function denySubnetOwnership(address ownerAddress, string calldata subnetID)
    public
    // onlyOwner
  {
    emit SubnetOwnershipRequest(ownerAddress, subnetID, 'Denied');
  }

  // Register Subnet
  function registerSubnet(string calldata subnetID, string calldata name, string calldata description) external {
    require(subnetOwners[subnetID] == msg.sender, "Sender is not the subnet owner");
    subnets[subnetID].name = name;
    subnets[subnetID].description = description;
    subnets[subnetID].owner = msg.sender;

    // Push the subnetID to the list of know SubnetIDs if it is the first time we encounter it
    subnetIDs.push(subnetID);
  }

  // Return known SubnetIDs
  function getSubnetIDs() external view returns (string[] memory) {
    return subnetIDs;
  }
}
