// Select the container where posts will appear
const postsContainer = document.getElementById('postsContainer');

// Fetch posts from API
fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
  .then(response => response.json())
  .then(posts => {
    posts.forEach((post, index) => {
      // Create a Bootstrap card for each post
      const postCard = document.createElement('div');
      postCard.classList.add('col-md-4');

      postCard.innerHTML = `
        <div class="card h-100 shadow">
          <div class="card-body">
            <h5 class="card-title">${post.title.substring(0, 30)}...</h5>
            <p class="card-text">${post.body.substring(0, 100)}...</p>
            <a class="btn btn-primary read-more-btn" href="javascript:void(0);" data-target="extraContent${index}">
              Read More
            </a>
            <div class="collapse mt-3" id="extraContent${index}">
              <p class="text-secondary">${post.body}</p>
            </div>
          </div>
        </div>
      `;

      postsContainer.appendChild(postCard);
    });

    // Add event listeners for all Read More buttons
    document.querySelectorAll('.read-more-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);

        if (content.classList.contains('show')) {
          content.classList.remove('show');
          this.textContent = 'Read More';
        } else {
          content.classList.add('show');
          this.textContent = 'Show Less';
        }
      });
    });
  })
  .catch(error => {
    console.error('Error fetching posts:', error);
    postsContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Failed to load blog posts. Please try again later.
      </div>
    `;
  });
