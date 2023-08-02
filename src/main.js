const post_submite_form = document.querySelector("#post_submite_form");
const author_image = document.querySelector("#author_image");
const author_image_preview = document.querySelector(".author_image_preview");
const post_image_url = document.querySelector("#post_image_url");
const post_image_preview = document.querySelector(".post_image_preview");
const post_time_line = document.querySelector(".post_time_line");
const msg = document.querySelector(".msg");

// image preview features start
author_image.onkeyup = (e) => {
  author_image_preview.setAttribute("src", e.target.value);
};
post_image_url.onchange = (e) => {
  post_image_preview.setAttribute("src", e.target.value);
};
// image preview features end

// show post on timeline
const show_post = () => {
  const posts = getData("posts");

  let content = "";
  if (posts.length > 0) {
    posts.map((item, index) => {
      content += `
         <div class="post-container">
            <!------- Post Header ------>
            <div class="post-header">
                <div class="author">
                <div class="author-profile-img">
                    <img src="${item.author_image}" alt="" />
                </div>
                <div class="post-author-name">
                    <a href="#">${item.author_name}</a>
                    <span><i class="fas fa-circle"></i> ${timeAgo(item.post_time)}</span>
                    
                </div>
                </div>
                <div class="three-dot" onclick = deletePost(${index})>
                ❌
                </div>
            </div>

            <!------ Post Body ------>
            <div class="post-body">
                <div class="post-img">
                ${item.post_image ? `<img src="${item.post_image}" />` : ""}
                </div>
                <div class="post-reaction">
                <div class="p-reaction-left">
                    <div class="post-like post-icon">
                    <span><i class="far fa-heart"></i></span>
                    </div>
                    <div class="post-comment post-icon">
                    <span><i class="far fa-comment"></i></span>
                    </div>
                    <div class="post-share post-icon">
                    <span><i class="far fa-paper-plane"></i></span>
                    </div>
                </div>
                <div class="post-save post-icon">
                    <span><i class="far fa-bookmark"></i></span>
                </div>
                </div>
                <div class="post-like-total">
                <p>20,028,910 likes</p>
                </div>
                <div class="post-content">
                <p>
                ${item.post_content ? item.post_content : ""}
                </p>
                </div>
                <div class="write-comment">
                <p>View all 176k comments</p>
                <form action="#">
                    <input type="text" name="" id="" placeholder="Add a comment…" />
                </form>
                <span><i class="far fa-smile"></i></span>
                </div>
            </div>
        </div>
        `;
    });
  } else {
    content = `<p class="text-center p-2 bg-danger text-white m-0">No post found</p>`;
  }
  post_time_line.innerHTML = content;
};
show_post();

// one submite send data to local storage
post_submite_form.onsubmit = (e) => {
  e.preventDefault();

  const post_submition_data = new FormData(e.target);
  const post_data = Object.fromEntries(post_submition_data);

  if (!post_data.author_name || !post_data.author_image) {
    msg.innerHTML = createAlert("danger", "Author name and image are required");
  } else {
    const previous_data = getData("posts");
    previous_data.push({
      author_name: post_data.author_name,
      author_image: post_data.author_image,
      post_content: post_data.post_content ?? null,
      post_image: post_data.post_image_url ?? null,
      post_time: Date.now(),
    });
    setData("posts", previous_data);
  }
  e.target.reset();
  post_image_preview.setAttribute("src", "");
  author_image_preview.setAttribute("src", "./Asset/img/user.png");
  show_post();
};

// delete post
const deletePost = (index) => {
  let previous_data = getData("posts");
  let new_data = previous_data.filter((item, idx) => idx !== index);
  setData("posts", new_data);
  show_post();
};
