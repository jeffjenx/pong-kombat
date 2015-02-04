Pong Kombat
===========

This documentation is intended for project developers and interested participants.
For more information on *Pong Kombat* in general, consult your language-specific README file:

- [English](/languages/en/readme.en.md)

If you'd like, translate the project into your language and submit it to the repository, or send it directly to [jeff@pongkombat.com](mailto:jeff@pongkombat.com?subject=Internationalization).
See the Internationalization section below until a GUI can be developed.

Description
-----------

At it's core, this project is an enhanced remake of the [classic freeware title](http://stefangagne.com/twoflower/pongkombat/) of the same name.
The project resides at [www.pongkombat.com](http://www.pongkombat.com).
It is a web-based application that includes a high quality game.
It aims for broad compatibility, providing lots of learning experiences across mobile, tablet, desktop, television, and other platforms.

Purpose
-------

The purpose of Pong Kombat is--and always has been--to learn something new and to have fun doing it.

This project intends to stand as an example for the following web development topics:

1. [Apache](http://www.apache.org) - A popular HTTP server
  1.1 [PHP](http://www.php.net) - An open-source scripting language
  1.2 [MySQL](http://www.mysql.com) - An open-source SQL database
2. [MEAN.JS](http://meanjs.org) - An open-source full-stack application solution  
  2.1 [MongoDB](http://mongodb.org) - An open-source NoSQL document database  
  2.2 [Express](http://expressjs.org) - A back-end web application framework  
  2.3 [AngularJS](http://angularjs.org) - A front-end MVW (Model-View-*Whatever*) web application framework  
  2.4 [Node.js](http://nodejs.org) - An open-source JavaScript based runtime environment and application server
3. [SASS](http://sass-lang.com) - A front-end styling extension  
  3.1 [CSS](http://www.w3.org/Style/CSS/Overview.en.html) - Latest web standards include transitions, animations, transformations, etc.
4. [HTML5](http://www.w3.org/TR/html5/) - Latest web standards including canvas, audio/video, sockets, etc.
  4.1 [JavaScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm) - A powerful client-side scripting language
5. Seach engine optimization and social media integration
  5.1 [Facebook](http://developers.facebook.com) - Social media application
  5.2 [Twitter](https://dev.twitter.com) - Social media application
  5.3 [Pinterest](http://www.pinterest.com) - A visual content discovery tool
  5.4 [YouTube](http://www.youtube.com) - A video sharing application
  5.5 [GitHub](http://www.github.com) - A Git repository distribution channel and revision control application

Local Development
-----------------

To work on this project locally, you will need to configure an Apache server.
If you don't know how to do this, send me an email at [jeff@pongkombat.com](mailto:jeff@pongkombat.com?subject=Apache%20Help) and I can possibly help.

Once the environment is ready to go, download a working copy of [the Git repository](https://github.com/Quantastical/pong-kombat) to your local project folder.
I like to configure a special domain name for my local development environment.
I add **www.pongkombat.dev** (note the domain extension) to my **hosts** file and set up a Virtual Host in my Apache config.
Then, after restarting Apache, point the web browser to **http://www.pongkombat.com** and bada-bing, bada-boom.

File Structure
--------------

For the most part, the folders in this project are pretty self-explanatory.

- `/demo/` - The public demo that was released in December 2014
- `/documents/` - Text and other portable documents related to the project
- `/fonts/` - Web font fonts
- `/guide/` - A strategy guide in plain text and ePub formats
- `/icons/` - Icon files in various sizes and formats, including .png, .icns, .ico
- `/images/` - Image resources used in the game and throughout the web pages
- `/languages/` - Localization strings in JSON format and localized README in markdown format
- `/music/` - Audio loops in various formats
- `/screenshots/` - In-game screen captures
- `/scripts/` - JavaScript resources
- `/scripts/engine/` - The game engine JavaScript resources
- `/scripts/game/` - The game logic JavaScript resources
- `/sounds/` - Audio files in various formats
- `/styles/` - SASS and compiled CSS resources
- `/templates/` - HTML templates
- `/vendors/` - 3rd party front-end resources

Internationalization
--------------------

One of the goals of this project is to create a fully localizable application, including all text content, embedded images, dates and times, currency, and (perhaps) even advertising images.

The strings are stored in separate files inside the `/languages/` directory, using the [RFC 1766](http://www.faqs.org/rfcs/rfc1766.html) specification as the naming convention.
Some content utilizes the JSON (JavaScript Object Notation) format, some utilize the Markdown format, and some are plain text files.

The default language of the application is generic English, which is `/languages/en/`.
The **strings.en.json** file contains a dictionary of terms and groups of terms that are used throughout the entire application.
Each term is represented by a KEY and a value.

```js
{
	"PONG_KOMBAT" : "Pong Kombat",
	"THANK_YOU" : "Thank you for playing!"
	/*...*/
}
```

Keys are represented in ALL CAPS and <span style="color:red">**should not be changed**</span>.
The values listed immediately after the key are the translated strings.
Notice the keys in the generic Spanish example below:

```js
{
	"PONG_KOMBAT" : "Pong Kombat",
	"THANK_YOU" : "&#x00A1;Gracias por jugar Pong Kombat!",
	/*...*/
}
```

Since many languages utilize accented and special characters, translations can be provided using Unicode escaped characters.
The Unicode character shown in the Spanish example, &#x00A1; (written `&#x00A1;`), references the inverted exclamation point character.

Some strings may contain a placeholder variable, such as *DIRECTORY* as defined in `"LISTING" : "Index of {{ DIRECTORY }}"`.
These variables will be replaced by the logic within the application.

One final note: Some languages might only be a slight variance to another language.

In the United Kingdom, the primary language is English, but occasionally words are spelled differently, as in *localization* and *localisation*.
For these types of translations, you only need to include the changed key-value pairs.
The translation logic will automatically fill in the missing ones from it's parent language (*en_GB* fills in with *en*, *es_MX* fills in with *es*, etc.).
If the key is not defined in the parent language, or if the parent language is missing completely, the translation logic will fill in from the application default language, `/languages/en/`.

Related
-------

- [Official Website](http://www.pongkombat.com)
- [GitHub Repository](http://github.com/Quantastical/pong-kombat)
- [Pinterest.com/PongKombat](http://pinterest.com/PongKombat)
- [Facebook.com/PongKombat](http://www.facebook.com/pongkombat)
- [Twitter.com/PongKombat](http://www.twitter.com/pongkombat)
- [WordPress Developer Blog](http://wordpress.quantastical.com/category/projects/pong-kombat/)