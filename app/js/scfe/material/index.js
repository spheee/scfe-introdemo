define('app/modules/scfe/material/index', function(require, exports, module) {

    (function($) {

        //注册与声明
        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge);
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
                    callback(WebViewJavascriptBridge);
                }, false);
            }
        }

        var index = {
            tpl:require("app/modules/tmpl/material/index"),
            init: function() {

                this.initEvent();

            },
            initEvent: function() {
                

                this.initCategory(this.tpl);
                this.loadContent(this.tpl);
            },
            initCategory: function(tpl) {
                //初始化分类
                connectWebViewJavascriptBridge(function(bridge) {

                    bridge.init(function(data, responseCallback) {
                        //收取初始化分类的新戏
                        $(".bar_wrapper").append(tpl.Cat(data));



                        //swiper插件启动
                        var swiper = require("components/swiper/swiper");

                        var ts = new swiper('.swiper-container', {
                            slidesPerView: 5,

                            speed: 400,
                            //    spaceBetween: 100,

                        });
                        //启动Swiper
                        var xswiper = new swiper('.head_bar', {
                            //    pagination: '.swiper-pagination',
                            slidesPerView: 5,
                            //      setWrapperSize:true,
                            //    paginationClickable: true,
                            speed: 400,

                            //      width:'75px',
                            //    hashnav:true,
                            slideToClickedSlide: true,
                            //主要容器框体
                            wrapperClass: 'bar_wrapper',
                            slideClass: 'bar_slider',
                            //当前slider
                            slideActiveClass: 'bar_slider_active',
                            //下个slider
                            slideNextClass: 'bar_slider_next',
                            //上个slider
                            slidePrevClass: 'bar_slider_prev'
                            //spaceBetween: 30

                        });
                        //添加点击事件
                        xswiper.on("onClick", function(sw) {

                            var current =$(sw.clickedSlide),currentId=current.attr("data-category");

                            current.hasClass('selected') || current.addClass('selected').siblings().removeClass('selected');
                            //调用OC暴露的api
                            bridge.callHandler('categoryInitialized', {
                                categoryId: currentId,
                                success: true
                            }, function(response) {
                                console.log("JS已经发出,同时收到回调，说明OC已经收到数据");
                                //可以更简单的
                                index.loadContent(tpl,currentId);
                            });
                // index.loadContent(cu)
                        });

                              xswiper.slides[0].click;


                        if (responseCallback) {
                            responseCallback({
                                success: true
                            })
                        }
                    })


                })
            },
            loadContent: function(tpl,materialId) {
                debugger
                connectWebViewJavascriptBridge(function(bridge) {
                    //js暴露的api
                    bridge.registerHandler("loadContent", function(data, responseCallback) {
                    $('.cardlist_wrapper').html('');
                        $('.cardlist_wrapper').append(tpl.List(data))


                        $(document).on("click", ".card_handlebar a", function() {
                            // debugger
                            //bridge侵占this
                            var self=this;
                            if ($(self).index() === 0) {
                                bridge.callHandler('useBtnClicked', {}, function(message) {
                                    console.log('如果看到这个只能说明跳转失败');
                                });

                            } else {
                                var flag=!$(self).hasClass("chosen")
                                //调用OC暴露的api
                                bridge.callHandler('favoriteBtnClicked', {
                                        isNowFavorite:flag,
                                        materialId:123
                                    },
                                    function(message) {
                                        console.log('这里是点击时间传到OC端确认后回调');
                                        //这里this指向了window 因为bridge闭包的原因
                                        flag&&$(self).addClass("chosen")||$(self).removeClass("chosen");
                                    });
                            }
                        });


                        responseCallback({
                            success: true,
                            msg: '现在加载了主体内容'
                        })
                    });

                });
            }

        };
        module.exports = index;
    })(jquery);





});
