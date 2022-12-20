//=====================================================================
//vector operations
//=====================================================================

//print vector v1
function print_vector(v1){
    console.log("[" + v1[0].toFixed(4) + " "
                    + v1[1].toFixed(4) + " "
                    + v1[2].toFixed(4) + " "
                    + v1[3].toFixed(4) + " "
                + "]"
    )
}

//return result of multiplying vector v1 by scalar s
function multiply_vector_scalar(v1, s){
    let ret = []
    ret[0] = v1[0] * s
    ret[1] = v1[1] * s
    ret[2] = v1[2] * s
    ret[3] = v1[3] * s
    return ret
}

//return result of adding vector v1 to vector v2
function add_vectors(v1, v2){
    let ret = []
    ret[0] = v1[0] + v2[0]
    ret[1] = v1[1] + v2[1]
    ret[2] = v1[2] + v2[2]
    ret[3] = v1[3] + v2[3]
    return ret
}

//return result of subtracting vector v2 from vector v1
function subtract_vectors(v1, v2){
    let ret = []
    ret[0] = v1[0] - v2[0]
    ret[1] = v1[1] - v2[1]
    ret[2] = v1[2] - v2[2]
    ret[3] = v1[3] - v2[3]
    return ret
}

//return magnitude of vector v1
function vector_magnitude(v1){
    return Math.sqrt(
        v1[0]*v1[0] +
        v1[1]*v1[1] +
        v1[2]*v1[2] +
        v1[3]*v1[3] 
    )
}

//return a normalized vector v1
function normalize_vector(v1){
    return multiply_vector_scalar(v1, 1/(vector_magnitude(v1)))
}

//return dot product of vector v1 * vector v2
function dot_product_vectors(v1, v2){
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2] + v1[3] * v2[3]
}

//get cross product of vector v1 * vector v2
//note: element 4 of result is always set to 0
function cross_product_vectors(v1, v2){
    let ret = []
    ret[0] = (v1[1] * v2[2]) - (v1[2] * v2[1])
    ret[1] = (v1[2] * v2[0]) - (v1[0] * v2[2])
    ret[2] = (v1[0] * v2[1]) - (v1[1] * v2[0])
    ret[3] = 0
    return ret
}

//=====================================================================
//matrix operations
//=====================================================================

//print matrix m1 to console
function print_matrix(m1){
    console.log(
        "[" + m1[0][0].toFixed(4) + " " + m1[1][0].toFixed(4) + " " + m1[2][0].toFixed(4) + " " + m1[3][0].toFixed(4) + " " + "]\n" +
        "[" + m1[0][1].toFixed(4) + " " + m1[1][1].toFixed(4) + " " + m1[2][1].toFixed(4) + " " + m1[3][1].toFixed(4) + " " + "]\n" + 
        "[" + m1[0][2].toFixed(4) + " " + m1[1][2].toFixed(4) + " " + m1[2][2].toFixed(4) + " " + m1[3][2].toFixed(4) + " " + "]\n" +
        "[" + m1[0][3].toFixed(4) + " " + m1[1][3].toFixed(4) + " " + m1[2][3].toFixed(4) + " " + m1[3][3].toFixed(4) + " " + "]\n"
    )
}

//return m1 multiplied by scalar s
function multiply_matrix_scalar(m1, s){
    let ret =   [   
                    [m1[0][0] * s, m1[0][1] * s, m1[0][2] * s, m1[0][3] * s], 
                    [m1[1][0] * s, m1[1][1] * s, m1[1][2] * s, m1[1][3] * s], 
                    [m1[2][0] * s, m1[2][1] * s, m1[2][2] * s, m1[2][3] * s], 
                    [m1[3][0] * s, m1[3][1] * s, m1[3][2] * s, m1[3][3] * s]
                ]

    return ret
}

//return result of adding matrix m1 to matrix m2
function add_matrices(m1, m2){
    let ret = []

    //col 1
    ret.push([  m1[0][0] + m2[0][0], 
                m1[0][1] + m2[0][1],
                m1[0][2] + m2[0][2],
                m1[0][3] + m2[0][3],
            ]) 
    //col 2
    ret.push([  m1[1][0] + m2[1][0], 
                m1[1][1] + m2[1][1],
                m1[1][2] + m2[1][2],
                m1[1][3] + m2[1][3],
            ]) 
    //col 3
    ret.push([  m1[2][0] + m2[2][0], 
                m1[2][1] + m2[2][1],
                m1[2][2] + m2[2][2],
                m1[2][3] + m2[2][3],
            ]) 
    //col 4
    ret.push([  m1[3][0] + m2[3][0], 
                m1[3][1] + m2[3][1],
                m1[3][2] + m2[3][2],
                m1[3][3] + m2[3][3],
            ]) 
    return ret
}

