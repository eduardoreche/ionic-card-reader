angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ScanCardCtrl', function($scope) {

  $scope.scanCard = function() {
    var cardIOResponseFields = [
      'card_type',
      'redacted_card_number',
      'card_number',
      'expiry_month',
      'expiry_year',
      'cvv',
      'zip'
    ];

    var onCardIOComplete = function(response) {
      angular.forEach(cardIOResponseFields, function(item, index) {
        console.log(`field ${response[index]}`);
      });
    }

    var onCardIOCancel = function() {
      console.log('card.io scan cancelled');
    };

    var onCardIOCheck = function(canScan) {
      console.log(`card.io canScan? ${canScan}`);
      var scanBtn = angular.element($('#scanBtn')).scope();

      if(!canScan) {
        scanBtn.innerHTML = "Manual entry";
      }
    };

    CardIO.scan({
      'collect_expiry': true, 
      'collect_cvv': false, 
      'collect_zip': false, 
      'shows_first_use_alert': true, 
      'disable_manual_entry_buttons': false
    }, 
      onCardIOComplete, 
      onCardIOCancel
    );

    CardIO.canScan(onCardIOCheck);

  }

})
