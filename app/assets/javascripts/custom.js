var I18n = {};

var HOR = {
  showHide: function() {
    $(".toggle").click(function(event) {
      event.preventDefault();
      var name = $(this).attr('name');
      $(".toggle_" + name).slideToggle();
    });
  },
  displayUsers: function() {
    func = function() {
      jQuery.each($('.imagelist img'), function() {
        var src = $(this).attr('src');
        var dataSrc = $(this).attr('data-src');
        if (src !== dataSrc) {
          $(this).attr('src', dataSrc);
        }
      });
    };
    setTimeout(func, 500);
  },
  initializeMap: function() {
    jQuery.each($(".map_canvas"), function() {
      var init = $.parseJSON($(this).attr('data-init'));
      var myOptions = {
        zoom: init.zoom,
        center: new google.maps.LatLng(init.lat, init.long),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
      };
      var map = new google.maps.Map(this, myOptions);
      var arr = $.parseJSON($(this).attr('data-map'));
      jQuery.each(arr, function() {
        var h, infoWindow, marker;
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.lat, this.long),
          map: map,
          title: this.name
        });
        h = "<strong><a href='" + this.url + "'>" + this.name + "</a></strong></br>";
        h += "" + this.street + " " + this.house_number + "</br>";
        h += "" + this.zip + " " + this.city;
        infoWindow = new google.maps.InfoWindow({content: h});
        if (arr.length === 1) {
          infoWindow.open(map, marker);
        }
        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
        });
      });
    });
  },
  hitCounter: 0,
  scrollPage: function() {
    $('a[href*="#"]').click(function(event) {
      var target = $(this.hash);
      if (target.length) {
        event.preventDefault();
        var top = target.offset().top - 80;
        $('html, body').animate({scrollTop: top}, 1200);
        if (window.history && window.history.pushState) {
          var new_url = /\#/.test(location.href) ? location.href.replace(/\#.+/, this.hash) : "" + location.href + this.hash;
          window.history.pushState({ count: HOR.historyCounter }, "page-" + HOR.historyCounter, new_url);
        }
      }
    });
  },
  animateNavi: function() {
    var func = function() {
      var scrollY = $(document).scrollTop();
      var opacity = (scrollY - $('#logo').offset().top) * 0.005;
      if (opacity < 0) {
        opacity = 0;
      } else if (opacity > 1) {
        opacity = 1;
      }
      $('.logo').css('opacity', opacity);
    };
    $(window).load(func).scroll(func);
  },
  close: function() {
    $(".close").click(function(event) {
      event.preventDefault();
      $(this).parent().fadeOut();
    });
  },
  reload: function() {
    if($(".jobs").filter(":visible").size() === 0) {
      $(".jobs").filter(":hidden :first").show();
    }
    $('.reload').click(function(event) {
      event.preventDefault();
      var first = $(".jobs").filter(":visible");
      first.hide();
      if(first.next().length > 0) {
        first.next().fadeIn();
      } else {
        $(".jobs").filter(":hidden :first").fadeIn();
      }
    });
  },
  moreList: function(name) {
    var elements = $(name + " ul li");
    if(elements.size() > 5) {
      elements.slice(5).hide();
      $("<p><a class='more' href='#'>" + I18n.showMore + "</a></p>").insertAfter(name + " ul");
    }
    $(name + " a.more").click(function(event) {
      event.preventDefault();
      $(name + " ul li").filter(":hidden").fadeIn();
      $(name + " a.more").parent().hide();
    });
  }
};

$(document).ready(function() {
  HOR.reload();
  HOR.close();
  HOR.showHide();
  HOR.scrollPage();
  HOR.animateNavi();
  HOR.moreList("#events");
  HOR.moreList("#jobs");
  HOR.moreList("#undone");
  HOR.moreList("#done");
  HOR.initializeMap();
  HOR.displayUsers();
});
