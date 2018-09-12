export default (html, allprops) => {
    return `
	<!DOCTYPE html>
	<html>
	<head>
		<title>Title of your application</title>

		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

		<style>
			/* initial style before loading css files */
			body { margin: 0; font-size: 26px; }
		</style>

	</head>
	<body>
		<div id="root"><div class="donotremovethisdiv">${html}</div></div>
		<script>window.__PROPS__ = ${allprops}</script>

		<script src="/build.js" defer></script>

		<noscript id="deferred-styles">
			<link rel="stylesheet" type="text/css" href="/css/index.css" />
		</noscript>
		<script>
			var loadDeferredStyles = function() {
				var addStylesNode = document.getElementById("deferred-styles");
				var replacement = document.createElement("div");
				replacement.innerHTML = addStylesNode.textContent;
				document.body.appendChild(replacement)
				addStylesNode.parentElement.removeChild(addStylesNode);
			};
			var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
			else window.addEventListener('load', loadDeferredStyles);
		</script>
	</body>
	</html>
	`
}
