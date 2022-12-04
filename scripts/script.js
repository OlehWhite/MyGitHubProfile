const getData = (url) =>
    new Promise((resolve, reject) =>
        fetch(url)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
    )

const BASE_URL = 'https://api.github.com/repos/OlehWhite/';

const repositoryWebsiteLayout = document.querySelector('.repository-website_layout')
const repositoryHtmlCssPractice = document.querySelector('.repository-html-css-practice')
const repositoryJSPractice = document.querySelector('.repository-js-practice')

const addEventListRepository = (tagClass, url) => {
    tagClass.addEventListener('click', () => {
        displayLoading()

        getData(url)
            .then(data => {
                const div = document.querySelector('.data');
                const date = data[0].commit.committer.date
                let stringCleanData = '';

                for (let i = 0; i < date.length; i++) {
                    if (date[i] === 'T' || date[i] === 'Z') {
                        stringCleanData += ' '
                    } else {
                        stringCleanData += date[i]
                    }
                }

                div.textContent = `${tagClass.textContent} останні зміни ${stringCleanData}`
                hideLoading()
            })
            .catch(error => console.log(error.message))
    })
}

const loader = document.querySelector('#loading')

function displayLoading() {
    loader.classList.add('display')
}

function hideLoading() {
    loader.classList.remove('display')
}

addEventListRepository(repositoryWebsiteLayout, `${BASE_URL}WebsiteLayout/commits`);
addEventListRepository(repositoryHtmlCssPractice, `${BASE_URL}HtmlCssPractice/commits`);
addEventListRepository(repositoryJSPractice, `${BASE_URL}JavaScriptPractice/commits`);
