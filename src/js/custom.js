import $ from "jquery";
import "popper.js";

$(document).ready(function () {
  let v = false;
  $("#dropdownMenuButton, .menu_mobile_icon, .menu-icon").on(
    "click",
    function () {
      $(".dropdown_menu").toggle();
      v = !v;
      if(v){
        $("body").css("overflow", "hidden");
      }else{
        $("body").css("overflow", "scroll");
      }
    }
  );

    // $(document).click(function(event) {
    //     // const target = $(event.target);
    //     // if(!target.closest('#menucontainer').length &&
    //     //     $('.dropdown_menu').is(":visible")) {
    //     //     $('.dropdown_menu').hide();
    //     //     v = false;
    //     // }
    // });

  $("#profileImage").click(function (e) {
    $("#imageUpload").click();
  });

  function fasterPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
      $("#profileImage").css(
        "background-image",
        `url(${window.URL.createObjectURL(uploader.files[0])})`
      );
    }
  }

  $("body").on("change", "#imageUpload", function () {
    fasterPreview(this);
  });
});
