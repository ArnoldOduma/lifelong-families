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
window.addEventListener('load', function () {
  $('.main-loader').fadeOut(1000);
  $('.loader').fadeIn(0);
  this.setTimeout(function () {
    $('.loader').fadeOut(100);
  }, 200);
});

// var x = document.getElementById("demo");
// function getLocation() {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(showPosition);
//         } else {
//             x.innerHTML = "Geolocation is not supported by this browser.";
//         }
//     }
//     function showPosition(position) {
//         x.innerHTML = "Latitude: " + position.coords.latitude +
//         "<br>Longitude: " + position.coords.longitude;
//     }
//Nav bar toggle
$(function () {
  // $('#toggleNav').toggle(0);

});


$(document).ready(function () {

  $(document).unbind('click').bind('click', function (e) {
    var container = $("#header");
    var navBtn = $(".toggleNav");
    if ($(window).width() < 500) {
      // if (!container.is(e.target) && container.has(e.target).length === 0 &&!navBtn.is(e.target)) {
      //   $('#header').animate({
      //     width: "hide"
      //   }, 100);
      //   console.log("yes");
      // }
      // else if (navBtn.is(e.target && container.has(e.target).length === 0)) {
      //   $('#header').animate({
      //     width: "toggle"
      //   }, 100);
      //   console.log("no");
      // }

    }

  });
  $(".toggleNav").unbind('click').bind('click',function () {
    $('#header').animate({
      width: "toggle"
    }, 100);
    console.log("no");
  });

  /*change style on scroll */
  $(window).scroll(function () {
    var $height = $(window).scrollTop();
    if ($(window).width() < 700) {
      if ($height > 50) {
        $('.small').addClass('small-fixed');
      } else {
        $('.small').removeClass('small-fixed');
      }

    } else {
      if ($height > 50) {
        $('#header').addClass('header-scroll');
      } else {
        $('#header').removeClass('header-scroll');
      }
    }
  });


  // $('#toggleNav').hide(0);
  if ($(window).width() < 700) {
    // $('#header').hide(0);
    $('#toggleNav').fadeIn(100);
    // $('#header').removeClass('header-scroll');
  }
  $(window).resize(function () {
    if ($(window).width() > 700) {
      // $('#header').fadeIn(500);
      $('#toggleNav').fadeOut(100);
    } else {
      // $('#header').fadeOut(500);
      $('#toggleNav').fadeIn(100);
      $('#header').removeClass('header-scroll');
    }
  });
  // $('#header').slideToggle(0);

  


});
