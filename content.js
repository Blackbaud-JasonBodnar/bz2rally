var data =
{
	"bugName": document.title,
	"bugUrl": location.href
};

chrome.runtime.sendMessage(data);
