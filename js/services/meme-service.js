'usr strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'black'
        }
    ]
}

function setLineTxt(text){
    gMeme.lines[0].txt = text
    renderMeme()
}

function setImg(id) {
  gMeme.selectedImgId = id
}

function getMeme(){
    return gMeme
}

