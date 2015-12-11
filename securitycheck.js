var scriptTags = document.getElementsByTagName('script');


for (var i = 0; i < scriptTags.length; i++) {
	if (scriptTags[i].hasAttribute('src')) {
		switch (scriptTags[i].getAttribute('src').slice(0,5).toLowerCase()) {
			case "http:":
				console.log("IMPORTANT")
				console.log("contain http");
				console.log(scriptTags[i]);
				break;
			case "https":
				console.log("contain SSL https");
				console.log(scriptTags[i]);
				break;
			default:
				console.log("does not contain http");
				console.log(scriptTags[i]);
		}
	} else {
		console.log("contains internal reference");
		console.log(scriptTags[i]);
	}
}

//loop through scriptTags
	//check src content of scriptTags
	//verify if http or https
	//verify if http or https with sizmek secure-ds.serving-sys.com
	//return values that are not complient

//VERSION 1.0

/*var scriptTags = document.getElementsByTagName('script');


for (var i = 0; i < scriptTags.length; i++) {
	if (scriptTags[i].hasAttribute('src')) {
		if (scriptTags[i].getAttribute('src').slice(0,4).toLowerCase() === "http") {
			if (scriptTags[i].getAttribute('src').slice(0,5).toLowerCase() === "https") {
				console.log("contain SSL https");
				console.log(scriptTags[i]);
			} else {
				console.log("IMPORTANT")
				console.log("contain http");
				console.log(scriptTags[i]);
			}
		} else {
			console.log("does not contain http");
			console.log(scriptTags[i]);
		}
	} else {
		console.log("contains internal reference");
		console.log(scriptTags[i]);
	}
}*/