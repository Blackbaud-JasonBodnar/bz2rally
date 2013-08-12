// Save this script as `options.js`

// Saves options to localStorage.
function saveOptions(event) 
{
	event.preventDefault(true);
	localStorage["topLevelProjectId"] = $("#topLevelProjectId").val();
	localStorage["defaultSelectedProjectId"] = $("#defaultSelectedProjectId").val();

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
	$("#topLevelProjectId").val(localStorage["topLevelProjectId"]);
	$("#defaultSelectedProjectId").val(localStorage["defaultSelectedProjectId"]);
	$("#save").click(saveOptions);
}
$(document).ready(restoreOptions);

