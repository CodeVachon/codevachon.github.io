New Site Repo Start
===================

v0.2.0
------
 - Updated GruntFile to Create Release Branches

About
-----

Use this Repository as a starting point for any new Website Projects.

This Template is Setup to utilize Grunt as a Task Automator. As Such, you **should not** edit any files in the `/wwwroot/includes/` folder.
The Grunt Task Automators are designed to compile and minify files from the `/src/` directories.

How to Start
------------
Download this Repository Locally, and in your console run the command `npm install`. This will install all required dependancies to your local environment.
Once this is done, run the command `grunt watch`.  Grunt will start watching files in the `/src/` directory.

What Will Grunt Do?
-------------------
Grunt is setup to watch for changes to files in the `/src/less/` and `/src/js/` directories.

### LESS
Changes made to less files, will cause Grunt to compile the `/src/less/master.less` file by default, and create a css file in the `/src/css/` directory with the name set in the `package.json` file. Grunt will then minify that CSS and move it to the `/wwwroot/includes/css/` directory with a `.min.css` extension.

We are creating an uncompressed css file so that we can see what less is compiling to check for errors in out less.

### JavaScript
Changes made to any JavaScript file in the `/src/js/` directory will cause JSHint to fire on javascript files in that directory. If no errors are found in the JavaScript files, Grunt will minify and a move the file to `/wwwroot/includes/js/` directory.

How to Stop Grunt Watch
-----------------------
Run to command `CTRL+C` to stop Grunt from watching.


Create Release Branch
---------------------
Built into Grunt a task to automatically create a new release branch based of the current package version of the site. You can run this task from the command line `grunt createReleaseBranch:[major,minor,patch]`. This command will automatically create the sites next version based on the value passed in a new branch named after the new version number.  If set, the Readme file will also be updated.
