
// Api
const ApiUrl = "https://fakestoreapi.com/products";

// Toggle
const header = document.querySelector("header"),
    cardlist = document.getElementById("cardlist"),
    cartView = document.querySelector("ri-shopping-cart-2-fill"),
    searchProduct = document.querySelector(".ri-search-line"),
    searchInput = document.querySelector(".searchInput"),
    closeSearchInput = document.querySelector(".ri-close-line"),
    category = document.getElementById("category"),
    limit = document.getElementById("limit"),
    sort = document.getElementById("sort"); 

   
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            header.classList.add("sticyMenu");
        } else {
            header.classList.remove("sticyMenu");
        }
    });
    
    searchProduct.addEventListener("click", () => {
        searchInput.classList.toggle("active");
    });
    
    closeSearchInput.addEventListener("click", () => {
        searchInput.classList.toggle("active");
    });
    
    window.addEventListener("load", () => {
        fetch(ApiUrl + "/categories")
            .then((response) => response.json())
            .then((data) => {
                data.forEach((item) => {
                    let categories = document.createElement("option");
                    categories.value = item;
                    categories.text = item;
                    category.append(categories);
                });
            });
        loadProdects("");
    });
    
    // Products Function
    function loadProdects(filterQuery) {
        fetch(ApiUrl + filterQuery)
            .then((response) => response.json())
            .then((data) => {
                // Sort products for Price
                if (sort.value === "asc") {
                    data.sort((a, b) => a.price - b.price);
                } else if (sort.value === "desc") {
                    data.sort((a, b) => b.price - a.price);
                }
    
                limit.innerHTML = "";
                for (let i = 0; i < Math.ceil(data.length / 5) + 1; i++) {
                    let limitPage = document.createElement("option");
                    if (i != 0) {
                        limitPage.value = i * 5;
                        limitPage.text = i * 5;
                    }
                    limit.append(limitPage);
                }
    
                cardlist.innerHTML = "";
                data.forEach((product) => {
                    let cartItem = `
                    <div class="singleProduct">
                        <div class="images">
                            <img src="${product.image}" alt=""/>
                        </div>
                        <div class="productDetails">
                            <h5>${product.title}</h5>
                            <div class="productPrice">
                                <span class="price">${product.price} $</span>
                                <div>
                                    <i class="ri-heart-line"></i>
                                    <i class="ri-add-line"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                    cardlist.innerHTML += cartItem;
                });
            });
    }
    
    // Filter 
    function filterSearch() {
        cardlist.innerHTML = "";
    
        let querySelector = "";
        if (category.value != "") {
            querySelector += "/category/" + category.value;
        }
    
        if (limit.value != "") {
            querySelector += "?limit=" + limit.value;
        }
    
        loadProdects(querySelector);
    }
    
   
    sort.addEventListener("change", () => {
        filterSearch();
    });
    