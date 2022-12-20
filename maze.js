function printMaze(maze){
    for(let i = 0; i < maze.length; i++){
        let str = ""

        if(i%2 ==0){
            //even rows
            for(j = 0; j < maze[i].length; j++){
                str += "+"
                if(maze[i][j]){
                    str += "---"
                }else{
                    str += "   "
                }
                if(j == maze[i].length - 1){
                    str += "+"
                }
            }
        }else{
            //odd rows
            for(j = 0; j < maze[i].length; j++){
                if(maze[i][j]){
                    str += "|"
                }else{
                    str += " "
                }
                str += "   "
            }
        }
        console.log(str)
    }
}

function createMaze(){
    let maze = []

    //init
    for(let i = 0; i < 8; i++){
        maze.push([false, false, false, false, false, false, false, false])
        maze.push([false, false, false, false, false, false, false, false, false])
    }
    maze.push([false, false, false, false, false, false, false, false])

    //create perimeter
    for(let i = 0; i < maze.length; i++){
        for(let j = 0; j < maze[i].length; j++){
            if(i == 0 || i == 16){
                maze[i][j] = true
            }
            if((j == 0 || j == 8) && i%2 == 1){
                maze[i][j] = true
            }
        }
    }

    //recurse
    subdivide(maze, 0, 8, 0, 8)

    //fix perimeter
    maze[1][0] = false
    maze[15][8] = false

    return maze
}
function subdivide(maze, row1, row2, col1, col2){
    let row_range = row2 - row1
    let col_range = col2 - col1

    if(row_range <= 1 || col_range <= 1){
        return
    }

    let row = Math.floor(Math.random() * (row_range - 1)) + row1 + 1
    let col = Math.floor(Math.random() * (col_range - 1)) + col1 + 1

    // console.log(row, col)

    let hole_upper = row1 + Math.floor(Math.random() * (row - row1))
    let hole_lower = row + Math.floor(Math.random() * (row2 - row))
    let hole_left = col1 + Math.floor(Math.random() * (col - col1))
    let hole_right = col + Math.floor(Math.random() * (col2 - col))

    let skip = Math.floor(Math.random() * 4)
    if(skip == 0){
        hole_upper = -1
    }else if(skip == 1){
        hole_lower = -1
    }else if(skip == 2){
        hole_left = -1
    }else{
        hole_right = -1
    }

    // console.log(hole_left, hole_right, hole_upper, hole_lower)

    for(let i = row1*2; i < row2*2; i++){
        for(let j = col1; j < col2; j++){

            if(i == row * 2 && j != hole_left && j != hole_right){
                maze[i][j] = true
            }
            if(j == col && i%2 == 1 && i != hole_upper*2+1 && i != hole_lower*2+1){
                maze[i][j] = true
            }

        }
    }

    //recurse

    //topleft
    subdivide(maze, row1, row, col1, col)

    //topright
    subdivide(maze, row1, row, col, col2)

    // //bottomleft
    subdivide(maze, row, row2, col1, col)

    // //bottomright
    subdivide(maze, row, row2, col, col2)

    
}

let maze = createMaze()

printMaze(maze)