//return result of subtracting matrix m2 from matrix m1
function subtract_matrices(m1, m2){
    let ret = []

    //col 1
    ret.push([  m1[0][0] - m2[0][0], 
                m1[0][1] - m2[0][1],
                m1[0][2] - m2[0][2],
                m1[0][3] - m2[0][3],
            ]) 
    //col 2
    ret.push([  m1[1][0] - m2[1][0], 
                m1[1][1] - m2[1][1],
                m1[1][2] - m2[1][2],
                m1[1][3] - m2[1][3],
            ]) 
    //col 3
    ret.push([  m1[2][0] - m2[2][0], 
                m1[2][1] - m2[2][1],
                m1[2][2] - m2[2][2],
                m1[2][3] - m2[2][3],
            ]) 
    //col 4
    ret.push([  m1[3][0] - m2[3][0], 
                m1[3][1] - m2[3][1],
                m1[3][2] - m2[3][2],
                m1[3][3] - m2[3][3],
            ]) 
    return ret
}

//return result of multiplying matrix m1 by vector v1
//note: result is a vector
function multiply_matrix_vector(m1, v1){

    let ret = multiply_vector_scalar(m1[0], v1[0])
    ret = add_vectors(ret, multiply_vector_scalar(m1[1], v1[1]))
    ret = add_vectors(ret, multiply_vector_scalar(m1[2], v1[2]))
    ret = add_vectors(ret, multiply_vector_scalar(m1[3], v1[3]))

    return ret
}

//return result of multiplying matrix m1 by matrix m2
function multiply_matrix_matrix(m1, m2){

    let col1 = [
        (m1[0][0] * m2[0][0]) + (m1[1][0] * m2[0][1]) + (m1[2][0] * m2[0][2]) + (m1[3][0] * m2[0][3]),
        (m1[0][1] * m2[0][0]) + (m1[1][1] * m2[0][1]) + (m1[2][1] * m2[0][2]) + (m1[3][1] * m2[0][3]),
        (m1[0][2] * m2[0][0]) + (m1[1][2] * m2[0][1]) + (m1[2][2] * m2[0][2]) + (m1[3][2] * m2[0][3]),
        (m1[0][3] * m2[0][0]) + (m1[1][3] * m2[0][1]) + (m1[2][3] * m2[0][2]) + (m1[3][3] * m2[0][3])
    ]
    let col2 = [
        (m1[0][0] * m2[1][0]) + (m1[1][0] * m2[1][1]) + (m1[2][0] * m2[1][2]) + (m1[3][0] * m2[1][3]),
        (m1[0][1] * m2[1][0]) + (m1[1][1] * m2[1][1]) + (m1[2][1] * m2[1][2]) + (m1[3][1] * m2[1][3]),
        (m1[0][2] * m2[1][0]) + (m1[1][2] * m2[1][1]) + (m1[2][2] * m2[1][2]) + (m1[3][2] * m2[1][3]),
        (m1[0][3] * m2[1][0]) + (m1[1][3] * m2[1][1]) + (m1[2][3] * m2[1][2]) + (m1[3][3] * m2[1][3])
    ]
    let col3 = [
        (m1[0][0] * m2[2][0]) + (m1[1][0] * m2[2][1]) + (m1[2][0] * m2[2][2]) + (m1[3][0] * m2[2][3]),
        (m1[0][1] * m2[2][0]) + (m1[1][1] * m2[2][1]) + (m1[2][1] * m2[2][2]) + (m1[3][1] * m2[2][3]),
        (m1[0][2] * m2[2][0]) + (m1[1][2] * m2[2][1]) + (m1[2][2] * m2[2][2]) + (m1[3][2] * m2[2][3]),
        (m1[0][3] * m2[2][0]) + (m1[1][3] * m2[2][1]) + (m1[2][3] * m2[2][2]) + (m1[3][3] * m2[2][3])
    ]
    let col4 = [
        (m1[0][0] * m2[3][0]) + (m1[1][0] * m2[3][1]) + (m1[2][0] * m2[3][2]) + (m1[3][0] * m2[3][3]),
        (m1[0][1] * m2[3][0]) + (m1[1][1] * m2[3][1]) + (m1[2][1] * m2[3][2]) + (m1[3][1] * m2[3][3]),
        (m1[0][2] * m2[3][0]) + (m1[1][2] * m2[3][1]) + (m1[2][2] * m2[3][2]) + (m1[3][2] * m2[3][3]),
        (m1[0][3] * m2[3][0]) + (m1[1][3] * m2[3][1]) + (m1[2][3] * m2[3][2]) + (m1[3][3] * m2[3][3])
    ]

    return [col1, col2, col3, col4]
}

