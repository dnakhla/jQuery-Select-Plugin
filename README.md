jQuery-Select-Plugin
====================

JQuery Select Fixer Plugin: http://ch.danielnakhla.com/

jQuery plugin a cross-browser/cross-device HTML drop-down menu
<h2>usage</h2>
<code> $(select_tag).selectFixer();</code>
<h3>example</h3>
<pre>
            $(document).ready(function() {
                $('.select-fix').selectFixer();
                // use with ajax info
                $('.select-fix-json').selectFixer({
                    populateWithJSON : {
                        url : 'http://query.yahooapis.com/v1/public/yql?q=select%20name%20from%20geo.continents&format=json&callback=',
                        drilldown : 'query.results.place',
                        arrayelementSelected : 0,
                        htmltext : 'name',
                        valuetext : 'name'
                    }
                });
            });
</pre>
        
