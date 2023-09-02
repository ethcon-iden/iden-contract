// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the ERC-20 interface
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// IDENToken contract inherits from the ERC20 contract
contract IdenToken is ERC20 {
    // Address of the contract deployer (who can mint new tokens)
    address private owner;

    // Constructor to set the initial parameters of the token
    constructor(uint256 initialSupply) ERC20("IDEN", "IDEN") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    // Function to mint new tokens (can only be called by the contract owner)
    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "You are not the contract owner");
        _mint(to, amount);
    }
}