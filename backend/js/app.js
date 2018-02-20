// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'imageupload'
]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;

    $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .state('users', {
            url: "/users",
            templateUrl: "views/template.html",
            controller: 'UsersCtrl'
        })

        .state('projects', {
            url: "/projects",
            templateUrl: "views/template.html",
            controller: 'ProjectsCtrl'
        })

        .state('api', {
            url: "/api/:id",
            templateUrl: "views/template.html",
            controller: 'APICtrl'
        })

        .state('onlyview', {
            url: "/onlyview/:id",
            templateUrl: "views/template.html",
            controller: 'onlyViewPageCtrl'
        })

        .state('page', {
            url: "/page/:jsonName",
            templateUrl: "views/template.html",
            controller: 'jsonViewCtrl'
        })
        .state('pageno', {
            url: "/page/:jsonName/:no",
            templateUrl: "views/template.html",
            controller: 'jsonViewCtrl'
        });

    $urlRouterProvider.otherwise("/login");
    $locationProvider.html5Mode(isproduction);
});


firstapp.directive('dateModel', function ($filter, $timeout) {
    return {
        scope: {
            model: '=ngModel'
        },
        link: function ($scope, element, attrs) {
            console.log("in date model");
            $timeout(function () {
                console.log($filter('date')(new Date($scope.model), 'dd/MM/yyyy'));
                $scope.model = new Date($scope.model);
            }, 100)

        }
    };
});

firstapp.filter('getValue', function ($filter) {
    return function (input, keyVal, type) {
        if (keyVal) {
            var keyArr = keyVal.split(".");
            var returnValue = input;
            _.each(keyArr, function (n) {
                returnValue = returnValue[n];
            });

            if (type == "date") {
                console.log('in date');
                // return new Date(returnValue);
                return $filter("date")(returnValue, "medium");
            }
            if (type == "longdate") {
                console.log('in date');
                // return new Date(returnValue);
                return $filter("date")(returnValue, "longDate");
            }
            if (type == "time") {
                console.log('in time');
                return $filter("date")(returnValue, "shortTime");
            }
            if (type != "image") {
                return returnValue;
            } else {
                return $filter("uploadpath")(returnValue, 100, 100, "fill");
            }
        }

    };
});

firstapp.filter('uploadpath', function () {
    return function (input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            if (input.indexOf('https://') == -1) {
                return imgpath + "?file=" + input + other;
            } else {
                return input;
            }
        }
    };
});

firstapp.filter('showdate', function () {
    return function (input) {
        return new Date(input);
    };
});

firstapp.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});


firstapp.directive('uploadImage', function ($http, $filter, $timeout) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            type: "@type",
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {
            console.log($scope.model);
            $scope.showImage = function () {};
            $scope.check = true;
            if (!$scope.type) {
                $scope.type = "image";
            }
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }

            $scope.$watch("image", function (newVal, oldVal) {
                console.log(newVal, oldVal);
                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    $timeout(function () {
                        console.log(oldVal, newVal);
                        console.log(newVal.length);
                        _.each(newVal, function (newV, key) {
                            if (newV && newV.file) {
                                $scope.uploadNow(newV);
                            }
                        });
                    }, 100);

                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
            };
            $scope.uploadNow = function (image) {
                $scope.uploadStatus = "uploading";

                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).then(function (data) {
                    data = data.data;
                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {
                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            $scope.model.push(data[0]);
                        }
                    } else {
                        if (_.endsWith(data.data[0], ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "image";
                        }
                        $scope.model = data.data[0];
                        console.log($scope.model, 'model means blob')

                    }
                    $timeout(function () {
                        $scope.callback();
                    }, 100);

                });
            };
        }
    };
});



firstapp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            var digits;

            function inputValue(val) {
                if (val) {
                    var otherVal = val + "";
                    if (attr.type == "text") {
                        digits = otherVal.replace(/[^0-9\-\.\\]/g, '');
                    } else {
                        digits = otherVal.replace(/[^0-9\-\.\\]/g, '');
                    }


                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

firstapp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});

