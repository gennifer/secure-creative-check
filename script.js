formSubmitted = false;
// jquery.xdomainajax.js  ------ from padolsey
function submitForm() {
    //has the form been submitted before?

    if( formSubmitted == true ){
        alert("This form has already been submitted! Please refresh!");
        
    } else {
    // Set the formSubmitted flag
    formSubmitted = true;
    runOnClick();
    }
}

function runOnClick() {

    var your_url = document.getElementById("userInput").value;

    jQuery.ajax = (function(_ajax){

        var protocol = location.protocol,
            hostname = location.hostname,
            exRegex = RegExp(protocol + '//' + hostname),
            YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
            query = 'select * from html where url="{URL}" and xpath="*"';

        function isExternal(url) {
            return !exRegex.test(url) && /:\/\//.test(url);
        }

        return function(o) {

            var url = o.url;

            if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {

                // Manipulate options so that JSONP-x request is made to YQL

                o.url = YQL;
                o.dataType = 'json';

                o.data = {
                    q: query.replace(
                        '{URL}',
                        url + (o.data ?
                            (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                        : '')
                    ),
                    format: 'xml'
                };

                // Since it's a JSONP request
                // complete === success
                if (!o.success && o.complete) {
                    o.success = o.complete;
                    delete o.complete;
                }

                o.success = (function(_success){
                    return function(data) {

                        if (_success) {
                            // Fake XHR callback.
                            _success.call(this, {
                                responseText: data.results[0]
                                    // YQL screws with <script>s
                                    // Get rid of them
                                    // .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                                    
                                    // .replace(/<img[^>]+?\/>|<img(.|\s)*?\/img>/gi, '')
                                    // .replace(/<meta[^>]+?\/>|<meta(.|\s)*?\/meta>/gi, '')
                                    // .replace(/<meta[^>]+?\/>|<meta(.|\s)*?\/meta>/gi, '')
                                    // .replace(/<a[^>]+?\/>|<a(.|\s)*?\/a>/gi, '')
                                    // .replace(/<ul[^>]+?\/>|<ul(.|\s)*?\/ul>/gi, '')
                            }, 'success');
                        }

                    };
                })(o.success);

            }

            return _ajax.apply(this, arguments);

        };

    })(jQuery.ajax);



    $.ajax({
        url: your_url,
        type: 'GET',
        success: function(res) {
            var text = [];
            var text = res.responseText;
                // then you can manipulate your text as you wish
            
            //create a dummydom instead of appending html
            dummyDom = document.createElement('html');
            dummyDom.innerHTML = text;
            console.log(dummyDom);
            scriptTags = dummyDom.getElementsByTagName('script');
            //console.log(typeof allScripts[4].getAttribute('src'));
            console.log(scriptTags);
            unsecureScripts = document.getElementById('unsecure');
            securityCheck();       
        }
    });
}

function securityCheck() {
    for (i = 0; i < scriptTags.length; i++) {
        if (scriptTags[i].hasAttribute('src')) {
            // check for protocol relative URL
            if (scriptTags[i].getAttribute('src').slice(0,2) === "//") {
                a = i + 1;
                var newDiv = document.createElement('div');
                    newDiv.id = 'script' + i;
                var x = scriptTags[i].getAttribute('src');
                var appendedDiv = unsecureScripts.appendChild(newDiv);
                    appendedDiv.innerHTML = "<i>Script Tag " + a + " contains protocol relative URL, please validate secure address: </i> <b>" + scriptTags[i].getAttribute('src') + "</b>";
                console.log("IMPORTANT");
                console.log("contains protocol relative url");
                console.log(scriptTags[i].getAttribute('src'));
            }
            // check for https
            else if (scriptTags[i].getAttribute('src').slice(0,5).toLowerCase() === "https") {
                a = i + 1;
                var newDiv = document.createElement('div');
                    newDiv.id = 'SSLsecured' + i;
                var appendedDiv = document.getElementById('allgood').appendChild(newDiv);
                    appendedDiv.innerHTML = "<i>Script Tag " + a + " good to go, contains secure reference: " + scriptTags[i].getAttribute('src');
                console.log(typeof scriptTags[i].getAttribute('src'));
                console.log("contain SSL https");
                console.log(scriptTags[i].getAttribute('src'));
            // check for http
            } else if (scriptTags[i].getAttribute('src').slice(0,5).toLowerCase() === "http:") {
                a = i + 1;
                var newDiv = document.createElement('div');
                    newDiv.id = 'script' + i;
                var x = scriptTags[i].getAttribute('src');
                var appendedDiv = unsecureScripts.appendChild(newDiv);
                    appendedDiv.innerHTML = "<i>Script Tag " + a + " contains insecure src reference: </i> <b>" + scriptTags[i].getAttribute('src') + "</b>";
                console.log("IMPORTANT");
                console.log("contains insecure http");
                console.log(scriptTags[i].getAttribute('src'));
            }
            else {
                a = i + 1;
                var newDiv = document.createElement('div');
                    newDiv.id = 'script' + i;
                var x = scriptTags[i].getAttribute('src');
                var appendedDiv = unsecureScripts.appendChild(newDiv);
                    appendedDiv.innerHTML = "<i>Script Tag " + a + " good to go, contains local reference: " + scriptTags[i].getAttribute('src');
                console.log("IMPORTANT");
                console.log("contains local reference");
                console.log(scriptTags[i].getAttribute('src'));
            }
        } else {
            a = i + 1;
            var newDiv = document.createElement('div');
                newDiv.id = 'inline' + i;
            var appendedDiv = document.getElementById('allgood').appendChild(newDiv);
                appendedDiv.innerHTML = "<i>Script Tag " + a + " contains inline javascript</i>";
            console.log(typeof scriptTags[i]);
            console.log("contains inline javascript");
            console.log(scriptTags[i]);
        }
    }
    document.getElementById("results").style.display = "block";
}

document.getElementById("submitBtn").addEventListener("click", submitForm);