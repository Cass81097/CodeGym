$('.btn').click(function(){
$(this).toggleClass("click");
$('.sidebar').toggleClass("show");
});
$('.feat-btn').click(function(){
    $('.menu .sub-menu .feat-show').toggleClass("show");
    $('.menu .sub-menu .first').toggleClass("rotate");
});
$('.serv-btn').click(function(){
    $('.menu .sub-menu .serv-show').toggleClass("show1");
    $('.menu .sub-menu .second').toggleClass("rotate");
});
$('.menu .sub-menu li').click(function(){
    $(this).addClass("active").siblings().removeClass("active");
});
 