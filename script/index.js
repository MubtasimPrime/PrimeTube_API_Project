function loadCategories() {
  //fetch Data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
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

loadCategories();
