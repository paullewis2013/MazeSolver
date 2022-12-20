// Always execute in strict mode (less bug)
'use strict';

/* to1DF32Array(a2DArray)
 *
 * This function turns an array of 4-element arrays a2DArray into a packed
 * 1-dimensional array of 32-bit floating-point numbers.
 *
 * NOTE: This function should not be here. It should be in your library.
 */
function to1DF32Array(a2DArray)
{
    var size = a2DArray.length;

    if(size == 0)
    {
        console.log("[alib/to1DF32Array - DEBUG]: size is 0");
        return new Float32Array([]);
    }

    // Turn 2D array into 1D array
    
    var result = [];
    var index = 0;

    for(var i = 0; i < size; i++)
    {
        var anElement = a2DArray[i];
        
        if(anElement.length != 4)
            console.log("[laib/to1DF32Array - ERROR]: Not a 4-element vector");
        
        result[index] = anElement[0];
        result[index + 1] = anElement[1];
        result[index + 2] = anElement[2];
        result[index + 3] = anElement[3];
        index += 4;
    }

    return new Float32Array(result);
}

// These variables must be global variables.
// Some callback functions may need to access them.
var gl = null;
var canvas = null;
var ctm_location;
var model_view_location;
var projection_location;

var ctm =[[1.0, 0.0, 0.0, 0.0],
	     [0.0, 1.0, 0.0, 0.0],
	     [0.0, 0.0, 1.0, 0.0],
	     [0.0, 0.0, 0.0, 1.0]]

var model_view =[[1.0, 0.0, 0.0, 0.0],
	     [0.0, 1.0, 0.0, 0.0],
	     [0.0, 0.0, 1.0, 0.0],
	     [0.0, 0.0, 0.0, 1.0]]

var projection =[[1.0, 0.0, 0.0, 0.0],
	     [0.0, 1.0, 0.0, 0.0],
	     [0.0, 0.0, 1.0, 0.0],
	     [0.0, 0.0, 0.0, 1.0]]

function initGL(canvas)
{
    gl = canvas.getContext("webgl");
    if(!gl)
    {
	alert("WebGL is not available...");
	return -1;
    }

    // Set the clear screen color to black (R, G, B, A)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    // Enable hidden surface removal
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    return 0;
}

function push3colors(triangles){
    var colorsArr = []

    for(let i = 0; i < triangles; i++){
        let rand1 = Math.random() * 0.5 + 0.35
        let rand2 = Math.random() * 0.5 + 0.35
        let rand3 = Math.random() * 0.5 + 0.35
        colorsArr.push([rand1, rand2, rand3, 1.0])
        colorsArr.push([rand1, rand2, rand3, 1.0])
        colorsArr.push([rand1, rand2, rand3, 1.0])
    }

    return colorsArr;
}


