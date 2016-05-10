# Gecko
A speedometer widget set to custom bounds and values

# Prerequisites
You need gulp, bower, karma-cli, jshint, jscs and http-server installed globally:

```sh
$ npm i -g gulp
$ npm i -g bower
$ npm i -g karma-cli
$ npm i -g jshint
$ npm i -g jscs
$ npm i -g http-server
```

# Install
```sh
$ git clone https://github.com/SBirchall818/Gecko.git Gecko
$ cd Gecko
$ npm install
$ bower install
```

## Run
```sh
$ npm start
```

Then connect on [http://localhost:3010/]
## Test
```sh
$ npm test
```

## Ideas for future work
* Move CSS stylings from dial.html into separate file
* Add retroactive unit tests for needle position logic in dial.directive.js
* Fix the warnings that adding the images have caused when running tests for pointer.png and semi-circle.png
* Break currency mappings out into its own testable component
* Add exception handling for potentially incomplete data
* Add data verification to dialservice
* Add unit tests for different values of returned data
* Properly mock out the dialservice in dial.spec.js
* Implement a visual display [DONE]