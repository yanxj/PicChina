/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-26
 * Time: 上午11:15
 * To change this template use File | Settings | File Templates.
 */
//实现滑动翻页
var touchClass = function () {
    var bodyWidth = $("body").width();
    var currentPage = 1;
    var startX = 0;
    var lastX = 0;
    var dist = 0;
    this.touch = function (el, pageCount, pageLength, action) {

        $(el).css({"-webkit-transition":"-webkit-transform .5s ease-out",
            "-moz-transition":"-moz-transform .5s ease-out",
            "-o-transition":"-o-transform .5s ease-out",
            "-ms-transition":"-ms-transform .5s ease-out",
            "transition":"transform .5s ease-out",
            "-webkit-transform-style":"preserve-3d",
            "-moz-transform-style":"preserve-3d",
            "-o-transform-style":"preserve-3d",
            "-ms-transform-style":"preserve-3d",
            "transform-style":"preserve-3d"
        });
        $(el).on("touchstart touchmove touchend MSPointerDown MSPointerMove MSPointerUp", function (event) {
            event.preventDefault();
            event.stopPropagation();
            var velocity = 0;
            var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
            if (event.type == 'touchstart' || event.type == 'MSPointerDown') {
                startX = touch.clientX;
            }
            if (event.type == 'touchmove' || event.type == 'MSPointerMove') {
//                $(el).css({"-webkit-transition":"-webkit-transform 0s ease-out",
//                    "-moz-transition":"-moz-transform 0s ease-out",
//                    "-o-transition":"-o-transform 0s ease-out",
//                    "-ms-transition":"-ms-transform 0s ease-out",
//                    "transition":"transform 0s ease-out",
//                    "-webkit-transform-style":"preserve-3d",
//                    "-moz-transform-style":"preserve-3d",
//                    "-o-transform-style":"preserve-3d",
//                    "-ms-transform-style":"preserve-3d",
//                    "transform-style":"preserve-3d"
//                });
                velocity++;
                $(el).css({"-webkit-transform":"translate3d(" + (dist + touch.clientX - startX) + "px,0px,0px)",
                    "-moz-transform":"translate3d(" + (dist + touch.clientX - startX) + "px,0px,0px)",
                    "-o-transform":"translate3d(" + (dist + touch.clientX - startX) + "px,0px,0px)",
                    "-ms-transform":"translate3d(" + (dist + touch.clientX - startX) + "px,0px,0px)",
                    "transform":"translate3d(" + (dist + touch.clientX - startX) + "px,0px,0px)"
                });
            }
            if (event.type == 'touchend' || event.type == 'MSPointerUp') {
                lastX = touch.clientX;
                if (Math.abs(lastX - startX) > (bodyWidth / 10) || velocity >= 2) {
                    if (lastX - startX < 0) {
                        if (currentPage != pageCount) {
                            dist = dist - pageLength;
                            currentPage++;
                        }
                    } else {
                        if (currentPage != 1) {
                            dist = dist + pageLength;
                            currentPage--;
                        }
                    }
                }
                $(el).css({"-webkit-transform":"translate3d(" + (dist) + "px,0px,0px)",
                    "-moz-transform":"translate3d(" + (dist) + "px,0px,0px)",
                    "-o-transform":"translate3d(" + (dist) + "px,0px,0px)",
                    "-ms-transform":"translate3d(" + (dist) + "px,0px,0px)",
                    "transform":"translate3d(" + (dist) + "px,0px,0px)"
                });
            }
            action(currentPage);
        });
    }
    this.move = function (el) {
        $(el).css({"-webkit-transform":"translate3d(" + (dist) + "px,0px,0px)",
            "-moz-transform":"translate3d(" + (dist) + "px,0px,0px)",
            "-o-transform":"translate3d(" + (dist) + "px,0px,0px)",
            "-ms-transform":"translate3d(" + (dist) + "px,0px,0px)",
            "transform":"translate3d(" + (dist) + "px,0px,0px)"
        });
    }
    this.setDist = function (move) {
        dist = move;
    }
    this.getCurrentPage = function () {
        return currentPage;
    }
    this.setCurrentPage = function (currPage) {
        currentPage = currPage;
    }
    this.getDist = function () {
        return dist;
    }
}
