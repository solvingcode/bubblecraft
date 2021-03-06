define(function (require) {

    const Block = require('./block/Block.js')
    const BlockType = Block.BlockType
    const BlockBuilder = require('./block/BlockBuilder.js')

    class Mesh {
        constructor(position, size = CHUNK_SIZE) {
            this.size = size
            this.position = position
            this.canvas = new OffscreenCanvas(this.size, this.size)
            this.context = this.canvas.getContext('2d')
            this.imgData = this.context.createImageData(this.size, this.size)
            this.data = this.imgData.data
        }

        add(blocks) {
            var l = this.data.length
            var pixels = []
            for (var col = 0; col < this.size; col++) {
                for (var row = 0; row < this.size; row++) {
                    const relCol = col
                    const relRow = this.size - row - 1
                    var block = blocks[parseInt(col / BLOCK_SIZE) + parseInt(row / BLOCK_SIZE) * this.size / BLOCK_SIZE]
                    if (block.type != BlockType.Air) {
                        pixels[relCol + relRow * this.size] = {
                            rgb: BlockBuilder.get(block).at(
                                block.reverse ? BLOCK_SIZE - (relCol % BLOCK_SIZE) : (relCol % BLOCK_SIZE),
                                relRow % BLOCK_SIZE
                            ),
                            mineLevel: block.mineLevel
                        }
                    }
                }
            }
            for (var i = 0; i < l; i += 4) {
                var pixel = pixels[i / 4]
                var rgb = null
                if (pixel) {
                    rgb = this.applyMine(pixel)
                } else {
                    rgb = [255, 255, 255, 0]
                }
                if (rgb) {
                    this.data[i] = rgb[0]
                    this.data[i + 1] = rgb[1]
                    this.data[i + 2] = rgb[2]
                    this.data[i + 3] = rgb[3]
                }
            }
        }

        applyMine(pixel){
            var rgb = pixel.rgb
            if (pixel.mineLevel > 0) {
                const rand = Math.random()
                if (rand <= pixel.mineLevel) {
                    rgb = [0, 0, 0, 0]
                }
            }
            return rgb
        }
    }

    return Mesh
})