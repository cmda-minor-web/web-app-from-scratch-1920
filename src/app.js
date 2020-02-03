const endpoint = 'https://api.spacexdata.com/v3/launches'

fetch(endpoint)
	.then(response => response.json())
	.then(console.log)
	.catch(error => {
		console.log('Could not fetch')
	})
