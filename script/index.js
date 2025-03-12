function loadCategories() {
  //fetch Data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

// {
//     "category_id":"1001",
//     "category":"Music"
// }

function displayCategories(categories) {
  // console.log(categories);
  const categoryContainer = document.getElementById("category-container");
  for (const cate of categories) {
    // console.log(cate);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cate.category}</button>
    `;
    categoryContainer.append(categoryDiv);
  }
}

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "......."
// }

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
              <div class="card bg-base-100">
            <figure class="relative">
              <img
                class="w-full h-[230px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes"
              />
              <span
                class="absolute bottom-2 right-2 text-white bg-black py-[2px] px-[6px] text-start rounded"
                >3hrs 56 min ago</span
              >
            </figure>
            <div class="flex gap-3 px-0 py-5">
              <!-- Profile -->
              <div class="profile">
                <div class="avatar">
                  <div
                    class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
                  >
                    <img
                      src="${video.authors[0].profile_picture}"
                    />
                  </div>
                </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">Shape of you</h2>
                <p class="text-sm text-gray-400 flex gap-1">
                  ${video.authors[0].profile_name}
                  <img
                    class="w-5 h-5"
                    src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                    alt=""
                  />
                </p>
                <p class="text-sm text-gray-400 flex gap-1">${video.others.views} views</p>
              </div>
            </div>
          </div>
    `;
    videoContainer.append(videoCard);
  });
};

loadCategories();
loadVideos();
