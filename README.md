## Bloc Frontend Project Starter

A base for Bloc frontend projects.

## Configuration

Configuring this project should be consistent across Nitrous, Mac (local), and Vagrant.

Start by cloning the repository

```
$ git clone https://github.com/Bloc/base-frontend-project.git <your-frontend-project-name>
```

The project uses Grunt to run tasks (detailed below); start by installing the Grunt Command Line Interface (`grunt-cli`) globally on your machine.

```
$ npm install -g grunt-cli
```

Once that's complete, install the remaining project dependencies by running

```
$ npm install
```

## Grunt

This project base uses [Grunt](http://gruntjs.com/) to serve, build and watch project files in development. We've configured Grunt to work for you, but if you're interested in learning more about how Grunt works, look at Grunt's [Getting Started Guide](http://gruntjs.com/getting-started) or watch [Egghead's introduction to Grunt video](https://egghead.io/lessons/gruntjs-introduction-to-grunt).

## Running the application

Run the application using

```
$ grunt
```

The application runs on port 3000 (configured in the [`Gruntfile.js`](https://github.com/joelip/base-frontend-project/blob/master/server.js)). To change the port, modify the number highlighted below

```js
connect: {
  server: {
    options: {
      // Change this value here to the desired port number
      port: 3000,
      hostname: 'localhost',
      base: './dist',
      useAvailablePort: true
    }
  }
}
```

## Directory structure and Grunt

```
app/
 |__images/
 |   |__bloc-image-white.png
 |__pages/
 |   |__index.html
 |__sass/
 |   |__styles.scss
 |__scripts/
 |   |__app.js
 |__templates/
 |   |__home.html
```

Grunt looks for files using a defined pattern so that it knows what to compile and copy and where to put it. To edit the files that Grunt watches, look at the array of files in the `watch` task in `Gruntfile.js`. The default watched files are

```js
  files: [
      './app/images/*.{png,jpg,jpeg}',
      './app/scripts/**/*.js',
      './app/sass/**/*.scss',
      './app/pages/**/*.html',
      './app/templates/**/*.html',
      'Gruntfile.js'
  ]
```

Add any files or directories to Grunt's watch task using the [Grunt conventions for performing file operations](http://gruntjs.com/configuring-tasks#files).

### Images

Add images to the `app/images` directory. To reference images in HTML, use the path `images/<image file name>.jpg`. For example, to include the image called `bloc-white-logo.png`, the path for the `src` attribute in the HTML would be:

```html 
<img src="/images/bloc-white-logo.png">
```

__Note:__ A sample image has been added to `app/images`. To remove the image from the application, run the following command from the root of repo:

```bash
$ rm -f app/images/bloc-white-logo.png
```

### Sass

All Sass files must be included in the `sass` directory. When you create new Sass files in addition to `styles.scss`, make sure that you include them in `styles.scss` with an `@import` statement. For example, if you create a `home.scss` file to match our `home.html` template, include it in `styles.scss` with

```sass
@import "home";
```

and it will be automatically populated in the compiled CSS file when you save any Sass file.

### Difference between Pages and Templates

The `pages` directory is where you should keep application layouts. That is, these are full pages where you'll put a base HTML structure that might hold a `ui-view` or another dynamic block of HTML based on differing routes, app states, etc.

Templates are partials, or smaller sets of HTML that will be populated into the pages. The distinction is similar to the differene between `index.html` and the HTML files in the `templates` directory in Bloc Jams.


## Grunt plugins

A list of the plugins used by Grunt and what they're used for.

#### Browserify

[Browserify](http://browserify.org/) enables the use of Node's [`require()`](https://nodejs.org/api/all.html#all_require) syntax in browser files.

#### Sass

[Grunt Sass](https://github.com/gruntjs/grunt-contrib-sass) for compiling Sass into CSS.

#### Autoprefixer

[Autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) allows you to write CSS free of worrying about vendor prefixes. No need to add `-webkit`, `-moz`, `-ms`, etc to the beginning of your CSS3, because the Grunt Autoprefixer task takes care of it for you.

#### Watch

[Grunt watch](https://github.com/gruntjs/grunt-contrib-watch) watches for changes to file content and then executes Grunt tasks when a change is detected. Watch is useful for tasks like continuous unit testing (every time you save a file, that new file is tested), refreshing your browser automatically when changes are reflected, or compiling preprocessing languages like Sass or Jade into CSS or HTML.

#### Copy

[Grunt copy](https://github.com/gruntjs/grunt-contrib-copy) allows you to copy files from development folders like images, fonts or other static assets and put them in the folder that will be served on the frontend of your application.

#### Clean

[Grunt clean](https://github.com/gruntjs/grunt-contrib-clean) "cleans" or removes all files in your destination folder (the folder where you'll put your officially served content for your application) so that logic in your stylesheets, templates or scripts isn't accidentally overridden by previous code in the directory.

#### Hapi

[Grunt Hapi](https://github.com/athieriot/grunt-hapi) is a task that runs a server using [`HapiJS`](http://hapijs.com/). Happy is a Node Web Application framework with robust configuration options. Using Hapi allows us to use Angular for our application routing instead of relying on a backend to handle template requests.
