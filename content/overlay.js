var doit = {

	onLoad : function() {
		// initialization code
	},

	showOptions : function() {
		this.updateStatus("Doit.im");
		window.showModalDialog("chrome://doit/content/options.xul",
				"dialogWidth:400px; dialogHeight:250px; center:yes");
	},

	quickAddMenuItemCommand : function(e) {
        var strBundle = document.getElementById("doit-strings");
		var uri = "https://www.doit.im/resources/tasks";

		var obj = new Object;
		obj['title'] = getText();
		obj['isNew'] = true;
		if (obj['title'] == null || obj['title'] == '') {
			var emptyContent = strBundle.getString("empty.content");
			alert(emptyContent);
			return;
		}
		var content = JSON.stringify(obj);

		var username = gbmPrefHandler.getPref(dbPrefNames.prefUserName, "char");
		var password = doit_jsUtils.getPwd(username);
		this.updateStatus(strBundle.getString("creating.task"));
		xhttp.doAsyncPost(content, uri, username, password, this);
	},

	showContextMenu : function(event) {
		//do nothing.
	},

	updateStatus : function(st) {
		document.getElementById("doit-im-status-bar-lab").value = st;
	}

};