//return transpose of matrix m1
function transpose_matrix(m1){
    let ret = []
    ret.push([m1[0][0], m1[1][0], m1[2][0], m1[3][0]])
    ret.push([m1[0][1], m1[1][1], m1[2][1], m1[3][1]])
    ret.push([m1[0][2], m1[1][2], m1[2][2], m1[3][2]])
    ret.push([m1[0][3], m1[1][3], m1[2][3], m1[3][3]])
    return ret
}

//return inverse of matrix m1
function inverse_matrix(m1){
    let minor = _minor(m1)
    // print_matrix(minor)
    let cofactor = _cofactor(minor)
    // print_matrix(cofactor)
    let transpose = transpose_matrix(cofactor)
    let det = minor[0][0]*m1[0][0] - minor[0][1]*m1[0][1] + minor[0][2]*m1[0][2] - minor[0][3]*m1[0][3]
    if(det == 0){
        return null
    }
    return multiply_matrix_scalar(transpose, 1/det)
}

//helper functions for inverse
function _minor(m1){
    let ret =   [[], [], [], []]

    //go through each position of original matrix
    for(let m = 0; m < 16; m++){
        let c = m%4             //column
        let r = Math.floor(m/4) //row
        let det = []
        
        //create smaller matrix by removing row and column
        for(let row = 0; row < 4; row++){

            if(row != r){
                newcol = []

                for(let col = 0; col < 4; col++){
                    if(col != c && row != r){
                        newcol.push(m1[col][row])
                    }
                }

                det.push(newcol)
            }
        }

        //calculate determinate of smaller matrix
        ret[c][r] = _determinant3(det)
    }

    return ret
}
function _cofactor(m1){

    let ret = []

    ret.push([m1[0][0], m1[0][1] * -1, m1[0][2], m1[0][3] * -1]) //col 1
    ret.push([m1[1][0] * -1, m1[1][1], m1[1][2] * -1, m1[1][3]]) //col 2
    ret.push([m1[2][0], m1[2][1] * -1, m1[2][2], m1[2][3] * -1]) //col 3
    ret.push([m1[3][0] * -1, m1[3][1], m1[3][2] * -1, m1[3][3]]) //col 4

    return ret
}
function _determinant3(m1){

    let result = 
           ((m1[0][0] * m1[1][1] * m1[2][2]) + 
            (m1[1][0] * m1[2][1] * m1[0][2]) + 
            (m1[2][0] * m1[0][1] * m1[1][2]) - 
            (m1[0][2] * m1[1][1] * m1[2][0]) - 
            (m1[0][0] * m1[1][2] * m1[2][1]) - 
            (m1[0][1] * m1[1][0] * m1[2][2]))
    return result
}

//=====================================================================
//Lab 4
//=====================================================================


// returns 4x4 translation matrix 
function translation_matrix(ax, ay, az){
    
    let ret =   [   
                    [1, 0, 0, 0], 
                    [0, 1, 0, 0], 
                    [0, 0, 1, 0], 
                    [ax, ay, az, 1]
                ]

    return ret

}

// returns 4x4 scaling matrix 
function scaling_matrix(bx, by, bz){
    
    let ret =   [   
                    [bx, 0, 0, 0], 
                    [0, by, 0, 0], 
                    [0, 0, bz, 0], 
                    [0, 0, 0, 1]
                ]

    return ret
}

// returns 4x4 x rotation matrix for theta in degrees
function rotation_matrix_x(theta){
    
    //convert to radians
    theta = theta * Math.PI/180
    
    let ret =   [   
                    [1, 0, 0, 0], 
                    [0, Math.cos(theta), Math.sin(theta), 0], 
                    [0, -Math.sin(theta), Math.cos(theta), 0], 
                    [0, 0, 0, 1]
                ]

    return ret
}

// returns 4x4 y rotation matrix for theta in degrees
function rotation_matrix_y(theta){
    
    //convert to radians
    theta = theta * Math.PI/180
    
    let ret =   [   
                    [Math.cos(theta), 0, Math.sin(theta), 0], 
                    [0, 1, 0, 0], 
                    [-Math.sin(theta), 0, Math.cos(theta), 0], 
                    [0, 0, 0, 1]
                ]

    return ret
}

// returns 4x4 z rotation matrix for theta in degrees
function rotation_matrix_z(theta){
    
    //convert to radians
    theta = theta * Math.PI/180
    
    let ret =   [   
                    [Math.cos(theta), Math.sin(theta), 0, 0], 
                    [-Math.sin(theta), Math.cos(theta), 0, 0], 
                    [0, 0, 1, 0], 
                    [0, 0, 0, 1]
                ]

    return ret
}