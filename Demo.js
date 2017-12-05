/// <reference path="C:\Users\reverside\source\repos\PhoneList\Scripts/angular.js"/>

var Contact_List = angular.module("Contact_List", ['ngRoute', 'BookService'])

Contact_List.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/Home', {
            templateUrl: 'View/Home.html',
            controller: 'HomeController'
        })
        .when('/EnterDetails', {
            templateUrl: 'View/EnterDetails.html',
            controller: 'EnterController'
        })
        .when('/EditDetails', {
            templateUrl: 'View/EditDetails.html',
            controller:'EditController'
        })
        .when('/DelContact', {
            templateUl: 'View/Delete.html',
            controller:'DeleteController'
        })
        .otherwise({
            redirectTo: '/Home'
        });
}]);

Contact_List.controller("HomeController", function ($scope, contactApi, $rootScope) {
    getContacts();
    function getContacts() {
        contactApi.getContactList().then(function (response) {
            alert(response.data[0].Firstname);
            $scope.ContactBook = response.data;
        }), function () {
            alert("Couldn't find any to contacts");
        }
    }
});

Contact_List.controller("EnterController", function ($scope, contactApi, $location) {
    $scope.AddContact = function () {
        var AddPhone = {
            'Firstname': $scope.Firstname,
            'Lastname': $scope.Lastname,
            'Phone_No': $scope.Phone_No,
            'Email': $scope.Email
        };

        contactApi.AddDetails(AddPhone).then(function (response) {
            alert("Contact added successfully");
            $scope.Firstname = undefined;
            $scope.Lastname = undefined;
            $scope.Phone_No = undefined;
            $scope.Email = undefined;
            $location.Path('/Home');
        }), function () {
            alert("Unable to add contact");
        }
    }
});

Contact_List.controller("EditController", function ($scope, contactApi, $rootScope) {
    getContacts();
    function getContacts() {
        contactApi.getCon().then(function (response) {
            $scope.currentCon = response.data;
        }), function (){
            alert("Couldn't get all the people's information");
        }
    }  

    $scope.EditContact = function () {
        var EditPhone = {
            'Contact_Id': $scope.Contact_Id,
            'Firstname': $scope.Firstname,
            'Phone_No': $scope.Phone_No,
            'Email': $scope.Email
        };

        $scope.Contact_Id = $rootScope.currentCon.Contact_Id;
        $scope.Firstname = $rootScope.currentCon.Firstname;
        $scope.Phone_No = $rootScope.currentCon.Phone_No;
        $scope.Email = $rootScope.currentCon.Email;

        contactApi.EditDet(EditPhone).then(function (response) {
            alert("Contact added successfully");
            $scope.Contact_Id = undefined;
            $scope.Firstname = undefined;
            $scope.Phone_No = undefined;
            $scope.Email = undefined;
        }), function () {
            alert("Unable to add contact");
        }
    }
});



