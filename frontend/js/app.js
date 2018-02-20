// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice',
  'pascalprecht.translate',
  'angulartics',
  'angulartics.google.analytics'
]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $sceDelegateProvider, $analyticsProvider) {
  // for http request with session
  $httpProvider.defaults.withCredentials = true;
  // $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
  // $analyticsProvider.withAutoBase(true); /* Records full path */
  // $analyticsProvider.trackStates(true);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/embed/**'
  ]);
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "frontend/views/template1.html",
      controller: 'HomeCtrl'
    })
    .state('consultant', {
      url: "/consultant",
      templateUrl: "frontend/views/template.html",
      controller: 'ConsultantCtrl'
    })
    .state('testimonial', {
      url: "/testimonial",
      templateUrl: "frontend/views/template.html",
      controller: 'TestimonialCtrl'
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "frontend/views/template.html",
      controller: 'ContactCtrl'
    })
    .state('booking', {
      url: "/booking",
      templateUrl: "frontend/views/template.html",
      controller: 'BookingCtrl'
    })
    .state('team', {
      url: "/team",
      templateUrl: "frontend/views/template.html",
      controller: 'TeamCtrl'
    })
    .state('privacy', {
      url: "/privacy",
      templateUrl: "frontend/views/template.html",
      controller: 'PrivacyCtrl'
    })
    .state('skin', {
      url: "/category/:name/:id",
      templateUrl: "frontend/views/template.html",
      controller: 'SkinCtrl'
    })
    .state('subCat', {
      url: "/category/:id/:subcatname/:subid",
      templateUrl: "frontend/views/template.html",
      controller: 'SkinCtrl'
    })
    .state('before-after', {
      url: "/before-after",
      templateUrl: "frontend/views/template.html",
      controller: 'BeforeCtrl'
    })
    .state('vitiligo', {
      url: "/vitiligo",
      templateUrl: "frontend/views/template.html",
      controller: 'VitiligoCtrl'
    })
    .state('about-us', {
      url: "/about-us",
      templateUrl: "frontend/views/template.html",
      controller: 'AboutUsCtrl'
    })
    .state('clinic-policy', {
      url: "/clinic-policy",
      templateUrl: "frontend/views/template.html",
      controller: 'ClinicPolicyCtrl'
    })
    .state('blog-detail', {
      url: "/blog-detail/:id",
      templateUrl: "frontend/views/template.html",
      controller: 'BlogDeatilCtrl'
    })
    .state('blog', {
      url: "/blog",
      templateUrl: "frontend/views/template.html",
      controller: 'BlogCtrl'
    })
    // .state('blogsss', {
    //   url: "/blog/:id",
    //   templateUrl: "views/template.html",
    //   controller: 'BlogCtrl'
    // });
  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(isproduction);
});


firstapp.directive('img', function ($compile, $parse) {
  return {
    restrict: 'E',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='frontend/img/loading.gif' class='loading' />");
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
firstapp.directive('autoHeightfixed', function ($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element);
      var windowHeight = $(window).height();
      var addHeight = function () {
        $element.css("height", windowHeight);
      };
      addHeight();
    }
  };
});
firstapp.directive('autoHeight', function ($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element);
      var windowHeight = $(window).height();
      var addHeight = function () {
        $element.css("min-height", windowHeight);
      };
      addHeight();
    }
  };
});
firstapp.filter('trusted', ['$sce', function ($sce) {
  return function (url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);
// firstapp.filter('trusted', ['$sce', function($sce) {
//     return function(url) {
//         return $sce.trustAsResourceUrl(url);
//     };
// }]);
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
        autoPlay: false,
        playSpeed: 3000,
        loop: true,
        helpers: {
          media: {}
        }
      });
    }
  };
});
firstapp.directive('scrollToItem', function () {
  return {
    restrict: 'A',
    scope: {
      scrollTo: "@"
    },
    link: function (scope, $elm, attr) {

      $elm.on('click', function () {
        $('html,body').animate({
          scrollTop: $(scope.scrollTo).offset().top
        }, "slow");
      });
    }
  }
});
firstapp.directive("scroll", function ($window) {
  return function (scope, element, attrs) {
    angular.element($window).bind("scroll", function () {
      var windowHeight = $(window).height();
      if (this.pageYOffset >= 200) {
        // console.log(windowHeight);
        element.addClass('affix');
      } else {
        element.removeClass('affix');
      }
    });
  };
});

// firstapp.config(function ($translateProvider) {
//   $translateProvider.translations('en', LanguageEnglish);
//   $translateProvider.translations('hi', LanguageHindi);
//   $translateProvider.preferredLanguage('en');
// });

firstapp.filter('serverimage', function () {
  return function (image) {
    if (image && image !== null) {

      return adminurl + "upload/readFile?file=" + image;
    } else {
      return undefined;
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
      return imgpath + "?file=" + input + other;
    }
  };
});
firstapp.filter('youtubethumb', function () {
  return function (input, onlyid) {
    if (input) {
      console.log(input);
      var videoid = input.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
      console.log(videoid);
      if (videoid != null) {
        console.log('tgyuhj', videoid);
        if (onlyid == false) {
          return "http://img.youtube.com/vi/" + videoid[1] + "/hqdefault.jpg";
        } else if (onlyid == true) {
          return videoid[1];
        }
      } else {
        return input;
        console.log('1 else', input);
      }
    } else {
      return input;
      console.log('2 else', input);
    }
  };
});
firstapp.directive('scrolldown', function ($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element);
      $scope.scrollDown = function () {
        $('html,body').animate({
            scrollTop: $(".second").offset().top
          },
          'slow');
      };
    }
  };
});

firstapp.directive('touchDown', function ($compile, $parse) {
  return {
    restrict: 'EA',
    replace: false,
    link: function ($scope, element, attrs) {
      var $element = $(element);
      $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 30) {
          $element.addClass('touch-down');
        } else {
          $element.removeClass('touch-down');
        }
      });
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
          if (attr.type == "tel") {
            digits = val.replace(/[^0-9\+\\]/g, '');
          } else {
            digits = val.replace(/[^0-9\-\\]/g, '');
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
firstapp.directive('aplhaOnly', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^a-zA-Z\.\s]/g, '');
        if (transformedInput !== text) {
          ngModelCtrl.$setViewValue(transformedInput);
          ngModelCtrl.$render();
        }
        return transformedInput;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
});
firstapp.filter('urlEncode', [function () {
  return window.encodeURIComponent;
}]);


// firstapp.directive("scrolladdclass", function ($window) {
//   return function (scope, element, attrs) {
//     angular.element($window).bind("scroll", function () {
//       var windowHeight = $( document ).height() - 230;
//               console.log(windowHeight);
//       if (this.pageYOffset >= windowHeight) {
//         element.addClass('addfixed');
//       } else {
//         element.removeClass('addfixed');
//       }
//     });
//   };
// });

// firstapp.filter('uploadpath', function() {
//     return function(input, width, height, style) {
//         var other = "";
//         if (width && width != "") {
//             other += "&width=" + width;
//         }
//         if (height && height != "") {
//             other += "&height=" + height;
//         }
//         if (style && style != "") {
//             other += "&style=" + style;
//         }
//         if (input) {
//             if (input.indexOf('https://') == -1) {
//                 return uploadurl + input + other;
//
//             } else {
//                 return input;
//             }
//         }
//     };
// });