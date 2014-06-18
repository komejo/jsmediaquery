$(document).ready(function() {

    // create a 'smart' resize function with debounce
    (function($,sr){
        // debouncing function from John Hann: http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        var debounce = function (func, threshold, execAsap) {
            var timeout;
            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) { func.apply(obj, args); };
                    timeout = null;
                };
                if (timeout) { clearTimeout(timeout); }
                else if (execAsap) { func.apply(obj, args); };
                timeout = setTimeout(delayed, threshold || 100);
          };
        };
        // smartresize via Paul Irish http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
        jQuery.fn[sr] = function(fn){ return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
    })(jQuery,'smartresize');

    // create the state-indicator element
    var stateIndicator = document.createElement('div');
    stateIndicator.className = 'state-indicator';
    document.body.appendChild(stateIndicator);

    // Create a method which returns device state
    function getDeviceState() {
       return parseInt(window.getComputedStyle(stateIndicator).getPropertyValue('z-index'), 10);
    };

    // JS events that you want to trigger go here. The case statements should correspond to your breakpoints.
    function jsMediaQuery(deviceState) {
        switch (deviceState) {
            default: // this is where you reset things to the default state
                if (deviceState >= 1025) {
                    $('.blockone').insertBefore('.blocktwo');
                };
                $('body').removeClass();
                break;
            case 1024:
                if ($('body.is1024').length) { // Things that happen on every resize go here (rare, but nice to have the option)
                } else { // the 'run once' events
                    // set a class to prevent firing events repeatedly at this size.
                    $('body').removeClass().addClass('is1024');
                    // now you add the actions you want:
                    $('.blockone').insertAfter('.blockthree');
                };
                break;
            case 640:
                if ($('body.is640').length) {
                } else {
                    $('body').removeClass().addClass('is640');
                    $('.blockone').insertBefore('.blockthree');
                };
                break;
            case 480:
                if ($('body.is480').length) {
                } else {
                    $('body').removeClass().addClass('is480');
                    $('.blockone').insertBefore('.blocktwo');
                };
                break;
        }
    };

    // Fire!
    $(window).smartresize(function(){
        var state = getDeviceState(),
        lastDeviceState;
        if(state != lastDeviceState) {
            lastDeviceState = state;
        }
        jsMediaQuery(getDeviceState());
    });

    jsMediaQuery(getDeviceState());

});