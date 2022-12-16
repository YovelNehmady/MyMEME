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
            pos: ''
        }
    ]
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function addLine() {
    gMeme.lines.push({
        txt: '',
        size: 60,
        align: 'center',
        color: '#ffffff',
        font: 'impact',
    })
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function getLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
        return gMeme.selectedLineIdx
    }
    return gMeme.selectedLineIdx
}

function getTextByLineIdx(lineIdx){
    return gMeme.lines[lineIdx].txt
}

function getColorByLineIdx(lineIdx){
    return gMeme.lines[lineIdx].color 
}

function  setColor(color){
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setAlign(align){
    gMeme.lines[gMeme.selectedLineIdx].align = align
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

