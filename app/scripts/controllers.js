'use strict';

angular.module('templateApp')
	.controller('CarouselController', ['$scope', 'carouselFactory', function($scope, carouselFactory) {
		$scope.carouselImages = [];
		$scope.carouselImages = carouselFactory.getImages().query(
			function(response) {
				$scope.horzImages = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
	}])
	.controller('HomeRow3Controller', ['$scope', 'marcasFactory', function($scope, marcasFactory) {
		$scope.marcas = [];
		$scope.marcas = marcasFactory.getImages().query(
			function(response) {
				$scope.marcas = response;
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
				if(isImageVisible){
						$scope.navBarWidth = navBar.clientWidth - img.naturalWidth - 30;
						$scope.$apply();
						$scope.itemHeight = img.clientHeight / getItemsLinesCount();
						$scope.$apply();
				}
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
	.controller('GaleryVertController', ['$scope', '$stateParams', 'productFactory', function($scope, $stateParams, productFactory) {

		//Select Component
		$scope.options = [
				{value: 24, description: '24 Por Página'},
				{value: 36, description: '36 Por Página'},
				{value: 48, description: '48 Por Página'}
			];

		var category = $stateParams.category;
		var brand = $stateParams.brand;
		var imgContainer = $stateParams.imgContainer;

		$scope.imgContainer = imgContainer;

		$scope.imgPerPage = 36;

		$scope.product = [];

		//Pagination Component
		$scope.pagination = {
		    currentPage: 1,
		    maxPages: 5,
		    numOfImages: 0
		};

		$scope.setPage = function (pageNo) {
			$scope.pagination.currentPage = pageNo;
		};

		$scope.getProducts = function(){
				return productFactory.getProductsSize().get({category:category, brand:brand},
				function(response) {
					$scope.pagination.numOfImages = response.size;
					$scope.pagination.maxPages = Math.ceil($scope.pagination.numOfImages/$scope.imgPerPage);
					$scope.products = productFactory.getProducts().getProductsRange({limit:$scope.imgPerPage, page:$scope.pagination.currentPage, category:category, brand:brand},
						function(response) {
							$scope.products = response;
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
			$scope.getProducts();
		}

		$scope.getProducts();

	}])
	.controller('GaleryHorzController', ['$scope', '$stateParams', 'horzImagesFactory', function($scope, $stateParams, horzImagesFactory) {
		//Select Component
		$scope.options = [
				{value: 9, description: '9 Por Página'},
				{value: 36, description: '36 Por Página'},
				{value: 48, description: '48 Por Página'}
		];

		var category = $stateParams.category;
		var brand = $stateParams.brand;

		if(!brand){
				brand = "all";
		}

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
					$scope.horzImages = horzImagesFactory.getHorzImages().getProductsRange({limit:$scope.imgPerPage, page:$scope.currentPage, category:category, brand:brand},
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
	.controller('HomeRow2Controller', ['$scope', '$stateParams', 'productFactory', function($scope, $stateParams, productFactory) {

		$scope.products = [];

		$scope.products = productFactory.getProducts().getProductsRange({limit:4, page:1, category:"home", brand:"all"},
			function(response) {
				$scope.horzImages = response;
			},
			function(response) {
				$scope.message = "Error: "+response.status + " " + response.statusText;
			}
		);
	}])
	.controller('UploadFilesController', ['$scope', '$http', 'postImageFactory', 'postProductFactory', 'Upload', '$timeout', function ($scope, $http, postImageFactory, postProductFactory, Upload, $timeout) {
		// Data to be sent to the server with the upload request
		$scope.brands = ["recco", "liebe", "luppo", "duloren", "plie", "elegance","hotflowers", 'liz', "none"];
		$scope.categories = ["meias", "cuecas", "pijamas", "lingerie", "camisolas", "robes", "roupões", "gestantes", "modeladores", "sex shop","home", "marca"];

		$scope.orientation = "vertical";
		$scope.category = $scope.categories[0];
		$scope.brand = $scope.brands[0];
		$scope.name = "Conheça a Loja";
		//$scope.name = "none";

		$scope.uploadFiles = function (files) {
				$scope.files = [];
				$scope.progress = "";
				$scope.loaded = 0;
				$scope.total = files.length;
		    for (var i = 0; i < files.length; i++) {
						var file =
						$scope.files.push({
								name: files[i].name,
								status: "PENDING",
								message: "Carregando arquivo..."
						});
		        Upload.upload({
                url: '/upload/'+$scope.category,
                data: {
										username: $scope.username,
										password: $scope.password,
										file: files[i]
                }
		        }).then(function (response) {
		                $timeout(function () {
		                    $scope.result = response.data;

												for(var j = 0; j < $scope.files.length; j++){
														if(response.data.filename == $scope.files[j].name){
																if(response.data.returncode == "SUCCESS"){
																		var image = {
																				path: response.data.returndata,
																				orientation: $scope.orientation
																		}

																		postImageFactory.save(image,
																				function(img) {
																					console.log(img._id);

																					var product = {
																							name: $scope.name,
																							brand: $scope.brand,
																							category: $scope.category,
																							image: img._id
																					}

																					postProductFactory.save(product,
																							function(prod) {
																									$scope.files[j].status = "OK";
																									$scope.files[j].message = "Arquivo carregado com sucesso!"
																									$scope.loaded++;
																									$scope.progress =  Math.min(100, parseInt(100.0 * $scope.loaded / $scope.total));
																							},
																							function(response) {
																									$scope.message = "Error: "+response.status + " " + response.statusText;
																									$scope.loaded++;
																									$scope.progress =  Math.min(100, parseInt(100.0 * $scope.loaded / $scope.total));
																							}
																					);

																				},
																				function(response) {
																					$scope.files[j].status = "ERROR";
																					console.log(response.data.code);
																					$scope.loaded++;
																					$scope.progress =  Math.min(100, parseInt(100.0 * $scope.loaded / $scope.total));
																					if(response.data.code == 11000) {
																							console.log(response.data.code);
																							$scope.files[j].message = "Falha ao carregar arquivo: Você já possuí uma imagem cadastrada com o nome " + $scope.files[j].name + " na categoria " + $scope.category + ".";
																					}
																					else {
																							$scope.message = "Error: "+response.status + " " + response.statusText;
																					}
																				}
																		);

																}
																else {
																		console.log(response.data.returncode);
																		$scope.files[j].status = "ERROR";
																		$scope.loaded++;
																		$scope.progress =  Math.min(100, parseInt(100.0 * $scope.loaded / $scope.total));
																		if(response.data.returncode == "ERR_TYPE_NOT_SUPPORTED"){
																				$scope.files[j].message = "Falha ao carregar arquivo: O tipo do arquivo não é suportado. O arquivo precisa ser de um dos seguintes tipos: png, jpeg, jpg ou gif.";
																		} else if (response.data.returncode == "ERR_FILE_ALREADY_EXISTS") {
																				$scope.files[j].message = "Falha ao carregar arquivo: A categoria " + $scope.category + " já possui um arquivo com o nome " + $scope.files[j].name + ".";
																		} else if (response.data.returncode == "LIMIT_FILE_SIZE") {
																				$scope.files[j].message = "Falha ao carregar arquivo: O tamanho do arquivo excede 15 MB.";
																		}
																}
																break;
														}
												}
		                });
		            }, function (response) {
										$scope.loaded++;
										$scope.progress =  Math.min(100, parseInt(100.0 * $scope.loaded / total));
		                if (response.status > 0) {
		                    $scope.errorMsg = response.status + ': ' + response.data;
		                }
		            });
		        }
				};
	}]);
