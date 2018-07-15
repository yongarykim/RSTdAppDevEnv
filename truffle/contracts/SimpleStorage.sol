pragma solidity ^0.4.17;


contract SimpleStorage {

    uint8 storedData;

    function setValue(uint8 x) public {
        storedData = x;
    }

    function getValue() public constant returns (uint8) {
        return storedData;
    }

}