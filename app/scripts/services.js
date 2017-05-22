'use strict';

angular.module('templateApp')
	.constant("baseURL","http://localhost:8080/")
	.service('horzImagesFactory', ['$resource', 'baseURL', function($resource, baseURL){

		this.getHorzImages = function(){
			return $resource(baseURL+"image/horz/:category/:page-limit:limit", {},
			{
				getImagesRange:{
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
	.service('vertImagesFactory', ['$resource', 'baseURL', function($resource, baseURL){
		this.getVertImages = function(){
			return $resource(baseURL+"image/vert/:category/:page-limit:limit", {},
			{
				getImagesRange:{
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
		this.getVertImagesSize = function(){
			return $resource(baseURL+"image/vert-size");
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
	}]);
