const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let canvasWidth = canvas.width
let canvasHeight = canvas.height
let particleArray = []
let imageData = []

// mouse
let mouse = {
  x: null,
  y: null,
  radius: 40
}

window.addEventListener('mousemove', e => {
  mouse.x = event.x
  mouse.y = event.y
})

function drawImage(width, height) {
  let imageWidth = width
  let imageHeight = height
  const data = ctx.getImageData(0, 0, imageWidth, imageHeight)
  
  class Particle {
    constructor(x, y, color, size = 2) {
      this.x = Math.round(x + canvas.width / 2 - imageWidth * 2)
      this.y = Math.round(y + canvas.height / 2 - imageHeight * 2)
      this.color = color
      this.size = size
      
      // Records base and previous positions to repaint the canvas to its original background color
      this.baseX = Math.round(x + canvas.width / 2 - imageWidth * 2)
      this.baseY = Math.round(y + canvas.height / 2 - imageHeight * 2)
      this.previousX = null
      this.previousY = null
      this.density = (Math.random() * 700) + 2
    }
    
    stringifyColor() {
      return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a}`
    }
    
    update() {
      ctx.fillStyle = this.stringifyColor()
      
      // collision detection
      let dx = mouse.x - this.x
      let dy = mouse.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)
      let forceDirectionX = dx / distance
      let forceDirectionY = dy / distance
      
      // max distance, past that the force will be 0
      const maxDistance = 100
      let force = (maxDistance - distance) / maxDistance
      if (force < 0) force = 0
      
      let directionX = (forceDirectionX * force * this.density)
      let directionY = (forceDirectionY * force * this.density)
      
      this.previousX = this.x
      this.previousY = this.y
      if (distance < mouse.radius + this.size) {
        this.x -= directionX
        this.y -= directionY
      } else {
      	// Rounded to one decimal number to as x and y cannot be the same (whole decimal-less integer) 
      	// as baseX and baseY by decreasing using a random number / 20
        if (Math.round(this.x) !== this.baseX) {
          let dx = this.x - this.baseX
          this.x -= dx / 30
        }
        if (Math.round(this.y) !== this.baseY) {
          let dy = this.y - this.baseY
          this.y -= dy / 30
        }
      }
    }
  }
  
  function createParticle(x, y, size) {
    if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
      let positionX = x
      let positionY = y
      let offset = (y * 4 * data.width) + (x * 4)
      let color = {
        r: data.data[offset],
        g: data.data[offset + 1],
        b: data.data[offset + 2],
        a: data.data[offset + 3]
      }
      
      return new Particle(positionX * 4, positionY * 4, color, size)
    }
  }
  
  // Instead of drawing each Particle one by one, construct an ImageData that can be
  // painted into the canvas at once using putImageData()
  function updateImageDataWith(particle) {
    let x = particle.x
    let y = particle.y
    let prevX = particle.previousX
    let prevY = particle.previousY
    let size = particle.size

    if (prevX || prevY) {
      let prevMinY = Math.round(prevY - size)
      let prevMaxY = Math.round(prevY + size)
      let prevMinX = Math.round(prevX - size)
      let prevMaxX = Math.round(prevX + size)

      for (let y = prevMinY; y < prevMaxY; y++){
        for (let x = prevMinX; x < prevMaxX; x++) {
          if (y < 0 || y > canvasHeight) continue
          else if (x < 0 || x > canvasWidth) continue
          else {
            let offset = y * 4 * canvasWidth + x * 4
            imageData.data[offset] = 0
            imageData.data[offset + 1] = 0
            imageData.data[offset + 2] = 0
            imageData.data[offset + 3] = 0
          }
        }
      }
    }

    let minY = Math.round(y - size) 
    let maxY = Math.round(y + size) 
    let minX = Math.round(x - size) 
    let maxX = Math.round(x + size) 

    for (let y = minY; y < maxY; y++){
      for (let x = minX; x < maxX; x++) {
        if (y < 0 || y > canvasHeight) continue
        else if (x < 0 || x > canvasWidth) continue
        else {
          let offset = y * 4 * canvasWidth + x * 4
          imageData.data[offset] = particle.color.r
          imageData.data[offset + 1] = particle.color.g
          imageData.data[offset + 2] = particle.color.b
          imageData.data[offset + 3] = particle.color.a
        }
      }
    }
  }
  
  function init() {
    particleArray = []
    imageData = ctx.createImageData(canvasWidth, canvasHeight)
    // Initializing imageData to a blank white "page"
    for (let data = 1; data <= canvasWidth * canvasHeight * 4; data++) {
      imageData.data[data - 1] = data % 4 === 0 ? 0 : 0
    }

    const size = 2 // Min size is 2
    const step = Math.floor(size / 2)
    for (let y = 0, y2 = data.height; y < y2; y += step) {
      for (let x = 0, x2 = data.width; x < x2; x += step) {
        // If particle's alpha value is too low, don't record it
        if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
          let newParticle = createParticle(x, y, size)
          particleArray.push(newParticle)
          updateImageDataWith(newParticle)
        }
      }
    }
  }
  
  function animate() {
    requestAnimationFrame(animate)
    
    for (let i = 0; i < particleArray.length; i++) {
      let imageDataCanUpdateKey = `${Math.round(particleArray[i].x)}${Math.round(particleArray[i].y)}`
      particleArray[i].update()

      updateImageDataWith(particleArray[i])
    }
    ctx.putImageData(imageData, 0, 0)
  }
  
  init()
  animate()
  
  window.addEventListener('resize', e => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    canvasWidth = canvas.width
    canvasHeight = canvas.height
    init()
  })
}

const png = new Image();
png.src = "data:image/png;base64,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"
window.addEventListener('load', e => {
  // Ensuring height of image is always 100px
  let pngWidth = png.width
  let pngHeight = png.height
  
  let divisor = pngHeight / 100
  let finalWidth = pngWidth / divisor
  let finalHeight = pngHeight / divisor
  
  ctx.drawImage(png, 0, 0, finalWidth, finalHeight)
  drawImage(finalWidth, finalHeight)
})

//arrow

