
function Task( title ) {
	this.title = title;
	
	var comments ;
	var completed ;
	var deleted ;
	
	var isNew ;
    var active ;
    var destroyed ;
    var ownerId ;
    var execAt ;
    var dueDate;
    var createdAt;
    var updatedAt;
    var tags;
    
    function SetComments( comments ){
        this.comments = comments;
    }
    
    function SetCompleted( completed ){
        this.completed = completed;
    }
    
    function SetDeleted( deleted ){
        this.deleted = deleted;
    }
    
    function SetIsNew( isNew ){
        this.isNew = isNew;
    }
    
    function SetActive( active ){
        this.active = active;
    }
    
    function SetDestroyed( destroyed ){
        this.destroyed = destroyed;
    }
    
    function SetExecAt( execAt ){
        this.execAt = execAt;
    }
    
    function SetDueDate( dueDate ){
        this.dueDate = dueDate;
    }
    
    function SetCreatedAt( createdAt ){
        this.createdAt = createdAt;
    }
    
    function SetUpdatedAt( updatedAt ){
        this.updatedAt = updatedAt;
    }
    
    function SetTags( tags ){
        this.tags = tags;
    }
    
} 