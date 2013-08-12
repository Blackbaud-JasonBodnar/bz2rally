var data =
{
	"bugName": $("#short_desc_nonedit_display").text(),
	"bugUrl": location.href
};

chrome.runtime.sendMessage(data);
