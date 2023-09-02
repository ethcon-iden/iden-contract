// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the ERC-721 and Ownable interfaces
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// IdenIdentity contract inherits from ERC721 and Ownable
contract IdenIdentity is ERC721, Ownable {
    // Struct to store account identity information
    struct AccountIdentity {
        string title;
        string summary;
        uint256 reliabilityPoints;
    }

    // Mapping to store account identities
    mapping(address => AccountIdentity) private accountIdentities;

    // Event to emit when an account identity is updated
    event IdentityUpdated(address indexed account, string summary, uint256 reliabilityPoints);

    // Constructor to set the initial parameters of the contract
    constructor() ERC721("IDEN Identity", "IDENI") {}

    // Function to mint a new dynamic NFT with the account identity information
    function mintIdentity(address account, string memory title, string memory summary, uint256 reliabilityPoints) external {
        require(bytes(summary).length > 0, "Summary should not be empty");
        require(reliabilityPoints >= 0, "Reliability points should be non-negative");

        AccountIdentity storage identity = accountIdentities[account];
        identity.title = title;
        identity.summary = summary;
        identity.reliabilityPoints = reliabilityPoints;

        uint256 tokenId = uint256(keccak256(abi.encodePacked(account, title, summary, reliabilityPoints)));
        _mint(account, tokenId);

        emit IdentityUpdated(account, summary, reliabilityPoints);
    }

    // Function to update the account identity information (only callable by the contract owner)
    function updateIdentity(address account, string memory title, string memory summary, uint256 reliabilityPoints) external onlyOwner {
        require(bytes(summary).length > 0, "Summary should not be empty");
        require(reliabilityPoints >= 0, "Reliability points should be non-negative");

        AccountIdentity storage identity = accountIdentities[account];
        uint256 oldTokenId = uint256(keccak256(abi.encodePacked(account, identity.title, identity.summary, identity.reliabilityPoints)));

        identity.title = title;
        identity.summary = summary;
        identity.reliabilityPoints = reliabilityPoints;

        uint256 newTokenId = uint256(keccak256(abi.encodePacked(account, title, summary, reliabilityPoints)));
        _burn(oldTokenId);
        _mint(account, newTokenId);

        emit IdentityUpdated(account, summary, reliabilityPoints);
    }

    // Function to retrieve the account identity information
    function getIdentity(address account) external view returns (string memory title, string memory summary, uint256 reliabilityPoints) {
        return (accountIdentities[account].title, accountIdentities[account].summary, accountIdentities[account].reliabilityPoints);
    }
}
