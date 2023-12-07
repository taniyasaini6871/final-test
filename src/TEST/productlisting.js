
const show = {

    baseUrl: "https://dummyjson.com",
    allProducts: JSON.parse(localStorage.getItem('shoppingProducts')) || [],
    productListingContainer : document.querySelector("#js-mainContainer"),
    myCartBtn : document.querySelector("#js-myCart"),
    addtoCartBtn : document.querySelectorAll(".addCart"),
    cartProductsNumber : document.querySelector("#productNumber"),
    selectedFilter : document.querySelector("#filters"),
    search : document.getElementById('search'),
   
    getProducts: async function () {
        try {

            let response = await fetch(`${this.baseUrl}/products`);

            if (response.ok) {

                let data = await response.json();
                this.allProducts = data.products;
                
            }

            if (!response.ok) {

                throw new Error(`HTTP error! status: ${response.status}`);

            }

        } catch (error) {

            console.error(error);

        }
        this.bind(this.allProducts);
    },

    listProducts : function (products) {

        this.productListingContainer.innerHTML = "";

        products.forEach(item => {

            let boundry = document.createElement("div");
            boundry.setAttribute('class', "mb-8 h-full");
            this.productListingContainer.appendChild(boundry);

            let innerBoundry = document.createElement("div");
            innerBoundry.setAttribute("class","max-w-md h-full p-2 rounded overflow-hidden shadow-lg bg-white");
            boundry.appendChild(innerBoundry);

            let imgContainer = document.createElement("img");
            imgContainer.setAttribute("class","w-full h-48 object-contain");
            imgContainer.setAttribute("src", item.thumbnail);
            innerBoundry.appendChild(imgContainer);
            let viewer = new Viewer(imgContainer);

            let productInfoConatiner = document.createElement("div");
            productInfoConatiner.setAttribute("class","px-6 py-4 flex justify-between items-center");
            innerBoundry.appendChild(productInfoConatiner);

            let title = document.createElement("p");
            title.innerHTML = item.title;
            productInfoConatiner.appendChild(title);

            let price = document.createElement("p");
            price.setAttribute("class","text-gray-900");
            price.innerHTML = `$${item.price}`;
            productInfoConatiner.appendChild(price);

            let btn = document.createElement("button");
            btn.innerHTML = "Add To Cart";
            btn.setAttribute("type" , "button");
            btn.setAttribute("class","addCart bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded");
            innerBoundry.append(btn);

            btn.addEventListener("click" , function () {
                let cartItems = JSON.parse(localStorage.getItem('boughtitems')) || [];
                show.cartProductsNumber.innerHTML = cartItems.length;
                let existingBoughtItems = JSON.parse(localStorage.getItem('boughtitems')) || [];
                
                        const boughtProductInfo = {
                            id : item.id,
                            title : item.title,
                            price : item.price,
                            thumbnail : item.thumbnail,
                            discount : item.discountPercentage,
                
                        }

                  existingBoughtItems.push(boughtProductInfo);
                  localStorage.setItem('boughtitems', JSON.stringify(existingBoughtItems));
                
            });
        })

          
    },

    updateToLocalStorage : function (arr) {

        localStorage.setItem('shoppingProducts', JSON.stringify(arr));
    },

    bind : function (arr) {

        this.listProducts(arr);
        this.filterProductsAsPerCategory(arr);  
        this.updateToLocalStorage(arr);
        this.creatingOptions();
        this.myCartBtn.addEventListener("click" , function () {
            window.location.href = "http://127.0.0.1:5500/src/TEST/boughtproducts.html";
        })
        this.search.addEventListener('input', debouceFunctionality(searchFunctionality, 500));
    },

    creatingOptions: async function () {

        try {

            let response = await fetch(`${this.baseUrl}/products/categories`);

            if (response.ok) {

                const data = await response.json();

                let allOption = document.createElement('option');
                allOption.setAttribute("value", "all");
                allOption.innerHTML = "All";
                this.selectedFilter.appendChild(allOption);

                data.forEach((category) => {
                    let option = document.createElement('option');
                    option.setAttribute("value", category);
                    option.innerHTML = category;
                    this.selectedFilter.appendChild(option);
                });
            }

            if (!response.ok) {

                throw new Error(`HTTP error! status: ${response.status}`);

            }

        } catch (error) {

            console.error(error);

        }
    },

    filterProductsAsPerCategory: function (arr) {


        let originalData = arr;

        this.selectedFilter.addEventListener('change', async () => {

            let selectedFilterValue = this.selectedFilter.value;

            if (selectedFilterValue === 'all') {

                this.listProducts(originalData);

            } else {

                try {

                    let response = await fetch(`${this.baseUrl}/products/category/${selectedFilterValue}`);

                    if (response.ok) {

                        let jsonData = await response.json();
                        show.listProducts(jsonData.products);

                    }

                    if (!response.ok) {

                        throw new Error(`HTTP error! status: ${response.status}`);

                    }

                } catch (error) {

                    console.error(error);
                }

            }
        

        });
    },

    searching : searchFunctionality = async (data) => {

        try {

            let response = await fetch(`https://dummyjson.com/products/search?q=${data}`)

            if (data === "") {

                show.listProducts(show.allProducts);

            }

            if (response.ok) {

                let jsonData = await response.json();
                show.listProducts(jsonData.products);

            }

            if (!response.ok) {

                throw new Error(`HTTP error! status: ${response.status}`);

            }

        } catch (error) {

            console.error(error);
        }

    },

    debouce: debouceFunctionality = (callBack, delay) => {

        let debouce = null;

        return () => {

            let searchValue = this.search.value.trim();
            clearTimeout(debouce)

            debouce = setTimeout(() => {
                searchFunctionality(searchValue);
            }, 1000)

        }

    },
   

}

show.getProducts();
