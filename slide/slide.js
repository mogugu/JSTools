/** slide 插件*/
;(function ($) {
       /*
       options={
          autoPlay: true, //是否自动播放
          playMode: slide | fade   //切换方式左右滑动还是渐变显示
          controller: $() ,//控制切换的容器
          cls: "active"  //当前显示状态样式
          nextBtn: "next"  //切换下一个
          preBtn: "" //切换上一个
       }
       * */
       function Slide(contanier,options) {
           this.$ct=contanier;
           this.options=options || {};
           this.init();
           this.bind()
       }
       Slide.prototype={
           init: function () {
               this.$slide=this.$ct.children().first();
               this.$items=this.$slide.children();
               this.$next=this.$ct.find(this.options.nextBtn);
               this.$prev=this.$ct.find(this.options.preBtn);
               this.$bullets=this.options.controller.children();

               this.imgWidth=this.$items.width();
               this.imgCount=this.$items.length;
               this.pageIndex=0;
               this.isAnimate=false;
               this.clock;

               this.mode();
               this.autoPlay();

           },
           bind:function () {
               var self=this;
               this.$next.click(function (e) {
                   e.preventDefault();
                   self.stopAutoPlay();
                   self.playNext();
               });
               this.$prev.click(function (e) {
                   e.preventDefault();
                   self.stopAutoPlay();
                   self.playPre();
               });
               this.$bullets.click(function (e) {
                   e.preventDefault();
                   var index=$(this).index();
                   self.play(index,self.options.playMode);
               });
               this.$items.mouseenter(function () {
                   self.stopAutoPlay();
               }).mouseleave(function () {
                   self.autoPlay();
               });
           },
           mode: function () {
               if(this.options.playMode==="slide" ){
                   this.$slide.width(this.imgWidth*this.imgCount);
                   this.$slide.children().css("float","left");
               }else{
                   this.$items.css({
                       'position': "absolute",
                       'top': 0,
                       "left" :0
                   }).hide();
                   this.$items.first().show();
               }
           },
           play: function (idx,mode) {
               if(this.isAnimate)
                   return;
               var self=this;
               this.isAnimate=true;
               if(mode==="slide"){
                   if(idx>this.pageIndex){
                       this.$slide.animate({
                           left: "-="+ Math.abs(idx-self.pageIndex)*self.imgWidth
                       },function () {
                           self.isAnimate=false;
                       })
                   }else if(idx<this.pageIndex){
                       this.$slide.animate({
                           left: "+=" + Math.abs(idx-self.pageIndex)*self.imgWidth
                       },function () {
                           self.isAnimate=false;
                       })
                   }
               }else{
                   this.$items.fadeOut().eq(idx).fadeIn(function () {
                       self.isAnimate=false;
                   })
               }
               this.pageIndex=idx;
               this.setBullet();
           },
           setBullet:function () {
               this.$bullets.removeClass(this.options.cls).eq(this.pageIndex).addClass(this.options.cls);
           },
           triggerPlay:function (cIdx) {
               var index;
               (cIdx===this.imgCount-1) ? index=0 : index=cIdx+1;

               this.play(index,this.options.playMode);

           },
           playPre:function () {
               this.pageIndex===0 ? this.triggerPlay(this.imgCount-2) : this.triggerPlay(this.pageIndex-2);
           },
           playNext:function () {
               this.pageIndex === this.imgCount-1 ? this.triggerPlay(-1) :this.triggerPlay(this.pageIndex);
           },
           autoPlay:function () {
               var self=this;
              this.clock=setInterval(function () {
                 self.playNext();
             },self.options.time);
           },
           stopAutoPlay:function () {
               clearInterval(this.clock);
           }
       };
       $.fn.Slider=function (options) {
           this.each(function () {
               var element=this;
               var slides=new Slide($(element),options)
           })
       }
})(jQuery);
