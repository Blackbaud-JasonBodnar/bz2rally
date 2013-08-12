// Save this script as `options.js`

// Saves options to localStorage.
function saveOptions(event) 
{
	event.preventDefault(true);
	localStorage["topLevelProjectId"] = $("#topLevelProjectId").val();
	localStorage["defaultSelectedProjectId"] = $("#defaultSelectedProjectId").val();
	localStorage["rallyUsername"] = $("#rallyUsername").val();
	localStorage["rallyPassword"] = $("#rallyPassword").val();

	// Update status to let user know options were saved.
	var status = $("#status");
	status.html("Options Saved.");
	setTimeout(function() 
	{
		status.html("");
	}, 1500);
}

// Restores select box state to saved value from localStorage.
function restoreOptions() 
{	
	var topLevelProjectId = localStorage["topLevelProjectId"] == null ? 129886306 : localStorage["topLevelProjectId"];
	$("#topLevelProjectId").val(topLevelProjectId);
	$("#defaultSelectedProjectId").val(localStorage["defaultSelectedProjectId"]);
	$("#rallyUsername").val(localStorage["rallyUsername"]);
	$("#rallyPassword").val(localStorage["rallyPassword"]);
	$("#save").click(saveOptions);
}
$(document).ready(restoreOptions);

