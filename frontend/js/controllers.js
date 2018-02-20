angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ksSwiper', 'infinite-scroll', 'angular-loading-bar', 'ui.select','angulartics','angulartics.google.analytics'])

.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout) {

        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("Home");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();

        NavigationService.getHomeslider(function (data) {
            $scope.Homeslider = data.data;
            // console.log("Homeslider", $scope.Homeslider);
            // _.each($scope.Homeslider,function(key){
            //   key.url=key.url.split('/');
            // })

        });


        $scope.mySlides = [{
            img: "img/banner/bo.jpg",
            image: "img/banner/1.png",
            link: ""
        }, {
            img: "img/banner/m1.jpg",
            image: "img/banner/5.png",
            link: ""
        }, {
            img: "img/banner/md1.jpg",
            image: "img/banner/6.png",
            link: ""
        }, {
            img: "img/banner/s1.jpg",
            image: "img/banner/3.png",
            link: "skin"
        }, {
            img: "img/banner/t1.jpg",
            image: "img/banner/2.png",
            link: ""
        }, {
            img: "img/banner/v1.jpg",
            image: "img/banner/4.png",
            link: "vitiligo"
        }];
        $scope.homes = [{
            img: "img/1.jpg",
            image: "img/banner/mb1.jpg",
            link: ""
        }, {
            img: "img/1.jpg",
            image: "img/banner/5.png",
            link: ""
        }, {
            img: "img/1.jpg",
            image: "img/banner/6.png",
            link: ""
        }, {
            img: "img/1.jpg",
            image: "img/banner/3.png",
            link: "skin"
        }, {
            img: "img/1.jpg",
            image: "img/banner/2.png",
            link: ""
        }, {
            img: "img/1.jpg",
            image: "img/banner/4.png",
            link: "vitiligo"
        }];
    })
    .controller('navCtrl', function ($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService;
        NavigationService.getnav(function (data) {
            $scope.navigation = data.data;
            // console.log("  $scope.navigation", $scope.navigation);
        });
    })
    .controller('headerctrl', function ($scope, TemplateService, NavigationService, $state) {
        $scope.template = TemplateService;
        var get = false;
        $scope.oneAtATime = true;
        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };
        $scope.getslide = "menu-out";
        $scope.getNav = function () {
            if ($scope.getslide == "menu-in") {
                $scope.getslide = "menu-out";
                $scope.onebar = "";
                $scope.secondbar = "";
                $scope.thirdbar = "";
                $scope.buttonpos = "";
            } else {
                $scope.getslide = "menu-in";
                $scope.onebar = "firstbar";
                $scope.secondbar = "secondbar";
                $scope.thirdbar = "thirdbar";
                $scope.buttonpos = "hidden";
            }
        };
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
            //     $(window).scroll(function() {
            //         var scroller = $(document).scrollTop();
            //         var height = 100;
            //         if (height <= scroller) {
            //             $('.back-to-top ').fadeIn();
            //
            //         } else {
            //         $('.back-to-top ').fadeOut();
            //
            //         }
            //     });
        });
        $.fancybox.close(true);
        $scope.subCatarr = [];
        $scope.mainSeracharr = [];
        $scope.mainCatarr = [];
        $scope.flattensubCatarr = [];
        NavigationService.getnav(function (data) {
            $scope.navigation = data.data;
            // console.log("  $scope.navigation", $scope.navigation);
            _.each($scope.navigation, function (key) {
                $scope.mainCatarr.push(key);
                $scope.subCatarr.push(key.subnav);
            });
            _.each($scope.mainCatarr, function (value) {
                value.subCatName = value.name;
            });



            // console.log($scope.subCatarr, "$scope.subCatarr");
            $scope.flattensubCatarr = _.flattenDeep($scope.subCatarr);
            _.each($scope.flattensubCatarr, function (val) {
                    val.subCatName1 = val.subCatName;
                })
                // console.log("  $scope.flattensubCatarr", $scope.flattensubCatarr);
            $scope.mainSeracharr = $scope.mainCatarr.concat($scope.flattensubCatarr);
            // console.log($scope.mainSeracharr, "  $scope.mainSeracharr");
            // console.log($scope.navigation[0] ,"$scope.navigation[0] ");
            //  $scope.selected = { value: $scope.navigation[0] };
            //  console.log(" $scope.selected ", $scope.selected );
        });

        $scope.gotoSearch = function () {
            $scope.searchExp = !$scope.searchExp;
        }

        NavigationService.getAllCategory(function (data) {
            $scope.categories = data.data;
        });

        $scope.DoSearch = function (name, id, catid, subcatname) {
            // console.log("im in do search");
            if (name && id) {
                $state.go('skin', {
                    name: name,
                    id: id
                });
            } else if (id && catid && subcatname) {
                $state.go('subCat', {

                    id: catid,
                    subcatname: subcatname,
                    subid: id

                });

            }
        };





    })

