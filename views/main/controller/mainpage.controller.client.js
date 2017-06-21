(function () {
    angular.module("RollingFood")
        .controller("MainController", MainController);

    function MainController($location) {
        var model = this;
        model.jumpToSearchList = jumpToSearchList;

        function jumpToSearchList(keyword) {
            $location.url("/list?keyword=" + keyword);
        }
    }
})();