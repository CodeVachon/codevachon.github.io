module.exports = function(grunt) {
	grunt.initConfig({
		path: require('path'),
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					options: {
						reporter: require('jshint-stylish')
					}
				} // close .globals
			}, // close .options
			gruntfile: {
				src: ['gruntfile.js'],
			},
			sourceFiles: {
				src: ['src<%= path.sep %>js<%= path.sep %>*.js'],
			}
		}, // close jshint

		less: {
			options: {},
			build: {
				files: {
					"src<%= path.sep %>css<%= path.sep %><%= pkg.name %>.css": "src<%= path.sep %>less<%= path.sep %>master.less"
				}
			}
		}, // close less

		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['src<%= path.sep %>css<%= path.sep %>*.css']
			}
		}, // close csslint

		cssmin: {
			build: {
				files: {
					'wwwroot<%= path.sep %>includes<%= path.sep %>css<%= path.sep %><%= pkg.name %>.min.css':['src<%= path.sep %>css<%= path.sep %><%= pkg.name %>.css','!src<%= path.sep %>css<%= path.sep %>*.min.css']
				}
			}
		}, // close cssmin

		uglify: {
			sourceFiles: {
				files: [{
					expand: true,
					cwd: 'src<%= path.sep %>js<%= path.sep %>',
					src: '*.js',
					dest: 'wwwroot<%= path.sep %>includes<%= path.sep %>js'
				}]
			}
		}, // close uglify

		gitcheckout: {
			master: {
				options: {
					branch: "master"
				}
			},
			newVersionBranch: {
				options: {
					branch: "v<%= pkg.version %>",
					create: true
				}
			}
		}, // close gitcheckout

		gitcommit: {
			newReleaseBranch: {
				options: {
					message: 'Updated package.json and Readme File',
					noVerify: false,
					noStatus: false
				},
				files: {
					src: ['package.json','ReadMe.md','VERSION']
				}
			}
		}, // close gitcommit

		checkrepo: {
			isClean: {
				clean: true, // Require repo to be clean (no unstaged changes)
			}
		}, // close checkrepo

		watch: {
			gruntfile: {
				files: ['gruntfile.js'],
				tasks: ['jshint:gruntfile'],
				options: {
					spawn: false
				}
			}, // close gruntfile
			lessfiles: {
				files: ['src<%= path.sep %>less<%= path.sep %>*.less'],
				tasks: ['less:build','cssmin:build'],
				options: {
					spawn: false
				}
			}, // close less
			jsfiles: {
				files: ['src<%= path.sep %>js<%= path.sep %>*.js'],
				tasks: ['jshint:sourceFiles','uglify:sourceFiles'],
				options: {
					spawn: false
				}
			} // close jsfiles
		} // close watch
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-checkrepo');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('createReleaseBranch','a task to create a release branch', function(iterum) {
		var _acceptedIterumValues = ["major","minor","patch"];
		if (!iterum || (_acceptedIterumValues.indexOf(iterum) == -1)) {
			grunt.log.error('Oops! no value found');
			grunt.log.writeln('Accepted Values:');
			for (var i=0; i<_acceptedIterumValues.length; i++) {
				grunt.log.writeln('grunt createReleaseBranch:' + _acceptedIterumValues[i]);
			}

			return false;
		}

		grunt.task.run(['checkrepo:isClean','buildReleaseBranch:' + iterum]);
	}); // close createReleaseBranch

	grunt.registerTask('buildReleaseBranch','builds the branch', function(iterum) {
		var _acceptedIterumValues = ["major","minor","patch"];
		var _readMeFileName = "ReadMe.md";
		var _versionFileName = "VERSION";
		var _branchNamePrefix = "Release-";

		var _runGitCommands = true;
		var _runFileCommands = true;

		var pkg = grunt.file.readJSON('package.json');
		grunt.log.oklns('Current Release Branch For: v' + pkg.version);

		if (_runGitCommands) {
			// Goto Master Branch
			grunt.task.run('gitcheckout:master');
		}

		// Split Current Version Number to Easily Increment
		var _newVersionSplit = pkg.version.split('.');
		if (iterum == _acceptedIterumValues[0]) {
			_newVersionSplit[0] = parseInt(_newVersionSplit[0])+1;
			_newVersionSplit[1] = 0;
			_newVersionSplit[2] = 0;
		}
		else if (iterum == _acceptedIterumValues[1]) {
			_newVersionSplit[1] = parseInt(_newVersionSplit[1])+1;
			_newVersionSplit[2] = 0;
		}
		else {
			_newVersionSplit[2] = parseInt(_newVersionSplit[2])+1;
		}
		pkg.version = _newVersionSplit.join(".");

		var _newBranchName = _branchNamePrefix + 'v' + pkg.version;
		grunt.log.oklns('Creating Release Branch For: v' + pkg.version);

		if (_runGitCommands) {
			// Create and Checkout New Version Branch
			grunt.config.set('gitcheckout.newVersionBranch.options.branch', _newBranchName);
			grunt.task.run('gitcheckout:newVersionBranch');
			grunt.log.oklns('git checkout -b ' + _newBranchName);
		}

		if (_runFileCommands) {
			// Update Package.Json File to New Version Number
			grunt.log.oklns('package.json');
			grunt.file.write("package.json", JSON.stringify(pkg,null,"\t"));

			// Update VERSION file with New Version Number
			grunt.log.writeln('Updating ' + _versionFileName);
			if (grunt.file.exists(_versionFileName)) {
				grunt.file.delete(_versionFileName);
			}
			grunt.file.write(_versionFileName, 'v' + pkg.version);

			// Update ReadMe File with New Version Number
			if (grunt.file.exists(_readMeFileName)) {
				grunt.log.writeln('Updating ' + _readMeFileName);
				var readmeText = grunt.file.read(_readMeFileName);

				var _date = new Date();
				var _underline = Array( (pkg.version.length+2) ).join("-");

				readmeText = readmeText.replace(/(={3,}(?:\n|\r))/,"$1\nv" + pkg.version + "\n" + _underline + "\n - New " + iterum + " branch created on " + _date.toLocaleDateString() + "\n" );
				grunt.file.write(_readMeFileName,readmeText);
			} else {
				grunt.log.error('Oops! ' + _readMeFileName + ' Could Not Found!');
			}

			if (_runGitCommands) {
				// save file changes in the Repo
				grunt.task.run('gitcommit:newReleaseBranch');
			}
		}
	}); // close buildReleaseBranch

}; // close module.exports
