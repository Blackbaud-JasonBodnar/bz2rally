chrome.runtime.onMessage.addListener(function(request, sender) 
{
	localStorage["bugName"] = request.bugName;
	localStorage["bugUrl"] = request.bugUrl;
	chrome.pageAction.show(sender.tab.id);
});
