/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-26
 * Time: 下午12:58
 * 小图效果
 */
var bodyWidth = 0;
var slideWidth = 0;//id=slide的div的宽度
var pageCount = 1;//页数总计
var pageLength = 0;//第一页的宽度
var smallimgpaddingleft = 15;//小图之间的边距
var divSize = 120;//小图的大小
var borderwidth = 5;
var smallimgsize = 110;//小图的大小
var scrollpading = 15;//小图之间的边距
var selectedID = 0;
var touchEvent = null;//翻页对象
//获取数据
function getData(url, div) {
    $.getScript(url)
        .success(
        function () {
            analyticData(url, data.items, div);
        }).error(function () {
            alert("获取图片失败，请刷新重试！");
        });
}
//逻辑处理函数
function analyticData(url, datas, div) {
    if (datas == null) {
        getData(url, div);
    } else {
        complatePageProperty(datas);
        touchEvent = new touchClass();
        makeParentDiv(div);
        makeChileDiv("#yxjscroll-parentDiv");
        setAnimation("#yxjscroll-parentDiv");
        makeLeftAndRightButtonDiv("#yxjscroll-parentDiv");
        touchEvent.touch("#yxjscroll-childDiv", pageCount, pageLength, action);
        //设置大图变化时小图的联动
//        setBigImageEvent();

        $.each(datas, function (key, value) {
            makeImageDiv("#yxjscroll-childDiv", value.id);
            loadImg('#yxjscroll-img-' + value.id, value.url);
            setImgTouch(value.id, key);
            if (key == 0)
                setChecked(value.id);
        });
    }
}
function action() {

}
//讲算总页数和页面长度及滑动DIV的宽度
function complatePageProperty(data) {
    bodyWidth = $("body").width();
    pageCount = ((data.length * (smallimgpaddingleft + divSize)) % bodyWidth == 0) ? (data.length * (smallimgpaddingleft + divSize)) / bodyWidth : (Math.floor((data.length * (smallimgpaddingleft + divSize)) / bodyWidth) + 1);
    pageLength = Math.floor(bodyWidth / (smallimgpaddingleft + divSize)) * (smallimgpaddingleft + divSize);
    slideWidth = (smallimgpaddingleft + divSize) * data.length;
}
//加载scroll父层元素
var parentDivZindex = 4;
function makeParentDiv(dom) {
    $(dom).empty();
    var tag = "<div id='yxjscroll-parentDiv'></div>";
    $(tag).appendTo(dom);
    $("div#yxjscroll-parentDiv").css({   "margin":"0px auto",
        "position":"absolute",
        "overflow":"hidden",
        "width":"100%",
        "height":divSize + "px",
        "bottom":scrollpading + "px",
        "opacity":"1",
        "filter":"alpha(opacity=30)",
        "-moz-opacity":"1",
        "-khtml-opacity":"1",
        "opacity":"1",
        "z-index":parentDivZindex});
}
//加载SCROLL层
var childDivZindex = 5;
function makeChileDiv(dom) {
    var tag = "<div id='yxjscroll-childDiv'></div>";
    $(tag).appendTo(dom);
    $("div#yxjscroll-childDiv").css({   "margin":"0px auto",
        "position":"absolute",
        "width":slideWidth + "px",
        "height":divSize + "px",
        "opacity":"1",
        "z-index":childDivZindex});
}
//加载左右提示按钮
var leftPadding = 0;//左提示按钮的边距
var rightPadding = 0;//右提示按钮的边距
var directionZindex = 6;//左右按钮在Z轴上的次序
function makeLeftAndRightButtonDiv(dom) {
    var tag = "<div id='yxjscroll-leftDiv'></div>";
    $(tag).appendTo(dom);
    $("div#yxjscroll-leftDiv").css({   "position":"absolute",
        "width":smallimgpaddingleft + "px",
        "height":divSize + "px",
        "left":leftPadding + "px",
        "opacity":"1",
        "background-image":"url(../images/sleft.gif)",
        "background-repeat":"no-repeat",
        "z-index":directionZindex});
    tag = "<div id='scroll-rightDiv'></div>";
    $(tag).appendTo(dom);
    $("div#yxjscroll-rightDiv").css({   "position":"absolute",
        "width":smallimgpaddingleft + "px",
        "height":divSize + "px",
        "right":rightPadding + "px",
        "opacity":"1",
        "background-image":"url(../images/sright.gif)",
        "background-repeat":"no-repeat",
        "z-index":directionZindex});
}
//加载图片DIV
function makeImageDiv(dom, id) {
    var tag = "<img id='yxjscroll-img-" + id + "' src='./images/loading_circle.gif'></img>";
    $(tag).appendTo(dom);
    $("#yxjscroll-img-" + id).css({
            "width":smallimgsize + "px",
            "height":smallimgsize + "px",
            "border":borderwidth + "px solid white",
            "marginLeft":"15px"
        }
    )
}
//加载图片
function loadImg(id, url) {
    $(id).load(url, function () {
        $(id).attr("src", url);
    });
}
//设置图片被选中事件
function setChecked(id) {
    $("#yxjscroll-img-" + selectedID).css("border-color", "white");
    $("#yxjscroll-img-" + id).css("border-color", "blue");
    selectedID = id;
}
//设置缩略图点击事件
function setImgTouch(id, key) {
    var velocitys = 0;
    $('#yxjscroll-img-' + id).on("touchstart touchmove touchend MSPointerDown MSPointerMove MSPointerUp", function (event) {
        var touch = null;
        touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
        if (event.type == 'touchmove' || event.type == 'MSPointerMove') {
            velocitys++;
        }
        if (event.type == 'touchend' || event.type == 'MSPointerUp') {
            if (velocitys < 2) {
//                alert("sdfs");
                setChecked(id);
                //更换大图事件
                yxj_detail.setMove(key);
            }
            velocitys = 0;
        }
    });
}
//设置大图翻页时小图的联动
function setScrollImgLinkAge(id, key) {
    var currPage = 1;//第KEY张图片所在的页
    var move = 0;//翻页时移动的距离
    currPage = Math.ceil((divSize + scrollpading) * (key + 1) / pageLength);
//    console.log(currPage);
    move = -(currPage - 1) * pageLength;

//    console.log(move);
    touchEvent.setCurrentPage(currPage);
    touchEvent.setDist(move);
    touchEvent.move("div#yxjscroll-childDiv");
//    if (currPage != touchEvent.getCurrentPage()){
//        $("div#yxjscroll-childDiv").css({
//            "-webkit-transform":"translate3d(" + (move) + "px,0px,0px)",
//            "-moz-transform":"translate3d(" + (move) + "px,0px,0px)",
//            "-o-transform":"translate3d(" + (move) + "px,0px,0px)",
//            "-ms-transform":"translate3d(" + (move) + "px,0px,0px)",
//            "transform":"translate3d(" + (move) + "px,0px,0px)"
//        });
//        touchEvent.setCurrentPage(currPage);
//    }
    setChecked(id);

}
//设置动画过度
function setAnimation(el) {
    $("div#yxjscroll-childDiv").css({"-webkit-transition":"-webkit-transform .5s ease-out",
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
    $("div#yxjscroll-parentDiv").css({"-webkit-transition":"-webkit-transform .5s ease-out",
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
}
