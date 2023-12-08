
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
    totalAmount: document.querySelector("#totalamount"),
    phone: document.querySelector("#phone"),
    backbtn: document.querySelector("#back-btn"),


    getBoughtProducts: function () {

        let items = JSON.parse(localStorage.getItem('boughtitems'));

        this.boughtProducts.forEach((item) => {

            let product = document.createElement("li");
            product.setAttribute("class", "p-4 flex flex-col sm:flex-row md:flex-row lg:flex-row gap-3")
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


            let itemQuantityContainer = document.createElement("div");
            itemQuantityContainer.setAttribute("class", "flex border p-1 bg-gray-200 rounded-lg")
            productInfodiv2.appendChild(itemQuantityContainer);



            let minus = document.createElement("button");
            minus.setAttribute("class", "minus outline-none");
            minus.innerHTML = `<svg class="w-6 h-6 text-gray-700" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg>`
            itemQuantityContainer.appendChild(minus);


            let input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("value", "1");
            input.setAttribute("readonly", "");
            input.setAttribute("class", "w-12 bg-gray-200 rounded-lg text-center outline-none");
            itemQuantityContainer.appendChild(input);



            let plus = document.createElement("button");
            plus.setAttribute("class", "plus outline-none");
            plus.innerHTML = `<svg class="w-5 h-5 text-gray-700" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg>`
            itemQuantityContainer.appendChild(plus);



            let removeBtn = document.createElement("button");
            removeBtn.setAttribute("type", "button");
            removeBtn.innerHTML = "Remove";
            removeBtn.setAttribute("class", "removeBtn text-blue-400")
            productInfodiv2.appendChild(removeBtn);


            //  to remove the product from the cart
            removeBtn.addEventListener("click", function () {

                product.remove();

                //  to set the total price again is product removed
                let currentTotal = parseFloat(display.totalAmount.innerHTML.replace('$', ''));
                display.totalAmount.innerHTML = `$${currentTotal - amount}`;

                // to remove it from loaclstorage as well
                items = items.filter(cartItem => cartItem.id !== item.id);
                localStorage.setItem('boughtitems', JSON.stringify(items));

            })

            let inputValue = input.value;
            let amount = item.price;

            plus.addEventListener("click", function () {

                amount += item.price
                price.innerHTML = `$${amount}`;
                inputValue++
                input.value = inputValue;


                let currentTotal = parseFloat(display.totalAmount.innerHTML.replace('$', ''));
                display.totalAmount.innerHTML = `$${currentTotal + item.price}`;


            })

            minus.addEventListener("click", function () {

                if (amount > item.price) {

                    amount = amount - item.price;
                    price.innerHTML = `$${amount}`;
                    inputValue--
                    input.value = inputValue;

                    let currentTotal = parseFloat(display.totalAmount.innerHTML.replace('$', ''));
                    display.totalAmount.innerHTML = `$${currentTotal - item.price}`;

                }

            })

        })
        this.bind()

    },

    subtotal: function () {

        let subtotal = 0;

        if (this.boughtProducts) {

            this.boughtProducts.forEach((item) => {
                subtotal += item.price;
            });

        } else {
            subtotal = 0;
        }

        this.totalAmount.innerHTML = `$${subtotal}`;

    },

    formValidations: function () {


        let firstnameError = document.querySelector("#fname-Error");
        this.firstname.addEventListener("input", () => {
            if (!/^[a-zA-Z]+$/.test(this.firstname.value)) {
                firstnameError.innerHTML = 'First Name should contain only alphabets.';
            }
            if (this.firstname.value === "" || /^[a-zA-Z]+$/.test(this.firstname.value)) {
                firstnameError.innerHTML = '';
            }
        })


        let lastnameError = document.querySelector("#lname-Error");
        this.lastname.addEventListener("input", () => {
            if (!/^[a-zA-Z]+$/.test(this.lastname.value)) {
                lastnameError.innerHTML = 'Last Name should contain only alphabets.';
            }
            if (this.lastname.value === "" || /^[a-zA-Z]+$/.test(this.lastname.value)) {
                lastnameError.innerHTML = '';
            }
        })


        let addressError = document.querySelector("#address-Error")
        this.address.addEventListener("input", () => {
            if (this.address.value === "") {
                addressError.innerHTML = 'Address cannot be empty.';
            } else {
                addressError.innerHTML = '';
            }
        })


        let cityError = document.querySelector("#city-Error")
        this.city.addEventListener("input", () => {
            if (!/^[a-zA-Z]+$/.test(this.city.value)) {
                cityError.innerHTML = 'City should contain only alphabets.';
            }
            if (this.city.value === "" || /^[a-zA-Z]+$/.test(this.city.value)) {
                cityError.innerHTML = '';
            }
        })


        let stateError = document.querySelector("#state-Error")
        this.state.addEventListener("input", () => {
            if (!/^[a-zA-Z]+$/.test(this.state.value)) {
                stateError.innerHTML = 'State should contain only alphabets.';
            }
            if (this.state.value === "" || /^[a-zA-Z]+$/.test(this.state.value)) {
                stateError.innerHTML = '';
            }
        })


        let zipError = document.querySelector("#zip-Error")
        this.zip.addEventListener("input", () => {
            if (!/^\d{5}$/.test(this.zip.value)) {
                zipError.innerHTML = 'Zip code should be a 5-digit number.';
            }
            if (/^\d{5}$/.test(this.zip.value) || this.zip.value === "") {
                zipError.innerHTML = '';
            }
        })


        let phoneError = document.querySelector("#phone-Error")
        this.phone.addEventListener("input", () => {
            if (!/^\d{10}$/.test(this.phone.value)) {
                phoneError.innerHTML = 'Phone number should be a 10-digit number.';
            }
            if (/^\d{10}$/.test(this.phone.value) || this.phone.value === "") {
                phoneError.innerHTML = '';
            }
        })


        let options = {

            key: "rzp_test_qHwqKPamC82Qrb",
            order_id: "order_N9qn711Jg0nw0w",  // here you need to add new orderId everytime to make new payment using postman
            amount: 1000000,
            currency: "INR",
            name: "Razorpay Testing",
            description: "Test Description",
            handler: function (response) {

                localStorage.setItem("response", JSON.stringify(response));

                // here after payment successfull we are navigating to producthistory page to see payment details
                window.location.href = "http://127.0.0.1:5500/src/TEST/producthistory.html";
            },

            prefill: {

                "name": 'Taniya',
                "contact": '1234567890',
                "email": "taniya@test.com"
            },

            notes: {
                address: this.address.value
            },
            theme: {
                color: "#3399cc"
            },

        }

        var rzp1 = new Razorpay(options);

        document.getElementById('rzp-button1').onclick = function (e) {

            // before making payment this function is ensuring all form fields are filled
            let isFormValid = display.validateForm();

            if (isFormValid) {

                let formData = new FormData(this.form);

                // get response keys and put it in the object to display payment and order id on producthistory page
                let responseItems = JSON.parse(localStorage.getItem('response')) || [];

                let orderItems = JSON.parse(localStorage.getItem('orderData')) || [];

                let obj = {

                    totalPrice: display.totalAmount.innerHTML,
                    orderId: responseItems.razorpay_order_id,
                    paymentId: responseItems.razorpay_payment_id,

                };

                for (const [key, value] of formData.entries()) {
                    obj[key] = value;
                }

                orderItems.push(obj);
                localStorage.setItem("orderData", JSON.stringify(orderItems));
                rzp1.open();
                e.preventDefault();


            } else {

                display.showErrorIfEmpty(display.firstname, firstnameError, 'First Name');
                display.showErrorIfEmpty(display.lastname, lastnameError, 'Last Name');
                display.showErrorIfEmpty(display.address, addressError, 'Address');
                display.showErrorIfEmpty(display.city, cityError, 'City');
                display.showErrorIfEmpty(display.state, stateError, 'State');

                if (!/^\d{5}$/.test(display.zip.value)) {
                    zipError.innerHTML = 'Zip code should be a 5-digit number.';
                }

                if (!/^\d{10}$/.test(display.phone.value)) {
                    phoneError.innerHTML = 'Phone number should be a 10-digit number.';
                }

            }
        }

    },

    validateForm: function () {

        return (

            this.firstname.value.trim() !== "" &&
            this.lastname.value.trim() !== "" &&
            this.address.value.trim() !== "" &&
            this.city.value.trim() !== "" &&
            this.state.value.trim() !== "" &&
            /^\d{5}$/.test(this.zip.value) &&
            /^\d{10}$/.test(this.phone.value)

        );
    },

    showErrorIfEmpty: function (field, errorElement, fieldName) {

        if (field.value.trim() === "") {

            errorElement.innerHTML = `Please fill in the ${fieldName}.`;

        } else {

            errorElement.innerHTML = '';

        }
    },

    bind: function () {

        this.subtotal();

        this.formValidations();

        this.backbtn.addEventListener("click", function () {
            window.location.href = "productlisting.html"
        });

    }

}

display.getBoughtProducts();