.controller('ContactCtrl', function ($scope, TemplateService, NavigationService, $uibModal, $timeout) {

        $scope.template = TemplateService.changecontent("contact");
        $scope.menutitle = NavigationService.makeactive("Contact");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();

        NavigationService.getHeaderContact(function (data) {
            $scope.conatctHeader = data.data;
        })
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });


        $(document).ready(function () {
            // console.log("im in");
            $('.maps').click(function () {
                $('.maps iframe').css("pointer-events", "auto");
                // console.log("im in");
            });


            $(".maps").mouseleave(function () {
                $('.maps iframe').css("pointer-events", "none");
            });
        });

        $scope.contactForm = {};
        $scope.showform = false;
        $scope.submitForm = function (contactForm) {
                // console.log("contactForm", contactForm);
                NavigationService.booking(contactForm, function (data) {
                    console.log("data", data);
                    if (data.value) {
                        // console.log("im true");
                        // $scope.bookingFormComplete= true;
                        $scope.showform = true;
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modal/thankyou.html',
                            backdropClass: "backcolor"
                        });
                        $timeout(function () {
                            $scope.showform = false;
                            $scope.contactForm = {};
                        }, 2000);

                    } else if (!data.value) {
                        if (data.data === 'Please Enter Email ID') {
                            $scope.message = "Please Enter Valid Email ID";
                        }
                    }
                })

            }
            // $scope.scrollDownMap = function(){

        // $('html,body').animate({
        //             scrollTop: $(".contact-form").outerHeight()
        //           },'slow');
        // };



    })
    .controller('BookingCtrl', function ($scope, TemplateService, NavigationService) {

        $scope.template = TemplateService.changecontent("booking");
        $scope.menutitle = NavigationService.makeactive("Booking");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();


    })
    .controller('AboutUsCtrl', function ($scope, TemplateService, NavigationService) {

        $scope.template = TemplateService.changecontent("about-us");
        $scope.menutitle = NavigationService.makeactive("About Us");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();
        NavigationService.getHeaderAbout(function (data) {
            $scope.headerAbout = data.data;
        })
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });
        //         $scope.scrollDownMap = function(){

        // $('html,body').animate({
        //             scrollTop: $(".second").offset().top
        //           },'slow');
        // };


    })
    .controller('TestimonialCtrl', function ($scope, TemplateService, NavigationService) {

        $scope.template = TemplateService.changecontent("testimonial");
        $scope.menutitle = NavigationService.makeactive("Testimonial");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();

        NavigationService.getHeaderTestimonial(function (data) {
            $scope.testimonialHeader = data.data;

        });
        NavigationService.getTestimonial(function (data) {
            $scope.Testimonial = data.data;

        })

        $scope.testslide = [{
            name: "Lorem Ipsum",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }, {
            name: "Lorem Phirse",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }];
    })
    .controller('TeamCtrl', function ($scope, TemplateService, NavigationService) {

        $scope.template = TemplateService.changecontent("team");
        $scope.menutitle = NavigationService.makeactive("Team");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();
        NavigationService.getHeaderTeam(function (data) {
            $scope.teamHeader = data.data;

        })
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });
    })

