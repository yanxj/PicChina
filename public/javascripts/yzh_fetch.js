/**
 * Created with JetBrains WebStorm.
 * User: yzh
 * Date: 12-9-26
 * Time: 下午3:54
 * To change this template use File | Settings | File Templates.
 */
var yzh_fetchDATA = {
    init:function () {
    }
};
$(yzh_fetchDATA.init());
(function (yzh_fetchDATA) {
    var xmlData;
    var loadModul = {
        loadingmode:2, //1图片自己转2图片为gif
//        imagename:'../images/yzh_loading_images.png',
        imagename:'../images/loading_circle.gif',
        rate:540,


        loadinginfo:'loading...',


        root:$('#yzh_forloadingshowdiv'),
        loadingshowimg:$('#yzh_loadingimage'),
        n:0,
        flag:true,

        init:function () {
            if (!this.root || !this.root.length) {
                this.root = $('<div id="yzh_forloadingshowdiv" style="height: 100%;width: 100%;z-index: 999;top:0;left:0; background:rgba(0,0,0,0.8); position:fixed;display:block;">' +
                    '<div style="height: 100%;width: 100%; display:-webkit-box;display:-moz-box;display:-o-box;display:-ms-box;display:box;' +
                    '-webkit-box-align: center; -moz-box-align: center;-o-box-align: center;-ms-box-align: center;box-align: center;' +
                    '-webkit-box-pack: center; -moz-box-pack: center;-o-box-pack: center;-ms-box-pack: center;box-pack: center;' +
                    '-webkit-box-orient: horizontal; -moz-box-orient: horizontal;  -o-box-orient: horizontal; -ms-box-orient: horizontal;box-orient: horizontal; ">' +
                    '<div style="background: white;height: 100px;width: 30%; display:-webkit-box;display:-moz-box;display:-o-box;display:-ms-box;display:box;' +
                    '-webkit-box-align: center; -moz-box-align: center;-o-box-align: center;-ms-box-align: center;box-align: center;' +
                    '-webkit-box-pack: center; -moz-box-pack: center;-o-box-pack: center;-ms-box-pack: center;box-pack: center;' +
                    '-webkit-box-orient: horizontal; -moz-box-orient: horizontal;  -o-box-orient: horizontal; -ms-box-orient: horizontal;box-orient: horizontal; " >' +
                    '<img id="yzh_loadingimage" src="' + this.imagename + '" height="30px" width="30px" style=" vertical-align:middle;-webkit-transition:all 1s linear;-o-transition:all 1s linear;-ms-transition:all 1s linear;-moz-transition:all 1s linear;transition:all 1s linear;">' +
                    '<span id="ajaxloader" style="vertical-align:middle;"> ' + this.loadinginfo + '</span></div>' + '</div> </div>'
                );
                this.root.appendTo($('body'));
                if (!this.loadingshowimg || !this.loadingshowimg.length)
                    this.loadingshowimg = $('#yzh_loadingimage');
            }
        },
        showloading:function () {
            if (this.loadingmode == 1) {
                this.startRotate();
            } else if (this.loadingmode == 2) {
                this.root.css('display', 'block');
            }
        },
        hideloading:function () {
            if (this.loadingmode == 1) {
                this.stopRotate();
            } else if (this.loadingmode == 2) {
                this.root.css('display', 'none');
            }

        },
        showinfo:function () {
            if (!loadModul.loadingshowimg)
                alert('null');
            else alert('done');
        },
        startRotate:function () {
            this.flag = true;
            this.root.css('display', 'block');
            if (loadModul.loadingshowimg.length) {

                this.n = 0;
                loadModul.loadingshowimg.css('transform', 'rotate(0deg)');
                setTimeout(this.goRotate, 100);
            }

        },

        stopRotate:function () {
            this.flag = false;
            this.root.css('display', 'none');
        },

        goRotate:function () {
            loadModul.n = loadModul.n + 1;
            if (loadModul.loadingshowimg.length && loadModul.flag) {
//            loadingshowimg.css('transition-duration','0s');
//            loadingshowimg.css('transform','rotate(' +
//                '0deg)');
//            loadingshowimg.css('transition-duration','2s');
//            loadingshowimg.css({
//                '-webkit-transition':'all 2s linear',
//                '-moz-transition':'all 2s linear',
//                '-o-transition':'all 2s linear',
//                '-ms-transition':'all 2s linear',
//                'transition':'all 2s linear',
//                '-webkit-transform':'rotate(90deg)',
//                '-moz-transform':'rotate(90deg)',
//                '-o-transform':'rotate(90deg)',
//                '-ms-transform':'rotate(90deg)',
//                'transform':'rotate(90deg)'
//            });

                loadModul.loadingshowimg.css('transform', 'rotate(' +
                    (loadModul.rate * loadModul.n) + 'deg)');
                setTimeout(loadModul.goRotate, 1000);
            }

        }
    }


    function getOnlyDATA(url, afterload, datamanage, title) {

        loadModul.init();

        inurl = url;
        $.support.cors = true;
        $.ajax({
            url:inurl,
            dataType:"json",
            beforeSend:function (XMLHttpRequest) {

//                alert('readytogetdata');
//                console.log('beforesend ');

//                alert('readytogetdata');

                loadModul.showloading();
            },
            success:function (data, textStatus) {
                loadModul.hideloading();


                if (title)
                    afterload(datamanage(data), title);
                else
                    afterload(datamanage(data));

//                forloadingshowdiv.css('display', 'none');
            },
            complete:function (XMLHttpRequest, textStatus) {
//                console.log('complete');
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
//                console.log('error');

            }
        });
    }

    function getDATA(url, afterload) {

        url = 'http://ciicdevelop1php.duapp.com/xd/api.php?t=xml&u=' + encodeURIComponent(url);
        var datamanage = function (data) {

            xmlData = data['item']
            return xmlData;
        }
        getOnlyDATA(url, afterload, datamanage);
    }

    function getOneNewsList(urlindex, afterload) {
        var onedata = xmlData[urlindex];
        var title = onedata['title'];
        var url = onedata['url'];
        url = 'http://rank.china.com.cn:8080/iphone/json1.jsp?url=' + url;
        url = 'http://ciicdevelop1php.duapp.com/xd/api.php?u=' + encodeURIComponent(url);
        var datamanage = function (data) {
            return data;
        }
        getOnlyDATA(url, afterload, datamanage, title);
    }


    yzh_fetchDATA.getOneNewsList = getOneNewsList;
    yzh_fetchDATA.getDATA = getDATA;
})
    (yzh_fetchDATA);


