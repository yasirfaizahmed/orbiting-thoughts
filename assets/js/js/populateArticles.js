async function fetchAndDisplayArticles() {
    try {
        const response = await fetch('http://127.0.0.1:9000/articles/', {
            method: 'GET',
            headers: getHeaders(), // Assuming getHeaders is a function that returns the required headers
        });

        if (!response.ok) {
            throw new Error('Failed to fetch articles');
        }

        const data = await response.json(); // Assuming the response is a JSON array of articles
        const articles = data?.crud_response?.data?.articles || [];

        const articleContainer = document.getElementById('articlesContainer'); // Container to append articles

        // Clear the container before adding new content
        articleContainer.innerHTML = '';

        // Loop through articles and create HTML elements for each
        articles.forEach(article => {
            const articleHTML = `
                <div class="col">
                    <div class="article-card-thumbnail">
                        <img class="article-thumbnail-image w-100 d-block fit-cover" style="height: 200px; overflow: hidden; align-items: center; object-fit: cover" src="data:image/jpeg;base64,${article.cover_image}" />
                        <div class="article-thumbnail-body">
                            <p class="text-primary card-text mb-0">Article</p>
                            <h4 class="article-thumbnail-title">${article.title}</h4>
                            <p class="article-thumbnail-text">${article.brief}</p>
                            <div class="d-flex">
                                <img class="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" src="${article.authorImage}" />
                                <div>
                                    <p class="article-thumbnail-author">${article.authorName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            articleContainer.innerHTML += articleHTML; // Append the article HTML
        });

    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}
