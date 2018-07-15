pragma solidity ^0.4.23;

contract TourProduct {
    address owner;

    // 생성자 ////////
    function TourProduct() public {
        owner = msg.sender;
    }

    struct Product {
        uint32 id;
        bytes32 name;
        uint32 price;
        bytes32 agent;
        bytes32 detail;
        address owner; //(일단) 저장을 실행한 계정.
    }

    Product[] public productList;

    //product add : id는 0부터 생성.
    function insertProduct(bytes32 _name, uint32 _price, bytes32 _agent, bytes32 _detail) public returns(bool) {
        uint32 id = (uint32)(productList.length); //start from 0
        productList.push( Product(id, _name, _price, _agent, _detail, msg.sender) );
        return true;
    }

    //count of All Products
    function getSize() public view returns (uint) {
        return productList.length;
    }

    //get 1 product
    function getProduct(uint _id) public view returns (uint32, bytes32, uint32, bytes32, bytes32) {
        return (productList[_id].id,
                productList[_id].name,
                productList[_id].price,
                productList[_id].agent,
                productList[_id].detail);
    }

    //get product Price
    function getProductPrice(uint _id) public view returns (uint32) {
        return productList[_id].price;
    }

    //get product Owner
    function getProductOwner(uint _id) public view returns (address) {
        return productList[_id].owner;
    }

}
