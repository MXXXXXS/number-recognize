const canvas = document.querySelector(`.board`)
const ctx = canvas.getContext(`2d`)


let lastPoints = []
let beAbleToDraw = false
let imageBuffer
canvas.width = 0.8 * Math.min(window.innerWidth, window.innerHeight)
canvas.height = 0.8 * Math.min(window.innerWidth, window.innerHeight)

class Debounce {
  constructor() {
    this.time = new Date().getTime()
  }
  debounce(fn, ms) {
    window.clearTimeout(this.tId)
    this.tId = window.setTimeout(() => {
      fn()
      window.clearTimeout()
    }, ms)
  }
}

let debounce0 = new Debounce()

function canvasInitState(ctx) {
  ctx.fillStyle = 'rgb(199,209,71)'
  ctx.strokeStyle = 'rgb(199,209,71)'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.miterLimit = 3
  ctx.lineWidth = 30
}

canvasInitState(ctx)
window.onresize = () => {
  debounce0.debounce(() => {
    imageBuffer = canvas.toDataURL()
  canvas.width = 0.8 * Math.min(window.innerWidth, window.innerHeight)
  canvas.height = 0.8 * Math.min(window.innerWidth, window.innerHeight)
  canvasInitState(ctx)
  const img = new Image()
  img.src = imageBuffer
  img.onload = function() {
    ctx.drawImage(img, 0, 0)
    imageBuffer = ''
  }
  }, 100)
}

canvas.onmousemove = (e) => {
  if (beAbleToDraw) {
    const clientX = e.clientX
    const clientY = e.clientY
    const canvasX = canvas.offsetLeft
    const canvasY = canvas.offsetTop

    const x = clientX - canvasX
    const y = clientY - canvasY
    //需要在画布内
    if (lastPoints.length === 4) {
      ctx.beginPath()
      ctx.moveTo(
        lastPoints[0],
        lastPoints[1]
      )
      ctx.quadraticCurveTo(
        lastPoints[2],
        lastPoints[3],
        x,
        y)
      ctx.stroke()
      lastPoints.shift()
      lastPoints.shift()
    }
    lastPoints.push(x)
    lastPoints.push(y)
  } else {
    lastPoints = []
  }
}

canvas.onmouseout = () => {
  lastPoints = []
  beAbleToDraw = false
}

canvas.onmouseup = () => {
  lastPoints = []
  beAbleToDraw = false
}

canvas.onmousedown = () => {
  beAbleToDraw = true
}

canvas.ontouchmove = (e) => {
  e.preventDefault();
  if (beAbleToDraw) {
    const clientX = e.touches[0].clientX
    const clientY = e.touches[0].clientY
    const canvasX = canvas.offsetLeft
    const canvasY = canvas.offsetTop

    const x = clientX - canvasX
    const y = clientY - canvasY
    //需要在画布内
    if (lastPoints.length === 4) {
      ctx.beginPath()
      ctx.moveTo(
        lastPoints[0],
        lastPoints[1]
      )
      ctx.quadraticCurveTo(
        lastPoints[2],
        lastPoints[3],
        x,
        y)
      ctx.stroke()
      lastPoints.shift()
      lastPoints.shift()
    }
    lastPoints.push(x)
    lastPoints.push(y)
  } else {
    lastPoints = []
  }
}

canvas.ontouchcancel = () => {
  lastPoints = []
  beAbleToDraw = false
}

canvas.ontouchend = () => {
  lastPoints = []
  beAbleToDraw = false
}

canvas.ontouchstart = () => {
  beAbleToDraw = true
}
