# What the heck is Actorly Davis?

Deployed at [actorly-davis.com](https://www.actorlydavis.com/)

Actorly Davis is a Vite-powered React app that allows users to select between 2-6 actors and find the movies and shows that they have been in together. It calls out to the TMDB API to populate a Mantine UI autocomplete component and then calls the API again in order to get the movie/show credits of the selected actors. I then use D3.js to create a Force-Directed Network Graph to bring together nodes (actors, movies/shows) and display their links.
