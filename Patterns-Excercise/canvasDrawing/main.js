require.config({
	baseUrl: 'js', 
	paths: {
		jquery: 'https://code.jquery.com/jquery-2.1.4.min',
		domReady: 'lib/domReady',
		bootstrap: "lib/bootstrap.min"
	}
});

define(['domReady', 'presenter', "jquery"], function(domReady, presenter, $) {
	require(["bootstrap"]);
	domReady(function() {

		presenter.init();
	});
})