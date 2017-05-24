/**
 * Created by mogugu on 2017/5/24.
 */
function addEvent(node,type,handler){
    if(!node) return false;
    if(node.addEventListener){
        node.addEventListener(type,handler,false);
        return true
    }
    else if(node.attachEvent){
        node['e'+type+handler]=handler;
        node[type+handler]=function () {
            node['e'+type+handler](window.event);
        };
        node.attachEvent('on'+type,node[type+handler]);
        return true;
    }
    return false;
}
function  removeEvent(node,type,handler) {
    if(!node) return false;
    if(node.removeEventListener){
        node.removeEventListener(type,handler,false);
        return true;
    }
    else if(node.detachEvent){
        node.detachEvent('on'+type,node[type+handler]);
        node[type+handler]=null;
    }
}
//阻止冒泡
function stopPropagation(e) {
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble=true;
    }
}
//取消默认事件
function preventDefault(e){
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue=false;
    }
}
function  getEvent(e) {
    return e || window.event;
}
function getTarget(e) {
    return e.target || e.srcElement;
}