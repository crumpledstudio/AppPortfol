(function(window, document, $) {
    'use strict';
    // Checkbox & Radio 1
    $('.icheck-activity').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
    });

    $("#friends-activity, #daily-activity").perfectScrollbar({
        wheelPropagation: true
    });


    $("#sp-bar-total-cost").sparkline([5,6,7,8,9,10,12,13,15,14,13,12,10,9,8,10,12,14,15,16,17,14,12,11,10,8], {
        type: 'bar',
        width: '100%',
        height: '50px',
        barWidth: 2,
        barSpacing: 4,
        barColor: '#FF5722'
    });
    // Total Sales
    $("#sp-line-total-sales").sparkline([14,12,4,9,3,6,11,10,13,9,14,11,16,20,15], {
        type: 'line',
        width: '100%',
        height: '100px',
        lineColor: '#00BCD4',
        fillColor: '#00BCD4',
        spotColor: '',
        minSpotColor: '',
        maxSpotColor: '',
        highlightSpotColor: '',
        highlightLineColor: '',
        chartRangeMin: 0,
        chartRangeMax: 20,
    });

})(window, document, jQuery);