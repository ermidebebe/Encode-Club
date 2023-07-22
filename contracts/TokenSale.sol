// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MyERC20.sol";
import "./MyERC721.sol";


contract TokenSale is Ownable {
    uint256 public ratio;
    MyERC20 public paymentToken;

    constructor(
        uint256 _ratio,
        MyERC20 _paymentToken
    ) {
        ratio = _ratio;
        paymentToken=_paymentToken;
    }

    
}
