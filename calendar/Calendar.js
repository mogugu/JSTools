/**
 * Created by mogugu on 2017/7/12.
 */
var Calendar=(function () {
    function DatePicker($target) {
        //初始化当前日期
        this.init($target);
        //渲染日历模板
        this.render();

        //设置日期数据
        this.setData();

        //绑定事件
        this.bind();
    }
    DatePicker.prototype= {
        init: function ($target) {
            this.$target=$target;
            if(this.$target.attr("date-init")){
                this.date=new Date(this.$target.attr("date-init"));  //当前日期或指定要展示的日期
                this.watchDate=new Date(this.$target.attr("date-init"));
            }else{
                this.date=new Date();
                this.watchDate=new Date();
            }
        },
        render: function () {
            var tpl = "<div class='calendar' style='display: none;'>";
            tpl +=     "<div class='header'>";
            tpl +=      " <span class='pre caret-left'></span><span class='cur header-date'></span><span class='next caret-right'></span>";
            tpl +=     "</div>";
            tpl +=     "<table class='panel'><thead><tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></thead>";
            tpl +=        "<tbody></tbody></table>";
            tpl +=     "</div>";
            this.$datepicker=$(tpl);
            this.$datepicker.insertAfter(this.$target)
                .css({
                    'position':"absolute",
                    'left': this.$target.offset().left,
                    'top': this.$target.offset().top+ this.$target.outerHeight(true)
                });
        },
        setData:function () {
            this.$datepicker.find("tbody").html("");

            var firstDay=this.getFirstDay(this.watchDate),
                lastDay=this.getLastDay(this.watchDate);
            var dateArr=[];
            for(var i=firstDay.getDay();i>0;i--){
                var d=new Date(firstDay.getTime()-i*24*60*60*1000);
                dateArr.push({type:"pre",date:d});
            }
            for(var j=0;j<lastDay.getDate()-firstDay.getDate()+1;j++){
                var e=new Date(firstDay.getTime()+j*24*60*60*1000);
                dateArr.push({type:"cur",date:e});
            }
            for(var k=1;k<7-lastDay.getDay();k++){
                var f=new Date(lastDay.getTime()+ k*24*60*60*1000);
                dateArr.push({type:"next",date:f});
            }
            this.$datepicker.find(".header-date").text(this.watchDate.getFullYear()+'年'+(this.watchDate.getMonth()+1)+'月');
            var tpl="";
            for(var i=0;i<dateArr.length;i++){
                if(i%7===0){
                    tpl += "<tr>";
                }
                tpl += "<td class='";
                if(dateArr[i].type==='pre' || dateArr[i].type==="next"){
                    tpl += "pre-month";
                }else if(dateArr[i].type==="cur"){
                    tpl +="cur-month";
                }
                if(this.getYYMMDD(this.date)===this.getYYMMDD(dateArr[i].date)){
                    tpl += " cur-date";
                }
                tpl +="'";
                tpl += "data-date='"+ this.getYYMMDD(dateArr[i].date)+"'>";
                tpl += this.toFixed(dateArr[i].date.getDate()) + "</td>";
                if(i%7===6){
                    tpl += "</tr>";
                }
            }
            this.$datepicker.find("tbody").html(tpl);
        },
        bind:function () {
            var self=this;
            self.$target.click(function (e) {
                e.preventDefault();
                self.$datepicker.show();
            });
            self.$datepicker.find(".pre").click(function (e) {
                self.watchDate=self.getPreMonth(self.watchDate);
                self.setData();
            });
            self.$datepicker.find(".next").click(function (e) {
                self.watchDate=self.getNextMonth(self.watchDate);
                self.setData();
            });
            self.$datepicker.on("click",".cur-month",function (e) {
                self.$target.val($(this).attr("data-date"));
                self.$datepicker.hide();
            })

        },
        isValidDate:function (dateStr) {
            return new Date(dateStr).toString() !=="Invalid Date";
        },
        //获取date所在月份第一天的时间对象
        getFirstDay:function (date) {
            var month= date.getMonth();
            var year=date.getFullYear();
            return newdate=new Date(year,month,1);
        },
        //获取date所在月份最后一日的时间对象
        getLastDay: function (date) {
            var month= date.getMonth();
            var year=date.getFullYear();
            month++;
            if(month>11){
                month=0;
                year++;
            }
            newdate=new Date(year,month,1);
            return new Date(newdate.getTime()-1000*60*60*24);
        },
        //获取date上月1号的时间对象
        getPreMonth: function (date) {
            var month=date.getMonth();
            var year=date.getFullYear();
            month--;
            if(month<0){
                month=11;
                year--;
            }
            return new Date(year,month,1);
        },
        //获取date下月1号的时间对象
        getNextMonth:function (date) {
            var month=date.getMonth();
            var year=date.getFullYear();
            month++;
            if(month>11){
                month=0;
                year++;
            }
            return new Date(year,month,1);
        },
        //2015-06-02
        getYYMMDD:function (date) {
            var yy=date.getFullYear(),
                mm=date.getMonth()+1,
                dd=date.getDate();
            return yy+"-"+this.toFixed(mm)+"-" + this.toFixed(dd);
        },
        //eg:1->01  11->11
        toFixed: function (n) {
            return (n+"").length===1 ? ("0"+n+"") :(n+"");
        }
    };
    return {
        init: function ($target) {
            $target.each(function (idx,node) {
                new DatePicker($(node));
            })
        }
    };
})();