.controller('SkinCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $timeout, $state) {
        $scope.template = TemplateService.changecontent("skin");
        $scope.menutitle = NavigationService.makeactive("Skin");
        TemplateService.title = $scope.menutitle;

        NavigationService.getCatByName($stateParams.id, function (data) {
            if (data.data != '' && data.value) {
                $scope.category = data.data;
                // console.log("    $scope.category", $scope.category);
                if ($stateParams.subid) {
                    $scope.tabActive($stateParams.subid, 0);
                } else {
                    $scope.tabActive($scope.category[0]._id, 0);
                }

            } else {
                // $state.go('home');
            }
        });
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });

        $scope.onOver = function (indexid) {

        }
        $scope.tabActive = function (id, indexid, item) {
            _.each($scope.category, function (key) {
                if (key._id == id) {
                    key.activetab = true;
                } else {
                    key.activetab = false;

                }
            });
            NavigationService.getSubCat(id, function (data) {
                $scope.subCategory = data.data;
                // console.log("  $scope.subCategory", $scope.subCategory);
                $scope.subCategory.style = {
                    "background-color": $scope.category[0].category.color,
                    "border-color": $scope.category[0].category.color
                }

                $scope.subCategory.stylea = {
                    "color": "white"
                }

                $scope.subCatid = id;
                _.each($scope.category, function (key) {
                    key.style = {};
                    key.stylea = {};
                    if (key._id == id) {
                        // key.activetab = true;
                        key.style = {
                            "background-color": $scope.category[0].category.color,
                            "border-color": $scope.category[0].category.color
                        };
                        key.stylea = {
                            "color": "white"
                        };
                    } else {
                        // key.activetab = false;
                        key.style = {
                            "border-color": $scope.category[0].category.color
                        };

                    }
                });
                // $scope.category[indexid].activetab = true;



            });

        };

        $scope.tab = 'tab1';
        $scope.classa = 'active-tab';
        $scope.classb = '';
        $scope.classc = '';
        $scope.classd = '';
        $scope.classe = '';
        $scope.classf = '';
        $scope.classg = '';
        $scope.classh = '';

        $scope.tabchange = function (tab, a, id) {
            $scope.tab = tab;
            if (a == 1) {
                $scope.classa = "active-tab";
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 2) {

                $scope.classa = '';
                $scope.classb = "active-tab";
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 3) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "active-tab";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 4) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = 'active-tab';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 5) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = 'active-tab';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 6) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = 'active-tab';
                $scope.classg = '';
                $scope.classh = '';
            } else if (a == 7) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = 'active-tab';
                $scope.classh = '';
            } else if (a == 8) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = "";
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = 'active-tab';
            }
        };
        $scope.tabing = [{
            name: "Tanning and Pigmentation",
            class: "classa",
            tab: "tab1",
            id: "1",
            ngclass: "movieSynopsisAndNote.synopsis ==''",
            ngdisabled: "movieSynopsisAndNote.synopsis ==''",
            index: 0
        }, {
            name: "Excessive Sweating",
            class: "classb",
            tab: "tab2",
            id: "2",
            ngclass: "movieCast.length<=0",
            ngdisabled: "movieCast.length<=0",
            index: 1
        }, {
            name: "Uneven Skin tone",
            class: "classc",
            tab: "tab3",
            id: "3",
            ngclass: "movieNews.length<=0",
            ngdisabled: "movieNews.length<=0",
            index: 2,
            nghide: "movieNews.length<=0"
        }, {
            name: "Body Shaping",
            class: "classd",
            tab: "tab4",
            id: "4",
            ngclass: "MovieGal.length<=0",
            ngdisabled: "MovieGal.length<=0",
            index: 3
        }, {
            name: "Post baby body treatments",
            class: "classe",
            tab: "tab5",
            id: "5",
            ngclass: "movieBehindTheScenes.length<=0",
            ngdisabled: "movieBehindTheScenes.length<=0",
            index: 4
        }, {
            name: "Excessive Body Hair",
            class: "classf",
            tab: "tab6",
            id: "6",
            ngclass: "movieVideo10.length<=0",
            ngdisabled: "movieVideo10.length<=0",
            index: 5
        }, {
            name: "Excessive Body Hair",
            class: "classg",
            tab: "tab7",
            id: "7",
            ngclass: "movieWallpaper.length<=0",
            ngdisabled: "movieWallpaper.length<=0",
            index: 6
        }, {
            name: "Excessive Body Hair",
            class: "classh",
            tab: "tab8",
            id: "8",
            ngclass: "MovieAwards.length  == 0",
            ngdisabled: "MovieAwards.length  == 0",
            index: 7,
            nghide: "MovieAwards.length  == 0"
        }];
        $scope.oneAtATime = true;

        $scope.groups = {
            title: 'Dynamic Group Header - 1'

        };


    })
    .controller('PrivacyCtrl', function ($scope, TemplateService, NavigationService) {

        $scope.template = TemplateService.changecontent("privacy");
        $scope.menutitle = NavigationService.makeactive("Privacy");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();

        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });
    })
    .controller('VitiligoCtrl', function ($scope, TemplateService, NavigationService) {

        $scope.template = TemplateService.changecontent("vitiligo");
        $scope.menutitle = NavigationService.makeactive("Vitiligo");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();
        $scope.tabs = 'first';
        $scope.classp = 'active-tab';
        $scope.classv = '';


        $scope.tabchanges = function (tabs, a) {
            $scope.tabs = tabs;
            if (a == 1) {

                $scope.classp = "active-tab";
                $scope.classv = '';

            } else {

                $scope.classp = '';
                $scope.classv = "active-tab";
            }
        };
    })
    .controller('BeforeCtrl', function ($scope, TemplateService, NavigationService) {

        $scope.template = TemplateService.changecontent("before");
        $scope.menutitle = NavigationService.makeactive("Before & After");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();
        $scope.tabs = 'acne';
        $scope.classa = 'active-tab';
        $scope.classb = '';
        $scope.classc = '';
        $scope.classd = '';
        $scope.classe = '';
        $scope.classf = '';
        $scope.classg = '';
        $scope.classh = '';
        $scope.classi = '';
        $scope.classj = '';

        // NavigationService.getHeaderBefore(function(data) {
        //     $scope.headerBefore = data.data;
        //
        // })
        NavigationService.getheaderBefore(function (data) {
            $scope.headerBefore = data.data;
        })

        NavigationService.getAllBefore(function (data) {
            $scope.before = data.data;
            $scope.tabActive($scope.before[0]._id, 0);
        })

        $scope.tabActive = function (id, indexid) {
            $scope.subCatid = id;
            _.each($scope.before, function (key) {
                key.activetab = false;
            });
            $scope.before[indexid].activetab = true;
            NavigationService.getOnebeforeafter(id, function (data) {
                $scope.subCategoryBefore = data.data;

            })

        };


        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });

        $scope.tabchanges = function (tabs, a) {
            $scope.tabs = tabs;
            if (a == 1) {

                $scope.classa = 'active-tab';
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
                $scope.classi = '';
                $scope.classj = '';

            } else if (a == 2) {

                $scope.classa = '';
                $scope.classb = 'active-tab';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
                $scope.classi = '';
                $scope.classj = '';
            } else if (a == 3) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = 'active-tab';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
                $scope.classi = '';
                $scope.classj = '';
            } else if (a == 4) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = 'active-tab';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
                $scope.classi = '';
                $scope.classj = '';
            } else if (a == 5) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = 'active-tab';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
                $scope.classi = '';
                $scope.classj = '';
            } else if (a == 6) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = 'active-tab';
                $scope.classg = '';
                $scope.classh = '';
                $scope.classi = '';
                $scope.classj = '';
            } else if (a == 7) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = 'active-tab';
                $scope.classh = '';
                $scope.classi = '';
                $scope.classj = '';
            } else if (a == 8) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = 'active-tab';
                $scope.classi = '';
                $scope.classj = '';
            } else if (a == 9) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
                $scope.classi = 'active-tab';
                $scope.classj = '';
            } else if (a == 10) {

                $scope.classa = '';
                $scope.classb = '';
                $scope.classc = '';
                $scope.classd = '';
                $scope.classe = '';
                $scope.classf = '';
                $scope.classg = '';
                $scope.classh = '';
                $scope.classi = '';
                $scope.classj = 'active-tab';
            }

        };
    })
    .controller('ClinicPolicyCtrl', function ($scope, TemplateService, NavigationService) {
        $scope.template = TemplateService.changecontent("clinic-policy");
        $scope.menutitle = NavigationService.makeactive("clinic-policy");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();
        NavigationService.getClinicPolicy(function (data) {
            $scope.clinicPolicy = data.data;
        });
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });
    })
    .controller('ConsultantCtrl', function ($scope, TemplateService, NavigationService, $uibModal, $timeout) {

        $scope.template = TemplateService.changecontent("consultant");
        $scope.menutitle = NavigationService.makeactive("Consultant");
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        NavigationService.getAllDoctor(function (data) {
            $scope.doctor = data.data;

        });

        NavigationService.getHeaderDoctor(function (data) {
            $scope.doctorHeader = data.data;
        });
        NavigationService.getDoctorSlider(function (data) {
            $scope.doctorSlider = data.data;
            $scope.allDocs = _.cloneDeep($scope.doctorSlider);
        });

        $scope.doctors = [{
            img: "img/d1.jpg",
            name: "Dr. Narendra J Pandya",
            spl: "(Dermatologist)",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        }, {
            img: "img/d2.jpg",
            name: "Dr. Zarna Parekh",
            spl: "(Dermatologist)",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        }, {
            img: "img/d3.jpg",
            name: "Dr. Sarvesh Brahme",
            spl: "(Dermatologist)",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        }, {
            img: "img/d4.jpg",
            name: "Dr. Harshit Shah",
            spl: "(Dermatologist)",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        }, {
            img: "img/d4.jpg",
            name: "Dr. Narendra Shah",
            spl: "(Dermatologist)",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        }, {
            img: "img/d4.jpg",
            name: "Dr. Narendra Shah",
            spl: "(Dermatologist)",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        }, {
            img: "img/d4.jpg",
            name: "Dr. Narendra Shah",
            spl: "(Dermatologist)",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        }, {
            img: "img/d4.jpg",
            name: "Dr. Harshit Shah",
            spl: "(Dermatologist)",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        }];
        // $scope.doctor = [{
        //   img: "img/d1.jpg",
        //   name: "Dr. Narendra J Pandya",
        //   spl: "(Dermatologist)",
        //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        // }, {
        //   img: "img/d2.jpg",
        //   name: "Dr. Zarna Parekh",
        //   spl: "(Dermatologist)",
        //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        // }, {
        //   img: "img/d3.jpg",
        //   name: "Dr. Sarvesh Brahme",
        //   spl: "(Dermatologist)",
        //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        // }, {
        //   img: "img/d4.jpg",
        //   name: "Dr. Harshit Shah",
        //   spl: "(Dermatologist)",
        //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        // }, {
        //   img: "img/d4.jpg",
        //   name: "Dr. Narendra Shah",
        //   spl: "(Dermatologist)",
        //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        // }, {
        //   img: "img/d4.jpg",
        //   name: "Dr. Narendra Shah",
        //   spl: "(Dermatologist)",
        //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        // }, {
        //   img: "img/d4.jpg",
        //   name: "Dr. Narendra Shah",
        //   spl: "(Dermatologist)",
        //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        // }, {
        //   img: "img/d4.jpg",
        //   name: "Dr. Harshit Shah",
        //   spl: "(Dermatologist)",
        //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
        // }]
        $scope.nextDoctor = function () {
            var newarr = $scope.allDocs;
            var startArr = _.slice(newarr, 0, 1);
            var endArr = _.slice(newarr, 1);
            $scope.allDocs = _.union(endArr, startArr);
            _.each($scope.allDocs, function (key) {
                key.active = false;
            });
            $scope.allDocs[0].active = true;
        };
        $scope.reAssemble = function (index, inSlider) {
            if (inSlider) {
                $scope.doctorSliders = $scope.allDocs;
            } else {
                $scope.doctorSliders = $scope.doctorSlider;
            }
            var startArr = _.slice($scope.doctorSliders, 0, index);
            var endArr = _.slice($scope.doctorSliders, index);
            $scope.allDocs = _.union(endArr, startArr);
        };
        $scope.openModal = function (index) {
            $scope.reAssemble(index, false);
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/modal/slider.html',
                // controller: 'ConsultantCtrl',
                scope: $scope.$new(),
                size: 'lg',
                windowClass: 'slider-modal',
            });
        };

        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });
    })
    .controller('BlogCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $state,$analytics ) {

        $scope.template = TemplateService.changecontent("blog");
        $scope.menutitle = NavigationService.makeactive("Blog");
        $scope.filter = null;
        TemplateService.title = $scope.menutitle;
        // $scope.navigation = NavigationService.getnav();
        $scope.blogmsg = "Loading...";
        $scope.popularmsg = "Loading...";
        $scope.tagmsg = "Loading...";

        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        }); 

        // GET ALL BLOG BY JAGRUTI
        // BLOG PAGINATION
        $scope.pagenumber = 1;
        $scope.blog = [];
        $scope.shouldscroll = false;
        $scope.search = {};
        $scope.search.search = "";
        $scope.tagId = [];

        $scope.loadnotification = function (pageno) {

            NavigationService.getAllBlog(pageno, $scope.search.search, $scope.tagId, function (data) {
                _.each(data.data.data, function (n) {
                    $scope.blog.push(n);
                })

                if (data.data.data == "") {
                    $scope.shouldscroll = true;
                }
                if ($scope.blog.length == 0) {
                    $scope.blogmsg = "No Blogs.";
                } else {
                    $scope.blogmsg = "";
                }
            });

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.loadnotification(1);

        $scope.loadMore = function () {
            $scope.loadnotification(++$scope.pagenumber);
        };

        //code by nilesh
        $scope.clearFilter = function () {
            $scope.filter = null;
            $state.reload();
        };

        $scope.gotoTagFun = function (value) {
                $scope.pagenumber = 1;
                $scope.tagId = [];
                $scope.blog = [];
                $scope.filter = value.name;
                $scope.shouldscroll = false;
                $scope.tagId.push(value._id);
                // console.log("$scope.tagId.push", $scope.tagId, value);
                $scope.loadnotification(1);


                // $state.go('blog', {
                //     id: id
                // })
            }
            // if ($stateParams.id) {
            //   $scope.gotoTagFun($stateParams.id);
            // }
            //  SEARCH BLOG
        $scope.doSearch = function () {
            $scope.pagenumber = 1;
            $scope.blog = [];
            // $scope.tagId=[];
            $scope.shouldscroll = false;
            $scope.loadnotification(1);
        }

        //  POPULAR POST AND TAGS
        $scope.post = [];
        $scope.tags = [];
        NavigationService.getPostTags(function (data) {
            $scope.post = data.data.popularposts;
            $scope.tags = data.data.tags;
            if ($scope.post == '') {
                $scope.popularmsg = "No Popular Posts."
            } else {
                $scope.popularmsg = "";
            }
            if ($scope.tags == '') {
                $scope.tagmsg = "No Tags."
            } else {
                $scope.tagmsg = "";
            }
        });
        // GET ALL BLOG BY JAGRUTI
        $scope.t = {};
        $scope.t.showTag = false;
        $scope.showTag = function (flag) {
            $scope.t.showTag = flag;
        };

        NavigationService.getHeaderBlog(function (data) {
            $scope.blogHeader = data.data;
            console.log("$scope.blogHeader", $scope.blogHeader);
        })

        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('.back-to-top ').fadeIn();
            } else {
                $('.back-to-top ').fadeOut();
            }
        });



        //analytic Event Tracking
        $scope.analyticalCodeBlog = function (data) {
            console.log("name",data);
            $analytics.eventTrack('Blog View', {
                category: 'Blog View',
                label: "data"
            });
        };

        // $scope.constraintsForTags={};
        // $scope.constraintsForTags.pagenumber=1;
        // $scope.constraintsForTags.pagesize=2;
        // $scope.constraintsForTags.search="";
        // $scope.constraintsForTags.tagId=[];



        // $scope.gotoTagFun=function (id) {
        //   $scope.blog=[];
        //   $scope.constraintsForTags.tagId=[];
        //     $scope.constraintsForTags.pagenumber=1;
        //     $scope.constraintsForTags.tagId.push(id);
        //     ====================for future requirement================
        // var findIndex = _.findIndex($scope.constraintsForTags.tagId,function(key){
        //     console.log("key",key);
        //     return key == id;
        //   });
        //   console.log("findIndex",findIndex);
        //   if (findIndex >= 0) {
        //     $scope.constraintsForTags.tagId.splice(findIndex,1 );
        //
        //   }else {
        // $scope.constraintsForTags.tagId.push(id);
        //   }
        //   ====================for future requirement================
        //
        // $scope.loadingTags=function(){
        //
        //   NavigationService.getBlogByTags($scope.constraintsForTags,function(data){
        //     console.log("$scope.constraintsForTags",$scope.constraintsForTags);
        //
        //     $scope.allBlogs=data.data;
        //
        //   _.each($scope.allBlogs, function(n) {
        //       $scope.blog.push(n);
        //   })
        //   })
        // }
        // $scope.loadingTags();
        //
        //   $scope.loadMore = function() {
        //     console.log("im in load more");
        //
        //       $scope.constraintsForTags.pagenumber++;
        //       console.log("$scope.constraintsForTags.pagenumber",$scope.constraintsForTags.pagenumber);
        //
        //       $scope.loadingTags();
        //   };
        //   $scope.doSearch = function() {
        //     $scope.constraintsForTags.pagenumber=1;
        //       $scope.blog = [];
        //       $scope.shouldscroll = false;
        //       $scope.constraintsForTags.search=$scope.search.search;
        //     $scope.loadingTags();
        //   }
        // }


    })

