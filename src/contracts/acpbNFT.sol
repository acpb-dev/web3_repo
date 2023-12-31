// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract acpbNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor(address initialOwner)
        ERC721("acpb NFTs", "acpb")
        Ownable(initialOwner)
    {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

}
