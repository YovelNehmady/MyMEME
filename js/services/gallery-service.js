'use strict'

let gSearchBy

const gImgs = [
    {id: 1, url: 'imgs/meme-imgs (square)/1.jpg', keywords: ['funny','celebrity','politician']},
    {id: 2, url: 'imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'dogs']},
    {id: 3, url: 'imgs/meme-imgs (square)/3.jpg', keywords: ['funny', 'dogs', 'baby']},
    {id: 4, url: 'imgs/meme-imgs (square)/4.jpg', keywords: ['funny', 'cats', 'sleepy']},
    {id: 5, url: 'imgs/meme-imgs (square)/5.jpg', keywords: ['baby', 'angry']},
    {id: 6, url: 'imgs/meme-imgs (square)/6.jpg', keywords: ['funny', 'odd']},
    {id: 7, url: 'imgs/meme-imgs (square)/7.jpg', keywords: ['baby', 'surprised']},
    {id: 8, url: 'imgs/meme-imgs (square)/8.jpg', keywords: ['funny', 'odd','movie']},
    {id: 9, url: 'imgs/meme-imgs (square)/9.jpg', keywords: ['baby', 'funny']},
    {id: 10, url: 'imgs/meme-imgs (square)/10.jpg', keywords: ['funny','celebrity','politician']},
    {id: 11, url: 'imgs/meme-imgs (square)/11.jpg', keywords: ['funny', 'love']},
    {id: 12, url: 'imgs/meme-imgs (square)/12.jpg', keywords: ['funny', 'blame','movie','celebrity']},
    {id: 13, url: 'imgs/meme-imgs (square)/13.jpg', keywords: ['funny', 'cheers','movie','celebrity']},
    {id: 14, url: 'imgs/meme-imgs (square)/14.jpg', keywords: ['funny','celebrity','movie','celebrity']},
    {id: 15, url: 'imgs/meme-imgs (square)/15.jpg', keywords: ['funny','celebrity','movie','celebrity']},
    {id: 16, url: 'imgs/meme-imgs (square)/16.jpg', keywords: ['funny','celebrity','movie','celebrity']},
    {id: 17, url: 'imgs/meme-imgs (square)/17.jpg', keywords: ['celebrity','politician']},
    {id: 18, url: 'imgs/meme-imgs (square)/18.jpg', keywords: ['funny','movie']},
]
function getImgs() {
    if (gSearchBy) {
        let filteredImgs = []
        gImgs.forEach(img => {
            img.keywords.forEach(key => {
                if (key.includes(gSearchBy)){
                    if(!filteredImgs.some(filteredImg=> filteredImg.id === img.id)) filteredImgs.push(img)
                }
            })
        })
        return filteredImgs
    } else return gImgs
}

function setKeySearch(key){
    gSearchBy = key
}

function getImgById(id){
    return gImgs.find(img => img.id === id)
}