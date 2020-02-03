(function () {
	'use strict';

	class LaunchItem {
		constructor({ mission_name, launch_site, launch_success, launch_date_utc }) {
			this.name = mission_name,
			this.site = launch_site.site_name_long,
			this.isSuccess = launch_success,
			this.launchDate = launch_date_utc;
		}

		render() {
			return `
			<article ${maybeSetDataSuccess(this.successState)}>
				<h3>${this.name}</h3>
				<p>${this.site}</p>
				<p>${formatSuccessState(this.isSuccess)}</p>
			</article>
		`
		}
	}

	function maybeSetDataSuccess(successState) {
		return successState ? 'data-success' : ''
	}

	function formatSuccessState(successState) {
		return successState === null
			? 'unknown'
			: successState
	}

	class LaunchList {
		constructor(items) {
			this.items = items;
		}

		render() {
			return this.items
				.map(item => {
					return new LaunchItem(item).render()
				})
				.join('')
		}
	}

	const endpoint = 'https://api.spacexdata.com/v3/launches';

	fetch(endpoint)
		.then(response => response.json())
		.then(launches => {
			renderData(launches, document.getElementById('app'));
		})
		.catch(console.error);

	function renderData(data, node) {
		console.log(data);

		node.innerHTML = new LaunchList(data).render();
	}

}());
