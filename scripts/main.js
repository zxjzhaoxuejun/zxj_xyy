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
    $('.drop-menu').mouseover(function() { //导航条----保保服务下拉列表
        $('.down-list').show();
    }).mouseout(function() {
        $('.down-list').hide();
    });

    var contentH = $('.sb-content').height();
    if (contentH < 500) {
        $('.footer').css({
            position: "absolute",
            bottom: 0,
        })
    } else {
        $('.footer').css({
            position: "relative",
            bottom: 0,
        })
    }

    /*修改登录账号、登录密码*/
    $('.account-mdy').click(function(){
            var iTop = ($(window).height() - 300) / 2;
            var iLeft = ($(window).width() - 400) / 2;
            $('.setting-mdy-content').css({
                top: iTop,
                left: iLeft,
            })
        $(window).resize(function() {
            var iTop = ($(window).height() - 300) / 2;
            var iLeft = ($(window).width() - 400) / 2;
            $('.setting-mdy-content').css({
                top: iTop,
                left: iLeft,
            })
        });
        $('.setting-mdy-mask').hide();
        $('#accountNumber').show();
        $('.close').click(function(){
            $('.setting-mdy-mask').hide();
        });
    })

    $('.password-mdy').click(function(){
         var iTop = ($(window).height() - 300) / 2;
            var iLeft = ($(window).width() - 400) / 2;
            $('.setting-mdy-content').css({
                top: iTop,
                left: iLeft,
            })
        $(window).resize(function() {
            var iTop = ($(window).height() - 300) / 2;
            var iLeft = ($(window).width() - 400) / 2;
            $('.setting-mdy-content').css({
                top: iTop,
                left: iLeft,
            })
        });
        $('.setting-mdy-mask').hide();
        $('#userPassword').show();
        $('.close').click(function(){
            $('.setting-mdy-mask').hide();
        });
    })
    /*修改登录账号、登录密码 end*/

    //注册切换导航
    $(function () {
        $('.type-list-items').click(function () {
            var indexVal=$(this).index();
            $('.type-list-items').removeClass('active');
            $(this).addClass('active');
            if(indexVal==0){//企业注册
                $('.boss-register-mode').show();
                $('.person-register-mode').hide();
                $('.person-icon').css('backgroundPosition', '-12px -71px');
                $('.qy-icon').css('backgroundPosition', '-190px -71px');


            }else if(indexVal==1){//个人注册
                $('.boss-register-mode').hide();
                $('.person-register-mode').show();
                $('.person-icon').css('backgroundPosition', '-72px -71px');
                $('.qy-icon').css('backgroundPosition', '-133px -71px');
            }
        })
    })

    $(function() {
        $('.tel-mode').mouseover(function() { //电话咨询
            $('.tel-mode-show').show();
        }).mouseout(function() {
            $('.tel-mode-show').hide();
        });

        $('.back-mode').click(function() { //返回顶部
            $(window).scrollTop(0);
        })

        $('.cacl-mode').click(function() { //社保计算器
            var iTop = ($(window).height() - 500) / 2;
            var iLeft = ($(window).width() - 780) / 2;
            $('.sb-calc-con').css({
                top: iTop,
                left: iLeft,
            })
            $('.sb-calc-mode').show();
        })

        $(window).resize(function() {
            var iTop = ($(window).height() - 500) / 2;
            var iLeft = ($(window).width() - 780) / 2;
            $('.sb-calc-con').css({
                top: iTop,
                left: iLeft,
            })
        });

        $('.close').click(function() { //关闭弹窗
            $('.sb-calc-mode').hide();
            $('.sb-cacl-return').hide();
            $('.select-value').text('请选择');
			$('.sb-cacl-btn').text('计算').removeClass('reset');
            $('.select-value').val('');
            $('.select-value').attr('select-list','');
        })

    })



    $("#selectCity").click(function() { //城市选择
        var _this = $(this);
        $.ajax({
            type: "get",
            url: configUrl.cityUrl, //城市列表
            async: true,
            success: function(data) {
                var cityArr = [];
                var dataJson = $.parseJSON(data);
                for (var i = 0; i < dataJson.length; i++) {
                    for (var j = 0; j < dataJson[i].child.length; j++) {
                        cityArr.push(dataJson[i].child[j]);
                    }
                };
                sbCaclFun.citySelectFun(_this, cityArr);
            },
            error: function() {
                alert("请求城市数据异常");
            }
        });
    });

    $('.sb-cacl-btn').click(function(){//计算社保开始
        sbCaclFun.calcSubmitFun($(this));
    })


})
var sbCaclFun = {
    showHtml: function(nowThis, cityData, nowSelectVal, num) {
        $('.show-mode').remove();
        var listHtml = '';
        for (var i = 0; i < cityData.length; i++) {
            if(num==1){
                if (cityData[i].city_name == nowSelectVal) {
                    listHtml += '<div class="show-list show-list-active" data-id="' + cityData[i].city_id + '">' + cityData[i].city_name + '</div>';
                } else {
                    listHtml += '<div class="show-list" data-id="' + cityData[i].city_id + '">' + cityData[i].city_name + '</div>';
                }
            }else{
                if (cityData[i].type_name == nowSelectVal) {
                    listHtml += '<div class="show-list show-list-active" data-id="' + cityData[i].id + '">' + cityData[i].type_name + '</div>';
                } else {
                    listHtml += '<div class="show-list" data-id="' + cityData[i].id + '">' + cityData[i].type_name + '</div>';
                }
            }
        }
        var checkHtml = '<div class="show-mode">' + listHtml + '</div>';
        var _parentEle = nowThis;
        nowThis.parent().append(checkHtml);

        $('.show-list').click(function() { //下拉框值得选择
            var checkVal = $(this).text();
            var checkId = $(this).attr('data-id');
            _parentEle.text(checkVal);
            _parentEle.attr('type-id', checkId);
            _parentEle.next('.error-class').remove();
            $('.show-mode').remove();
            if (num == 1) {
                sbCaclFun.sbRatioData(num, checkId); //获取社保缴纳比例数据
            }else if(num==3){
                var cityVal = $('#selectCity').text() + checkVal;
                $('#sbFa').text(cityVal);
            }else if(num==2){

            }
        })
    },
    citySelectFun: function(ele, cityData) { //城市选择
        var nowSelectVal = ele.text(); //目前选择的值
        var nowThis = ele;
        this.showHtml(nowThis, cityData, nowSelectVal, 1);

        $('#homeAddress').unbind('click').click(function() { //选择户籍
            var nowVal = $(this).text(); //目前选择的值
            var _this = $(this);
            var homeData = $(this).attr('select-list');
            if (homeData.length > 0) {
                console.log($.parseJSON(homeData))
                // $(this).css("border", "none");
                sbCaclFun.showHtml(_this, $.parseJSON(homeData), nowVal, 2);
            } else {
                //请选择城市
                alert("请选择城市")
            }
        });


        $('#sbType').unbind('click').click(function() { //参保类型
            var nowVal = $(this).text(); //目前选择的值
            var _this = $(this);
            var sbTypeData = $(this).attr('select-list');
            if(sbTypeData.length > 0) {
                // $(this).children('.right-text').css("border", "none");
                sbCaclFun.showHtml(_this, $.parseJSON(sbTypeData), nowVal, 3);
            } else {
                //请选择城市
                alert("请选择城市")
            }
        });


    },
    sbRatioData: function(num, checkId) {//请求每个城市社保比例
        if (num == 1) { 
            var url = configUrl.ratioUrl + checkId;
            $.ajax({ //请求每个城市社保比例
                type: "get",
                url: url, //城市社保列表
                async: true,
                success: function(data) {
                    var cityArr = [];
                    var dataJson = $.parseJSON(data);
                    $('#sbType').text('请选择');
                    $('#sbType').removeAttr('type-id');
                    $('#homeAddress').text('请选择');
                    $('#homeAddress').removeAttr('type-id');

                    $('#homeAddress').attr('select-list', JSON.stringify(dataJson.household)); //户籍数据
                    var sb_type = [{ "id": 1, "type_name": "社保" }]
                    $('#sbType').attr('select-list', JSON.stringify(sb_type)); //参保类型数据
                    //                      $('#sbType').attr('select-public', JSON.stringify(thisData[j].publicAccumulation)); //公积金缴纳比例
                    $('#sbFa').attr('select-list', JSON.stringify(dataJson.paymentProportion)); //缴纳比例数据
                    var lowVal = dataJson.base.lowest;
                    var heigVal = dataJson.base.highest;
                    $('#sbBaseQj').attr('select-list', lowVal + '-' + heigVal); //基数区间
                    $('#sbBaseQj').attr('placeholder', lowVal + '-' + heigVal); //基数区间
                    $('#sbBaseQj').val('');
                    // $('#lowestVal').attr('checked', false);
                    // $('#lowest').attr('select-list', lowVal).show(); //最低基数
                },
                error: function() {
                    alert("请求城市数据异常");
                }
            });
            //          
        }
    },
    calcSubmitFun:function(ele){
        if(ele.hasClass('reset')){
            $('.select-value').text('请选择');
            $('.select-value').val('');
            $('.select-value').attr('select-list','');
            ele.text('计算').removeClass('reset');
            $('.sb-cacl-return').hide();
            return false;
        }
        var isEmpty=true;
        $('.error-class').remove();
        $('.select-value').each(function(){
            var htmlVal='';
            if($(this).get(0).tagName=="INPUT"){
                htmlVal=$(this).val();
            }else{
                htmlVal=$(this).text();
            }
            if(htmlVal==''||htmlVal=="请选择"){
                isEmpty=false;
                var leftVal=$(this).parents().children('.select-name').text();
                leftVal=leftVal.substring(0,leftVal.length-1);
                $(this).parent().append('<div class="error-class">请填写'+leftVal+'</div>')
            }
        });
        
       if(isEmpty){
          $('.sb-cacl-return').show();
          ele.text('重置').addClass('reset');
          var typeId = $('#homeAddress').attr('type-id'); //缴纳的比例档次
            $('#calcReturnCity').text($('#selectCity').text() + '(' + $('#homeAddress').text() + ')'); //参保城市
            $('#calcReturnType').text($('#sbType').text()); //参保类型
            $('#calcReturnFa').text($('#sbFa').text()); //参保方案
            $('#calcReturnBase').text($('#sbBaseQj').val()); //社保基数

            this.calcListRatioFun(typeId);
       }

    },
    calcListRatioFun:function(typeId){
        var data = $.parseJSON($('#sbFa').attr('select-list'));
            var typeData = ''; //档次比例数据
            for(var i = 0; i < data.length; i++) {
                if(data[i].type == typeId) {
                    typeData = data[i];
                }
            }

            //养老保险计算
                var person1 = twoDecimal(typeData.scale_person1 * $('#sbBaseQj').val());
                var ent1 = twoDecimal(typeData.scale_ent1 * $('#sbBaseQj').val());
                $('#ylSb span').eq(1).text(typeData.scale_person1);
                $('#ylSb span').eq(2).text(person1);
                $('#ylSb span').eq(3).text(typeData.scale_ent1);
                $('#ylSb span').eq(4).text(ent1);

                //失业保险计算
                var scaleBaseVal = 0;
                if(typeData.base2 == 0) {
                    scaleBaseVal = $('#sbBaseQj').val();
                } else {
                    scaleBaseVal = typeData.base2;
                }
                var person2 = twoDecimal(typeData.scale_person2 * scaleBaseVal);
                var ent2 = twoDecimal(typeData.scale_ent2 * scaleBaseVal);
                $('#sySb span').eq(1).text(typeData.scale_person2);
                $('#sySb span').eq(2).text(person2);
                $('#sySb span').eq(3).text(typeData.scale_ent2);
                $('#sySb span').eq(4).text(ent2);
                //工伤保险计算
                var person3 = twoDecimal(typeData.scale_person3 * $('#sbBaseQj').val());
                var ent3 = twoDecimal(typeData.scale_ent3 * $('#sbBaseQj').val());
                $('#gsSb span').eq(1).text(typeData.scale_person3);
                $('#gsSb span').eq(2).text(person3);
                $('#gsSb span').eq(3).text(typeData.scale_ent3);
                $('#gsSb span').eq(4).text(ent3);
                //生育保险计算
                var person4 = twoDecimal(typeData.scale_person4 * $('#sbBaseQj').val());
                var ent4 = twoDecimal(typeData.scale_ent4 * $('#sbBaseQj').val());
                $('#sysSb span').eq(1).text(typeData.scale_person4);
                $('#sysSb span').eq(2).text(person4);
                $('#sysSb span').eq(3).text(typeData.scale_ent4);
                $('#sysSb span').eq(4).text(ent4);
                //医疗保险计算
                var person5 = twoDecimal(typeData.scale_person5 * $('#sbBaseQj').val());
                var ent5 = twoDecimal(typeData.scale_ent5 * $('#sbBaseQj').val());
                $('#ylxSb span').eq(1).text(typeData.scale_person5);
                $('#ylxSb span').eq(2).text(person5);
                $('#ylxSb span').eq(3).text(typeData.scale_ent5);
                $('#ylxSb span').eq(4).text(ent5);
                //补充保险计算//残保险计算
                var person6 = twoDecimal(typeData.scale_person6 * $('#sbBaseQj').val());
                var ent6 = twoDecimal(typeData.scale_ent6 * $('#sbBaseQj').val());
                $('#bcSb span').eq(1).text(typeData.scale_person6);
                $('#bcSb span').eq(2).text(person6);
                $('#bcSb span').eq(3).text(typeData.scale_ent6);
                $('#bcSb span').eq(4).text(ent6);
                
                var personCount = twoDecimal(Number(person1) + Number(person2) + Number(person3) + Number(person4) + Number(person5) + Number(person6));
                 $('#calcReturnPerson').text(personCount);
                //企业缴纳
                var entCount = twoDecimal(Number(ent1) + Number(ent2) + Number(ent3) + Number(ent4) + Number(ent5) + Number(ent6));
                $('#calcReturnEnt').text(entCount);
                //总计
                $('#calcReturnCount').text(twoDecimal(Number(entCount) + Number(personCount)));
           
            console.log(typeData);
    }


}


//保留整数位
function toDecimal(x) {
    var f = parseFloat(x);
    if(isNaN(f)) {
        return;
    }
    //          f = Math.round(x*100)/100; /*改变保留小数点后几位（100=2,1000=3）*/
    f = Math.round(x, 0);
    return f;
}

//保留小数点后两位
function twoDecimal(x) {
    var f = parseFloat(x);
    if(isNaN(f)) {
        return;
    }
    f = Math.round(x * 100) / 100; /*改变保留小数点后几位（100=2,1000=3）*/
    //          f = Math.round(x,0);
    return f;
}