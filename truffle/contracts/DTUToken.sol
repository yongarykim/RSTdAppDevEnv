pragma solidity ^0.4.23;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract DTUToken is StandardToken{

    uint public INITIAL_SUPPLY = 10000000; //100만개 나누기 decimals(10**decimals)으로 표시됨.
    string public name = 'DTU Token';
    string public symbol = 'DTU';
    uint8 public decimals = 0; //토큰을 얼마나 잘게 나눌수 있느냐. 10**X
    address owner;

    bool public released = false;

    function DTUToken() {
        totalSupply_ = INITIAL_SUPPLY * 10 ** uint(decimals);
        balances[msg.sender] = INITIAL_SUPPLY; //각 계정별 잔액 저장. 상속받아 자동생성
        owner = msg.sender;
    }

    function release() public {
        require(owner == msg.sender);
        require(!released);
        released = true;
    }

    modifier onlyReleased() {
        //NOT USING now... require(released);
        _;
    }

    function transfer(address to, uint256 value) public onlyReleased returns (bool) {
        super.transfer(to, value);
    }
    function allowance(address owner, address spender) public onlyReleased view returns (uint256) {
        super.allowance(owner, spender);
    }
    function transferFrom(address from, address to, uint256 value) public onlyReleased returns (bool) {
        super.transferFrom(from, to, value);
    }
    function approve(address spender, uint256 value) public onlyReleased returns (bool) {
        super.approve(spender, value);
    }

    //Custom functions
    function getBalance(address _owner) public onlyReleased view returns (uint256) {
        return balances[_owner];
    }


}