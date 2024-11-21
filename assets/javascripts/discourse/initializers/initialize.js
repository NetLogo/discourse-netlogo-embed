// Copyright (C) 2024 Kritphong Mongkhonvanit
//
// This file is part of discourse-netlogo-embed.
//
// discourse-netlogo-embed is free software: you can redistribute it and/or
// modify it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
//
// discourse-netlogo-embed is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
// Public License for more details.
//
// You should have received a copy of the GNU General Public License along with
// discourse-netlogo-embed. If not, see <https://www.gnu.org/licenses/>. 

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
