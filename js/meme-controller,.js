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
        let lineIdx = 0
        meme.lines.forEach(line => {
            drawText(line, lineIdx)
            lineIdx++
        })
    }
}

function drawText(line, lineCounter) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align
    gCtx.textBaseline = 'center'

    let y
    let x
    if (!line.pos) {
        switch (lineCounter) {
            case 0:
                y = 65
                break

            case 1:
                y = gElCanvas.height - 5
                break

            default:
                y = gElCanvas.height / 2
                break
        }
        switch (line.align) {
            case 'left':
                x = 5
                break

            case 'right':
                x = gElCanvas.width
                break

            case 'center':
                x = gElCanvas.width / 2
                break
        }
    } else {
        x = line.pos.x
        y = line.pos.y
    }

    line.pos = { x: x, y: y }
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onAddLine() {
    defaultImputs()
    addLine()
    gMeme.selectedLineIdx++
    renderMeme()
}

function defaultImputs() {
    document.querySelector('.meme-input').value = ''
    document.querySelector('.color-picker').value = '#ffffff'
}

function setInputs(lineIdx) {
    document.querySelector('.meme-input').value = getTextByLineIdx(lineIdx)
    document.querySelector('.color-picker').value = getColorByLineIdx(lineIdx)
}

function onSetLineTxt(text) {
    setLineTxt(text)
    renderMeme()
}

function onChangeLineFocus() {
    const lineIdx = getLineIdx()
    setInputs(lineIdx)
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onSetAlign(align) {
    setAlign(align)
    renderMeme()
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

