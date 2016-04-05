'use strict';

var App = angular.module('routingApp',['ui.router']);

App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/business")

    $stateProvider
        .state('business', {
            url: "/business",
            templateUrl: "banking.html"
        })
        .state('business.schemes', {
            url: "/schemes",
            templateUrl: "schemes.html",
            controller: function($scope){
                $scope.schemes = ["PlatinumSavings", "LifeInsurance", "CreditAccounts", "PensionSchemes"];
            }
        })
        .state('business.services', {
            url: "/services",
            templateUrl: "services.html",
            controller: function($scope){
                $scope.services = ["Deposit", "WithDrawal", "LoanOnSchemes", "PlanChangeOnSchemes"];
            }
        })

        .state('benefits', {
            url: "/benefits",
            views: {
                "" 	:    { templateUrl: "benefits.html" },
                "view1@benefits": { templateUrl: "clients.html" ,
                    controller: function($scope){
                        $scope.clients = ["State Government", "Central Government", "Federal Employees"];
                    }
                }
            }
        })
}]);
