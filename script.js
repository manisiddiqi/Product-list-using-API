let productDiv = document.querySelector(".product");
var categoryListDiv = document.querySelector(".categoryList");
let loader = document.getElementById("loader"); // Loader container
let allCat = [];

let displayProduct = async (allCheckCat = []) => {
    
    // 1. Loader dikhao aur purana data saaf karo
    loader.style.display = 'flex'; 
    productDiv.innerHTML = ''; 

    try {
        let response = await fetch('https://dummyjson.com/products?limit=20');
        let data = await response.json();
        let finalProduct = data.products; 
        
        // 2. Data aane ke baad loader chupa do
        loader.style.display = 'none'; 

        // Important: Sidebar ko sirf pehli dafa bharna hai
        let isFirstLoad = allCat.length === 0;

        finalProduct.forEach(element => {
            // Category Sidebar Logic
            if (isFirstLoad && !allCat.includes(element.category)) {
                categoryListDiv.innerHTML += `<label>
                    <input type="checkbox" onclick="categoryFilter()" value="${element.category}"> ${element.category}
                </label>`;
                allCat.push(element.category);
            }

            // Product Display with Filter
            if (allCheckCat.length == 0 || allCheckCat.includes(element.category)) {
                productDiv.innerHTML += `
                    <div class="productItems">
                        <img src="${element.thumbnail}" alt="${element.title}"> 
                        <h4>${element.category}</h4>
                        <p>Price: $${element.price} | ⭐ ${element.rating}</p>
                        <h3>${element.title}</h3>
                    </div>`;
            }
        });

    } catch (error) {
        // Error ki surat mein loader hata kar message dikhao
        loader.style.display = 'none';
        productDiv.innerHTML = "<h2>Oho! Data load nahi ho saka.</h2>";
        console.error(error);
    }
}

// Pehli dafa products load karne ke liye
displayProduct();

let categoryFilter = () => {
    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkData = [];
    checkInput.forEach((e) => {
        if (e.checked) {
            checkData.push(e.value);
        }
    });
    // Filtered data ke saath function call karo
    displayProduct(checkData);
}