function cube_positions(){
    var positions = [
        //top
        [0.5, 0.5, -0.5, 1.0],
        [-0.5, 0.5, -0.5, 1.0],
        [0.5, 0.5, 0.5, 1.0],

        [0.5, 0.5, 0.5, 1.0],
        [-0.5, 0.5, -0.5, 1.0],
        [-0.5, 0.5, 0.5, 1.0],

        //front
        [-0.5, 0.5, 0.5, 1.0],
        [-0.5, -0.5, 0.5, 1.0],
        [0.5, 0.5, 0.5, 1.0],

        [-0.5, -0.5, 0.5, 1.0],
        [0.5, -0.5, 0.5, 1.0],
        [0.5, 0.5, 0.5, 1.0],

        //bottom
        [-0.5, -0.5, -0.5, 1.0],
        [0.5, -0.5, -0.5, 1.0],
        [0.5, -0.5, 0.5, 1.0],

        [-0.5, -0.5, -0.5, 1.0],
        [0.5, -0.5, 0.5, 1.0],
        [-0.5, -0.5, 0.5, 1.0],

        //back
        [0.5, -0.5, -0.5, 1.0],
        [-0.5, 0.5, -0.5, 1.0],
        [0.5, 0.5, -0.5, 1.0],

        [-0.5, -0.5, -0.5, 1.0],
        [-0.5, 0.5, -0.5, 1.0],
        [0.5, -0.5, -0.5, 1.0],

        //left
        [-0.5, 0.5, -0.5, 1.0],
        [-0.5, -0.5, -0.5, 1.0],
        [-0.5, 0.5, 0.5, 1.0],

        [-0.5, 0.5, 0.5, 1.0],
        [-0.5, -0.5, -0.5, 1.0],
        [-0.5, -0.5, 0.5, 1.0],

        //right
        [0.5, -0.5, -0.5, 1.0],
        [0.5, 0.5, -0.5, 1.0],
        [0.5, 0.5, 0.5, 1.0],

        [0.5, -0.5, -0.5, 1.0],
        [0.5, 0.5, 0.5, 1.0],
        [0.5, -0.5, 0.5, 1.0],
    ]

    return positions
}
function cylinder_positions(points){

    var top_mid = [0.0, 0.5, 0.0, 1.0]
    var bottom_mid = [0.0, -0.5, 0.0, 1.0]

    var positions = []
    let radius = 0.5;

    for(let i = 0; i < points; i++){

        //upper base triangle
        //left corner
        positions.push(top_mid);
        positions.push([
            radius * Math.sin((i/points) * Math.PI * 2),
            0.5, 
            radius * Math.cos((i/points) * Math.PI * 2),
            1.0
        ])
        //right corner
        positions.push([
            radius * Math.sin(((i+1)/points) * Math.PI * 2),
            0.5, 
            radius * Math.cos(((i+1)/points) * Math.PI * 2),
            1.0
        ])

        //side triangle upper base
        //right corner
        positions.push([
            radius * Math.sin(((i+1)/points) * Math.PI * 2),
            0.5, 
            radius * Math.cos(((i+1)/points) * Math.PI * 2),
            1.0
        ])
        //left corner
        positions.push([
            radius * Math.sin((i/points) * Math.PI * 2),
            0.5, 
            radius * Math.cos((i/points) * Math.PI * 2),
            1.0
        ])
        positions.push([
            radius * Math.sin((i/points) * Math.PI * 2),
            -0.5, 
            radius * Math.cos((i/points) * Math.PI * 2),
            1.0
        ])

        //base triangle
        //left corner
        positions.push([
            radius * Math.sin((i/points) * Math.PI * 2),
            -0.5, 
            radius * Math.cos((i/points) * Math.PI * 2),
            1.0
        ])
        positions.push(bottom_mid);
        //right corner
        positions.push([
            radius * Math.sin(((i+1)/points) * Math.PI * 2),
            -0.5, 
            radius * Math.cos(((i+1)/points) * Math.PI * 2),
            1.0
        ])

        // side triangle lower base
        // left corner
        positions.push([
            radius * Math.sin((i/points) * Math.PI * 2),
            -0.5, 
            radius * Math.cos((i/points) * Math.PI * 2),
            1.0
        ])
        
        //right corner
        positions.push([
            radius * Math.sin(((i+1)/points) * Math.PI * 2),
            -0.5, 
            radius * Math.cos(((i+1)/points) * Math.PI * 2),
            1.0
        ])

        positions.push([
            radius * Math.sin(((i+1)/points) * Math.PI * 2),
            0.5, 
            radius * Math.cos(((i+1)/points) * Math.PI * 2),
            1.0
        ])

        
        
        
    }

    return positions

}

const cylinder_points = 12
const cube_points = 36
//all vertices will go in here
var positions = []
//all color values will go in here
var colors = []

var currEye
var currAt

