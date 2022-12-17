'use strict'

function onInit() {
    renderImgs()
    addListeners()
}
function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

//the function not done yet!

// function onKeyClick(elKey, key) {
//     setKeySearch(key)
//     renderImgs()
//     setKeySize(elKey , key)
// }

function onSearchMeme(key) {
    setKeySearch(key)
    renderImgs()
}

function renderImgs() {
    const imges = getImgs()
    let strHTML = ``
    strHTML += imges.map(img => `
     <img onclick="onImgSelect(${img.id},this)" src="${img.url}" alt="">`
    ).join('')
    document.querySelector('.main-content').innerHTML = strHTML
}

function onImgSelect(id) {
    setImg(id)
    renderMeme()

    document.querySelector('.main-screen').classList.add('close')
    document.querySelector('.editor-screen').classList.add('grid')
    document.querySelector('.editor-screen').classList.remove('close')
}

function onCloseEditorScreen() {
    document.querySelector('.main-screen').classList.remove('close')
    document.querySelector('.editor-screen').classList.remove('grid')
    document.querySelector('.editor-screen').classList.add('close')
    cleanGmeme()
    defaultImputs()
}