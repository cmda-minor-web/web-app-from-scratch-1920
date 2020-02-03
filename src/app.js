import LaunchList from './components/LaunchList'

const endpoint = 'https://api.spacexdata.com/v3/launches'

fetch(endpoint)
	.then(response => response.json())
	.then(launches => {
		renderData(launches, document.getElementById('app'))
	})
	.catch(console.error)

function renderData(data, node) {
	console.log(data)

	node.innerHTML = new LaunchList(data).render()
}
