voxel-things
============

Collection of things to be added.


Example:

    var putter = require('voxel-put-something')(game);
    var creator = require('voxel-things');

    var castle = creator({
        object: "fractal",
        material: [6,7,8],
        axiom: "X",
        rules: {
            "X":"BTWTWTWT",
            "W":"SSSSSSSS",
            "S":"FCFD",
            "B":"SSSSFYFYSSSS",
            "Y":"[^GGGGGFFFFFFFF]",
            "C":"[^FFFFFFFFFFFFF]",
            "D":"[^FFFFFFFFFFFFFF]",
            "M":"[^FFFFFFFFFFFFFFFFF-FF+FF]",
            "T": "-FM+FMFM+FMFM+FM[FM+FM]-"
        },
        iterations: 5,
        vector: [-1,0,0]
    });
    putter.put(castle);


Alternatively you can add complexity to the system by sheer will.

    var castle = creator({
        object: "fractal",
        material: [6,7],
        axiom: "<X",
        rules: {
            "X":"WTWTOTWT",
        
            "W":"JJJJJJ",
            "O":"JJUUJJ",
            "U":"nnnnnn",
            "n":"[^ggYA][-F[^ggY]F[^ggY]F[+^ggY>>A]]F",
            "J":"SSSSSS",
            "Y": "FFF",
            "g": "GGG",
            "S":"[CA][-F[C]F[C]F[+C>>A]]F",
            "A":"Y+F-F+F-2F1", 
            "C":"^YYY", 
        
            "T":"+GGG[M]GG-GGGG+",
            "M": "^[&R]FPPPQPPB", 
            "P": "[&R]F[&R]F[&R]F",
            "R": "EH EH EH EH",
            "H": "YYY", 
            "N": "YGGGY",
            "E": "-F+F-",
            "L": "EN EH EH EN",
            "Q": "[&L]F[&L]F[&L]F",
            "B": "[&KDIV]",
            "Z": "E+",
            "K": "+G- ZEH ZEH ZEH ZEH^G&",
            "D": "+G- ZZEH ZZEH ZZEH ZZEH^G&",
            "I": "+G- ZZZEH ZZZEH ZZZEH ZZZEH^G&",
            "V": "+G- ZZZZEH ZZZZEH ZZZZEH ZZZZEH^G&"
        },
        iterations: 10
        });
        putter.put(castle);


But, for the best results things which you can describe recursively or which have low amounts of information. Where one thing is just like another like a mountain or a tree.



    var mountain = creator({
        object: "fractal",
        material: [6,7,8],
        axiom: "<D",
        rules: {
            "D": "-G+ Z-F Z-F Z-F Z-F ^G& D",
            "Z": "-F+FZ"
        },
        iterations: 20
    })
    putter.put(mountain);
    
    
So the more exciting and awe inspiring it is, the better.
