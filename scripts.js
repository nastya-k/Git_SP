        $(document).ready(function () {
            $("[data-fancybox]").fancybox({
                iframe: {
                    scrolling: 'yes'
                    , css: {
                        width: '600px'
                        , height: '700px'
                    , }
                }
                , speed: 1000
            , });
            
            
            
            
            $("#shuffle").on("click", function () {
                var list = $("ul");
                return list.each(function () {
                    var elems = $(this).children();
                    elems.detach();
                    elems.sort(function () {
                        return (Math.random() - 0.5);
                    });
                    for (var i = 0; i < elems.length; i++) $(this).append(elems[i]);
                });
            });
            
            
            
            
            $("#submit_button").click(function () {
                var searchResult = $("#search_field").val()
                    , li = $("li")
                    , counter = li.attr("counter") !== undefined ? li.attr("counter") : 0;
                $("li:contains(" + searchResult + ")").css("background", "#fdfc9c").attr("counter", ++counter);
                noResultElem = $("<p></p>").text("Sorry, try searching for " + "'" + searchResult + "'" + " on Google").addClass("error_class");
                li.each(function () {
                    if ($(this).attr("counter") > 3) {
                        $(this).css("background", "#ffdc4c");
                    };
                });
                if ($("li").index(searchResult) == -1) {
                    $("form").append(noResultElem);  
                }
            });
            
            
            
            
            var substringMatcher = function (strs) {
                return function findMatches(q, cb) {
                    var matches, substringRegex;
                    // an array that will be populated with substring matches
                    matches = [];
                    // regex used to determine if a string contains the substring `q`
                    substrRegex = new RegExp(q, 'i');
                    // iterate through the pool of strings and for any string that
                    // contains the substring `q`, add it to the `matches` array
                    $.each(strs, function (i, str) {
                        if (substrRegex.test(str)) {
                            matches.push(str);
                        }
                    });
                    cb(matches);
                };
            };
            
            
            var titles = [];
            $('p').each(function () {
                titles.push($(this).text());
            });
            $('.typeahead').typeahead({
                hint: false, 
                highlight: true,
                minLength: 1
            }, {
                name: 'titles'
                , source: substringMatcher(titles)
            });
        });