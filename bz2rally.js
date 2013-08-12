function getChildren(objectId, depth)
{
	$.ajax(
	{
		type: 'get', 
		url: 'https://rally1.rallydev.com/slm/webservice/v2.0/Project/' + objectId + '/Children',
		dataType: 'json',
		async: false,
		success: function(data, code, jqXHR) 
		{
			$.each(data.QueryResult.Results, function()
			{
				$('<option/>', {value: this.ObjectID}).html(Array(depth + 1).join("&nbsp;&nbsp;&nbsp;") + this.Name).appendTo("#projects-select");
				if (this.Children.Count > 0)
				{
					getChildren(this.ObjectID, depth + 1);
				}
			});        
		}
	});
}

function showErrors(errors)
{
	$("#error").html(errors);
	$("#loaded").hide();
	$("#error").show();
	console.log(errors);
}

function showSuccess(objectId, defectId, defectName, projectId)
{
	var createdLink = $("<a />", {text: "Created " + defectId + ": " + defectName, href: "https://rally1.rallydev.com/#/" + projectId + "/detail/defect/" + objectId, target: '_blank'});
	$("#success").html(createdLink);
	$("#loaded").hide();
	$("#success").show();
}

function createDefect(bugName, bugUrl, securityToken)
{
	event.preventDefault();

	var views = chrome.extension.getViews({"type": "popup"});
	var popup = views[0];
	var select = popup.document.getElementById("projects-select");
	var projectId = select.options[select.selectedIndex].value;
	var data = 
	{
		"Defect":
		{
			"Name": bugName,
			"Description": bugUrl,
			"Project": projectId
		}
	};
	$.ajax(
	{
		type: "POST",
		url: "https://rally1.rallydev.com/slm/webservice/v2.0/defect/create?key=" + securityToken,
		data: JSON.stringify(data),
		success: function(data, textStatus, jqXHR)
		{
			console.log(textStatus + " " + JSON.stringify(data));
			var errors = data.CreateResult.Errors;
			if (errors.length > 0)
			{
				showErrors(errors.join("<p/>"));
			}
			else
			{
				var defect = data.CreateResult.Object;
				showSuccess(defect.ObjectID, defect.FormattedID, defect.Name, projectId);
			}
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			showErrors("Could not create the defect in Rally: " + textStatus + " " + errorThrown);
		},
		dataType: "json",
		contentType: "application/json"
	});

}

// Get our projects
document.addEventListener('DOMContentLoaded', function () 
{
	setTimeout(function()
	{
		var securityToken = '';
		$.ajax(
		{
			type: "get",
			url: "https://rally1.rallydev.com/slm/webservice/v2.0/security/authorize",
			dataType: "json",
			async: false,
			success: function(data, code, jqXHR)
			{
				securityToken = data.OperationResult.SecurityToken;
			}
		});
		var bugName = localStorage["bugName"];
		var bugUrl = localStorage["bugUrl"];
		$("#defect_name").val(bugName);
		getChildren(localStorage["topLevelProjectId"], 0);
		$("#projects-select").val(localStorage["defaultSelectedProjectId"]);
		$("#createDefectForm").submit(function () {createDefect(bugName, bugUrl, securityToken);});
		$("#loading").hide();
		$("#loaded").show();
	}, 1);
});


