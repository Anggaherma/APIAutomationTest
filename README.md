# API Automation Test 

This repo is for weather automation test

## API Test Suite

This project contains a suite of API tests for OpenWeatherMap endpoints using `supertest`, `chai`, and `mocha`. The tests are written in JavaScript using ES modules and are transpiled with Babel.

## Prerequisites

- Node.js (version 21 or lower) to avoid version compatibility issues
- Obtain your API key from OpenWeatherMap. You can find it on your account page under the "API key" tab or at https://home.openweathermap.org/api_keys
- Fill "apikey" to the config.json file in the resources directory

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## How to run

- run this command `npm run test`

### Report
- To check the HTML report, navigate to `mochawesome-report/` directory, and open the `mochawesome.html` file from your browser.
