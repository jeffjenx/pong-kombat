<!DOCTYPE html public "-//IETF//DTD HTML 2.0//EN">
<html lang="en">

	<head>
		<base href="/" />
		<title>Pong Kombat | 404 Not Found</title>

		<!-- General -->
		<meta charset="utf-8" />
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
		<meta name="viewport" content="width=666" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta name="apple-mobile-web-app-title" content="404 Not Found" />
		<link rel="author" href="humans.txt" />

		<!-- Semantics -->
		<meta name="keywords" content="Pong, Mortal Kombat, Pong Kombat, Video Games" />
		<meta name="description" content="The requested URL (<?= $_SERVER['REQUEST_URI']; ?>) was not found on this server." />

		<!-- Facebook -->
		<meta property="fb:app_id" content="238975976145670" />
		<meta property="og:site_name" content="Pong Kombat" />
		<meta property="og:title" content="Pong Kombat | 404 Not Found" />
		<meta property="og:description" content="The requested URL (<?= $_SERVER['REQUEST_URI']; ?>) was not found on this server." />
		<meta property="og:url" content="<?= $_SERVER['REQUEST_URI']; ?>" />
		<meta property="og:image" content="/icons/bsod-icon-1024.png" />
		<meta property="og:type" content="website" />

		<!-- Twitter -->
		<meta name="twitter:title" content="Pong Kombat | 404 Not Found" />
		<meta name="twitter:description" content="The requested URL (<?= $_SERVER['REQUEST_URI']; ?>) was not found on this server." />
		<meta name="twitter:url" content="<?= $_SERVER['REQUEST_URI']; ?>" />
		<meta name="twitter:image:src" content="/icons/bsod-icon-1024.png" />

		<!-- Icons -->
		<link rel="icon" type="image/x-icon" href="/icons/bsod-icon.ico" />
		<link rel="apple-touch-icon" href="/icons/bsod-icon-180.png" />

		<!-- Styles -->
		<link rel="stylesheet" href="/styles/bsod.css" />
	</head>

	<body>
		<h1>404 Not Found</h1>

		<p>
			The requested <abbr title="Uniform Resource Locator">URL</abbr> (<?= $_SERVER['REQUEST_URI']; ?>) was not found on this server.
			You can wait to see if it becomes available again, or your can restart your computer.
		</p>

		<ul id="instructions">
			<li class="default">Send an e-mail to notify us and try it later.</li>
			<li id="windows">
				<strong>Microsoft Windows Users:</strong>
				Press <abbr title="Control">CTRL</abbr>+<abbr title="Alternate">Alt</abbr>+<abbr title="Delete">DEL</abbr> to restart your computer.
				You will lose unsaved information in any programs that are running.
			</li>
			<li id="macintosh">
				<strong>Apple Macintosh Users:</strong>
				Press <abbr title="Command">&#8984;</abbr>+<abbr title="Option">&#8997;</abbr>+<abbr title="Escape">&#9099;</abbr> to force quit the program.
				You will lose any unsaved information.
			</li>
			<li id="mobile">
				<strong>Mobile Users:</strong>
				Press and hold the power button for 5 seconds or until the device powers off.
				Then, restart your device.
				You will lose unsaved information in any apps that are running.
			</li>
			<li class="default">
				<strong>Other Users:</strong>
				Press and hold the power button for 5 seconds or until the computer powers off.
				Then, restart your computer.
				You will lose unsaved information in any programs that are running.
			</li>
		</ul>

		<nav>
			<p>
				Tap, click, or press a key to continue
				<span class="cursor"></span>
			</p>

			<a href="http://www.pongkombat.com" onclick="track('pongkombat');">Pong Kombat</a>
			|
			<a href="http://www.facebook.com/pongkombat" onclick="track('facebook');">Facebook</a>
			|
			<a href="http://www.twitter.com/pongkombat" onclick="track('twitter');">Twitter</a>
			|
			<a id="email" href="mailto:jeff@pongkombat.com?subject=404%20Not%20Found%20(<?= $_SERVER['REQUEST_URI']; ?>)" onclick="track('email');">E-mail</a>
		</nav>

		<script src="/scripts/error.js"></script>
		<script src="/scripts/analytics.js"></script>
	</body>
</html>