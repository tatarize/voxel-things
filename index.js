
module.exports = function (opts) {
    if (!opts) opts = {};
    if (!opts.object) return [];

    if (!opts.position) opts.position = {
        x:0,
        y:0,
        z:0
    };
        
    this.replace = function(thing,materialsmap) {
        thing.forEach(function(geometry) {
            geometry.map(function(block) {
                if (block[3]) {
                    if (block[3] != 0) { //air
                        block[3] = materialsmap[block[3] -1];
                    }
                }
            })
        })
    }
    
    var pos = [];
    pos[0] = opts.position.x;
    pos[1] = opts.position.y;
    pos[2] = opts.position.z;
    pos[3] = 1;
    
    var lsys = require('lsys');
    var turtle = require('turtle3d');
    var thing = [];
    
        
    var vertical = function() {
        if (!opts.height) opts.height = 16;
        var geometry = []
        for (var y = 0; y < opts.height - 1; y++) {
            pos[1]++;
            geometry.push([pos[0],pos[1],pos[2],pos[3]]);
        }
        thing.push(geometry);
    }
    
    var sphere = function() {
        if (!opts.radius) opts.radius = 4;
        var radius = opts.radius;
        var boundcheck = function(x,y,z,r) {
            return x*x + y*y + z*z <= r*r;
        }
        var x,y,z;
        var geometry = [];
        for (var xstep = -radius; xstep <= radius; xstep++) {
            for (var ystep = -radius; ystep <= radius; ystep++) {
                for (var zstep = -radius; zstep <= radius; zstep++) {
                    if (boundcheck(xstep,ystep,zstep, radius)) {
                        x = pos[0] + xstep, 
                        y = pos[1] + ystep, 
                        z = pos[2] + zstep,
                        geometry.push([x,y,z,pos[3]]);
                    }
                }
            }
        }
        thing.push(geometry);
    }
    
    var tree = function() {
        vertical();
        pos[3] = 2; //different material for leaves.
        sphere();
    }

    var flowsnake = function() {
        return fractal( {
            axiom: "L",
            rules: {
                "L": "L+R++R-L--LL-R+", 
                "R": "-L+RR++R+L--L-R"
            },
            angle: 60,
            iterations: 3,
            finalizer: {
                "L": "2F1FF", //F originally.
                "R": "2F1FF" //F originally.
            },
            vector: [1,0,0]
        })
    }
          
             
    var hibert = function() {
        return fractal( {
            axiom: "X",
            rules: {
                "X": "^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->"
            },
            iterations: 3,
            finalizer: {
                "F":"2F1FF"
            }
        } );
    }
    
    var fractal = function(options) {
        if (!options) options = {};
        if (!options.axiom) options.axiom = F;
        if (!options.rules) options.rules = {
            "F": "FF"
        };
        if (!options.angle) options.angle = 90;
        if (!options.iterations) options.iterations = 1;
        var lsystem = new lsys(options.axiom,options.rules).iterate(options.iterations);
        if (options.finalizer) lsystem.apply(options.finalizer);
        var turtlecoords = turtle(lsystem.string(), options.angle * (Math.PI / 180),options.vector);
        
        var xoffset = pos[0];
        var yoffset = pos[1];
        var zoffset = pos[2];
        
        for (var j = 0; j < turtlecoords.length; j++) {
            var geometry = []
            for (var k = 0; k < turtlecoords[j].length; k++) {
                pos[0] = xoffset + turtlecoords[j][k][0];
                pos[1] = yoffset + turtlecoords[j][k][1];
                pos[2] = zoffset + turtlecoords[j][k][2];
                if (turtlecoords[j][k][3]) pos[3] = turtlecoords[j][k][3];
                geometry.push([pos[0],pos[1],pos[2],pos[3]]);
            }
            thing.push(geometry)
        }
    }
    
    var create;
    if (opts.object) {
        switch (opts.object) {
            case 'tree':
                create = tree;
                break;
            case 'hibert':
                create = hibert;
                break;
            case 'flowsnake':
                create = flowsnake;
                break;
            case 'vertical':
                create = vertical;
                break;
            case 'sphere':
                create = sphere;
                break;
            case 'fractal':
                create = fractal;
                break;
            default:
                return;
        }
        create(opts);
    }
    else if (opts.generate) {
        thing = opts.generate();
    }
    
    if (opts.material) {
        replace(thing,opts.material);
    }
    return thing;

}
