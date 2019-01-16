function DOMtoString(document_root) {
	/* Function returns page HTML as string */
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}



/* chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
	//let req = XMLHttpRequest()
	//req.open("POST", 127.0.0.1:8080)
	//req.send(request.source)
	console.log(request.source);
  
}) */



function onWindowLoad() {
	/* Get user ID and set if doesn't exist */
	var my_user = 0;
	chrome.storage.local.get(['id'],
	function(data)
	{
		if(chrome.runtime.lastError)
		{
			console.log("error");

			return;
		}
		else
		{
			chrome.storage.local.set({'id': 1},
			function()
			{
				if(chrome.runtime.lastError)
				{
					console.log("error");

				}

				console.log('Value is set to ' + value);
				return;

			}
			);

		}

    var bookNarration = parseInt(data.id);
	my_user = data.id;
    console.log(data.id);
	}
	);


  
  

/*   chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
 */
 
   var html_str = DOMtoString(document);
   console.log(html_str);
   
   var mySocket = new WebSocket("ws://127.0.0.1:8080");
   mySocket.send(html_str);
/*    var req = new XMLHttpRequest();
   req.open("POST", "http://localhost:8080", true);
   xhr.setRequestHeader("Content-Type", "application/json");
   JSON.stringify({"sender": data_id, "html": html_str});
   req.send(html_str);
   console.log(req);
 */
}

window.onload = onWindowLoad;
