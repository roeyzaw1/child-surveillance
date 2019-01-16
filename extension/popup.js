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

function SetID() {
	/* Returns ID and sets new one if doesn't exist */
	chrome.storage.local.get(['id'],
	function(data)
	{
		if(chrome.runtime.lastError)
		{
			chrome.storage.local.set({'id': 1});

		}

    var bookNarration = parseInt(data.id);
	return;
	}
	);
	
}



function onWindowLoad() {
			
	var html_str = DOMtoString(document);
	console.log(html_str);
	console.log(document.URL);

	var mySocket = new WebSocket("ws://127.0.0.1:8080");
	
   
	// Fired when the connection has been established  
	mySocket.onopen = function (event) {
		mySocket.send("Handshake"); 
	};
	
	mySocket.onmessage = function(evt) {
		console.log(evt.data);
	};
	
	  
	// Fired when there is an error  
	mySocket.onerror = function(error) {  
		console.log('Error:', error);  
	};  
	  
	// Fired when we receive a message from the server  
	mySocket.onmessage = function(message) {  
		console.log('Received:', message.data);  
	};  
	  
	// Fired when the server has closed the connection  
	mySocket.onclose = function() {  
		console.log('Server disconnected');  
	};  
	  
	// Close the connection  
	mySocket.close();  

   //mySocket.send(html_str);
}

window.onload = onWindowLoad;
