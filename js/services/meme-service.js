'usr strict'

let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            id: makeId(),
            txt: '',
            size: 60,
            align: 'center',
            color: '#ffffff',
            stroke: '#000000',
            font: 'impact',
            pos: '',
            isDrag: false,
            isFocus: false
        }
    ]
}

function isLineFocus(idx) {
    clearFocus()
    gMeme.lines[idx].isFocus = true
}

function clearFocus() {
    gMeme.lines.forEach(line => line.isFocus = false)
    renderMeme()
}

function setLineFocus() {
    gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line.isDrag)
    setInputs(gMeme.selectedLineIdx)
}

function cleanGmeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                id: makeId(),
                txt: '',
                size: 60,
                align: 'center',
                color: '#ffffff',
                stroke: '#000000',
                font: 'impact',
                pos: '',
                isDrag: false,
                isFocus: false
            }
        ]
    }
}

function setLineDrag(isDrag, line) {
    if (!line) return
    line.isDrag = isDrag
}

function lineClicked(clickedPos) {
    const selectedLine = gMeme.lines.find(line => {
        const { pos } = line
        return (
            clickedPos.y >= pos.y - line.size && clickedPos.y <= pos.y
        )
    })
    if (selectedLine) isLineFocus(gMeme.lines.findIndex(line => line.id === selectedLine.id))

    return selectedLine
}

function moveLine(dx, dy, line) {
    line.pos.x += dx
    line.pos.y += dy
}

function getDragedLine() {
    return gMeme.lines.find(line => line.isDrag)
}

function deleteLine() {
    if (gMeme.lines.length === gMeme.selectedLineIdx) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
    setInputs(0)
}

function addLine() {
    gMeme.lines.push({

        id: makeId(),
        txt: '',
        size: 60,
        align: 'center',
        color: '#ffffff',
        stroke: '#000000',
        font: 'impact',
        isDrag: false,
        isFocus: false,
    })
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    gMeme.lines[gMeme.selectedLineIdx].isFocus = true
}

function getLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
        return gMeme.selectedLineIdx
    }
    return gMeme.selectedLineIdx
}

function getTextByLineIdx(lineIdx) {
    if (!gMeme.lines[lineIdx]) return ''
    return gMeme.lines[lineIdx].txt
}

function getColorByLineIdx(lineIdx) {
    if (!gMeme.lines[lineIdx]) return '#ffffff'
    return gMeme.lines[lineIdx].color
}
function getStrokeByLineIdx(lineIdx) {
    if (!gMeme.lines[lineIdx]) return '#000000'
    return gMeme.lines[lineIdx].stroke
}

function getFontByLineIdx(lineIdx) {
    if (!gMeme.lines[lineIdx]) return 'impact'
    return gMeme.lines[lineIdx].font
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color
}

function setAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
    let x
    switch (align) {
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
    gMeme.lines[gMeme.selectedLineIdx].pos.x = x
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function getMeme() {
    return gMeme
}

