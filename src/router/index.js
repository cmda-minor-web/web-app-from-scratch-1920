const pushStateIsAvailable = typeof window !== 'undefined' && window.history && window.history.pushState
const replaceStateIsAvailable = typeof window !== 'undefined' && window.history && window.history.replaceState

export class Router {
	constructor(...routes) {
		this.hasRouteListener = false
		this.currentUri = window.location.pathname
		this.routes = routes
		this.routerElement = document.createElement('div')

		this.routerElement.setAttribute('data-router-view', true)
	}

	push(uri, queryParams) {
		if (pushStateIsAvailable) {
			this.currentUri = uri

			const correctedUri = queryParams ? `${this.currentUri}?${queryParams}` : this.currentUri

			window.history.pushState(null, null, correctedUri)
			this.init()
		}
	}

	replace(uri, queryParams) {
		if (replaceStateIsAvailable) {
			this.currentUri = uri

			const correctedUri = queryParams ? `${this.currentUri}?${queryParams}` : this.currentUri

			return window.history.replaceState(null, null, correctedUri)
		}
	}

	init() {
		this.routes.forEach(route => {
			console.log(this.currentUri, route)
			if (route.pathname === this.currentUri) {

				this.routerElement.innerHTML = route.render()
			}
		})

		// Listen for router links on the page
		if (!this.hasRouteListener) {
			this.routerElement.addEventListener('click', event => {
				const { target } = event
				const isRouterLink = target.getAttribute('data-router-link') !== null

				if (isRouterLink) {
					event.preventDefault()

					this.push(target.pathname)
				}
			})

			this.hasRouteListener = true
		}
	}
}

export class Route {
	constructor(pathname, component) {
		this.pathname = pathname
		this.component = component
	}

	render() {
		return this.component.render()
	}
}

export class RouterLink {
	constructor(to, text) {
		this.to = to
		this.text = text
	}

	render() {
		return `
			<a href="${this.to}" data-router-link>${this.text}</a>
		`
	}
}
