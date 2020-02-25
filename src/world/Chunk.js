class Chunk {
    constructor(position, world) {
        this.blocks = new Array(CHUNK_SIZE_BLOCK * CHUNK_SIZE_BLOCK)
        this.blocks.fill(new Block())
        this.mesh = new Mesh(position)
        this.isLoaded = false
        this.isBuffered = false
        this.position = position
        this.world = world
    }

    setBlock(x, y, type) {
        if(this.outOfBounds(x, y)){
            throw 'Block out of range'
        }else{
            var relX = parseInt(x / BLOCK_SIZE)
            var relY = parseInt(y / BLOCK_SIZE)
            if (!this.blocks[relY * CHUNK_SIZE_BLOCK + relX]) {
                this.blocks[relY * CHUNK_SIZE_BLOCK + relX] = new Block()
            }
            this.blocks[relY * CHUNK_SIZE_BLOCK + relX].type = type
        }
    }

    getBlock(x, y){
        if(this.outOfBounds(x, y)){
            var block = this.world.getBlock(this.position.x + x, this.position.y + y)
            return block
        }
        var relX = parseInt(x / BLOCK_SIZE)
        var relY = parseInt(y / BLOCK_SIZE)
        return this.blocks[relY * BLOCK_SIZE + relX]
    }

    outOfBounds(x, y){
        return y > CHUNK_SIZE || x > CHUNK_SIZE || x < 0 || y < 0
    }

    draw(renderer) {
        if (this.isBuffered) {
            renderer.draw(this)
        }
    }

    addToBuffer() {
        if (!this.isBuffered) {
            this.mesh.add(this.blocks)
            this.isBuffered = true
            return true
        }
        return false
    }
}