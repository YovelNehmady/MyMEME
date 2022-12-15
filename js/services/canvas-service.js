'usr strict'
const gElCanvas = document.querySelector('.main-canvas')
const gCtx = gElCanvas.getContext('2d')
const elContainer = document.querySelector('.canvas-container')

function renderCanvs(img){
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText({value:text}) {
    
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = "60px impact";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    gCtx.fillText(text, gElCanvas.width/2, 0) 
    gCtx.strokeText(text,gElCanvas.width/2, 0) 
}

