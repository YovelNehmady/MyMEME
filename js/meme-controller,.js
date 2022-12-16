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
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const line = lineClicked(pos)
    if (!line || !line.txt) return
    setLineDrag(true, line)
    setLineFocus()
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
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

function onUp() {
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
            drawText(line, lineIdx)
            lineIdx++
        })
    }
}

function drawText(line, lineIdx) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
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

function drawLineFocus(line){
    const y = line.pos.y
    const fontSize = line.size
    gCtx.lineWidth = 2
    gCtx.moveTo(0, y - fontSize )
    gCtx.lineTo(gElCanvas.width,  y - fontSize)

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
    document.querySelector('.font-select').value = 'impact'
    
}

function setInputs(lineIdx) {
    document.querySelector('.meme-input').value = getTextByLineIdx(lineIdx)
    document.querySelector('.color-picker').value = getColorByLineIdx(lineIdx)
    document.querySelector('.font-select').value = getFontByLineIdx(lineIdx)
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

