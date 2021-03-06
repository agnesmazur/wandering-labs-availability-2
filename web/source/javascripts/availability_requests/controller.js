angular.module('availability_requests.controllers', [])

  .controller('AvailabilityRequestNewController', ['$scope', '$state', 'availabilityRequestsService', function($scope, $state, availabilityRequestsService) {
    $scope.ar = availabilityRequestsService;
    $scope.siteOptionsCollapsed = true;

    $scope.submitted = false;

    $scope.newRequest = function() {
      $scope.submitted = true;

      if (availabilityRequestsService.valid() && $scope.arform.$valid) {
        availabilityRequestsService.post().then( function(result) {
          availabilityRequestsService.flash = 'Success. Feel free to add another.';
          availabilityRequestsService.flashClass = 'flash-success';
          $scope.submitted = false;
        }, function(result) {
          availabilityRequestsService.flash = 'Error. Please fix the following and try again: ' + result.data.error;
          availabilityRequestsService.flashClass = 'flash-error';
          $scope.submitted = false;
        });
      }
      else {
        availabilityRequestsService.flash = 'Error. Please complete all required fields';
        availabilityRequestsService.flashClass = 'flash-error';
        $scope.submitted = false;
      }

    };

    $scope.dateStartFilter = function(d) {
      var today = new Date();
      return(d > today);
    };

    $scope.dateEndFilter = function(d) {
      return((typeof $scope.ar.dateStart !== 'undefined') && (d > $scope.ar.dateStart));
    };

  }])

  .controller('AvailabilityRequestController', ['$rootScope', '$scope', '$state', 'availabilityRequestsService', 'availabilityRequest', function($rootScope, $scope, $state, availabilityRequestsService, availabilityRequest) {
    $rootScope.isPremium = availabilityRequest.isPremium;
    $scope.ar = availabilityRequest;
    $scope.ar_array = [availabilityRequest];

    availabilityRequestsService.base.get(availabilityRequest.id + '/all').then( function(results) {
      $scope.all_requests = results;
    });

  }])


  .controller('AvailabilityRequestCancelController', ['$scope', '$state', 'availabilityRequestsService', 'availabilityRequest', function($scope, $state, availabilityRequestsService, availabilityRequest) {
    availabilityRequestsService.cancel(availabilityRequest.id);
  }])

  .controller('AvailabilityRequestUnpauseController', ['$scope', '$state', 'availabilityRequestsService', 'availabilityRequest', function($scope, $state, availabilityRequestsService, availabilityRequest) {
    availabilityRequestsService.unpause(availabilityRequest.id);
  }])

  ;
