'use strict';

angular.module('templateApp')
	.constant("baseURL","http://lojas-lojas.1d35.starter-us-east-1.openshiftapps.com/")
	//.constant("baseURL","http://localhost:8080/")
	.service('horzImagesFactory', ['$resource', 'baseURL', function($resource, baseURL){

		this.getHorzImages = function(){
			return $resource(baseURL+"image/horz/:category/:page-limit:limit", {},
			{
				getProductsRange:{
					method: 'GET',
					isArray: true,
					params:{
						limit:'@limit',
						page:'@page',
						category:'@category'
					}
				}
			});
		};
		this.getHorzImagesSize = function(){
			return $resource(baseURL+"image/horz-size");
		};
		this.getFeaturedHorzImages = function(){
			return $resource(baseURL+"image/horz-featured");
		};
	}])
	.service('postProductFactory', ['$resource', 'baseURL', function($resource, baseURL){
			return $resource(baseURL+"product");
	}])
	.service('postImageFactory', ['$resource', 'baseURL', function($resource, baseURL){
			return $resource(baseURL+"image");
	}])
	.service('productFactory', ['$resource', 'baseURL', function($resource, baseURL){
		this.getProducts = function(){
			return $resource(baseURL+"product/:category/:brand/:page-limit:limit", {},
			{
				getProductsRange:{
					method: 'GET',
					isArray: true,
					params:{
						limit:'@limit',
						page:'@page',
						category:'@category',
						brand:'@brand'
					}
				}
			});
		};
		this.getProductsSize = function(){
			return $resource(baseURL+"product/:category/:brand/size");
		};
	}])
	.service('horzMediaFactory', ['$resource', 'baseURL', function($resource, baseURL){

		this.getHorzMedias = function(){
			return $resource(baseURL+"media/vert/1-limit2");
		};

	}])
	.service('vertMediaFactory', ['$resource', 'baseURL', function($resource, baseURL){

		this.getVertMedias = function(){
			return $resource(baseURL+"media/vert/1-limit2");
		};

		this.getFeaturedVertMedias = function(){
			return $resource(baseURL+"media/vert-featured");
		};

		this.getMediaById = function(){
			return $resource(baseURL+"media/:mediaId");
		};
	}])
	.service('carouselFactory', ['$resource', 'baseURL', function($resource, baseURL){
			this.getImages = function(){
				return $resource(baseURL+"image/carousel");
			};
	}])
	.service('marcasFactory', ['$resource', 'baseURL', function($resource, baseURL){
			this.getImages = function(){
				return $resource(baseURL+"product/marca/none/1-limit16");
			};
	}])
	.service('sendEmailFactory', ['$resource', 'baseURL', function($resource, baseURL){
			return $resource(baseURL+"email");
	}]);
