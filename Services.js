/// <reference path="C:\Users\reverside\source\repos\PhoneList\Scripts/angular.js" />

var BookService = angular.module('BookService', []);

BookService.factory('contactApi', function ($http) {
    var urlBase = "http://localhost:60189/api/";
    var contactApi = {};

    contactApi.getContactList = function () {
        return $http.get(urlBase + 'PhoneBooks'); 
    }
    
    contactApi.AddDetails = function (AddPhone) {
        return $http.post(urlBase + 'PhoneBooks/', AddPhone);
    }


    contactApi.EditDet = function (EditPhone) {
        var data = $http({
            method: 'PUT',
            Url: urlBase + 'PhoneBooks/' + EditPhone.Contact_Id,
            data: EditPhone,
        });
        return data;
    }
    return contactApi;
})