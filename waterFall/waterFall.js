var waterFall=(function () {
    function WaterFall($ct) {
        this.$ct=$ct;
        this.$items=this.$ct.children();
        this.render();
    }
    WaterFall.prototype.render=function () {
        var nodeWidth=this.$items.outerWidth(true),
            colNum=parseInt(this.$ct.width()/nodeWidth),
            colHeight=[];
        for(var i=0;i<colNum;i++){
            colHeight.push(0);
        }
        this.$items.each(function () {
            var $cur=$(this);
            var idx=0,minHeight;
            minHeight=Math.min.apply(null,colHeight);
            idx=[].indexOf.call(colHeight,minHeight);
            // for(var i=0;i<colHeight.length;i++){
            //     if(colHeight[i]<minHeight){
            //         idx=i;
            //         colHeight[i]=minHeight;
            //     }
            // }
            $cur.css({
                left: nodeWidth*idx,
                top: minHeight
            });
            colHeight[idx] +=$cur.outerHeight(true);
        })
    };
    return {
        init: function ($ct) {
            $ct.each(function (idx,node) {
                console.log($(node));
                new WaterFall($(node));
            });
        }
    }
})();