var editorG = {};
var jsonEditorNo = 0;
firstapp.directive('jsoneditor', function ($compile, $parse) {
    return {
        restrict: 'EA',
        scope: false,
        link: function ($scope, element, attrs) {
            $element = $(element);
            $element.css("min-height", "200px");
            var jsoneditornumber = (jsonEditorNo++);
            $element.attr("id", "jsonEditor" + jsoneditornumber);
            var editor = ace.edit("jsonEditor" + jsoneditornumber);
            editor.setTheme("ace/theme/monokai");
            editor.$blockScrolling = Infinity;
            var JsonMode = ace.require("ace/mode/json").Mode;

            editorG = editor;
            editor.session.setMode(new JsonMode());


            editor.setValue($scope.api.Response[attrs.model], 1);
            editor.on("change", function (e) {

                $scope.api.Response[attrs.model] = editor.getValue();
                $scope.$apply();
            });
            var wrapMode = true;
            setTimeout(function () {
                editor.getSession().setUseWrapMode(wrapMode);
            }, 100);

            editor.commands.addCommand({
                name: "beautify",
                bindKey: {
                    win: "Ctrl-Alt-B",
                    mac: "Ctrl-Option-B"
                },
                exec: function (editor) {
                    var value = editor.getValue();
                    var beautiVal = js_beautify(value);
                    editor.setValue(beautiVal);
                    editor.clearSelection();

                }
            });

            editor.commands.addCommand({
                name: "wrap",
                bindKey: {
                    win: "Ctrl-Alt-S",
                    mac: "Ctrl-Option-S"
                },
                exec: function (editor) {
                    wrapMode = !wrapMode;
                    editor.getSession().setUseWrapMode(wrapMode);

                }
            });
        }
    };
});

firstapp.directive('fancyboxBox', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,
                helpers: {
                    media: {}
                }
            });
        }
    };
});

firstapp.directive('menuOptions', function ($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $(element).on("click", function () {
                $(".side-header.opened-menu").toggleClass('slide-menu');
                $(".main-content").toggleClass('wide-content');
                $("footer").toggleClass('wide-footer');
                $(".menu-options").toggleClass('active');
            });

        }
    };
});

firstapp.filter('serverimage', function () {
    return function (input, width, height, style) {
        if (input) {
            if (input.substr(0, 4) == "http") {
                return input;
            } else {
                image = imgpath + "?file=" + input;
                if (width) {
                    image += "&width=" + width;
                }
                if (height) {
                    image += "&height=" + height;
                }
                if (style) {
                    image += "&style=" + style;
                }
                return image;
            }

        } else {
            return "img/logo.png";
        }
    };
});

// firstapp.filter('serverimage', function () {
//     return function (image) {
//         if (image && image !== null) {
//             return adminurl + "upload/readFile?file=" + image;
//         } else {
//             return undefined;
//         }
//     }
// });

firstapp.filter('convDate', function () {
    return function (input) {
        return new Date(input);
    };
});

firstapp.filter('downloadImage', function () {
    return function (input) {
        if (input) {
            return adminurl + "download/" + input;
        } else {
            return "img/logo.png";
        }
    };
});

firstapp.directive('oI', function ($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $element.click(function () {
                $element.parent().siblings().children("ul").slideUp();
                $element.parent().siblings().removeClass("active");
                $element.parent().children("ul").slideToggle();
                $element.parent().toggleClass("active");
                return false;
            });

        }
    };
});
firstapp.directive('slimscroll', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $element.slimScroll({
                height: '400px',
                wheelStep: 10,
                size: '2px'
            });
        }
    };
});

firstapp.directive('addressForm', function ($document) {
    return {
        templateUrl: 'views/directive/address-form.html',
        scope: {
            formData: "=ngModel",
            demoForm: "=ngValid"
        },
        restrict: 'EA',
        replace: false,
        controller: function ($scope, NgMap, NavigationService) {

            $scope.map = {};
            $scope.change = function () {
                NgMap.getMap().then(function (map) {
                    var latLng = {
                        lat: map.markers[0].position.lat(),
                        lng: map.markers[0].position.lng()
                    };
                   _.assign($scope.formData, latLng);
                });
            };
            var LatLongi = 0;
            $scope.getLatLng = function (address) {

                NavigationService.getLatLng(address, ++LatLongi, function (data, i) {

                    if (i == LatLongi) {
                        $scope.formData =_.assign($scope.formData, data.results[0].geometry.location);
                    }
                });
                // $http.get("http://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCn9ypqFNxdXt9Zu2YqLcdD1Xdt2wNul9s&address="+address);
            };

        },
        // link: function($scope, element, attr, NgMap) {
        //     var $element = $(element);
        //     $scope.demoForm = {};
        //     $scope.demoForm.lat = 19.0760;
        //     $scope.demoForm.long = 72.8777;
        //     $scope.map = {};
        //     $scope.change = function() {
        //       NgMap.getMap().then(function(map) {
        //         console.log(map);
        //       });
        //
        //     };
        //
        // }
    };
});

// firstapp.directive('box', function ($uibModal) {
//     return {
//         templateUrl: 'views/directive/box.html',
//         scope: {
//             type: '=type',
//             model: '=ngModel'
//         },
//         link: function ($scope, element, attrs) {
//             $scope.model = {};
//             console.log($scope.model);
//             $scope.data = {};
//             $scope.eventModel = function (text) {
//                 $scope.type.state = text;
//                 var modalInstance = $uibModal.open({
//                     animation: $scope.animationsEnabled,
//                     templateUrl: '/backend/views/modal/modal.html',
//                     size: 'lg',
//                     scope: $scope
//                 });
//                 $scope.close = function (value) {
//                     callback(value);
//                     modalInstance.close("cancel");
//                 };
//             };
//             $scope.submitModal = function (moddata) {
//                 console.log(moddata);
//             };
//         }
//     };
// });

