$(function () {
    $('#slider').nivoSlider({//banner
        directionNav: true,
        captionOpacity: 0.4,
        controlNav: true,
        boxCols: 8,
        boxRows: 4,
        slices: 15,
        effect:'random',
        animSpeed: 500,
        pauseTime: 3000 });
})


$(function() {

    $(function() {//右侧固定栏目
        $('.tel-mode').mouseover(function() { //电话咨询
            $('.tel-mode-show').show();
        }).mouseout(function() {
            $('.tel-mode-show').hide();
        });

        $('.back-mode').click(function() { //返回顶部
            $(window).scrollTop(0);
        })
    });

    $('.case-list-items').click(function(){
        $('.case-list-items').removeClass('on');
        $(this).addClass('on');
        var indexVal=$(this).index();
        if(0===indexVal){//推荐t-items
           $('.t-items').show();
           $('.g-items').hide();
           $('.f-items').hide();
           $('.z-items').hide();
        }else if(1===indexVal){//官网g-items
           $('.t-items').hide();
           $('.g-items').show();
           $('.f-items').hide();
           $('.z-items').hide();
        }else if(2===indexVal){//分销f-items
           $('.t-items').hide();
           $('.g-items').hide();
           $('.f-items').show();
           $('.z-items').hide();
        }else{//综合z-items
            $('.t-items').hide();
           $('.g-items').hide();
           $('.f-items').hide();
           $('.z-items').show();
        }
    })



    
})

