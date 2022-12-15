'usr strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 60,
            align: 'left',
            color: '#ffffff'
        },
        {
            txt: 'second line',
            size: 60,
            align: 'left',
            color: '#ffffff'
        }
    ]
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

