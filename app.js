var app = angular.module('ecommerceApp', []);

app.controller('MainController', function($scope, $http) {

    $scope.products = [];
    $scope.cart = [];
    $scope.orderSuccess = false;

    // Fetch products
    $http.get('http://localhost:3000/api/products')
    .then(res => {
        $scope.products = res.data;
    });

    // Add to cart
    $scope.addToCart = function(product) {
        $scope.cart.push(product);
    };

    // 🔥 Animate button (ADD THIS HERE)
    $scope.animateBtn = function(event) {
        let btn = event.target;
        btn.innerText = "Added ✔";
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-success");

        setTimeout(() => {
            btn.innerText = "Add to Cart";
            btn.classList.remove("btn-success");
            btn.classList.add("btn-primary");
        }, 1000);
    };

    // Total calculation
    $scope.getTotal = function() {
        let total = 0;
        $scope.cart.forEach(item => total += item.price);
        return total;
    };

    // 💥 Checkout with animation
    $scope.checkout = function() {
        let total = $scope.getTotal();

        $http.post('http://localhost:3000/api/orders', {
            products: $scope.cart,
            total: total
        }).then(() => {

            // SHOW SUCCESS MESSAGE
            $scope.orderSuccess = true;

            setTimeout(() => {
                $scope.orderSuccess = false;
                $scope.$apply();
            }, 2000);

            $scope.cart = [];
        });
    };
});