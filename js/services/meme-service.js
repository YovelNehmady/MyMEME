'usr strict'



let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 60,
            align: 'center',
            color: '#ffffff',
            font: 'impact',
            pos :''
        }
    ]
}

function onDeleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    renderMeme()
}

function onAddLine() {

    document.querySelector('.meme-input').value = ''
    document.querySelector('.color-picker').value = '#ffffff'

    gMeme.lines.push({
        txt: '',
        size: 60,
        align: 'center',
        color: '#ffffff',
        font: 'impact',
    })

    gMeme.selectedLineIdx++
    renderMeme()
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    renderMeme()
}

function onChangeLineFocus() {
    const lineIdx = getLineIdx()
    renderInputs(lineIdx)
}

function renderInputs(lineIdx) {
    document.querySelector('.meme-input').value = gMeme.lines[lineIdx].txt
    document.querySelector('.color-picker').value = gMeme.lines[lineIdx].color
}

function getLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
        return gMeme.selectedLineIdx
    }
    return gMeme.selectedLineIdx
}

function onSetColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme()
}

function onSetAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
    renderMeme()
}

function onSetFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
    gFont = font
    renderMeme()
}

function onChangeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
    renderMeme()
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function getMeme() {
    return gMeme
}

