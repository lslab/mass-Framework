$.require("ready,event,fx",function(){
    var search = $("#search"),hash = window, prefix = "";
    search.input(function(e){//监听输入
        var
        input = this.value,//原始值
        val = input.slice( prefix.length),//比较值
        output = [], //用来放置输出内容
        apis = []; //放置方法或属性名
        for(var prop in hash){
            if( prop.indexOf( val ) === 0  ){
                apis.push( prop );
                if( output.push( '<li><a href="javascript:void(0)" data-value="'+prefix +
                    prop+'">'+ input + "<b>" + (prefix  + prop ).slice( input.length ) +"</b></a></li>" ) == 10){
                    break;
                }
            }
        }
        //如果向前遇到点号,或向后取消点号
        if( val.charAt(val.length - 1) === "." || (input && !val) ){
            var arr = input.split("."); hash = window;
            for(var j = 0; j < arr.length; j++){
                var el = arr[j];
                if(el && hash[ el ]){
                    hash = hash[ el ];//重新设置要遍历API的对象
                }
            }
            prefix = input == "." ? "" : input;
            for( prop in hash){
                apis.push( prop );
                if( output.push( '<li><a href="javascript:void(0)" data-value="'+prefix +
                    prop+'">'+ input + "<b>" + (prefix + prop ).slice( prefix.length ) +"</b></a></li>" ) == 10){
                    break;
                }
            }
        }
        $("#suggest_list").html( output.join("") );
        if(!input){
            hash = window;
            prefix = output = apis = [];
        }
    });
    var glowIndex = -1;
    $(window).keyup(function(e){//监听上下翻
        e.preventDefault();
        var upOrdown = 0
        if(e.which === 38 || e.which === 104){ //up 8
            upOrdown = -1;
        }else if(e.which === 40 || e.which === 98){//down
            upOrdown = +1;
        }
        if(upOrdown){
            var list =  $("#suggest_list a");
            list.eq(glowIndex).removeClass("glow_suggest");
            glowIndex += upOrdown;
            var el = list.eq( glowIndex ).addClass("glow_suggest");
            search.val( el.attr("data-value") )
            if(glowIndex == list.length - 1){
                glowIndex = -1;
            }
        }
    });
    var dd = $("#leftsection dd");
    search.keyup(function(e){//监听提交
        var input = this.value
        if(input && (e.which == 13 || e.which == 108)){ //如果按下ENTER键
            for(var i = 0 , el ; el = dd[i++];){
                var path = $(el).attr("path");
                var start = path.indexOf("/");
                if( path.slice(start+1).indexOf(input) === 0){
                    $("#iframe").attr("src", "/doc/"+path );
                    break;
                }
            }
        }
    });
})
//初步完成suggest控件,其实更像IDE的语法提示

