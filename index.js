function Order(type, size, crust, topping) {
    this.type = type;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
}

function fullBill() {
    var sum = 0;
    $(".billPerOrder").each(function () {

        var value = $(this).text();
        if (!isNaN(value) && value.length != 0) {
            sum += parseFloat(value);
        }
    });
    if (document.getElementById('yes').checked) {
        var result = "Your order is Ksh. " + sum + " with a delivery fee of Ksh. 200 ";
        var orderBill = sum + 200;
        var total = "Total: Ksh. " + orderBill + " .00";
        $('#result').text(result);
        $('#totalCost').text(total);

        swal({
            title: "Your order will be delivered to your Location at a fee of 200 shillings",
            icon: "success",
        })

    } else {
        var total = "Total: Ksh. " + sum + " .00";

        $('#totalCost').text(total)
    }
}

function checkout() {
    swal({
        title: "Your order has been placed successfully." + "\r\n" + "Thank You for shopping with Us",
        icon: "success",
    }).then((value) => {
        location.reload();
    });
}

Order.prototype.getCrust = function () {
    if (this.crust === 0) {
        return 100
    } else if (this.crust === 1) {
        return 50
    } else if (this.crust === 2) {
        return 200
    }
}

Order.prototype.getTopping = function () {
    if (this.topping === 0) {
        return 300
    } else if (this.topping === 1) {
        return 50
    } else if (this.topping === 2) {
        return 200
    } else if (this.topping === 3) {
        return 100
    }
}

Order.prototype.getSize = function () {
    if (this.type == 0) {
        if (this.size === 0) {
            return 600
        } else if (this.size === 1)
            return 1000
        else {
            return 1500
        }
    } else if (this.type == 1) {
        if (this.size === 0) {
            return 300
        } else if (this.size === 1)
            return 800
        else {
            return 2000
        }
    } else if (this.type == 2) {
        if (this.size === 0) {
            return 500
        } else if (this.size === 1)
            return 1000
        else {
            return 2500
        }
    } else if (this.type == 3) {
        if (this.size === 0) {
            return 600
        } else if (this.size === 1)
            return 1500
        else {
            return 2500
        }
    } else if (this.type == 4) {
        if (this.size === 0) {
            return 500
        } else if (this.size === 1)
            return 950
        else {
            return 2000
        }
    } else if (this.type == 5) {
        if (this.size === 0) {
            return 400
        } else if (this.size === 1)
            return 850
        else {
            return 2200
        }
    } else {
        return false;
    }
}
$(document).ready(function () {

    $('.place-order').click(function () {
        $('#order').show();
    })
    $('.radioBtn').change(function () {
        if (document.getElementById("yes").checked) {
            $('.location').show();
        } else {
            $('.location').hide();
        }
    });

    $('#addToCart').click(function () {

        var type = $('#type option:selected').val();
        var size = $('#size option:selected').val();
        var crust = $('#crust option:selected').val();
        var quantity = $('#quantity').val();
        var topping = $('#topping option:selected').val();
        var name = $('#name').val();

        if (type == '' || size == '' || crust == '' || topping == '' || quantity == '' || name == '') {
            alert('Please make a complete order first')
        } else if (document.getElementById("yes").checked && $('#location').val() == '') {
            alert('Please fill out your location')
        } else {
            var selectedType = parseInt($('#type option:selected').val());
            var selectedSize = parseInt($('#size option:selected').val());
            var selectedCrust = parseInt($('#crust option:selected').val());
            var quantity = parseInt($('#quantity').val());
            var selectedTopping = parseInt($('#topping option:selected').val());


            var newOrder = new Order(selectedType, selectedSize, selectedCrust, selectedTopping);
            var pizzaBill = (newOrder.getSize() + newOrder.getCrust() + newOrder.getTopping()) * quantity;

            $('.displayOrder').show();
            $(".table tbody:last").append("<tr>" +
                "<td>" + $('#type option:selected').text() + "</td>" +
                "<td>" + $('#size option:selected').text() + "</td>" +
                "<td>" + $('#crust option:selected').text() + "</td>" +
                "<td>" + $('#topping option:selected').text() + "</td>" +
                "<td>" + $('#quantity').val() + "</td>" +
                "<td><span class='billPerOrder'>" + pizzaBill + "</span></td>" +
                "<td><input type='checkbox' name='record'></td>" +
                "</tr>");
            $(fullBill);
        }
    })
    $('#checkout').click(function () {
        checkout();
    })
})