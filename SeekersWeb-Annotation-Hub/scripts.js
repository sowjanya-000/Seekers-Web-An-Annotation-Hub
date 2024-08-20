document.addEventListener('DOMContentLoaded', () => {
    // Load posts from localStorage
    const loadPosts = () => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            postList.innerHTML = savedPosts;
        }
    };

    // Save posts to localStorage
    const savePosts = () => {
        localStorage.setItem('posts', postList.innerHTML);
    };

    // Handle adding new articles
    const addPostBtn = document.getElementById('add-post-btn');
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');
    const searchInput = document.getElementById('search-input');

    if (addPostBtn) {
        addPostBtn.addEventListener('click', () => {
            postForm.style.display = 'block';
        });

        postForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const heading = document.getElementById('post-heading').value;
            const link = document.getElementById('post-link').value;
            const content = document.getElementById('post-content').value;

            const post = document.createElement('div');
            post.classList.add('post');
            post.innerHTML = `<h3><a href="${link}" target="_blank">${heading}</a></h3><p>${content}</p>`;
            postList.appendChild(post);

            savePosts();

            postForm.reset();
            postForm.style.display = 'none';
        });

        // Load posts when the page is loaded
        loadPosts();
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const filter = searchInput.value.toLowerCase();
            const posts = postList.getElementsByClassName('post');
            Array.from(posts).forEach(post => {
                const heading = post.querySelector('h3').innerText.toLowerCase();
                if (heading.includes(filter)) {
                    post.style.display = '';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
});
