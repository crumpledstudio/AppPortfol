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

(function(window, document, $) {
    'use strict';

     Morris.Area({
        element: 'area-chart',
        data: [{
            year: '2014',
            PagesSession: 0
        }, {
            year: '2015',
            PagesSession: 90000
        }, {
            year: '2016',
            PagesSession: 120000
        }, {
            year: '2017',
            PagesSession: 240000
        }, {
            year: '2018',
            PagesSession: 140000
        }],
        xkey: 'year',
        ykeys: ['PagesSession'],
        //labels: ['Pages/Session'],
        behaveLikeLine: true,
        ymax: 250000,
        resize: true,
        pointSize: 0,
        //pointStrokeColors:['#F44336'],
        smooth: false,
        //gridLineColor: '#e3e3e3',
        numLines: 6,
        //gridtextSize: 14,
        //lineWidth: 0,
        fillOpacity: 0.6,
        hideHover: 'auto',
        lineColors: ['#F44336']
  //axes: false, 
  //grid: false
    });
     Morris.Bar({
        element: 'bar-chart',
        data: [{
                y: 'Braga',
                a: 43
            }, {
                y: 'Coimbra',
                a: 54
            }, {
                y: 'Porto',
                a: 50
            }, {
                y: 'Lisboa',
                a: 82
            }
        ],
        xkey: 'y',
        ykeys: ['a'],
        labels: ['Interessados'],
        //barGap: 6,
        barSizeRatio: 0.6,
        smooth: true,
        gridLineColor: '#e3e3e3',
        //numLines: 5, 
        hideHover: 'auto',
        //gridtextSize: 14,
        grid: false,
        axes: false,
        fillOpacity: 0.4,
        resize: true,
        barColors: ['#00A5A8']
    });
     Morris.Donut({
     	element: 'pie-chart',
     	data: [
     	{label: "information01", value: 44},
     	{label: "information02", value: 19},
     	{label: "information03", value: 37}
     	],
     	resize: true,
        colors: ['#00A5A8', '#FF7D4D', '#FF4558']
     });




})(window, document, jQuery);


