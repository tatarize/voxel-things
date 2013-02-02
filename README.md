voxel-things
============

Collection of things to be added.


Example:

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
