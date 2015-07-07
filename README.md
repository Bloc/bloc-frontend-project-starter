## Bloc Frontend Project Starter

A starter application for student projects in Bloc's [Frontend Web Development Course](https://www.bloc.io/frontend-development-bootcamp).

## Configuration

Start by cloning the repository:

```
$ git clone https://github.com/Bloc/bloc-frontend-project-starter.git <your-frontend-project-name>
```

The project uses Grunt to run tasks in development. Thoroughly review our [resource on using Grunt](https://www.bloc.io/resources/using-grunt) before using this application. It may also help to review [our resource on NPM and `package.json` files](https://www.bloc.io/resources/npm-and-package-json).

Install the project dependencies by running:

```
$ npm install
```

## Run the Application

Run the application using the Gruntfile's `default` task:

```
$ grunt
```

The default task runs a simple server on port 3000. To view it in a any browser, go to [http://localhost:3000](http://localhost:3000).

>Note that unless the application is run [via Live Preview in Brackets](#use-in-brackets-live-preview), the browser will need to be refreshed to view the most recent changes.

### Using without Angular

By default, the application is configured to be used in a Single-Page Application (SPA) with AngularJS. If you're working on a project that doesn't use AngularJS, see the instructions below [for configuring the server to run in a non-SPA](#configure-server-for-non-spas).

## Use in Brackets Live Preview

To use the application with the Live Preview functionality of the Brackets text editor, go to __File > Project Settings__ and add `http://localhost:3000` to the Base URL field.

![Screenshot of project settings URL in Brackets](https://bloc-global-assets.s3.amazonaws.com/images-frontend/screenshots/bloc-frontend-project-starter/live_preview_project_settings.png)

The text in the application will not update on every keystroke, but changes will automatically push when you save the file.

## Directory Structure

```
├── Gruntfile.js
├── LICENSE
├── Procfile
├── README.md
├── app
│   ├── assets
│   │   └── images
│   │       └── bloc-logo-white.png
│   ├── pages
│   │   └── index.html
│   ├── scripts
│   │   └── app.js
│   ├── styles
│   │   └── style.css
│   └── templates
│       └── home.html
├── package.json
└── server.js
```

All code, styles, markup, and assets should be saved to the `app` directory. Saving changes creates a new directory, `dist`, that holds final copies of the application content. `dist` is the directory the server uses to serve the content displayed by the browser. __Do not edit files in `dist`__ because it will reset changes to your work every time you save. Restrict all edits to files in the `app` directory.

### Assets/Images

Add images to the `app/assets/images` directory. To reference images in HTML, use the path `/assets/images/<image file name>.jpg`. For example, to include the image called `bloc-white-logo.png`, the path for the `src` attribute in the HTML would be:

```html 
<img src="/assets/images/bloc-white-logo.png">
```

__Note:__ A sample image has been added to `app/images`. To remove the image from the application, run the following command from the root of repo:

```bash
$ rm -f app/assets/images/bloc-white-logo.png
```

To reference any other assets, like the music in Bloc Jams, use the path `assets/<asset-type>/<asset-file>`. The Gruntfile is pre-configured to handle assets in a subfolder with the `.mp3` extension.

>See lines 14 and 35 of `Gruntfile.js` for the accepted file extensions of assets.

### Difference between Pages and Templates

The `templates` directory should hold any HTML files used as templates in Angular states configured by UI Router. All other HTML files belong in the `pages` directory.

### Procfile

The `Procfile` is a file for [providing instructions to Heroku servers](https://devcenter.heroku.com/articles/procfile) that run after pushing new code to the repository. __Do not change the contents of the Procfile__ or Heroku will throw an error when you attempt to visit your application.

>For more information about how to use Heroku with Bloc's frontend applications, see our [resource on using Heroku](https://www.bloc.io/resources/using-heroku-frontend).

## Configure Server for Non-SPAs

By default, `bloc-frontend-project-starter` is configured to be used with SPAs. If you're not building a project with Angular, then modify `server.js` with the following:

```diff
var Hapi = require('hapi'),
    path = require('path'),
    port = process.env.PORT || 3000,
    server = new Hapi.Server(port),
    routes = {
        css: {
            method: 'GET',
            path: '/styles/{path*}',
            handler: createDirectoryRoute('styles')
        },
        js: {
            method: 'GET',
            path: '/scripts/{path*}',
            handler: createDirectoryRoute('scripts')
        },
        assets: {
            method: 'GET',
            path: '/assets/{path*}',
            handler: createDirectoryRoute('assets')
        },
        templates: {
            method: 'GET',
            path: '/templates/{path*}',
            handler: createDirectoryRoute('templates')
        },
-        spa: {
+        staticPages: {
             method: 'GET',
             path: '/{path*}',
-            handler: {
-                file: path.join(__dirname, '/dist/index.html')
-            }
+            handler: createDirectoryRoute('/')
         }
     };
 
-server.route([ routes.css, routes.js, routes.images, routes.templates, routes.spa ]);
+server.route([ routes.css, routes.js, routes.images, routes.templates, routes.staticPages ]);
...
```

Optionally, delete the `templates` directory and all references to it in `Gruntfile.js` to remove unnecessary files (templates are only useful for SPAs). However, keeping them in the repository won't affect your application.

## Grunt plugins

A list of the Grunt plugins in this application.

#### Watch

[Grunt watch](https://github.com/gruntjs/grunt-contrib-watch) watches for changes to file content and then executes Grunt tasks when a change is detected.

#### Copy

[Grunt copy](https://github.com/gruntjs/grunt-contrib-copy) copies files from our development folders and puts them in the folder that will be served with the frontend of your application.

#### Clean

[Grunt clean](https://github.com/gruntjs/grunt-contrib-clean) "cleans" or removes all files in your distribution folder (`dist`) so that logic in your stylesheets, templates, or scripts isn't accidentally overridden by previous code in the directory.

#### Hapi

[Grunt Hapi](https://github.com/athieriot/grunt-hapi) runs a server using [`HapiJS`](http://hapijs.com/). Happy is a Node web application framework with robust configuration options.
