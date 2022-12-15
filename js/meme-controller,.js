'usr strict'
const gElCanvas = document.querySelector('.main-canvas')
const gCtx = gElCanvas.getContext('2d')
const elContainer = document.querySelector('.canvas-container')

function renderMeme(lineIdx = 0) {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme, lineIdx)
        drawText1(meme)
    }
}


function drawText(meme, lineIdx) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = meme.lines[lineIdx].color
    gCtx.font = `${meme.lines[lineIdx].size}px impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    gCtx.fillText(meme.lines[lineIdx].txt, gElCanvas.width / 2, 0)
    gCtx.strokeText(meme.lines[lineIdx].txt, gElCanvas.width / 2, 0)
}

// function drawText(meme) {
//     gCtx.lineWidth = 2
//     gCtx.strokeStyle = 'black'
//     gCtx.fillStyle = meme.lines[0].color
//     gCtx.font = `${meme.lines[0].size}px impact`
//     gCtx.textAlign = 'center'
//     gCtx.textBaseline = 'top'

//     gCtx.fillText(meme.lines[0].txt, gElCanvas.width / 2, 0)
//     gCtx.strokeText(meme.lines[0].txt, gElCanvas.width / 2, 0)
// }

function drawText1(meme) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = meme.lines[1].color
    gCtx.font = `${meme.lines[1].size}px impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    gCtx.fillText(meme.lines[1].txt, gElCanvas.width / 2, gElCanvas.height-70)
    gCtx.strokeText(meme.lines[1].txt, gElCanvas.width / 2, gElCanvas.height-70)
}