.controller('BlogDeatilCtrl', function ($scope, TemplateService, NavigationService, $state, $location, $analytics) {

    $scope.template = TemplateService.changecontent("blog-detail");
    $scope.menutitle = NavigationService.makeactive("Blog");
    // $scope.navigation = NavigationService.getnav();
    $scope.myUrl = $location.absUrl();

    $scope.popularmsg = "Loading...";
    $scope.tagmsg = "Loading...";
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.back-to-top ').fadeIn();
        } else {
            $('.back-to-top ').fadeOut();
        }
    });
    //  BLOG DETAIL BY JAGRUTI
    $scope.popular = [];
    $scope.blog = [];
    //  GET BLOG DETAIL
    NavigationService.getOneBlog($state.params.id, function (data) {
        $scope.blog = data.data;
        console.log("  $scope.blog", $scope.blog);
        if ($scope.blog.blog.tag) {
            if ($scope.blog.blog.tag == "") {
                $scope.tagmsg = "No Tags.";
            } else {
                $scope.tagmsg = "";
            }
        }
            TemplateService.title = $scope.blog.blog.name;
        // ga('send', {
        //     hitType: 'pageview',
        //     page: '/blog-detail/'
        // });

        // ga('send', {
        //     hitType: 'event',
        //     eventCategory: 'Blogs',
        //     eventAction: 'Cick',
        //     eventLabel: $scope.blog.blog.name
        // });

    });




    //  GET POPULAR POST
    NavigationService.getPopularPosts(function (data) {
        $scope.popular = data.data;
        if ($scope.popular == "") {
            $scope.popularmsg = "No Popular Post.";
        } else {
            $scope.popularmsg = "";
        }
    });
    //  BLOG DETAIL BY JAGRUTI
    NavigationService.getHeaderBlog(function (data) {
        $scope.blogHeader = data.data;
    })
})

