var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

var navigationservice = angular.module('navigationservice', [])

    .factory('NavigationService', function ($http) {
        var navigation = [{
                name: "Slider",
                classis: "active",
                link: "#/page/viewSlider",
                subnav: []
            }, {
                name: "Header Banner",
                classis: "active",
                link: "#/page/viewHeader",
                subnav: []
            }, {
                name: "Category",
                classis: "active",
                link: "#/page/viewCategory",
                subnav: []
            }, {
                name: "Sub-Category",
                classis: "active",
                link: "#/page/viewSubCategory",
                subnav: []
            }, {
                name: "Doctor",
                classis: "active",
                link: "#/page/viewDoctor",
                subnav: []
            }, {
                name: "Blog",
                classis: "active",
                link: "#/page/viewBlog",
                subnav: []
            }, {
                name: "Tags",
                classis: "active",
                link: "#/page/viewTags",
                subnav: []
            }, {
                name: "Testimonial",
                classis: "active",
                link: "#/page/viewTestimonial",
                subnav: []
            }, {
                name: "Media",
                classis: "active",
                link: "#/page/viewMedia",
                subnav: []
            }, {
                name: "Before After",
                classis: "active",
                link: "#/page/viewBeforeAfter",
                subnav: []
            },
            {
                name: "Subscribe",
                classis: "active",
                link: "#/page/viewSubscribe",
                subnav: []
            },
            {
                name: "Contact Us",
                classis: "active",
                link: "#/page/viewContactUs",
                subnav: []
            }
        ];

        return {
            getnav: function () {
                return navigation;
            },
            makeactive: function (menuname) {
                for (var i = 0; i < navigation.length; i++) {
                    if (navigation[i].name == menuname) {
                        navigation[i].classis = "active";
                    } else {
                        navigation[i].classis = "";
                    }
                }
                return menuname;
            },

            parseAccessToken: function (data, callback) {
                if (data) {
                    $.jStorage.set("accessToken", data);
                    callback();
                }
            },
            removeAccessToken: function (data, callback) {
                $.jStorage.flush();
            },
            profile: function (callback, errorCallback) {
                var data = {
                    accessToken: $.jStorage.get("accessToken")
                };
                $http.post(adminurl + 'user/profile', data).then(function (data) {
                    data = data.data;
                    if (data.value === true) {
                        $.jStorage.set("profile", data.data);
                        callback();
                    } else {
                        errorCallback(data.error);
                    }
                });
            },
            makeactive: function (menuname) {
                for (var i = 0; i < navigation.length; i++) {
                    if (navigation[i].name == menuname) {
                        navigation[i].classis = "active";
                    } else {
                        navigation[i].classis = "";
                    }
                }
                return menuname;
            },

            search: function (url, formData, i, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data, i);
                });
            },
            delete: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            },
            countrySave: function (formData, callback) {
                $http.post(adminurl + 'country/save', formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },

            apiCall: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },
            searchCall: function (url, formData, i, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data, i);
                });
            },

            apiCallWithData: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },

            callApi: function (url, callback) {
                $http.post(adminurl + url).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            },

            getCall: function (url, callback) {
                $http.get(url).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            },

            getOneCountry: function (id, callback) {
                $http.post(adminurl + 'country/getOne', {
                    _id: id
                }).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },
            getLatLng: function (address, i, callback) {
                $http({
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC62zlixVsjaq4zDaL4cefNCubjCgxkte4",
                    method: 'GET',
                    withCredentials: false,
                }).then(function (data) {
                    data = data.data;
                    callback(data, i);
                });
            },
            uploadExcel: function (form, callback) {
                $http.post(adminurl + form.model + '/import', {
                    file: form.file
                }).then(function (data) {
                    data = data.data;
                    callback(data);

                });

            },

            saveCategory: function (formData, callback) {
                $http.post(adminurl + 'Categories/save', formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },

            savedataApi: function(data, apiName, successCallback, errorCallback) {
                $http.post(adminurl + apiName, data).success(successCallback).error(errorCallback);
            },
            
            deleteProject: function(data, successCallback, errorCallback) {
                $http.post(adminURL + "project/delete", data).success(successCallback).error(errorCallback);
            },
            findProjects: function(apiName, pagination, successCallback, errorCallback) {
                $http.post(adminurl + apiName, pagination).success(successCallback).error(errorCallback);
            },
            findOneProject: function(apiName, urlParams, successCallback, errorCallback) {
                console.log(adminurl + apiName);
                $http.post(adminurl + apiName, urlParams).success(successCallback).error(errorCallback);
            },
            sideMenu1: function(apiName, pagination, successCallback, errorCallback) {
                $http.post(adminurl + apiName, pagination).success(successCallback).error(errorCallback);
            },
            submitLogin: function(data, successCallback, errorCallback) {
                $http.post(adminurl + "register/login", data).success(successCallback).error(errorCallback);
            },
            deleteApi: function(data, successCallback, errorCallback) {
                $http.post(adminURL + "api/delete", data).success(successCallback).error(errorCallback);
            },
            getDropDown: function(apiName, successCallback, errorCallback) {
                $http.post(adminurl + apiName).success(successCallback).error(errorCallback);
            },
            logout: function(successCallback, errorCallback) {
                $http.post(adminurl + "register/logout").success(successCallback).error(errorCallback);
            },
    

        };
    });