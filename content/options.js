var doit_options={
	
	LoadOptions:function(){
		//��ʼ���û���/����
	    var username=gbmPrefHandler.getPref(dbPrefNames.prefUserName,"char");
	    document.getElementById("gUserName").value = username;
	    var password=doit_jsUtils.getPwd( username );
	    document.getElementById("gPwd").value= password;
	},
	
	doOK:function(){
	    try{
	        var username=doit_jsUtils.trimWhitespace(document.getElementById("gUserName").value);
	        var password=document.getElementById("gPwd").value;
	        gbmPrefHandler.setPref(dbPrefNames.prefUserName, username ,"char");
	        doit_jsUtils.savePwd( username , password );
	        return true;
	    }
	    catch(ex){
	    	var strBundle = document.getElementById("options.properties");
			var errorSave = strBundle.getString("error.save");
	        alert( errorSave );
	        return false;
	    }
	},
	
	doCancel:function(){
    	return true;
	}
};
