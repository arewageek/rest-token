/// @title Rest Token
/// @author @arewageek

//  SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Capped} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract RestToken is ERC20Capped, ERC20Burnable {
    address payable public owner;
    uint256 public blockReward;
    constructor (uint256 cap, uint256 reward) ERC20("Rest Token", "RST") ERC20Capped(cap * (10 ** decimals())) {
        owner = payable (msg.sender); 
        _mint(owner, 70000000 * (10 ** decimals()));
        blockReward = reward * (10 ** decimals());
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        blockReward = reward * (10 ** decimals());
    }

    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual {
        if(from != address(0) && to != block.coinbase && block.coinbase != address(0)){
            _mintMinerReward();
        }
        _beforeTokenTransfer(from, to, value);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    // function _destroy() public onlyOwner {
    //     selfdestruct(owner);
    // }

    modifier onlyOwner{
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function _update(address from, address to, uint256 value) internal virtual override(ERC20Capped, ERC20) {
        super._update(from, to, value);

        if (from == address(0)) {
            uint256 maxSupply = cap();
            uint256 supply = totalSupply();
            if (supply > maxSupply) {
                revert ERC20ExceededCap(supply, maxSupply);
            }
        }
    }
}