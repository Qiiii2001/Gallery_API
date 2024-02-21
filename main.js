document.addEventListener('DOMContentLoaded', function() {
    fetchArtworks();
});

function fetchArtworks() {
    fetch('https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=12&fields=id,title,image_id')
        .then(response => response.json())
        .then(data => {
            displayArtworks(data.data, data.config.iiif_url);
        });
}

function displayArtworks(artworks, iiifBaseUrl) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear existing artworks if any
    
    artworks.forEach(artwork => {
        const imageUrl = `${iiifBaseUrl}/${artwork.image_id}/full/360,/0/default.jpg`;

        const artworkElement = document.createElement('div');
        artworkElement.className = 'artwork';
        artworkElement.innerHTML = `
            <img src="${imageUrl}" alt="${artwork.title}" loading="lazy">
            <div class="title">${artwork.title}</div>
        `;
        gallery.appendChild(artworkElement);
    });
}
