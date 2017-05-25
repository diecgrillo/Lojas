'use strict';

angular.module('templateApp')
	.controller('CarouselMediaController', ['$scope', 'vertMediaFactory', function($scope, vertMediaFactory) {
		$scope.medias = [];
		$scope.medias = vertMediaFactory.getFeaturedVertMedias().query(
			function(response) {
				$scope.medias = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
	}])
	.controller('CarouselImageController', ['$scope', 'horzImagesFactory', function($scope, horzImagesFactory) {
		$scope.horzImages = [];
		$scope.horzImages = horzImagesFactory.getFeaturedHorzImages().query(
			function(response) {
				$scope.horzImages = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
	}])
	.controller('HeaderController', ['$scope', '$location', '$window', '$timeout', function($scope, $location, $window, $timeout){

			var isImageVisible = false;

			//Set active item
			$scope.isActive = function (viewLocation) {
				return viewLocation === $location.path();
			};

			//Set navbar width
			var img = document.getElementById('logo');
			var navBar = document.getElementById('navbar');
			$scope.navBarWidth = navBar.clientWidth - img.naturalWidth - 30;

			//Update items height when window size changes
			$window.onresize = function(event) {
				if(isImageVisible){
					img = document.getElementById('logo');
					navBar = document.getElementById('navbar');
					$scope.navBarWidth = navBar.clientWidth - img.naturalWidth - 30;
					$scope.$apply();
					$scope.itemHeight = img.clientHeight / getItemsLinesCount();
					$scope.$apply();
				} else {
					var customNavbar = document.getElementById('custom-navbar');
					$scope.navBarWidth = customNavbar.clientWidth;
					$scope.$apply();
					$scope.itemHeight = 40;
					$scope.$apply();
				}
			};
			
			img.onload = function () { 
				$scope.navBarWidth = navBar.clientWidth - img.naturalWidth - 30;
				$scope.$apply();
				$scope.itemHeight = img.clientHeight / getItemsLinesCount();
				$scope.$apply();
			}

			//Get the number of lines occupied by items
			var getItemsLinesCount = function(){
				var lines = 1;
				var menu = document.getElementById('custom-menu-item');
				var items = menu.getElementsByClassName("custom-item");
				for (var i = 0; i < items.length-1; ++i) {
						if(items[i].offsetTop != items[i+1].offsetTop)
							lines++;
				}
				return lines;
			}

			//Update items height when logo became visible
			$scope.$watch(
				function(){
					isImageVisible = angular.element(img).is(':visible');
					return isImageVisible;
				},
				function() {
					if(isImageVisible){
						$timeout(function() {
							img = document.getElementById('logo');
							$scope.navBarWidth = navBar.clientWidth - img.naturalWidth - 30;
							$scope.$apply();
							$scope.itemHeight = img.clientHeight / getItemsLinesCount();
							$scope.$apply();
						});
					} else {
						$timeout(function() {
							var customNavbar = document.getElementById('custom-navbar');
							$scope.navBarWidth = customNavbar.clientWidth;
							$scope.itemHeight = 40;
							$scope.$apply();
						});
					}
				}
			);
	}]
	)
	.controller('GaleryVertController', ['$scope', '$stateParams', 'vertImagesFactory', function($scope, $stateParams, vertImagesFactory) {

		//Select Component
		$scope.options = [
				{value: 24, description: '24 Por Página'},
				{value: 36, description: '36 Por Página'},
				{value: 48, description: '48 Por Página'}
			];

		var category = $stateParams.category;

		$scope.imgPerPage = 36;

		$scope.vertImages = [];

		//Pagination Component
		$scope.numOfImages = 0;
		$scope.currentPage = 1;
		$scope.maxPages = 5;

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.getVertImages = function(){
			return vertImagesFactory.getVertImagesSize().get(
				function(response) {
					$scope.numOfImages = response.size;
					$scope.vertImages = vertImagesFactory.getVertImages().getImagesRange({limit:$scope.imgPerPage, page:$scope.currentPage, category:category},
						function(response) {
							$scope.vertImages = response;
						},
						function(response) {
							$scope.message = "Error: "+response.status + " " + response.statusText;
						}
					);
				},
				function(response) {
					$scope.message = "Error: "+response.status + " " + response.statusText;
				}
			);
		}

		$scope.reload = function(){
			$scope.getVertImages();
		}

		$scope.getVertImages();


	}])
	.controller('GaleryHorzController', ['$scope', '$stateParams', 'horzImagesFactory', function($scope, $stateParams, horzImagesFactory) {
		//Select Component
		$scope.options = [
				{value: 9, description: '9 Por Página'},
				{value: 36, description: '36 Por Página'},
				{value: 48, description: '48 Por Página'}
			];

			var category = $stateParams.category;

		$scope.imgPerPage = 36;

		$scope.horzImages = [];

		//Pagination Component
		$scope.numOfImages = 0;
		$scope.currentPage = 1;
		$scope.maxPages = 5;

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.getHorzImages = function(){
			return horzImagesFactory.getHorzImagesSize().get(
				function(response) {
					$scope.numOfImages = response.size;
					$scope.horzImages = horzImagesFactory.getHorzImages().getImagesRange({limit:$scope.imgPerPage, page:$scope.currentPage, category:category},
						function(response) {
							$scope.horzImages = response;
						},
						function(response) {
							$scope.message = "Error: "+response.status + " " + response.statusText;
						}
					);
				},
				function(response) {
					$scope.message = "Error: "+response.status + " " + response.statusText;
				}
			);
		}

		$scope.reload = function(){
			$scope.getHorzImages();
		}

		$scope.getHorzImages();
	}])
	.controller('MediaVertController', ['$scope', 'vertMediaFactory', function($scope, vertMediaFactory) {
		$scope.vertMedias = [];
		$scope.vertMedias = vertMediaFactory.getVertMedias().query(
			function(response) {
				$scope.vertMedias = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
	}])
	.controller('MediaHorzController', ['$scope', 'horzMediaFactory', function($scope, horzMediaFactory) {
		$scope.horzMedias = [];
		$scope.horzMedias = horzMediaFactory.getHorzMedias().query(
			function(response) {
				$scope.horzMedias = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
	}])
	.controller('HomeRow1Controller', ['$scope', 'vertMediaFactory', function($scope, vertMediaFactory) {


		vertMediaFactory.getMediaById().get({mediaId:"5904e6c7210610247ee184ab"} ,
			function(response) {
				$scope.media1 = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
		vertMediaFactory.getMediaById().get({mediaId:"5904f86c210610247ee184ad"} ,
			function(response) {
				$scope.media2 = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);

		vertMediaFactory.getMediaById().get({mediaId:"5904fc1d210610247ee184af"} ,
			function(response) {
				$scope.media3 = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);

	}])
	.controller('HomeRow2Controller', ['$scope', 'vertMediaFactory', function($scope, vertMediaFactory) {
		vertMediaFactory.getMediaById().get({mediaId:"5904f329210610247ee184ac"} ,
			function(response) {
				$scope.media4 = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
		vertMediaFactory.getMediaById().get({mediaId:"59062b2c0b6486535e508016"} ,
			function(response) {
				$scope.media5 = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
		vertMediaFactory.getMediaById().get({mediaId:"59062f990b6486535e508017"} ,
			function(response) {
				$scope.media6 = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
		vertMediaFactory.getMediaById().get({mediaId:"590634aa0b6486535e508018"} ,
			function(response) {
				$scope.media7 = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
	}])
	.controller('HomeRow3Controller', ['$scope', 'horzImagesFactory', function($scope, horzImagesFactory) {
		$scope.marcas = horzImagesFactory.getHorzImages().getImagesRange({limit:12, page:1, category:"marca"},
			function(response) {
				$scope.marcas = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
	}]);