function init()
{

    //create the floor first
    positions = positions.concat(cube_positions())

    for(let i = 0; i < cube_points; i++){
        colors.push([1.0, 1.0, 1.0, 1.0])
    }
    // colors = colors.concat(push3colors(cube_points/3))

    //scale the floor
    for(let i = 0; i < positions.length; i++){

        let s = scaling_matrix(20.0, 1.0, 20.0)
        let t = translation_matrix(0.3, 0, 0.3)
        positions[i] = multiply_matrix_vector(s, positions[i])
        positions[i] = multiply_matrix_vector(t, positions[i])
    }

    //next create the posts
    for(let i = 0; i < 81; i++){
        let start = positions.length

        //add a cylinder at origin
        positions = positions.concat(cylinder_positions(cylinder_points))
        for(let c = 0; c < cylinder_points * 12; c++){
            colors.push([0.3, 0.3, 0.3, 1.0])
        }

        let t = translation_matrix(-8.0 + 2*(i%9) + 0.25, 1.125, -8.0 + 2 * (Math.floor(i/9)) + 0.25)
        let s = scaling_matrix(0.6, 1.25, 0.6)

        for(let j = start; j < start + cylinder_points*12; j++){
            positions[j] = multiply_matrix_vector(s, positions[j])
            positions[j] = multiply_matrix_vector(t, positions[j])
        }
    }

    //next create the walls of maze
    for(let i = 0; i < maze.length; i++){

        let t, s
        
        if(i%2 == 0){
            s = scaling_matrix(2.0, 1.0, 0.25)
        }else{
            s = scaling_matrix(0.25, 1.0, 2.0)
        }

        for(let j = 0; j < maze[i].length; j++){

            if(!maze[i][j]){continue;}
            
            let start = positions.length

            //create new cube
            positions = positions.concat(cube_positions())
            colors = colors.concat(push3colors(cube_points/3))

            if(i%2 == 0){
                t = translation_matrix(-8.0 + 2*j + 1, 1.0, -8.0 + 2*Math.floor(i/2) + 0.25)
            }else{
                t = translation_matrix(-8.0 + 2*j + 0.25, 1.0, -8.0 + 2*Math.floor(i/2) + 1)
            }

            //apply
            for(let k = start; k < start + cube_points; k++){
                positions[k] = multiply_matrix_vector(s, positions[k])
                positions[k] = multiply_matrix_vector(t, positions[k])
            }
        }

    }




    //----------------------------------------------
    //Don't touch below here
    //----------------------------------------------


    // Load and compile shader programs
    var shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
    if(shaderProgram == -1)
	return -1;
    gl.useProgram(shaderProgram)

    // Allocate memory in a graphics card
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, 4 * 4 * (positions.length + colors.length), gl.STATIC_DRAW);
    // Transfer positions and put it at the beginning of the buffer
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, to1DF32Array(positions));
    // Transfer colors and put it right after positions
    gl.bufferSubData(gl.ARRAY_BUFFER, 4 * 4 * positions.length, to1DF32Array(colors));

    // Vertex Position - locate and enable "vPosition"
    var vPosition_location = gl.getAttribLocation(shaderProgram, "vPosition");
    if (vPosition_location == -1)
    { 
        alert("Unable to locate vPosition");
        return -1;
    }
    gl.enableVertexAttribArray(vPosition_location);
    // vPosition starts at offset 0
    gl.vertexAttribPointer(vPosition_location, 4, gl.FLOAT, false, 0, 0);

    // Vertex Color - locate and enable vColor
    var vColor_location = gl.getAttribLocation(shaderProgram, "vColor");
    if (vColor_location == -1)
    { 
        alert("Unable to locate vColor");
        return -1;
    }
    gl.enableVertexAttribArray(vColor_location);
    // vColor starts at the end of positions
    gl.vertexAttribPointer(vColor_location, 4, gl.FLOAT, false, 0, 4 * 4 * positions.length);

    // Current Transformation Matrix - locate and enable "ctm"
    ctm_location = gl.getUniformLocation(shaderProgram, "ctm");
    if (ctm_location == -1)
    { 
        alert("Unable to locate ctm");
        return -1;
    }

    model_view_location = gl.getUniformLocation(shaderProgram, "model_view");
    if (model_view_location == null)
    {
        alert("Unable to locate model_view");
        return -1;
    }
    projection_location = gl.getUniformLocation(shaderProgram, "projection");
    if (projection_location == null)
    {
        alert("Unable to locate projection");
        return -1;
    }

    return 0;
}

function display()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set the ctm
    gl.uniformMatrix4fv(model_view_location, false, to1DF32Array(model_view));
    gl.uniformMatrix4fv(projection_location, false, to1DF32Array(projection));
    gl.uniformMatrix4fv(ctm_location, false, to1DF32Array(ctm));
    
    gl.drawArrays(gl.TRIANGLES, cube_points, positions.length - cube_points);
    gl.drawArrays(gl.TRIANGLES, 0, cube_points);

    
}

