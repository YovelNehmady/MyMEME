'usr strict'
const gElCanvas = document.querySelector('.main-canvas')
const gCtx = gElCanvas.getContext('2d')
const elContainer = document.querySelector('.canvas-container')

function renderMeme() {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme)
    }
}


function drawText(meme) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = "60px impact";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    gCtx.fillText(meme.lines[0].txt, gElCanvas.width / 2, 0)
    gCtx.strokeText(meme.lines[0].txt, gElCanvas.width / 2, 0)
}