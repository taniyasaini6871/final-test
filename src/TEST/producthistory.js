
const orderHistory = {

    tbody: document.querySelector("#js-tbody"),
    orderHistory: JSON.parse(localStorage.getItem('orderData')) || [],

    getData: function () {


        this.orderHistory.forEach((order) => {
            

            let tr = document.createElement("tr");
            tr.setAttribute("class", "border font-semibold text-sm text-gray-800")
            this.tbody.appendChild(tr);


            let name = document.createElement("td");
            name.setAttribute("class", "border text-center p-2");
            name.innerHTML = order.firstname;
            tr.appendChild(name);


            let orderTd = document.createElement("td");
            orderTd.setAttribute("class", "border text-center p-3");
            orderTd.innerHTML = order.orderId;
            tr.appendChild(orderTd);


            let paymentTd = document.createElement("td");
            paymentTd.setAttribute("class", "border text-center p-3");
            paymentTd.innerHTML = order.paymentId;
            tr.appendChild(paymentTd);


            let addressTd = document.createElement("td");
            addressTd.setAttribute("class", "border text-center p-2");
            addressTd.innerHTML = order.address;
            tr.appendChild(addressTd);


            let totalprice = document.createElement("td");
            totalprice.setAttribute("class", "text-center");
            totalprice.innerHTML = order.totalPrice;
            tr.appendChild(totalprice);


        })
    }
}

orderHistory.getData();