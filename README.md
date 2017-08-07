# engined-storage-local

Local storage backend for engined.

[![NPM](https://nodei.co/npm/engined-storage-local.png)](https://nodei.co/npm/engined-storage-local/)

## Installation

Install via NPM:

```shell
npm install engined-storage-local
```

## Usage

Start engined-storage-local service in engined, see example below:

```javascript
const { Manager } = require('engined');
const StorageService = require('engined-storage');
const LocalStorageService = require('engined-storage-local');

const storage = StorageService();
const localStorage = LocalStorageService({
	storagePath: path.join(process.cwd(), 'public', 'static'),
	externalUrl: 'http://localhost/static'
});

const main = async () => {

	// Create manager
	let serviceManager = new Manager({ verbose: true });

	// Adding service to manager
	serviceManager.add('Storage', storage);
	serviceManager.add('LocalStorage', localStorage);

	// Start all services
	await serviceManager.startAll();
};

main();
```

## Save file with local storage backend

The example to show how to save file with local storage backend:

```javascript

// Using local storage backend
let localAgent = this.getContext('Storage').getAgent('local');

// Save file
let storageTask = localAgent.save(readStream, 'myimage.png', 12345);

storageTask.on('progress', (progress) => {
	/*
		We can get periodical progress updates.
		{
			percentage: 0.5,
			totalSize: 12345,
			transferred: 2345
		}
	*/
	console.log(progress);
});

storageTask.on('complete', (url) => {
	// It can get public URL of file after saving complete
	console.log(url);
});
```

## License
Licensed under the MIT License
 
## Authors
Copyright(c) 2017 Fred Chien（錢逢祥） <<cfsghost@gmail.com>>
