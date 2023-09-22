import {productList} from "./productApiMockData";
export function getProductsApiCall(){
    return productList;
}
export function getProductsByCategoryApiCall(pCat){
    const catList = productList.filter(product =>product.pCategory.indexOf(pCat) !== -1)
    return catList;
}