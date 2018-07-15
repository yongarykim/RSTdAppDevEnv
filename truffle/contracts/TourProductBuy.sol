pragma solidity ^0.4.23;

import "./TourProduct.sol";
import "./DTUToken.sol";

//구매 history관리
contract TourProductBuy {
    address owner;
    DTUToken DTU_TOKEN_SC;
    TourProduct TOUR_PRODUCT_SC;

    //Creator w/ DTU & TourProduct
    function TourProductBuy(DTUToken _addrDTU, TourProduct _addrTourProduct) public {
        owner = msg.sender;
        DTU_TOKEN_SC = _addrDTU;
        TOUR_PRODUCT_SC = _addrTourProduct;
    }

    //구매기록 struct
    //struct SellRecord {
    //    address buyer;
    //    uint256 timestamp;
    //}
    struct SellRecordArray {
        bool isExist;
        address[] buyer;
        uint256[] timestamp;
        //SellRecord[] sellRecords;
    }
    //1. productID => buy History : productId별로 구매기록을 관리
    mapping (uint32 => SellRecordArray) sellHistory;

    //구매기록 보조 struct - pointer of 구매기록 : 구매자별로 구매기록을 관리하기 위함
    struct HistoryRef {
        uint32 productId;
        uint16 sellHistoryIdx;
    }
    struct HistoryRefArray {
        bool isExist;
        HistoryRef[] historyRefs;
    }
    //2. 구매자별로 구매기록을 관리하기 위함: search를 위한 보조 mappting:  buyer => sellHistory의 [key(productId),index]
    mapping (address => HistoryRefArray) buyHistory;

    //구매시 이력기록
    function buyProduct(uint32 _id, uint32 _price) public returns(bool) {
        //require1: 두번 못사게 하기
        //require2: price가 맞는지 확인

        //require3: DTU가 충분한지 확인
        require(DTU_TOKEN_SC.getBalance(msg.sender) >= _price);

        //1. sellHistory에 넣고, index 잠깐 저장
        uint16 idx = (uint16)(sellHistory[_id].buyer.push(msg.sender));
                     (uint16)(sellHistory[_id].timestamp.push(now));

        //2. buyHistory에 보조로 넣기
        buyHistory[msg.sender].historyRefs.push(HistoryRef(_id, idx));

        //3. transfer DTU to prouctOwner
        DTU_TOKEN_SC.transfer(TOUR_PRODUCT_SC.getProductOwner(_id), _price);
    }

    //not using yet : 상품 -> 전체 구매자 조회
    function getHistoryByProuct(uint32 _productId) public view returns(address[], uint256[]) {

        address[] arr1;
        uint256[] arr2;
        if (sellHistory[_productId].isExist == false) {
            return (arr1, arr2); //TO_DO length가 0인지 확인필요
        }
        //data copy후 return.
        uint sellLength = sellHistory[_productId].buyer.length;
        for (uint i = 0; i < sellLength; i++) {
            arr1.push(sellHistory[_productId].buyer[i]);
            arr2.push(sellHistory[_productId].timestamp[i]);
        }

        return (arr1, arr2);
    }

    //not using yet : 사람 -> 구매상품 조회  (일반인이 특정사람의 구매이력 조회시 필요)
    function getHistoryOfUser(address _user) public view returns(uint32[]) {

        uint32[] arr;
        if (buyHistory[_user].isExist == false) {
            return arr; //TO_DO length가 0인지 확인필요
        }
        HistoryRef[] refs = buyHistory[_user].historyRefs;

        for (uint i = 0; i < refs.length; i++) {
            arr.push(refs[i].productId);
        }
        return arr;
    }

    //owner가 해당 product를 산 이력이 있는지 조회
    function isHistoryExist(uint32 _productId) public view returns(bool) {

        if (buyHistory[msg.sender].isExist == false) {
            return false; //mappings value not exist
        }
        HistoryRef[] refs = buyHistory[msg.sender].historyRefs;

        //O(n) search: - not good
        for (uint i = 0; i < refs.length; i++) {
            if (_productId == refs[i].productId) {
                return true;
            }
        }
        return false;
    }
}
