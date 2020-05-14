# EPP (planext) MVP

This is a custom WordPress theme built with Bootstrap and jQuery.

Languages used: HTML, Sass, CSS, PHP, Javascript (some ES6 features) - transpiled with Babel, jQuery.

# Table of Contents
[Getting Started](#getting-started)

1. [After cloning the repo](#1-after-cloning-the-repo)
2. [Example2](#example2)

[Getting Started](#getting-started)

3. [Third Example](#third-example)
4. [Fourth Example](#fourth-examplehttpwwwfourthexamplecom)

## Getting Started

### 1. After cloning the repo

* Run `npm install` to install the required node modules
* The site uses __Gulp__ to minify the scripts and CSS.
* ES6 features are transpiled using __Babel__
* The `.babelrc` file is required so Babel knows to transpile ES6 to ES5

### 2. File organization

* `/assets/` - all the images, videos, Sass, CSS and JS scripts
  * `/scripts/` - this is where the editable JS files preside. They're organized into partials that get bundled together into `js/scripts.js` with Babel (ES6 code is transpiled to ES5) then Babel CLI will minify it into `js/scripts.min.js`.
* `/gulp/` - all the gulp files
* `/inc/` - code and functions used for evaluation purposes, etc.
* `/template-parts/` - all the template partials for use in template files

### 3. Compiling and Transpiling Scripts and Styles

* This is all configured in the `gulp/` folder
* Run `gulp watch` from inside the theme folder to compile CSS and JS scripts
* First, the scripts are transpiled using Babel and then minified using Babel Minify CLI -- `/gulp/scripts.js`

### 4. Naming conventions

How about the WordPress database config screen? No need to worry about database connection information as that is taken care of in the background. The only step that you need to complete is the site information and the installation process will be complete.

We will post more information about how this works but we recommend developers take a look at `wp-config.php` to get an understanding.

![alt](http://i.imgur.com/4EOcqYN.png, '')

If you would like to keep a separate set of configuration for local development, you can use a file called `wp-config-local.php`, which is already in our .gitignore file.

### 4. Extra notes

