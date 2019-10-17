(function(window, undefined) {
  'use strict';

  /*
  NOTE:
  ------
  PLACE HERE YOUR OWN JAVASCRIPT CODE IF NEEDED
  WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR JAVASCRIPT CODE PLEASE CONSIDER WRITING YOUR SCRIPT HERE.  */
$(function() {
       $(".dial").knob({
         'min':0,
         'max':10,
         'angleOffset': -90,
         'angleArc': 180,
         'step': 0.1,
         'readOnly': 'true'
       });
       $(".dial2").knob({
         'min':0,
         'max':10,
         'angleOffset': -90,
         'angleArc': 180,
         'fgColor': "#66CC66",
         'bgColor': '#a42',
         'step': 0.1,
         'readOnly': 'true'
       });
     });
$(document).ready(function(){
  $({value: 0}).animate({value: 5.5}, {
    duration: 3400,
    easing:'swing',
    step: function(){
      $('.dial').val(this.value).trigger('change');
    }    
  }),
    $({value: 0}).animate({value: 7.4}, {
    duration: 5000,
    easing:'swing',
    step: function(){
      $('.dial2').val(this.value).trigger('change');
    }    
  })
});

var delay = 500;
$(".progress-bar").each(function(i){
    $(this).delay( delay*i ).animate( { width: $(this).attr('aria-valuenow') + '%' }, delay );
    /*

    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: delay,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    }); */
});





})(window);


