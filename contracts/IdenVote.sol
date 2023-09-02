// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract IdenVote is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    // Address of the IDEN ERC20 token contract
    address private idenTokenAddress;

    // Mapping to store vote count for each user
    mapping(address => uint256) private voteCounts;

    // Event to emit when a vote is cast
    event VoteCast(address indexed sender, address indexed receiver, string text);

    // Modifier to check if the IDEN token balance of the sender is sufficient for the reward
    modifier hasSufficientIDEN() {
        uint256 idenReward = 1 ether; // Set the reward amount (1 IDEN token)
        require(IERC20(idenTokenAddress).balanceOf(msg.sender) >= idenReward, "Not enough IDEN tokens for the reward");
        _;
    }

    // Constructor to set the initial parameters of the contract
    constructor(address _idenTokenAddress) ERC721("Iden Vote", "IDENV") {
        idenTokenAddress = _idenTokenAddress;
    }

    Counters.Counter private _tokenIdCounter;

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        require(from == address(0), "Token is not transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // Function to vote and mint Soul Bound Tokens with text and sender/receiver addresses
    function voteWithImpression(address receiver, string memory text) external hasSufficientIDEN {
        // Mint the Soul Bound Token (ERC721) with text and sender/receiver addresses
        uint256 tokenId = uint256(keccak256(abi.encodePacked(msg.sender, receiver, text)));
        _mint(msg.sender, tokenId);

        // Increase the vote count for the receiver
        voteCounts[receiver]++;

        // Emit the VoteCast event
        emit VoteCast(msg.sender, receiver, text);

        // Reward the sender with IDEN tokens (adjust the reward amount as needed)
        uint256 idenReward = 1 ether;
        IERC20(idenTokenAddress).transfer(msg.sender, idenReward);
    }

    // Function to retrieve the vote count for a user
    function getVoteCount(address user) external view returns (uint256) {
        return voteCounts[user];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

