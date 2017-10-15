'use strict';

angular.module('templateApp', ['ui.router', 'ngResource', 'ngMap', 'ui.bootstrap', 'ngFileUpload'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
					// route for the home page
			.state('app', {
				url:'/',
				views: {
					'header': {
						templateUrl : 'views/header.html'
					},
					'content': {
						templateUrl : 'views/home.html'
					},
					'carousel@app': {
						templateUrl : 'views/carousel-image.html'
					},
					'home-row1@app': {
						templateUrl : 'views/home-row1.html',
						controller  : 'HomeRow1Controller'
					},
					'panel-home@app': {
						templateUrl : 'views/panel-home.html'
					},
					'home-row2@app': {
						templateUrl : 'views/home-row2.html',
						controller  : 'HomeRow2Controller'
					},
					'home-row3@app': {
						templateUrl : 'views/home-row3.html',
						controller  : 'HomeRow3Controller'
					},
					'footer': {
						templateUrl : 'views/footer.html'
					}
				}
			})
			// route for the galeria
			.state('app.galery-horz', {
					url:'galery-horz/:category/:brand:/:imgContainer',
					views: {
							'content@': {
									templateUrl : 'views/galery-horz.html'
							},
							'pagination@app.galery-horz': {
									templateUrl : 'views/pagination.html'
							}
					}
			})
			.state('app.galery-vert', {
					url:'galery-vert/:category?brand?imgContainer',
					params: {
						brand: "all",
						imgContainer: "img-vert-container"
					},
					views: {
							'content@': {
									templateUrl : 'views/galery-vert.html'
						 },
						 'pagination@app.galery-vert': {
								 templateUrl : 'views/pagination.html'
						 }
					}
			})
			.state('app.contato', {
					url:'contato',
					views: {
							'content@': {
									templateUrl : 'views/contato.html'
						 }
					}
			})
			.state('app.evento', {
					url:'evento',
					views: {
							'content@': {
									templateUrl : 'views/evento.html'
						 }
					}
			})
			.state('app.upload', {
					url:'upload',
					views: {
							'content@': {
									templateUrl : 'views/uploadImages.html'
						 }
					}
			});
			$urlRouterProvider.otherwise('/');
	});
