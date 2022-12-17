'usr strict'
const gElCanvas = document.querySelector('.main-canvas')
const gCtx = gElCanvas.getContext('2d')
const elContainer = document.querySelector('.canvas-container')
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
let gStartPos


function addListeners() {
    addMouseListeners()
    addTouchListeners()

    // //Listen for resize ev
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()

    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('click', onClick)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onClick(ev) {
    ev.stopPropagation()
    const pos = getEvPos(ev)
    lineClicked(pos)
    renderMeme()
}

function onDown(ev) {
    ev.stopPropagation()
    const pos = getEvPos(ev)
    const line = lineClicked(pos)
    if (!line || !line.txt) {
        clearFocus()
        defaultImputs()
        return
    }
    setLineDrag(true, line)
    setLineFocus()
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    ev.stopPropagation()
    const meme = getMeme()
    const dragLine = meme.lines.find(line => line.isDrag)
    if (!dragLine) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy, dragLine)
    gStartPos = pos
    renderMeme()
}

function onUp(ev) {
    ev.stopPropagation()
    const line = getDragedLine()
    setLineDrag(false, line)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function renderMeme() {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        let lineIdx = 0
        meme.lines.forEach(line => {
            gCtx.beginPath()
            drawText(line, lineIdx)
            if (line.isFocus) drawLineFocus(line)
            gCtx.closePath()
            lineIdx++
        })
    }
}

function drawText(line, lineIdx) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.stroke
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align
    gCtx.textBaseline = 'center'

    let y
    let x
    if (!line.pos) {
        switch (lineIdx) {
            case 0:
                y = 65
                break

            case 1:
                y = gElCanvas.height - 20
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

function drawLineFocus(line) {
    if (!line.txt) return
    const y = line.pos.y
    const fontSize = line.size
    gCtx.lineWidth = 2
    gCtx.moveTo(0, y - fontSize)
    gCtx.lineTo(gElCanvas.width, y - fontSize)

    gCtx.strokeStyle = 'black'
    gCtx.stroke()

    gCtx.lineWidth = 2
    gCtx.moveTo(0, y + 10)
    gCtx.lineTo(gElCanvas.width, y + 10)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function onDownloadMeme(elLink) {
    const memeContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = memeContent
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
    document.querySelector('.stroke-picker').value = '#000000'
    document.querySelector('.font-select').value = 'impact'
}

function setInputs(lineIdx) {
    document.querySelector('.meme-input').value = getTextByLineIdx(lineIdx)
    document.querySelector('.color-picker').value = getColorByLineIdx(lineIdx)
    document.querySelector('.stroke-picker').value = getStrokeByLineIdx(lineIdx)
    document.querySelector('.font-select').value = getFontByLineIdx(lineIdx)
}

function onShareMeme() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function onSetLineTxt(text) {
    setLineTxt(text)
    renderMeme()

}

function onChangeLineFocus(ev) {
    ev.stopPropagation()
    const lineIdx = getLineIdx()
    isLineFocus(lineIdx)
    renderMeme()
    setInputs(lineIdx)
}

function onSetColor(color, ev) {
    ev.stopPropagation()
    setColor(color)
    renderMeme()
}

function onSetStroke(color, ev) {
    ev.stopPropagation()
    setStroke(color)
    renderMeme()
}

function onSetAlign(align, ev) {
    ev.stopPropagation()
    setAlign(align)
    renderMeme()
}

function onSetFont(font, ev) {
    ev.stopPropagation()
    setFont(font)
    renderMeme()
}

function onChangeFontSize(diff, ev) {
    ev.stopPropagation()
    changeFontSize(diff)
    renderMeme()
}

