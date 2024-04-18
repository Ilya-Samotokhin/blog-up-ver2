let post = {
	title: '',
	text: '',
}

const postTitleInputNode = document.querySelector('.js-post-title-input')
const postTextInputNode = document.querySelector('.js-post-text-input')
const newPostBtnNode = document.querySelector('.js-new-post-btn')
const postsNode = document.querySelector('.js-posts')

newPostBtnNode.addEventListener('click', function () {
	//получить данные из поля ввода
	const postFromUser = getPostFromUser()
	// сохранить пост
	setPost(postFromUser)

	// отобразить пост
	renderPost()
})

function getPostFromUser() {
	const title = postTitleInputNode.value
	const text = postTextInputNode.value

	return {
		title: title,
		text: text,
	}
}

function setPost(newPost) {
	post = newPost
}

function getPost() {
	return post
}

function renderPost() {
	const post = getPost()

	const postHtml = `
	<div class='post'>
	<p class='post__title'>${post.title}</p>
	<p class='post__text'>${post.text}</p>
	</div>
	`
	postsNode.innerHTML = postHtml
}
