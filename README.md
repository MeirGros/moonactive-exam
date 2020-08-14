

## Description

Moonactive exam - Meir Grossman


## Requirements

* NodeJS 
* Redis (docker run --name some-redis -d redis -p 6379:6379   )

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Usage

POST http://localhost:3000/echoAtTime

BODY {
	
"message": "This is a test message",
"UTCdate": "2020-08-14T06:17:00.000Z"
}
