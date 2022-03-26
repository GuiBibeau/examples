//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "erc721a/contracts/ERC721A.sol";

contract MyErc721A is ERC721A, Ownable, Pausable {
    using SafeMath for uint256;

    event PermanentURI(string _value, uint256 indexed _id);

    uint256 public constant MAX_SUPPLY = 5000;
    uint256 public constant PRICE = 0.1 ether;
    uint256 public constant MAX_PER_MINT = 5;
    uint256 public constant MAX_RESERVE_SUPPLY = 100;

    string public _contractBaseURI;

    constructor(string memory baseURI) ERC721A("My Erc721 A", "MYERC") {
        _contractBaseURI = baseURI;
        _pause();
    }

    /**
     * @dev allow for a maximum pre reserved supply of 100 for marketing purposes.
     */
    function reserveNFTs(address to, uint256 quantity) external onlyOwner {
        require(quantity > 0, "Quantity cannot be zero");
        uint256 totalMinted = totalSupply();
        require(
            totalMinted.add(quantity) <= MAX_RESERVE_SUPPLY,
            "No more promo NFTs left"
        );
        _safeMint(to, quantity);
        lockMetadata(quantity);
    }

    /**
     * @dev public mint function that allows for a maximum of 5 NFTs per mint
     */
    function mint(uint256 quantity) external payable whenNotPaused {
        require(quantity > 0, "Quantity cannot be zero");
        uint256 totalMinted = totalSupply();
        require(quantity <= MAX_PER_MINT, "Cannot mint that many at once");
        require(
            totalMinted.add(quantity) < MAX_SUPPLY,
            "Not enough NFTs left to mint"
        );
        require(PRICE * quantity <= msg.value, "Insufficient funds sent");

        _safeMint(msg.sender, quantity);
        lockMetadata(quantity);
    }

    /**
     * @dev after a mint batch is done, the metadata is locked.
     */
    function lockMetadata(uint256 quantity) internal {
        for (uint256 i = quantity; i > 0; i--) {
            uint256 tid = totalSupply() - i;
            emit PermanentURI(tokenURI(tid), tid);
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;

        payable(msg.sender).transfer(balance);
    }

    function contractURI() public pure returns (string memory) {
        return "https://placekitten.com/g/500/500/";
    }

    function _baseURI() internal view override returns (string memory) {
        return _contractBaseURI;
    }
}
