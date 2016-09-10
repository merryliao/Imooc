$(function(){
    //cid 为评论的id，
    //tid 为评论人的当前id
    $('.comment').click(function(e){
        var target=$(this);
        var toId=target.data('tid');
        var commentId=target.data('cid');
        if($('#toid').length>0){
            $('#toId').val(toId);
        }
        $('<input>').attr({
            type:'hidden',
            id:'toId',
            name:'comment[tid]',
            value:toId
        }).appendTo('#commentForm');
        if($('#commentId').length>0){
            $('#commentId').val(commentId);
        }
        $('<input>').attr({
            type:'hidden',
            id:'comentId',
            name:'comment[cid]',
            value:commentId
        }).appendTo('#commentForm');

    })


})
