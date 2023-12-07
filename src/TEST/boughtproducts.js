let options = {
    key: "rzp_test_qHwqKPamC82Qrb",
    name: "Razorpay Testing",
    amount: "100",
    currency: "INR",
    description: "Test Description",
    handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);

    },
    prefill: {
        "contact": '+919999999999',
        "email": "taniya@test.com"
    },

    notes: {
        address: "Mohali"
    },
    theme: {
        color: "#3399cc"
    },

}

var rzp1 = new Razorpay(options);
document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
}

const display = {

    boughtProductsContainer: document.querySelector("#js-boughtProductContainer"),
    boughtProducts: JSON.parse(localStorage.getItem('boughtitems')) || [],
    firstname: document.querySelector("#firstname"),
    lastname: document.querySelector("#lastname"),
    address: document.querySelector("#address"),
    city: document.querySelector("#city"),
    state: document.querySelector("#state"),
    zip: document.querySelector("#zip"),
    form: document.querySelector("#form"),

    getBoughtProducts: function () {

        let items = JSON.parse(localStorage.getItem('boughtitems'));

        this.boughtProducts.forEach((item) => {

            let product = document.createElement("li");
            product.setAttribute("class", "p-4 flex gap-3")
            this.boughtProductsContainer.appendChild(product);


            let img = document.createElement("img");
            img.setAttribute("class", "object-cover h-28 w-28 border p-1 rounded")
            img.setAttribute("src", item.thumbnail)
            product.appendChild(img);


            let outerdiv = document.createElement("div");
            outerdiv.setAttribute("class", "w-full border rounded")
            product.appendChild(outerdiv);


            let productInfodiv1 = document.createElement("div");
            productInfodiv1.setAttribute("class", "flex w-full justify-between p-3");
            outerdiv.appendChild(productInfodiv1);


            let title = document.createElement("p");
            title.setAttribute("class", "font-semibold")
            title.innerHTML = item.title;
            productInfodiv1.appendChild(title);


            let price = document.createElement("p");
            price.setAttribute("class", "font-semibold")
            price.innerHTML = `$${item.price}`;
            productInfodiv1.appendChild(price);


            let productInfodiv2 = document.createElement("div");
            productInfodiv2.setAttribute("class", "flex w-full justify-between p-3");
            outerdiv.appendChild(productInfodiv2);


            let removeBtn = document.createElement("button");
            removeBtn.setAttribute("type", "button");
            removeBtn.innerHTML = "Remove";
            removeBtn.setAttribute("class", "removeBtn text-blue-400")
            productInfodiv2.appendChild(removeBtn);


            //  to remove the product from the cart
            removeBtn.addEventListener("click", function () {
                product.remove();
                items = items.filter(cartItem => cartItem.id !== item.id);
                localStorage.setItem('boughtitems', JSON.stringify(items));
            })


            let itemQuantityContainer = document.createElement("div");
            itemQuantityContainer.setAttribute("class", "flex")
            productInfodiv2.appendChild(itemQuantityContainer);



            let minus = document.createElement("button");
            minus.setAttribute("class", "minus outline-none");
            minus.innerHTML = `<svg class="w-6 h-6 text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zM4 8h7V7H4v1z" fill="currentColor"></path></svg>`
            itemQuantityContainer.appendChild(minus);



            let input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("value", "1");
            input.setAttribute("class", "w-12 bg-gray-200 px-2 rounded-lg");
            itemQuantityContainer.appendChild(input);



            let plus = document.createElement("button");
            plus.setAttribute("class", "plus outline-none");
            plus.innerHTML = `<svg class="w-6 h-6 text-blue-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
                              </svg>`
            itemQuantityContainer.appendChild(plus);



            let inputValue = input.value;
            let amount = item.price;

            plus.addEventListener("click", function () {

                amount += item.price
                price.innerHTML = `$${amount}`;
                inputValue++;

            })

            minus.addEventListener("click", function () {

                if (amount > item.price) {
                    amount = amount - item.price;
                    price.innerHTML = `$${amount}`;
                    inputValue--;
                }

            })

        })

        this.bind()

    },

    subtotal: function () {

        let totalAmount = document.createElement("dl");
        totalAmount.setAttribute("class", "flex justify-between px-4 border-t-2 py-6")
        this.boughtProductsContainer.appendChild(totalAmount);

        let dt = document.createElement("dt");
        dt.setAttribute("class", "text-gray-500 font-semibold");
        dt.innerHTML = "Total"
        totalAmount.appendChild(dt);

        let dd = document.createElement("dd");
        dd.setAttribute("class", "font-semibold");
        totalAmount.appendChild(dd);

        let subtotal = 0;

        if (this.boughtProducts) {
            this.boughtProducts.forEach((item) => {
                subtotal += item.price;
            });
        } else {
            subtotal = 0;
        }


        dd.innerHTML = `$${subtotal}`;
    },
    formValidations: function () {
        let formData = new FormData(this.form);

        let firstnameError = document.querySelector("#fname-Error")
         
        this.firstname.addEventListener("input", () => {
            if (!/^[a-zA-Z]+$/.test(this.firstname.value)) {
                firstnameError.innerHTML = 'First Name should contain only alphabets.';
            }
            if (this.firstname.value === "" || /^[a-zA-Z]+$/.test(this.firstname.value)) {
                firstnameError.innerHTML = '';
            }
        })

        // pending not completed yet
               
        
    },
    bind : function () {
         this.subtotal()
         this.formValidations()
    }
}

display.getBoughtProducts();


