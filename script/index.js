function removeActiveClass() {
  const activeBtn = document.getElementsByClassName("active");

  for (let btn of activeBtn) {
    btn.classList.remove("active");
  }
  // console.log(activeBtn);
}

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
};

function loadCategories() {
  //fetch Data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => {
      displayCategories(data.categories);
    });
}

function loadVideos(searchText = "") {
  showLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadVideoDetails = (videoId) => {
  // console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
  // console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
  `;
};

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
    <button id="btn-${cate.category_id}" onCLick="loadCategoriesVideos(${cate.category_id})"  class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cate.category}</button>
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
  videoContainer.innerHTML = ``;

  if (videos.length === 0) {
    videoContainer.innerHTML = `
              <div
            class="col-span-full flex flex-col items-center justify-center py-[10rem]"
          >
            <img src="images/Icon.png" alt="" />
            <h2 class="text-2xl font-bold">
              Oops!! Sorry, There is no content here
            </h2>
          </div>`;
    hideLoader();
    return;
  }

  videos.forEach((video) => {
    // console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
              <div class="card bg-base-100 border border-gray-300">
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
            <div class="flex gap-3 px-2 py-5">
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
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-1">
                  ${video.authors[0].profile_name}
                  ${
                    video.authors[0].verified == true
                      ? `<img
                    class="w-5 h-5"
                    src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                    alt=""
                  />`
                      : ``
                  }
                </p>
                <p class="text-sm text-gray-400 flex gap-1">${
                  video.others.views
                } views</p>
              </div>
            </div>
            <button onClick="loadVideoDetails('${
              video.video_id
            }')" class="btn btn-block">Show Details</button>
          </div>
    `;
    videoContainer.append(videoCard);
  });
  hideLoader();
};

const loadCategoriesVideos = (id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      // console.log(clickedButton);
      displayVideos(data.category);
    });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const input = e.target.value;
  loadVideos(input);
});

loadCategories();
// loadVideos();
