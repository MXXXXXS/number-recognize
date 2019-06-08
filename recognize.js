document.querySelector(`.recog`).addEventListener(`click`, () => {
  resize(canvas.toDataURL(), 28, 28, `image/png`).then(src => {
    const img = new Image()
    // console.log(src)
    img.src = src
    img.onload = function () {
      const canvas = document.createElement(`canvas`)
      canvas.width = 28
      canvas.height = 28
      const ctx = canvas.getContext(`2d`)
      ctx.drawImage(img, 0, 0)
      const recogEl = document.querySelector(`.recognized`)
      recogEl.innerHTML = ''
      recogEl.appendChild(canvas)
      const imgData = ctx.getImageData(0, 0, 28, 28).data
      const binImg = []
      //处理成二值图像
      for (let i = 0; i < imgData.length; i += 4) {
        if (imgData[i] > 0) {
          binImg.push(1)
        } else {
          binImg.push(0)
        }
      }
      const result = recognize(binImg)
      console.log(result)
      // recogEl.innerHTML += result
      const boardCanvas = document.querySelector(`.board`)
      const boardCtx = boardCanvas.getContext(`2d`)
      boardCtx.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
    }
  })
})