// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Space4 is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _tokenIdCounter;

       // Contract global variables.
    uint256 public constant mintPrice = 100000000000000; // 0.0001 Matic.
    uint256 public constant maxMint = 10;
    uint256 public MAX_TOKENS = 63336;

    constructor() ERC721("SPACE###3", "SPACE") {}

    event mintSpace (address to, uint amount); 

    function Mint(uint numberOfTokens, address to, string memory uri) public payable  {

        require(numberOfTokens != 0, "You need to mint at least 1 token");
        // Check that the number of tokens requested doesn't exceed the max. allowed.
        require(numberOfTokens <= maxMint, "You can only mint 10 tokens at a time");
        // Check that the number of tokens requested wouldn't exceed what's left.
        require(totalSupply().add(numberOfTokens) <= MAX_TOKENS, "Minting would exceed max. supply");
        // Check that the right amount of Ether was sent.
        require(mintPrice.mul(numberOfTokens) <= msg.value, "Not enough Matic sent.");
        emit mintSpace (to, msg.value);
        // For each token requested, mint one.
        for(uint256 i = 0; i < numberOfTokens; i++) {
            uint256 mintIndex = totalSupply();
            uint256 tokenId = _tokenIdCounter.current();
             _tokenIdCounter.increment();
            if(mintIndex < MAX_TOKENS) {
                /** 
                 * Mint token using inherited ERC721 function
                 * msg.sender is the wallet address of mint requester
                 * mintIndex is used for the tokenId (must be unique)
                 */
                 _safeMint(to, tokenId);
                 _setTokenURI(tokenId, uri);

                
            }
        }

        
      
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

      function getBalance() public view returns (uint256) {
        // This will return the total balance of the contract fron mint fee received
        return address(this).balance;
    }


    function withdraw() public payable onlyOwner {
    // This will payout the owner 100% of the contract balance.
    // =============================================================================
     (bool success, ) = payable(owner()).call{value: address(this).balance}("");
     require(success);
    // =============================================================================
    }
}
