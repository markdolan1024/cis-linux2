var app = angular.module('BuySpyApp',['ngAnimate']);

app.controller('MainCtrl', function($scope){

	$scope.searchResults = [
/*
		{'name': "Dell XPS 13",
		'price': 909,
		'img': 'img/3313103_sa.jpg',
		'vendor': 'Best Buy'
		},	
		{'name': "Dell XPS 13",
		'price': 909,
		'img': 'img/3313103_sa.jpg',
		'vendor': 'Best Buy'
		},	
		{'name': "Dell XPS 13",
		'price': 909,
		'img': 'img/3313103_sa.jpg',
		'vendor': 'Best Buy'
		}	
*/
	];

	$scope.canSpy = false;

	$scope.spyItem = function(string){
		var obj = {'name': 'Dell XPS'};
		$scope.spyList.push(obj);

	}

	$scope.removeItem = function(index){
		$scope.searchResults.splice(index, 1);
		
	}

	$scope.showResults = function(){
		$scope.canSpy = true;
		$scope.searchResults = [
		{'name': "Dell XPS 13",
		'price': 909,
		'img': 'img/3313103_sa.jpg',
		'vendor': 'Best Buy'
		},	
		{'name': "Dell XPS 13",
		'price': 999.99,
		'img': 'img/xps2.jpg',
		'vendor': 'Adorama'
		},	
		{'name': "Dell XPS 13",
		'price': 1025.34,
		'img': 'img/xps3.jpg',
		'vendor': 'PcRush'
		}	
		];

	}

	$scope.spyList = [
		{'name': "Book" },	
		{'name': "Cool Thing" },	
		{'name': "Awesome Shirt" }
		];
});
