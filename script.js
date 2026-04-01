let productDiv = document.querySelector(".product");
var categoryListDiv = document.querySelector(".categoryList");
let allCat = [];

let displayProduct = async (allCheckCat = []) => {
    productDiv.innerHTML = '<h3>Fetching from API...</h3>';

    try {
        // 1. FakeStore ki jagah DummyJSON use karein (API FETCH HI HAI)
        let response = await fetch('https://dummyjson.com/products?limit=20');
        let data = await response.json();
        
        // DummyJSON mein data 'products' array ke andar hota hai
        let finalProduct = data.products; 
        
        productDiv.innerHTML = ''; 

        finalProduct.forEach(element => {
            // 2. Category logic
            if (!allCat.includes(element.category)) {
                categoryListDiv.innerHTML += `<label style="display:block; cursor:pointer;">
                    <input type="checkbox" onclick="categoryFilter()" value="${element.category}"> ${element.category}
                </label>`;
                allCat.push(element.category);
            }

            // 3. Filter logic
            if (allCheckCat.length == 0 || allCheckCat.includes(element.category)) {
                productDiv.innerHTML += `<div class="productItems">
                    <img src="${element.thumbnail}" alt=""> 
                    <h4>${element.category}</h4>
                    <p>Price: $${element.price} | ⭐ ${element.rating}</p>
                    <h3>${element.title}</h3>
                </div>`;
            }
        });
    } catch (error) {
        productDiv.innerHTML = "<h2>API block hai!</h2>";
        console.error(error);
    }
}

displayProduct();

let categoryFilter = () => {
    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkData = [];
    checkInput.forEach((e) => {
        if (e.checked) {
            checkData.push(e.value);
        }
    });
    displayProduct(checkData);
}
