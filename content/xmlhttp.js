
//create xmlhttprequest instance.
function createXmlHttpResquest() {
	var xmlHttp;
	if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
		if (xmlHttp.overrideMimeType) {
			xmlHttp.overrideMimeType('text/xml');
		}
	} else {
		if (window.ActiveXObject) {
			try {
				xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				try {
					xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {
				}
			}
		}
	}
	return xmlHttp;
}

var xhttp = {

	init : function() {
		var initObj;
		if (!initObj && typeof XMLHttpRequest != "undefined") {
			try {
				initObj = new createXmlHttpResquest();
			} catch (e) {
				initObj = false;
			}
		}
		return initObj;
	},

	doAsyncPost : function(content, url, username, password, doit) {
		var httprequest;
		var strBundle = document.getElementById("doit-strings");
		try {
			var webResp = new doit_WebResponse(0, "");
			httprequest = this.init();
			if (httprequest == false) {
				throw strBundle.getString("init.error");
			}
			httprequest.open("post", url, true, username, password);
			var contentType = "application/json";

			httprequest.setRequestHeader("Content-Type", contentType);
			httprequest.setRequestHeader("Content-Length", content.length);
            httprequest.onreadystatechange = function (aEvt) {  
                if (httprequest.readyState == 4) {  
                    if (httprequest.status == 200) {
                      doit.updateStatus(strBundle.getString("new.task"))
                    } else if (httprequest.status == 404) {
                        alert(strBundle.getString("no.resource"));
                    } else if (httprequest.status == 403) {
                        alert(strBundle.getString("no.authorization"));
                    } else if (httprequest.status == 401) {
                        alert(strBundle.getString("no.basic.auth"));
                    }
                }
            };  
			
			httprequest.send(content);
		} catch (ex) {
			alert(strBundle.getString("fail.new.task") + ': ' + ex);
		}
	}

};
