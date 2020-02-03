import LaunchItem from './LaunchItem'

class LaunchList {
	constructor(items) {
		this.items = items
	}

	render() {
		return this.items
			.map(item => {
				return new LaunchItem(item).render()
			})
			.join('')
	}
}

export default LaunchList
