# Off-Site Coding Test

## Setup

1. Clone down this repository. You will need `node` and `npm` installed globally on your machine.

2. Installation:

`npm install`

3. Add the provided database url in `.env` as: `REACT_APP_DATABASE_URL` to connect to the deployed database and server

4. To Start The App:

`npm start`

To Visit App:

`localhost:3000` or `https://transloc-client.herokuapp.com/`

To Use:

Click anywhere on the map to create a bounding box and get results!

# Reflection

## Backend

The challenge with the backend - and the entire app really - was the large dataset to deal with. On the backend I considered
using gRPC to send binary files over the wire to reduce the size, but decided against it due to there not being official
support for React along with other optimizations I made, where ultimately I think the difference would have been trivial.

First I cleaned the dataset to remove any null values. Next, to reduce the size of what was being sent, I used the PostGIS extension for my Postgres database that allowed me to cluster the points that were near each other while also removing outliers with a SQL query. This dramatically reduced the size of the points being sent while not losing much information for the heat map. After testing using Node.js and Express with the response being compressed with gzip, I found the response times and sizes to be low.

## Front-End

On the front-end, I went with react-map-gl to use React and Mapbox-GL together. Since MapBox is using WebGL, the performance of the heat map is fairly snappy even with large queries. I also like the visualization that MapBox provides for heat maps and its integration with React.

Overall this was a good lesson in dealing with large data sets and enjoyed learning some new techniques to handle them.
