// function navHide() {
//   // alert("working");
//   var navBar = document.getElementById("header");
//   navBar.style.transition = "1s ease-in-out";
//   if(navBar.style.height == "0px"){
//     navBar.style.height = "";
//   }else {
//     navBar.style.height = "0px";
//   }
// }
$('.loader').hide(0);
window.addEventListener('load', function(){
  $('.main-loader').fadeOut(1000);
  $('.loader').fadeIn(0);
  this.setTimeout(function(){
    $('.loader').fadeOut(100);
  },10);
});
//Nav bar toggle
$(function(){
  // $('#toggleNav').toggle(0);

});

$(document).ready(function(){
  $('#toggleNav').hide(0);
  if($(window).width() < 500){
      $('#header').hide(0);
      $('#toggleNav').fadeIn(100);
  }
  $(window).resize(function(){
    if($(window).width() > 500){
      $('#header').fadeIn(500);
      $('#toggleNav').fadeOut(100);
    }else {
      $('#header').fadeOut(500);
      $('#toggleNav').fadeIn(100);
    }
  });
  // $('#header').slideToggle(0);
  $('#toggleNav').click(function(){
      $('#header').toggle(600);
  });

});
