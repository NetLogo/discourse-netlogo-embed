import {withPluginApi} from "discourse/lib/plugin-api";

function decoratePost(elem)
{
	for(const x of elem.querySelectorAll(".attachment"))
	{
		console.log(/\.nlogo$/.test(x.href));

		if (/\.nlogo$/.test(x.href))
		{
			const params = new URLSearchParams();
			const modelUrl = `${location.protocol}//${location.host}${x.href}`;
			const modelTitle = x.textContent.replace(/\.nlogo$/, "");
			params.set("title", modelTitle);
			params.set("url", modelUrl);

			const iframe = document.createElement("iframe");
			iframe.style = "width: 100%; height: 860px; zoom: 85%;";
			iframe.src = `${location.protocol}//netlogoweb.org/web?${params}`;

			const div = document.createElement("div");
			div.appendChild(iframe);

			x.parentNode.prepend(div);
		}
	}
}

function initializeWithApi(api)
{
	api.decorateCookedElement(decoratePost);
}

export default
{
	name: "discourse-netlogo-embed",
	initialize(container)
	{
		const siteSettings = container.lookup("service:site-settings");

		if (siteSettings.netlogo_embed_enabled)
		{
			withPluginApi("1.37.2", initializeWithApi);
		}
	}
}
