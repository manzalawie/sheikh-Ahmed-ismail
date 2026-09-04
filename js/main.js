(function ($) {
  "use strict";

  $(window).on("load", function () {
    setTimeout(function () {
      $("#preloader").addClass("hide");
    }, 500);
  });
  setTimeout(function () {
    $("#preloader").addClass("hide");
  }, 2500);

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 240) {
      $("#toTop").fadeIn(180);
    } else {
      $("#toTop").fadeOut(180);
    }
  });

  $("#toTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });

  var videoModal = document.getElementById("videoModal");
  if (videoModal) {
    videoModal.addEventListener("show.bs.modal", function (event) {
      var btn = event.relatedTarget;
      var id = btn && ($(btn).attr("data-video") || $(btn).closest("[data-video]").attr("data-video"));
      var iframe = videoModal.querySelector("iframe");
      if (id && iframe) {
        iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0";
      }
    });
    videoModal.addEventListener("hidden.bs.modal", function () {
      var iframe = videoModal.querySelector("iframe");
      if (iframe) iframe.src = "";
    });
  }

  $(".gallery-item").on("click", function () {
    var src = $(this).find("img").attr("src");
    var cap = $(this).find(".cap").text() || "";
    $("#lightboxImage").attr("src", src);
    $("#lightboxCaption").text(cap);
    var modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("lightbox"));
    modal.show();
  });

  $(".filter-btn").on("click", function () {
    var filter = $(this).data("filter");
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    if (filter === "all") {
      $("[data-surah]").parent().show();
    } else {
      $("[data-surah]").parent().hide();
      $("[data-surah='" + filter + "']").parent().show();
    }
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    var name = $.trim($("#cName").val());
    var email = $.trim($("#cEmail").val());
    var msg = $.trim($("#cMessage").val());
    var ok = true;
    $(".is-invalid").removeClass("is-invalid");
    if (name.length < 2) { $("#cName").addClass("is-invalid"); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $("#cEmail").addClass("is-invalid"); ok = false; }
    if (msg.length < 8) { $("#cMessage").addClass("is-invalid"); ok = false; }
    if (!ok) return;
    $("#contactForm").hide();
    $(".form-success").show();
  });

  var verses = [
    { t: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ", s: "سورة الحجر — الآية ٩" },
    { t: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", s: "سورة الرعد — الآية ٢٨" },
    { t: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا", s: "سورة المزمل — الآية ٤" },
    { t: "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ", s: "سورة الإسراء — الآية ٩" },
    { t: "الرَّحْمَٰنُ ۝ عَلَّمَ الْقُرْآنَ", s: "سورة الرحمن — الآيتان ١–٢" }
  ];
  var today = new Date();
  var v = verses[today.getDate() % verses.length];
  if ($("#dailyVerse").length) {
    $("#dailyVerse").text(v.t);
    $("#dailyVerseMeta").text(v.s);
  }

  function toHijri(date) {
    var g = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var jd = Math.floor((1461 * (y + 4800 + Math.floor((m - 14) / 12))) / 4) +
      Math.floor((367 * (m - 2 - 12 * Math.floor((m - 14) / 12))) / 12) -
      Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 14) / 12)) / 100)) / 4) + g - 32075;
    var l = jd - 1948440 + 10632;
    var n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    var j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
      Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    m = Math.floor((24 * l) / 709);
    g = l - Math.floor((709 * m) / 24);
    y = 30 * n + j - 30;
    var months = ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"];
    return g + " " + months[m - 1] + " " + y + " هـ";
  }
  $(".hijri-date").text(toHijri(new Date()));

  $(".counter").each(function () {
    var $el = $(this);
    var target = parseInt($el.data("count"), 10);
    $({ n: 0 }).animate({ n: target }, {
      duration: 1400,
      easing: "swing",
      step: function (now) {
        $el.text(Math.floor(now).toLocaleString("ar-EG"));
      }
    });
  });
})(jQuery);
