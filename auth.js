var app = angular.module('ecommerceApp', []);

app.controller('AuthController', function($scope, $http) {

    $scope.isLogin = true;
    $scope.user = {};
    $scope.successMsg = "";
    $scope.errorMsg = "";

    // Toggle login/register
    $scope.toggle = function() {
        $scope.isLogin = !$scope.isLogin;
        $scope.successMsg = "";
        $scope.errorMsg = "";
    };

    // Submit form
    $scope.submit = function() {

        if ($scope.isLogin) {
            // LOGIN
            $http.post('http://localhost:3000/api/users/login', $scope.user)
            .then(res => {
                $scope.successMsg = "Login successful!";
                $scope.errorMsg = "";

                const authData = {
                    token: res.data.token,
                    user: res.data.user
                };
                localStorage.setItem('authData', JSON.stringify(authData));

                // Redirect after login
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            })
            .catch(err => {
                $scope.errorMsg = "Invalid credentials";
                $scope.successMsg = "";
            });

        } else {
            // REGISTER
            $http.post('http://localhost:3000/api/users/register', $scope.user)
            .then(res => {
                $scope.successMsg = "Registration successful!";
                $scope.errorMsg = "";

                const authData = {
                    token: res.data.token,
                    user: res.data.user
                };
                localStorage.setItem('authData', JSON.stringify(authData));

                // Redirect to app after registration
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            })
            .catch(err => {
                $scope.errorMsg = "Registration failed";
                $scope.successMsg = "";
            });
        }
    };

    // Redirect if already logged in
    if (localStorage.getItem('authData')) {
        window.location.href = 'index.html';
    }
});