.controller('footerctrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    $scope.template = TemplateService;
    NavigationService.getAllCategory(function (data) {
        $scope.footer = data.data;
    });

    $scope.formData = {};
    $scope.formComplete = false;
    $scope.emailExist = false;
    $scope.subscribe = function (formData) {
        if ($scope.formData) {
            NavigationService.subscribe($scope.formData, function (data) {
                if (data.value === true) {
                    $scope.formComplete = true;
                    $scope.emailExist = false;
                    $timeout(function () {
                        $scope.formComplete = false;
                        $scope.emailExist = false;
                        $scope.formData = {};
                    }, 2000);

                } else if (data.value === false) {
                    $scope.emailExist = true;
                }
            })

        }
    }

    $scope.bookingFun = function () {
        $scope.bookTab = !$scope.bookTab;
        // console.log("im in");
    };
    $scope.contactForm = {};
    $scope.submitForm = function (contactForm) {
        // console.log("contactForm", contactForm);
        NavigationService.booking(contactForm, function (data) {
            // console.log("data", data);
            if (data.value) {
                // console.log("im true");
                // $scope.bookingFormComplete= true;
                // $scope.bookTab=false;
                $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modal/thankyou.html',
                    backdropClass: "backcolor"
                });
                $timeout(function () {
                    $scope.bookTab = false;
                    $scope.contactForm = {};
                }, 2000);

            } else if (!data.value) {
                if (data.data === 'Please Enter Email ID') {
                    $scope.message = "Please Enter Valid Email ID";
                }
            }
        })
    }

})

.controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function () {

        if (!$.jStorage.get("language")) {
            $translate.use("hi");
            $.jStorage.set("language", "hi");
        } else {
            if ($.jStorage.get("language") == "en") {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                $translate.use("en");
                $.jStorage.set("language", "en");
            }
        }
        //  $rootScope.$apply();
    };


})

;