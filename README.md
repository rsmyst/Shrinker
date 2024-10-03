# ShrinkerServer
# URL Shortener

This project is a simple URL shortener service built with Node.js, Express, and MongoDB. It allows users to generate short URLs for any given long URL and track the number of clicks on each short URL.

## Features

- Generate short URLs for any given long URL.
- Track the number of clicks on each short URL.
- Display the history of all generated URLs with their click counts.
- Simple and nice-looking homepage for URL input and short URL generation.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB (running locally or accessible remotely)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install the required packages:
   ```
   npm install
   ```
3. Ensure MongoDB is running on your machine or accessible remotely.

4. Start the server:

```
nodemon index.js
```

### Usage
Open Terminal / POSTMAN and send a POST or GET request according to the routes
The generated short URL will be returned as a JSON response
You can access the history of all generated URLs by navigating to http://localhost:8001/url/history.
### Routes
POST /url: Generates a short URL for the given long URL.
GET /url/history: Displays the history of all generated URLs with their click counts.
GET /:shortID: Redirects to the original URL for the given short URL ID.
### Project Structure
index.js: The main entry point of the application.
controllers/url.js: Contains the logic for handling URL generation and history display.
models/url.js: Defines the URL schema for MongoDB.
routes/url.js: Defines the routes for URL-related operations.
connect.js: Contains the logic for connecting to MongoDB.

Example
Generate a Short URL:
```
curl -X POST http://localhost:8001/url -H "Content-Type: application/json" -d '{"url": "https://www.example.com"}'
```
Response: 
```
{
  "id": "shortID"
}
```
Access the Short URL:

Navigate to http://localhost:8001/shortID in your browser.

View URL History:

Navigate to http://localhost:8001/url/history in your browser.
