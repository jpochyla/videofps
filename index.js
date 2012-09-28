exports.fromFile = fpsFromFile;

function fpsFromFile(file, cb){
  readBytes(file, 0, 4, function(bytes){
    if (bytes !== 'RIFF') {
      cb(null);
    } else {
      readBytes(file, 32, 36, function(bytes){
        var mpf = binToDword(bytes);
        var fps = 1000000 / mpf;
        cb(fps);
      });
    }
  });
}

function binToDword(bin){
  var dword = 0;
  dword |= bin.charCodeAt(0) << 0;
  dword |= bin.charCodeAt(1) << 8;
  dword |= bin.charCodeAt(2) << 16;
  dword |= bin.charCodeAt(3) << 24;
  return dword;
}

function readBytes(file, start, end, cb){
  var reader = new FileReader();
  var slice = file.webkitSlice || file.mozSlice || file.slice;
  var blob = slice.call(file, start, end);
  reader.onload = function(ev){
    cb(ev.target.result);
  };
  reader.readAsBinaryString(blob);
}
