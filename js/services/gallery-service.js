'use strict'

const gImgs = [
    {id: 1, url: 'imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'trump']},
    {id: 2, url: 'imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'dogs']},
    {id: 3, url: 'imgs/meme-imgs (square)/3.jpg', keywords: ['funny', 'dogs', 'baby']},
    {id: 4, url: 'imgs/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat', 'sleepy']},
    {id: 5, url: 'imgs/meme-imgs (square)/5.jpg', keywords: ['baby', 'angry']},
    {id: 6, url: 'imgs/meme-imgs (square)/6.jpg', keywords: ['funny', 'odd']},
    {id: 7, url: 'imgs/meme-imgs (square)/7.jpg', keywords: ['baby', 'surprised']},
    {id: 8, url: 'imgs/meme-imgs (square)/8.jpg', keywords: ['funny', 'odd']},
    {id: 9, url: 'imgs/meme-imgs (square)/9.jpg', keywords: ['baby', 'funny']},
    {id: 10, url: 'imgs/meme-imgs (square)/10.jpg', keywords: ['obama', 'funny']},
    {id: 11, url: 'imgs/meme-imgs (square)/11.jpg', keywords: ['funny', 'love']},
    {id: 12, url: 'imgs/meme-imgs (square)/12.jpg', keywords: ['funny', 'blame']},
    {id: 13, url: 'imgs/meme-imgs (square)/13.jpg', keywords: ['funny', 'cheers']},
    {id: 14, url: 'imgs/meme-imgs (square)/14.jpg', keywords: ['funny']},
    {id: 15, url: 'imgs/meme-imgs (square)/15.jpg', keywords: ['funny']},
    {id: 16, url: 'imgs/meme-imgs (square)/16.jpg', keywords: ['funny']},
    {id: 17, url: 'imgs/meme-imgs (square)/17.jpg', keywords: ['putin']},
    {id: 18, url: 'imgs/meme-imgs (square)/18.jpg', keywords: ['funny']},
]

function getImgs(){
    return gImgs
}

function getImgById(id){
    return gImgs.find(img => img.id === id)
}