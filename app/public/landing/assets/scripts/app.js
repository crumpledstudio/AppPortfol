var $ = jQuery.noConflict();

(function($) {
  'use strict';

//
// variable
// -----------------------------------------------------------------------------
//

var $html = $('html'),
    $body = $('body'),
    is_mobile,
    site_loader_duration = 500;
    if ($('#site_loader').is(':visible') && typeof fn_site_loader !== 'undefined' && $.isFunction(fn_site_loader)) {
      site_loader_duration = 1250;
    }

// fn_bg_slideshow
// -----------------------------------------------------------------------------

function fn_bg_slideshow() {
  var $elem = $('.bg-slideshow');

  if ($elem.length) {
    $elem.each(function() {
      var $this = $(this);
      var $amount = $this.attr('data-bg-slideshow-amount');
      var slides = [];
      var animation = $this.attr('data-bg-slideshow-animation');

      for (var i = 1; i <= $amount; i++) {
        slides.push({
          src: $this.attr('data-bg-slideshow-src').replace('%', i)
        });
      }

      $this.vegas({
        slides: slides,
        delay: $this.attr('data-bg-slideshow-delay'),
        animation: animation
      });
    });
  }
}

fn_bg_slideshow();

// fn_bg_youtube
// -----------------------------------------------------------------------------

function fn_bg_youtube() {
  var $elem = $('.bg-youtube');

  if ($elem.length) {
    $elem.each(function() {
      var $this        = $(this);
      var $placeholder = $this.find('.bg-youtube-placeholder');
      var $fallback    = $this.find('.bg-youtube-fallback');
      var $player      = $this.find('.bg-youtube-player');

      if (is_mobile) {
        $placeholder.add($player).remove();
      } else {
        $player.YTPlayer();
        $fallback.remove();

        $player.on('YTPPlay', function() {
          $(this).addClass('js-bg-youtube-is-playing').removeClass('js-bg-youtube-is-paused');
        });

        $player.on('YTPPause', function() {
          $(this).addClass('js-bg-youtube-is-paused').removeClass('js-bg-youtube-is-playing');
        });
      }
    });
  }
}

$(window).on('load', function() {
  fn_bg_youtube();
});

// fn_carousel
// -----------------------------------------------------------------------------

function fn_carousel() {
  var $elem = $('.bfc-carousel');

  if ($elem.length) {
    $elem.each(function() {
      var $this = $(this);

      var $btn_carousel = $this.siblings('.bfc-carousel-button');

      if ($btn_carousel.length) {
        $this.on('init', function (event, slick, direction) {
          if ($this.find('.slick-slide').length < 2) {
            $btn_carousel.hide();
          }
        });

        $this.siblings().find('.btn-carousel-prev').on('click', function() {
          $this.slick('slickPrev');
        });
        $this.siblings().find('.btn-carousel-next').on('click', function() {
          $this.slick('slickNext');
        });
      }
    });

    $elem.on('init', function(slick){
      $(window).trigger('resize');
    });

    $elem.slick({});
  }
}

$(window).imagesLoaded().always(function(instance) {
  fn_carousel();
  $(window).trigger('resize');
});

// fn_form
// -----------------------------------------------------------------------------

function fn_form() {
  var $elem = $('.form');

  if ($elem.length) {
    $elem.each(function() {
      var $form          = $(this);
      var $submit_notify = $form.find('.submit-notify');
      var form_action    = $form.data('form-action');

      $form.validate({
        errorClass: 'has-error',
        onclick: false,
        //onfocusout: false,
        //onkeyup: false,
        ignore: '.ignore',
        highlight: function(element, errorClass) {
          $(element).closest('.form-group').addClass(errorClass);
        },
        unhighlight: function(element, errorClass) {
          $(element).closest('.form-group').removeClass(errorClass);
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
          if(element.parent('.input-group').length) {
            //error.insertAfter(element.parent());
          } else {
            //error.insert(element);
            $(element).closest('.form-group').find('.form-notify').html(error);
          }
        },
        submitHandler: function(form, errorClass) {
          $.ajax({
            type: 'POST',
            dataType: 'json',
            url: form_action,
            cache: false,
            data: $form.serialize(),
            success: function(data) {
              if (data.type != 'success') {
                $submit_notify.closest('.form-group').removeClass('has-success').addClass('has-error');
                $submit_notify.html(data.msg).show();
              } else {
                $form.validate().resetForm();
                $form[0].reset();
                $form.find('has-error').removeClass('has-error');
                $form.find('button[type=submit]').blur();
                $submit_notify.closest('.form-group').addClass('has-success');
                $submit_notify.html(data.msg).show();
              }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              $submit_notify.closest('.form-group').removeClass('has-success').addClass('has-error');
              $submit_notify.html('An error occurred. Please try again later.').show();
            },
          });
        },
        invalidHandler: function(event, validator) {
          //var errors = validator.numberOfInvalids();
          //
          //if (errors) {
          //  var message = errors == 1 ?
          //  'You missed 1 field. It has been highlighted.' :
          //  'You missed ' + errors + ' fields. They have been highlighted.';
          //  $submit_notify.html(message).show();
          //}
        }
      });
    });
  }
}

fn_form();

// fn_height_hero
// -----------------------------------------------------------------------------

function fn_height_hero() {
  var $elem = $('.h-hero');

  if ($elem.length) {
    $elem.css('height', $(window).height() + 'px');
  }
}

$(window).on('load orientationchange', function() {
  fn_height_hero();
});

// fn_is_mobile
// -----------------------------------------------------------------------------

function fn_is_mobile() {
  if ($html.hasClass('mobile') || $html.hasClass('tablet')) {
    is_mobile = true;
    $html.addClass('js-is-mobile');
  } else {
    is_mobile = false;
    $html.addClass('js-no-mobile');
  }
}

fn_is_mobile();

// fn_is_scroll
// -----------------------------------------------------------------------------

function fn_is_scroll() {
  $(window).on('load scroll', function() {
    //window.requestAnimationFrame(function() {
      var scroll_top = $(window).scrollTop();

      if (scroll_top > 0) {
        $html.addClass('js-is-scroll').removeClass('js-is-no-scroll');
      } else {
        $html.addClass('js-is-no-scroll').removeClass('js-is-scroll');
      }
    //});
  });
}

fn_is_scroll();

// nav
// -----------------------------------------------------------------------------

function fn_nav() {
  var $elem = $('.nav li.disabled a');

  if ($elem.length) {
   $elem.on('click', function() {
     return false;
   });
  }
}

fn_nav();

// fn_carousel
// -----------------------------------------------------------------------------

function fn_parallax() {
  var $elem = $('.bg-img-parallax');

  if ($elem.length) {
    if (!is_mobile) {
      $elem.each(function() {
        $(this).parallax('50%', '.1');
      });
    }
  }
}

fn_parallax();

// fn_ripple
// -----------------------------------------------------------------------------

function fn_ripple() {
  var $elem = $('.ripple, .btn, .dropdown-menu > li > a, .menu-item > a');

  if ($elem.length) {
    $('head').append('<style>input.btn .legitRipple-ripple, .btn-link .legitRipple-ripple, .btn.disabled .legitRipple-ripple {display: none;})</style>');

    $elem.ripple();
  }
}

fn_ripple();

// fn_scrollspy
// -----------------------------------------------------------------------------

function fn_scrollspy() {
  var $elem = $('#site_navbar');

  if ($elem.length) {
    var offset;

    if ($('.site-header-fixed-top').length) {
      offset = parseInt($('.site-header-fixed-top').find('.navbar-header').outerHeight() + 1, 10)
    } else {
      offset = parseInt($elem.find('.navbar-header').outerHeight() + 1, 10)
    }

    $body.scrollspy({
      target: '#' + $elem.attr('id'),
      offset: offset
    });
  }
}

fn_scrollspy();

// fn_scroll_to_top
// -----------------------------------------------------------------------------

function fn_scroll_to_top() {
  var $elem = $('#btn_scroll_to_top');

  if ($elem.length) {
    $elem.on('click', function(e) {
      e.preventDefault();

      //$body.velocity('stop').velocity('scroll', {
      //  offset: 0,
      //  duration: 1000,
      //});

      $('html, body').stop().animate({
        scrollTop: 0
      }, 1250, 'easeInOutQuint');
    });
  }
}

fn_scroll_to_top();

// fn_site_loader
// -----------------------------------------------------------------------------

function fn_site_loader() {
  var $elem = $('#site_loader');

  //if ($elem.length) {
  //  $elem.velocity('fadeOut', {
  //    duration: site_loader_duration,
  //    easing: 'linear',
  //    complete: function() {
  //      $(this).remove();
  //      $html.addClass('js-page-loaded');
  //    }
  //  });
  //}

  if ($elem.length) {
    $elem.fadeOut(site_loader_duration, function() {
      $(this).remove();
      $html.addClass('js-page-loaded');
    });
  }
}

$(window).on('load', function() {
  fn_site_loader();
});

// fn_smooth_scroll
// -----------------------------------------------------------------------------

function fn_smooth_scroll() {
  var $elem = $('[data-smooth-scroll="true"]');

  if ($elem.length) {
    $elem.on('click', function(e) {
      e.preventDefault();

      var $target = $($(this).attr('href'));

      if ($target.is(':visible')) {
        var offset;

        if ($('.site-header-fixed-top').length) {
          offset = (($target.offset().top - $('.site-header-fixed-top').find('.navbar-header').outerHeight()) + 1);
        } else {
          offset = ($target.offset().top + 1)
        }

        //$target.velocity('stop').velocity('scroll', {
        //  offset: -offset,
        //  duration: 1000,
        //});

        $('html, body').stop().animate({
          scrollTop: offset
        }, 625, 'easeInOutQuint');
      }
    });
  }
}

fn_smooth_scroll();

// utility
// -----------------------------------------------------------------------------

function fn_utility() {
  $('[data-css-opacity]').each(function() {
    var $this = $(this);
    $this.css('opacity', $this.data('css-opacity'));
  });

  $('[data-css-bg-img]').each(function() {
    var $this = $(this);
    $this.css('background-image', 'url(' + $this.data('css-bg-img') + ')');
  });

  $('[data-css-bg-img-mobile]').each(function() {
    if (is_mobile) {
      var $this = $(this);
      $this.css('background-image', 'url(' + $this.data('css-bg-img-mobile') + ')');
    }
  });

  $('[data-css-bg-img-desktop]').each(function() {
    if (!is_mobile) {
      var $this = $(this);
      $this.css('background-image', 'url(' + $this.data('css-bg-img-desktop') + ')');
    }
  });
}

fn_utility();

// fn_wow
// -----------------------------------------------------------------------------

function fn_wow() {
  var $elem = $('.wow');

  if ($elem.length) {
    if (!is_mobile && Modernizr.cssanimations && Modernizr.csstransforms && Modernizr.csstransforms3d && Modernizr.csstransitions) {
      setTimeout(function() {
        var wow = new WOW();

        wow.init();
      }, site_loader_duration);
    } else {
      $elem.removeClass('wow');
    }
  }
}

$(window).on('load', function() {
  fn_wow();
});

})(jQuery);
