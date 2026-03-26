let productDiv = document.querySelector(".product");
var categoryListDiv = document.querySelector(".categoryList");
let allCat = [];



let displayProduct =async (allCheckCat=[])=>{
    
    productDiv.innerHTML= '';
    let product =await fetch('https://fakestoreapi.com/products');
    let finalProduct =await product.json();
    finalProduct.forEach(element => {
        // Category display ho rahi hai
        if(!allCat.includes(element.category)){
            categoryListDiv.innerHTML += `<label>
                    <input type="checkbox" onclick="categoryFilter()" value="${element.category}"> ${element.category}
                </label>`
                allCat.push(element.category);
            }

            if(allCheckCat.length==0){
                allCheckCat = allCat;
            }
            if(allCheckCat.includes(element.category)){

        // Yahan product display ho rahi hai 
        productDiv.innerHTML += `<div class="productItems">
                <img src="${element.image}" alt="">
                <h4>${element.category}</h4>
                <p>price":${element.price} | ${element.rating.rate}</p>
                <h3>${element.title}</h3>
            </div>`
            }
    });
    
}

displayProduct(); 


let categoryFilter = ()=>{
    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkData = [];
    checkInput.forEach((e)=>{
        if(e.checked){
            checkData.push(e.value);
        }
    })
    displayProduct(checkData);
}