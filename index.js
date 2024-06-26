const posts = []

const TITLE_VALIDATION_LIMIT = 100
const TEXT_VALIDATION_LIMIT = 500

const postTitleInputNode = document.querySelector('.js-post-title-input')
const postTextInputNode = document.querySelector('.js-post-text-input')
const newPostBtnNode = document.querySelector('.js-new-post-btn')
const postsNode = document.querySelector('.js-posts')
const validationMassage = document.querySelector('.js-validationMassage')
const countChar = document.querySelector('.js-count__char')

newPostBtnNode.addEventListener('click', function () {
	//получить данные из поля ввода
	const postFromUser = getPostFromUser()
	// сохранить пост
	addPost(postFromUser)
	// отобразить пост
	renderPosts()
	// очистка input
	clearInput()
})

function getPostFromUser() {
	const date = getDate(new Date())
	const title = postTitleInputNode.value
	const text = postTextInputNode.value

	return {
		date: date,
		title: title,
		text: text,
	}
}

function addPost({ date, title, text }) {
	posts.push({
		date: date,
		title: title,
		text: text,
	})
}

function getPosts() {
	return posts
}

function renderPosts() {
	const posts = getPosts()
	let postsHTML = ''

	posts.forEach(post => {
		postsHTML += `
		<div class='post'>
		<p class='post__title'>${post.title}</p>
		<p class='post__text'>${post.text}</p>
		<p class='post__date'>${post.date}</p>
		</div>
	`
	})
	postsNode.innerHTML = postsHTML
}

// date

function addLeadingZero(d) {
	if (d < 10) {
		d = '0' + d
	} else {
		d = d
	}
	return d
}

function getDate(date) {
	let result = `${addLeadingZero(date.getDay())}/${addLeadingZero(
		date.getMonth()
	)}/${date.getFullYear()} ${addLeadingZero(date.getHours())}:${addLeadingZero(
		date.getMinutes()
	)}`
	return result
}

// validation

postTitleInputNode.addEventListener('input', validation)
postTextInputNode.addEventListener('input', validation)
postTextInputNode.addEventListener('input', countingCharacters)

function validation() {
	const titleLen = postTitleInputNode.value.length
	const textLen = postTextInputNode.value.length

	if (titleLen > TITLE_VALIDATION_LIMIT) {
		validationMassage.innerText = `Длинна заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`
		validationMassage.classList.remove('validationMassage-hidden')
		newPostBtnNode.disabled = true
		return
	}

	if (textLen > TEXT_VALIDATION_LIMIT) {
		validationMassage.innerText = `Длинна текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`
		validationMassage.classList.remove('validationMassage-hidden')
		newPostBtnNode.disabled = true
		return
	}

	if (titleLen < 1 || textLen < 1) {
		newPostBtnNode.disabled = true
		return
	}

	validationMassage.classList.add('validationMassage-hidden')
	newPostBtnNode.disabled = false
}

//counter
function countingCharacters() {
	countChar.innerText = `${postTextInputNode.value.length}/${TEXT_VALIDATION_LIMIT}`
}

// по нажатию на enter происходит нажатие на кнопку ОПУБЛИКОВАТЬ
postTextInputNode.addEventListener('keydown', function (event) {
	if (event.keyCode == 13 && (event.ctrlKey || event.metaKey)) {
		event.preventDefault
		newPostBtnNode.click()
		clearInput()
		//перенос фокуса на заголовок для нового поста
		postTitleInputNode.focus()
	}
})

//clearInput
function clearInput() {
	postTitleInputNode.value = ''
	postTextInputNode.value = ''
	newPostBtnNode.disabled = true
}
