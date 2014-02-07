/**
 * @author Daniel Nakhla
 * attempt:
 * Build a cross-browser/cross-device HTML drop-down menu.
 * The menu must work like an ordinary <select> tag within a form,
 * but must be constructed using HTML, CSS and JavaScript.
 * The code should be written in a modular fashion and support
 * multiple <select> tags on a single page. Bonus points if the menu
 * also supports AJAX loading of the items. You may use a JavaScript
 * library like jQuery but no plugins. All other code must be your own.
 */
;(function($) {'use strict';
    $.fn.selectFixer = function(pluginoptions) {
        var defaultoptions, originalSelector, options, initialize, setup;
        var containerEl, initSelection, newdomElement, selectedOptionContainer;
        defaultoptions = {
            'allowmulti' : false,
            'populateWithJSON' : false, // {url:'',value:'',html:''}
            'containerTag' : '<div>',
            'containerId' : 'selectFixerParent', //should be nested object
            'parentTag' : '<dl />',
            'parentTagId' : 'listParent',
            'childTag' : '<dt />',
            'selectedTag' : '<span />',
            'arrowtag' : '<p />',
            'arrowtagClass' : 'arrow',
            'selectingClass' : 'selecting',
            'linkDropDowns' : true,
            'debugmode' : false
        };
        originalSelector = $(this.selector);
        //create new options that take in all the overrides
        options = $.extend({}, defaultoptions, pluginoptions);
        if (options.allowmulti === true) {
            console.error('Multi select not currently supported - coming soon;');
        }

        initialize = function() {
            if (!options.debugmode) {
                originalSelector.hide();
            } else {
                console.warn('Debug mode for selectFixer activated');
            }
            containerEl = $(options.containerTag, {
                id : options.containerId
            });
            originalSelector.before(containerEl);
            newdomElement = $(options.parentTag, {
                id : options.parentTagId
            });
            if (!options.populateWithJSON) {
                originalSelector.find('option').each(function() {
                    $(options.childTag, {
                        'data-value' : this.value,
                        'html' : $(this).html(),
                        'data-selected' : $(this).attr('selected')
                    }).appendTo(newdomElement);
                });
                initSelection = newdomElement.find('[data-selected]').html();
                setup();
            } else {
                $.getJSON(options.populateWithJSON.url, function(data) {
                    var drill = (options.populateWithJSON.drilldown).split('.');
                    $.each(drill, function(key, val) {
                        data = data[val];
                    });
                    for (var i = 0; i < data.length; i++) {
                        var args = {
                            'data-value' : data[i][options.populateWithJSON.valuetext],
                            'html' : data[i][options.populateWithJSON.htmltext],
                        };
                        if (options.populateWithJSON.arrayelementSelected == i) {
                            args['data-selected'] = 'selected';
                            initSelection = data[i][options.populateWithJSON.htmltext];
                        };
                        $(options.childTag, args).appendTo(newdomElement);
                    }
                    setup();
                });
            }
        };
        setup = function() {
            containerEl.append(newdomElement);
            selectedOptionContainer = $(options.selectedTag, {
                html : $('<span />', {
                    html : initSelection
                })
            });
            selectedOptionContainer.append($(options.arrowtag, {
                'html' : '&darr;',
                'class' : options.arrowtagClass
            }));
            newdomElement.before(selectedOptionContainer);
            selectedOptionContainer.on('click touchstart', function(e) {
                e.preventDefault();
                containerEl.addClass(options.selectingClass);
                newdomElement.toggle();
            });
            newdomElement.children().on('click touch', function(e) {
                e.preventDefault();
                containerEl.removeClass(options.selectingClass);
                originalSelector.val($(this).data('value'));
                selectedOptionContainer.find('span').html(this.innerHTML);
                newdomElement.toggle();
            });
            if (options.linkDropDowns) {
                originalSelector.on('change', function(e) {
                    selectedOptionContainer.find('span').html($(this).find(':selected').html());
                });
            }
        };
        initialize();

        return this;
        //for chaining in jquery
    };
})(jQuery);
