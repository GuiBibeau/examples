//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
    @dev   This contract is a demo for a blog post, it is not production ready. Secure it if you want to use it.
 */
contract AllowSale is ERC721 {
    bytes32 public merkleRoot;
    uint256 public nextTokenId;

    constructor(bytes32 _merkleRoot) ERC721("ExampleNFT", "NFT") {
        merkleRoot = _merkleRoot;
    }

    function toBytes32(address addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(addr)));
    }

    function mint(bytes32[] calldata merkleProof) public payable {
        require(
            MerkleProof.verify(
                merkleProof,
                merkleRoot,
                toBytes32(msg.sender)
            ) == true,
            "invalid merkle proof"
        );
        nextTokenId++;
        _mint(msg.sender, nextTokenId);
    }

    // add some level of security around allow list operations if going to production
    function setRoot(bytes32 _merkleRoot) public {
        merkleRoot = _merkleRoot;
    }
}