var aa = {};
firstapp.directive('multipleSelect', function ($document, $timeout) {
    return {
        templateUrl: 'views/directive/multiple-select.html',
        scope: {
            model: '=ngModel',
            api: "@api",
            url: "@url",
            name: "@name",
            required: "@required",
            filter: "@filter",
            ngName: "=ngName",
            create: "@ngCreate",
            disabled: "=ngDisabled"

        },
        restrict: 'EA',
        replace: false,
        controller: 'MultipleSelectCtrl',
        link: function (scope, element, attr, NavigationService) {
            var $element = $(element);
            scope.activeKey = 0;
            scope.isRequired = true;
            if (scope.required === undefined) {
                scope.isRequired = false;
            }
            scope.typeselect = attr.typeselect;
            // $scope.searchNew()
            aa = $element;
            var maxItemLength = 40;
            var maxBoxLength = 200;
            $timeout(function () {

                $element.find(".typeText").keyup(function (event) {
                    var scrollTop = $element.find("ul.allOptions").scrollTop();
                    var optionLength = $element.find("ul.allOptions li").length;
                    if (event.keyCode == 40) {
                        scope.activeKey++;
                    } else if (event.keyCode == 38) {
                        scope.activeKey--;
                    } else if (event.keyCode == 13) {
                        $element.find("ul.allOptions li").eq(scope.activeKey).trigger("click");
                    }
                    if (scope.activeKey < 0) {
                        scope.activeKey = optionLength - 1;
                    }
                    if (scope.activeKey >= optionLength) {
                        scope.activeKey = 0;
                    }
                    var newScroll = -1;
                    var scrollVisibility = (scrollTop + maxBoxLength) - maxItemLength;
                    var currentItemPosition = scope.activeKey * maxItemLength;
                    if (currentItemPosition < scrollTop) {
                        newScroll = (maxItemLength * scope.activeKey);

                    } else if (currentItemPosition > scrollVisibility) {
                        newScroll = (maxItemLength * scope.activeKey);

                    }
                    if (newScroll != -1) {
                        $element.find("ul.allOptions").scrollTop(newScroll);
                    }

                    scope.$apply();
                });

            }, 100);

        }
    };
});

firstapp.filter('ageFilter', function () {
    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function (birthdate) {
        return calculateAge(birthdate);
    };
});

firstapp.filter('momentDate', function () {
    return function (date, format) {
        if (!format) {
            format = "Do MMM YYYY, ddd";
        }
        return moment(date).format(format);
    };
});

firstapp.filter('capitalize', function () {
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});

// firstapp.config(function ($translateProvider) {
//     $translateProvider.translations('en', LanguageEnglish);
//     $translateProvider.translations('hi', LanguageHindi);
//     $translateProvider.preferredLanguage('en');
// });

firstapp.directive('viewField', function ($http, $filter) {
    return {
        templateUrl: 'views/directive/viewField.html',
        scope: {
            type: '=type',
            value: "=value"
        },
        link: function ($scope, element, attrs) {
            if (!$scope.type.type) {
                $scope.type.type = "text";
            }
            $scope.form = {};
            $scope.objectDepth = function () {
                if (_.isObjectLike($scope.storeObj)) {
                    if ($scope.storeValue[$scope.storeObj.field]) {
                        $scope.form.model = $scope.storeValue[$scope.storeObj.field][$scope.storeObj.tableRef];
                        $scope.storeObj = $scope.storeObj.tableRef;
                        if (_.isObjectLike($scope.storeObj)) {
                            $scope.objectDepth();
                        }
                    }
                }
            };
            if (_.isObjectLike($scope.type.tableRef)) {
                $scope.storeObj = $scope.type.tableRef;
                $scope.storeValue = $scope.value;
                $scope.objectDepth();

            } else {
                $scope.form.model = $scope.value[$scope.type.tableRef];
            }

            $scope.template = "views/viewField/" + $scope.type.type + ".html";
        }
    };
});
firstapp.directive('dateForm', function () {
    return {
        scope: {
            ngModel: '=ngModel'
        },
        link: function ($scope, element, attrs) {
            console.log($scope.ngModel);
        }
    };
});

firstapp.directive('detailField', function ($http, $filter, JsonService) {
    return {
        templateUrl: 'views/directive/detailField.html',
        scope: {
            type: '=type',
            value: "=value",
            detailForm: "=form",
            formData: "=data",

        },
        controller: 'DetailFieldCtrl',
        link: function ($scope, element, attrs) {

        }
    };
});

firstapp.filter('urlencoder', function () {
    return function (input) {
        return window.encodeURIComponent(input);
    };
});