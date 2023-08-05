const nav_Height = $(".navbar").innerHeight()
const pathname = window.location.pathname
const currentUrl = window.location.origin + pathname
$(document).ready(function(){
  $(".navbar").css({
    "position": "fixed",
    "z-index": 4,
    "top": "0",
    "left": "0",
    "right": "0"
  })
  $("#container").css("margin-top", `${nav_Height * 1.2}px`)
  $(".fa-brands").each(function(i){
    let brand = $(this).attr("class").split("fa-brands fa-").join("")
    $(this).attr("brand", brand)
  })
  $(".widget-role-posts").on("click", function (){
    if ($(this).hasClass("active")) return false
    $(".widget-role-posts .icon").remove()
    $(this).toggleClass("active")
    $(this).append(`
      <p onclick="showPopularPosts()">popular posts</p>
      <p onclick="showRecomendationPosts()">recomendation posts</p>
    `)
    
    $("#container").append(`<div id="widget-bg" class="position-fixed" style="top:0;left:0;right:0;bottom:0;background:#000;opacity:0;z-index:998">`)
    $("#widget-bg").on("click", function(){
      $(this).remove()
      $(".widget-role-posts").toggleClass("active")
      $(".widget-role-posts").children().remove()
      $(".widget-role-posts").append(`<i class="fa fa-plus icon"></i>`)
    })
    
  })
  
  $(".preload").remove()
})
function showPopularPosts(){
  popularPost.data.forEach((post, i) => {
    if (i == 0) {
      // main-news
      let category = post.category
      let links = [`/posts/${post.slug}`, `/posts/?category=${post.category.slug}`, `/posts/?author=${post.author.username}`]
      let afterLinks = [post.title, post.category.name, post.author.name]
      $(".main-news-link").attr("href", `/posts/${post.slug}`)
      $(".main-news img").attr("src", post.image ? post.image : `https://source.unsplash.com/1200x1000?${category.name}`)
      $(".main-news h1 a").each((i, e) => {
        $(e).attr("href", `${links[i]}`)
        $(e).html(afterLinks[i])
      })
    } else {
      $(".card-article").each((i,e) => {
        let category = post.category
        let links = [`/posts/?category=${post.category.slug}`, `/posts/?author=${post.author.username}`]
        let afterLinks = [post.category.name, post.author.name]
        $(e)[0].querySelector(".card-body .card-title a").setAttribute("href", `/posts/${post.slug}`)
        $(e)[0].querySelector("img").setAttribute("src", post.image ? post.image : `https://source.unsplash.com/1200x1000?${category.name}`)
        $(e).find("h1 a").each((i, e) => {
          $(e).attr("href", `${links[i]}`)
          $(e).html(afterLinks[i])
        })
      })
    }
    
  })
  
  let url = popularPost.first_page_url
  url = url.slice(url.indexOf("?"))
  let titlePage = "popular"
  const params = new URLSearchParams(`${url}`)
  if (params.get("search") !== null) {
    titlePage += " in result for " + params.get("search")
  }
  
  $(".page-title").html(titlePage)
  console.log(popularPost);
}
function showRecomendationPosts(){
  recomendationPost.data.forEach((post, i) => {
    if (i == 0) {
      // main-news
      let category = post.category
      let links = [`/posts/${post.slug}`, `/posts/?category=${post.category.slug}`, `/posts/?author=${post.author.username}`]
      let afterLinks = [post.title, post.category.name, post.author.name]
      $(".main-news-link").attr("href", `/posts/${post.slug}`)
      $(".main-news img").attr("src", post.image ? post.image : `https://source.unsplash.com/1200x1000?${category.name}`)
      $(".main-news h1 a").each((i, e) => {
        $(e).attr("href", `${links[i]}`)
        $(e).html(afterLinks[i])
      })
    } else {
      $(".card-article").each((i,e) => {
        let category = post.category
        let links = [`/posts/?category=${post.category.slug}`, `/posts/?author=${post.author.username}`]
        let afterLinks = [post.category.name, post.author.name]
        $(e)[0].querySelector(".card-body .card-title a").setAttribute("href", `/posts/${post.slug}`)
        $(e)[0].querySelector("img").setAttribute("src", post.image ? post.image : `https://source.unsplash.com/1200x1000?${category.name}`)
        $(e).find("h1 a").each((i, e) => {
          $(e).attr("href", `${links[i]}`)
          $(e).html(afterLinks[i])
        })
      })
    }
    
  })
  let url = popularPost.first_page_url
  url = url.slice(url.indexOf("?"))
  let titlePage = "recomendation"
  const params = new URLSearchParams(`${url}`)
  if (params.get("search") !== null) {
    titlePage += " in result for " + params.get("search")
  }
  $(".page-title").html(titlePage)
  console.log(recomendationPost)
}

function markdownToHtml(markdownString) {
    // Replace bold text
    markdownString = markdownString.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace italic text
    markdownString = markdownString.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace headers
    markdownString = markdownString.replace(/^(#+)(.*)/gm, (match, hashes, content) => {
        const level = hashes.length;
        return `<h${level}>${content.trim()}</h${level}>`;
    });

    // Replace lists
    markdownString = markdownString.replace(/^\s*-\s+(.*)/gm, '<li>$1</li>');
    markdownString = markdownString.replace(/<\/li>\s*<li>/g, '</li><li>'); // Fix for consecutive list items
    markdownString = markdownString.replace(/^<li>(.*)<\/li>/gm, '<ul><li>$1</li></ul>');

    // Replace links
    markdownString = markdownString.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Replace code blocks
    markdownString = markdownString.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    return markdownString;
}