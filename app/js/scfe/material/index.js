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
            tpl: require("app/modules/tmpl/material/index"),
            init: function() {

                this.initEvent();

            },
            initEvent: function() {

                this.loadContent(this.tpl);

                this.initCategory(this.tpl);
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
                            //spaceBetween: 100,

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

                            var current = $(sw.clickedSlide),
                                currentId = current.attr("data-category");

                            current.hasClass('selected') || current.addClass('selected').siblings().removeClass('selected');
                            //调用OC暴露的api
                            bridge.callHandler('categoryInitialized', {
                                categoryId: currentId,
                                success: true
                            }, function(response) {
                                //可以更简单的
                                index.loadContent(tpl);
                            });
                        });
                        //初始化 
                        //陷阱
                        bridge.callHandler('categoryInitialized', {
                            categoryId: $(xswiper.slides[0]).attr('data-category'),
                            success: true
                        }, function(response) {
                            index.loadContent(tpl, $(xswiper.slides[0]).attr('data-category'));

                        });
                        if (responseCallback) {
                            responseCallback({
                                success: true
                            })
                        }
                    })


                })
            },
            loadContent: function(tpl) {

                connectWebViewJavascriptBridge(function(bridge) {
                    //js暴露的api
                    bridge.registerHandler("loadContent", function(data, responseCallback) {
                        //todo:这里可以插入loading的方法
                        $('.cardlist_wrapper').html('');
                        //正则需要处理
                        if (data && data.length >= 0) {
                            data.forEach(function(oj) {
                                var content = oj.textContent;
                                if (content.trim() !== "" && content !== undefined) {
                                    //#标签匹配 遍历
                                    var sharpRegArr = content.match(/#[\u4e00-\u9fa5]*#/g);
                                    sharpRegArr && sharpRegArr.length > 0 && sharpRegArr.forEach(function(obj) {
                                        content = content.replace(obj, "<span class='tag'>" + obj + "</span>");
                                    });
                                    //match 遍历
                                    var linkRegArr = content.match(/(http:\/\/\S+)/g);
                                    linkRegArr && linkRegArr.length > 0 && linkRegArr.forEach(function(obj) {
                                        content = content.replace(obj, "<a class='link' href='" + obj + "'>网页链接</a>");
                                    });
                                }
                                oj.textContent = content;
                            })
                        }

                        $('.cardlist_wrapper').append(tpl.List(data));

                        $(document).on("click", ".card_handlebar a", function() {
                            //bridge侵占this
                            var self = this,
                                materialId = $(self).parent(".card_handlebar").attr("data-materialId");
                            if ($(self).index() === 0) {
                                bridge.callHandler('useBtnClicked', {
                                    materialId: materialId
                                }, function(message) {
                                    console.log('如果看到这个只能说明跳转失败');
                                });

                            } else {
                              
                                var flag = !$(self).hasClass("chosen")
                                    //调用OC暴露的api
                                bridge.callHandler('favoriteBtnClicked', {
                                        isNowFavorite: flag,
                                        materialId: materialId
                                    },
                                    function(message) {
                                        if (message) {
                                            flag && $(self).addClass("chosen") || $(self).removeClass("chosen");

                                        }
                                        console.log('这里是点击时间传到OC端确认后回调');
                                        //这里this指向了window 因为bridge闭包的原因
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
