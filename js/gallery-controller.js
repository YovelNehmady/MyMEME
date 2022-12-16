'use strict'

function onInit() {
    renderImgs()
    addListeners()
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