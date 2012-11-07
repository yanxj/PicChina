$(document).ready(function() {
    var w = $(document).width();
    var h = $(document).height();
    $('.main').width(w);
    $('.list').width(w);
    $('.container').width(($('.list').length) * $('.list').width() + $('.main').width());
    
    $('.m-ctn li').width($('.m-frm').width());
    $('.m-ctn').width($('.m-ctn li').length * $('.m-frm').width());
    
    var oX = 0;
    var bX = 0;
    var bS = 0;
    var bE = 0;
    var max = $('.list').length + $('.main').length - 1;
    
    $('.container').on('mouseover', function(e) {
        var sX = 0;
        var dX = 0;
        var self = $(this);
        
        self.on('mousedown', function(eDown) {
            bS = sX = sX || eDown.pageX;
            self.on('mousemove', function(eMove) {
                dX = eMove.pageX;
                change(bX + dX - sX);
                bX += dX - sX;
                sX = eMove.pageX;
            });
        });
        
        self.on('mouseup', function(eUp) {
            bE = eUp.pageX;
            if (Math.abs(bE - bS) > 10) {
                oX += (bE - bS) * 1280 / Math.abs(bE - bS);
                oX = oX > 0 ? 0 : oX;
                oX = oX < max * -1280 ? max * -1280 : oX;
                bX = oX;
            }
            if (bX < max * -1280) {
                bX = max * -1280;
            }
            if (bX > 0) {
                bX = 0;
            }
            self.css({
                '-webkit-transition': 'all 0.5s linear'
            });
            self.on('webkitTransitionEnd', function() {
                self.css({
                    '-webkit-transition': 'all 0s linear'
                });
                self.off('webkitTransitionEnd');
            });
            change(bX);
            self.off('mousemove');
            bS = sX = dX = 0;
        });
        
    });
    
    $('.container').on('mouseout', function(e) {
        $(this).off('mousedown');
        $(this).off('mouseup');
    });
});

function change(offset) {
    $('.container').css({
        '-webkit-transform': 'translate3d(' + offset + 'px, 0, 0)'
    });
}