async function keyDownCallback(event)
{
    //w
    if(event.keyCode == 87 && !overhead)
    {
        //walk forward
        let p1 = [current_location[0], current_location[1], current_location[2], 0]
        let p2 = [current_at[0], current_at[1], current_at[2], 0]

        let v = multiply_vector_scalar(subtract_vectors(p2, p1), 0.2)

        let new_p1 = add_vectors(p1, v)
        current_location = [new_p1[0], new_p1[1], new_p1[2]]

        let new_p2 = add_vectors(p2, v)
        current_at = [new_p2[0], new_p2[1], new_p2[2]]

        // console.log(current_location)

        display()
    }
    //a
    if(event.keyCode == 65 && !overhead) 
    {
        //turn left
        let theta = -Math.PI/30

        let p1 = [current_location[0], current_location[1], current_location[2], 0]
        let p2 = [current_at[0], current_at[1], current_at[2], 0]

        p2 = subtract_vectors(p2, p1)

        let new_p2 = [  Math.cos(theta) * p2[0] - Math.sin(theta) * p2[2],
                        p2[1], 
                        Math.cos(theta) * p2[2] + Math.sin(theta) * p2[0]
                     ]

        current_at = [p1[0] + new_p2[0], p1[1], p1[2] + new_p2[2]]
        // console.log(current_at)

	    display()
    }
    //s
    if(event.keyCode == 83 && !overhead)
    {
        
        //walk backward
        let p1 = [current_location[0], current_location[1], current_location[2], 0]
        let p2 = [current_at[0], current_at[1], current_at[2], 0]

        let v = multiply_vector_scalar(subtract_vectors(p2, p1), 0.2)

        let new_p1 = subtract_vectors(p1, v)
        current_location = [new_p1[0], new_p1[1], new_p1[2]]

        let new_p2 = subtract_vectors(p2, v)
        current_at = [new_p2[0], new_p2[1], new_p2[2]]

	    display()
    }
    //d
    if(event.keyCode == 68 && !overhead)
    {   
        //turn right
        let theta = Math.PI/30

        let p1 = [current_location[0], current_location[1], current_location[2], 0]
        let p2 = [current_at[0], current_at[1], current_at[2], 0]

        p2 = subtract_vectors(p2, p1)

        let new_p2 = [  Math.cos(theta) * p2[0] - Math.sin(theta) * p2[2],
                        p2[1], 
                        Math.cos(theta) * p2[2] + Math.sin(theta) * p2[0]
                     ]

        current_at = [p1[0] + new_p2[0], p1[1], p1[2] + new_p2[2]]
        // console.log(current_at)

	    display()
    }
    //space
    if(event.keyCode == 32)
    {   
        if(!zooming){
            //move to overhead view or maze view
            overhead = !overhead
            zooming = true

            //fly animation

            for(let i = 1; i <= 100; i++){
                //zoom out
                if(overhead){

                    let p1 = [current_location[0], current_location[1], current_location[2], 0]
                    let p2 = [current_at[0], current_at[1], current_at[2], 0]
                    let p3 = [current_up[0], current_up[1], current_up[2], 0]
                    let o1 = [0, 18, 0, 0]
                    let o2 = [0, 0, 0, 0]
                    let o3 = [0, 0, -1, 0]

                    let v1 = multiply_vector_scalar(subtract_vectors(p1, o1), 0.01 * i)
                    let v2 = multiply_vector_scalar(subtract_vectors(p2, o2), 0.01 * i)
                    let v3 = multiply_vector_scalar(subtract_vectors(p3, o3), 0.01 * i)

                    let new_p1 = subtract_vectors(p1, v1)
                    overhead_eye = [new_p1[0], new_p1[1], new_p1[2]]
                    // overhead_eye = [current_location[0] + new_p1[0], current_location[1] + new_p1[1], current_location[2] + new_p1[2]]

                    let new_p2 = subtract_vectors(p2, v2)
                    overhead_at = [new_p2[0], new_p2[1], new_p2[2]]

                    let new_p3 = subtract_vectors(p3, v3)
                    overhead_up = [new_p3[0], new_p3[1], new_p3[2]]

                    display()
                    await sleep(10)
                }
                //zoom in
                else{

                    let p1 = [current_location[0], current_location[1], current_location[2], 0]
                    let p2 = [current_at[0], current_at[1], current_at[2], 0]
                    let p3 = [current_up[0], current_up[1], current_up[2], 0]
                    let o1 = [0, 18, 0, 0]
                    let o2 = [0, 0, 0, 0]
                    let o3 = [0, 0, -1, 0]

                    let v1 = multiply_vector_scalar(subtract_vectors(o1, p1), 0.01 * i)
                    let v2 = multiply_vector_scalar(subtract_vectors(o2, p2), 0.01 * i)
                    let v3 = multiply_vector_scalar(subtract_vectors(o3, p3), 0.01 * i)

                    let new_p1 = subtract_vectors(o1, v1)
                    overhead_eye = [new_p1[0], new_p1[1], new_p1[2]]
                    // overhead_eye = [current_location[0] + new_p1[0], current_location[1] + new_p1[1], current_location[2] + new_p1[2]]

                    let new_p2 = subtract_vectors(o2, v2)
                    overhead_at = [new_p2[0], new_p2[1], new_p2[2]]

                    let new_p3 = subtract_vectors(o3, v3)
                    overhead_up = [new_p3[0], new_p3[1], new_p3[2]]

                    display()
                    await sleep(10)
                }
            }

            zooming = false 
        }
    }
    //s
    if(event.keyCode == 88)
    { 
        solve()
    }    

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main()
{
    canvas = document.getElementById("gl-canvas");
    if(initGL(canvas) == -1)
	return -1;
    if(init() == -1)
	return -1;

    document.onkeydown = keyDownCallback;
    
    display();
    requestAnimationFrame(idle);
}

var current_location = [-7.75, 1.35, -6.75]
var current_at = [-6.75, 1.35, -6.75]
var current_up = [0, 1, 0]

var overhead = false
var zooming = false
var overhead_eye = [0, 18, 1]; 
var overhead_at = [0, 0, 0];
var overhead_up = [0, 0, -1]

function idle(){


        //update eye location
    let eye = current_location
    let at = current_at
    let up = current_up
    projection = frustrum(-0.5, 0.5, -0.8, 0.8, -0.5, -24.0)

    if(overhead || zooming){
        eye = overhead_eye
        at = overhead_at
        up = overhead_up
        // projection = ortho(-12.0, 12.0, -12.0, 12.0, 100.0, -100.0)
    }

    model_view = look_at(eye, at, up)
    
    requestAnimationFrame(idle)
    display();
}
function look_at(eye, at, up){

    eye.push(0)
    at.push(0)
    up.push(0)

    let z = normalize_vector(subtract_vectors(eye, at))
    let x = normalize_vector(cross_product_vectors(up, z))
    let y = cross_product_vectors(z, x)

    let orientation = [
        [x[0],  y[0],   z[0],   0],
        [x[1],  y[1],   z[1],   0],
        [x[2],  y[2],   z[2],   0],
        [0,     0,      0,      1],
    ]

    let translation = [
        [1,           0,            0,            0],
        [0,           1,            0,            0],
        [0,           0,            1,            0],
        [-eye[0],     -eye[1],      -eye[2],      1],
    ]

    return multiply_matrix_matrix(orientation, translation)
}

function ortho(left, right, bottom, top, near, far){

    //compare to canonical view and scale
    return [
        [2/(right - left),  0,                          0,                            0],
        [0,                 2/(top - bottom),           0,                            0],
        [0,                 0,                          -2/(far - near),              0],
        [-(right + left)/(right - left),     -(top + bottom)/(top - bottom),      -(far + near)/(far - near),        1],
    ]
}

function frustrum(left, right, bottom, top, near, far){

    //compare to canonical view and scale
    return [
        [-2*near/(right - left),    0,                                0,                                                     0],
        [0,                         -2*near/(top - bottom),           0,                                                     0],
        [(right + left)/(right - left),                         (top + bottom)/(top - bottom),                                (near + far)/(far - near),                            -1],
        [0,                         0,                                (-2*(near * far))/(far - near),                        0],
    ]
}

//returns cell of current location
function get_cell(x, z){

    // console.log("3D on ", x, z)

    x = Math.floor((x + 8)/2)
    z = Math.floor((z + 8)/2)

    // console.log("cell on ", x, z)

    return [x, z]
}
function get_XZ(input){
    let x = Math.floor((input[0]) * 2) - 7
    let z = Math.floor((input[1]) * 2) - 7

    // console.log("3D on ", x, z)

    return [x, z];
}

//find cells in path to exit
function get_path(cell, cells){

    //exit is (7, 7)
    if(cell[0] == 7 && cell[1] == 7){
        cells.push(cell)
        return cells
    }

    console.log(cell, cells)
    let right_failed = false
    let down_failed = false
    let left_failed = false

    // see if there is a path to explore right
    if(cell[0] < 7 && !maze[cell[1]*2 + 1][cell[0] + 1] && (cells.length == 0 || cells[cells.length-1][0] != cell[0]+1)){
        console.log("right path found")
        let next = [cell[0] + 1, cell[1]]
        cells.push(cell)
        let res = get_path(next, cells)
        if(!res){
            cells.pop()
            console.log("backtracking")
            right_failed = true
        }else{
            return res
        }
    }else{
        right_failed = true
    }    
    //see if there is a path to explore down
    if(right_failed && cell[1] < 7 && !maze[cell[1]*2 + 2][cell[0]] && (cells.length == 0 || cells[cells.length-1][1] != cell[1]+1)){
        console.log("down path found")
        let next = [cell[0], cell[1] + 1]
        cells.push(cell)
        let res = get_path(next, cells)
        if(!res){
            cells.pop()
            console.log("backtracking")
            down_failed = true
        }else{
            return res
        }
    }else{
        down_failed = true
    }  
    //see if there is a path to explore left
    if(right_failed && down_failed && cell[0] > 0 && !maze[cell[1]*2 + 1][cell[0]] && (cells.length == 0 || cells[cells.length-1][0] != cell[0]-1)){
        console.log("left path found")
        let next = [cell[0] - 1, cell[1]]
        cells.push(cell)
        let res = get_path(next, cells)
        if(!res){
            cells.pop()
            console.log("backtracking")
            left_failed = true
        }else{
            return res
        }
    }else{
        left_failed = true
    }  
    //see if there is a path to explore upwards
    if(down_failed && right_failed && left_failed && cell[1] > 0 && !maze[cell[1]*2][cell[0]] && (cells.length == 0 || cells[cells.length-1][1] != cell[1]-1)){
        console.log("upwards path found")
        let next = [cell[0], cell[1] - 1]
        cells.push(cell)
        let res = get_path(next, cells)
        if(!res){
            cells.pop()
            console.log("backtracking")
        }else{
            return res
        }
    }
    //travel along right-hand wall and record all cells passed through

    //delete any cells which are between cells returned to
    return false
}

async function move_to_cell(dest){

    let p1 = [current_location[0], current_location[1], current_location[2], 0]

    console.log("going to ", dest[0], dest[1])
    for(let i = 1; i <= 20; i++){
        let p2 = [dest[0], current_location[1], dest[1], 0]

        let v = multiply_vector_scalar(subtract_vectors(p2, p1), 0.05 * i)

        let new_p1 = add_vectors(p1, v)
        current_location = [new_p1[0], new_p1[1], new_p1[2]]

        let new_p2 = add_vectors(p2, v)
        current_at = [new_p2[0], new_p2[1], new_p2[2]]

        await sleep(50) 
    }
    console.log("ended up ", current_location[0], current_location[2])
    
}

async function look_at_cell(at){

    let p1 = [current_at[0], current_at[1], current_at[2], 0]
    let p2 = [at[0], current_at[1], at[1], 0]

    if(Math.abs(current_at[0] - at[0]) < 0.1 && Math.abs(current_at[2] - at[1]) < 0.1){return}
    
    for(let i = 1; i <= 20; i++){

        let v = multiply_vector_scalar(subtract_vectors(p2, p1), 0.05 *i)

        let new_p1 = add_vectors(p1, v)
        current_at = [new_p1[0], new_p1[1], new_p1[2]]

        console.log(current_at)

        // console.log("ended up ", current_location[0], current_location[2])

        await sleep(50)

        display()
    }
}

async function solve(){
    if(!overhead){

        //find where you are in grid
        let cell = get_cell(current_location[0], current_location[2])
        let cells = []

        //get on cell grid
        await move_to_cell(get_XZ(cell))
        
        cells = get_path(cell, cells)
        console.log(cells)

        for(let i = 0; i < cells.length - 1; i++){
            //look at next cell
            await look_at_cell(get_XZ(cells[i+1]))

            //move to next cell
            await move_to_cell(get_XZ(cells[i+1]))
            
        }
        await look_at_cell(get_XZ([8, 7]))
        alert("Maze Solved!")

    }
    
}