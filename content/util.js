
var dbPrefNames={prefUserName:"doit.username",prefQuickAdd:"doit.quickadd",prefAddTask:"doit.addtask" };
 
function doit_WebResponse( id , message ){
    this.eId= id;
    this.eMesg=message;
    this.auxObj=null;
    function SetError(eId , eMessage){
        this.eId=eId;
        this.eMesg=eMessage;
    }
}

if(typeof gbmPrefHandler=="undefined"){
	
    var gbmPrefHandler={
    	
    isExists:function(prefname, format ){
    	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        format=(format==null)?"char":format;
        if(format=="char"){
            if(prefs.getPrefType(prefname)==prefs.PREF_STRING && doit_jsUtils.trimWhitespace(prefs.getCharPref(prefname).toString())!=""){
                return true;
            }else{
                return false;
            }
        }else{
            if(format=="bool"){
                try{
                    prefs.getBoolPref(prefname);
                }
                catch(ex){
                    return false;
                }
                return true;
            }
        }
    },
    getPref:function( prefname , format ){
    	var prefs=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        try{
            format=(format==null)?"char":format;
            if( format =="char"){
                return prefs.getCharPref(prefname).toString();
            }else{
                if( format =="bool"){
                    return prefs.getBoolPref(prefname);
                }
            }
        }
        catch(ex){
            return "";
        }
    },
    setPref:function( prefname , value , format){
    	var prefs=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        format=(format==null)?"char":format;
        if(format =="char"){
            prefs.setCharPref(prefname , value );
        }else{
            if(format=="bool"){
                prefs.setBoolPref(prefname , value );
            }
        }
    },
    
    setPrefIfNotExists:function( prefname , value , format ){
    	var prefs=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        format=(format==null)?"char":format;
        if(format=="char"){
            if(prefs.getPrefType(prefname)!=prefs.PREF_STRING||(prefs.getPrefType(prefname)==prefs.PREF_STRING && doit_jsUtils.trimWhitespace(prefs.getCharPref(prefname).toString())=="")){
                prefs.setCharPref(prefname , value );
            }
        }else{
            if(format=="bool"){
                try{
                    prefs.getBoolPref(prefname);
                }
                catch(ex){
                    prefs.setBoolPref(prefname,value);
                }
            }
        }
    }};
}

if(typeof doit_jsUtils=="undefined"){
	
	var doit_jsUtils={
	
	savePwd:function( username , password ){
	  
	   var passwdmanagerstr = "@mozilla.org/passwordmanager;1";
	   if( passwdmanagerstr in Components.classes){
       
	       	var passwordManager = Components.classes[ passwdmanagerstr ]
	                                .getService(Components.interfaces.nsIPasswordManager);
	       	try{
	       		passwordManager.removeUser( host ,username );
	       		passwordManager.addUser( host , username , password );
	       	}catch( ex )
	       	{
	       		alert( "Error in save password, Please Check.");
	       	}
	   }else{
	   		if("@mozilla.org/login-manager;1" in Components.classes){
                try{
                    var oldLoginInfo = null;
                    var loginManager=Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
                    var logins = loginManager.findLogins({}, host , null , host );
					for( var i = 0 ; i < logins.length ; ++ i )
					{
						if( logins[ i ].username == username )
						{
							oldLoginInfo = logins[ i ] ;
							break;
						}
					}
                    var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1",
                                             Components.interfaces.nsILoginInfo,
                                             "init");
	  
					var loginInfo = new nsLoginInfo( host , null , host , username, password,
                                "" , "" );
                    if( oldLoginInfo != null )
                    {
                    	loginManager.modifyLogin( oldLoginInfo , loginInfo );
                    }else{
                    	loginManager.addLogin( loginInfo );
                    }
                }catch( ex )
                {
                	alert( "Error in save password, Please Check." );
                }
	   		}
	   }
    },
    
    getPwd:function( username )
    {
	   var passwdmanagerstr = "@mozilla.org/passwordmanager;1";
	   var password = null;
	   if( passwdmanagerstr in Components.classes){
	       	var passwordManager = Components.classes[ passwdmanagerstr ]
	                                .getService(Components.interfaces.nsIPasswordManager);
	        var e = passwordManager.enumerator;
	        while (e.hasMoreElements()) {
	        	try{
		        	var pass = e.getNext().QueryInterface(Components.interfaces.nsIPassword);
		        	if (pass.host == queryString && pass.user == username ) {
			             // found it!
			             password = pass.password;
			             break;
			        }
	        	}catch( ex )
	        	{
	        		alert( "Error in get password, Please Check." );
	        	}
	        }                 
	   }else{
	   		if("@mozilla.org/login-manager;1" in Components.classes){
                try{
                    var loginManager=Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
                    var logins = loginManager.findLogins({}, host , null , host );
					for( var i = 0 ; i < logins.length ; ++ i )
					{
						if( logins[ i ].username == username )
						{
							password = logins[i].password;
							break;
						}
					}
                }catch( ex )
                {
                	alert( "Error in get password, Please Check." );
                }
	   		}
	   }
	   return password;
    },
    
    removePwd:function( username ){
        if("@mozilla.org/passwordmanager;1" in Components.classes){
            var passwordManager=Components.classes["@mozilla.org/passwordmanager;1"].getService(Components.interfaces.nsIPasswordManager);
            try{
                passwordManager.removeUser( host , username );
            }
            catch(ex){
            	alert( "Error in remvoe password, Please Check." );
            }
        }else{
            if("@mozilla.org/login-manager;1" in Components.classes){
                try{
                    var loginManager=Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);
                    var logins=loginManager.findLogins({},host,null,host);
                    for(var i=0;i<logins.length;i++){
                        if(logins[i].username==username){
                            loginManager.removeLogin(logins[i]);
                            break;
                        }
                    }
                }
                catch(ex){
                	alert( "Error in remvoe password, Please Check." );
                }
            }
        }
    },
    
    trimWhitespace:function( noTrimValue ){
        var trimValue="";
        var temp="";
        var flag=false;
        for(var i=0; i< noTrimValue.length;i++){
            if( noTrimValue.charAt(i)!=" "&& noTrimValue.charCodeAt(i)!=9){
                if(temp!=""){
                    trimValue+=temp;
                    temp="";
                }
                trimValue+=noTrimValue.charAt(i);
                if(flag==false){
                    flag=true;
                }
            }else{
                if(flag==true){
                    temp+= noTrimValue.charAt(i);
                }
            }
        }
        return trimValue;
    }
	}
};

function getText( ){
	var sSelectedText = "";
	if( !gContextMenu )
	{
	}
	else if (gContextMenu.onTextInput)
    {
         var node = document.popupNode;
         sSelectedText = node.value.substring(node.selectionStart, node.selectionEnd);
    }
    else if ( gContextMenu.isTextSelected )
    {
    	if( window.getSelection( ))
    		sSelectedText = window.getSelection().toString();
    	if( window._content.getSelection()  )
    		sSelectedText = window._content.getSelection().toString();
    	if (document.getSelection) {
			return document.getSelection();
		}
    }
    else if ( gContextMenu.link ) 
    {
         sSelectedText = gContextMenu.linkText();
    }else if( window.getSelection )
    {
    	return window.getSelection().toString();
    }

    return sSelectedText;
}

var host = "chrome://doit/";

