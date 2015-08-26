var osjs = process.env.COVERAGE
           ? require('../coverage/os.js')
           : require('../bin/os.js');

var os = require('os');
var should = require('should');

if (os.platform() == 'darwin') {
  describe('require(osjs)', function(){

    it('should be object', function(){
      osjs.should.be.Object;
      osjs.should.not.be.Array;
      osjs.should.not.be.String;
      osjs.should.not.be.Number;
      osjs.should.not.be.Boolean;
    })

    it('should have os', function(){
      osjs.should.have.property('os').and.be.String;
    })

    it('should have version', function(){
      osjs.should.have.property('version').and.be.Object;
      osjs.version.should.have.property('major').and.be.Number;
      osjs.version.should.have.property('minor').and.be.Number;
      osjs.version.should.have.property('codename').and.be.String;
    })

    it('should have arch', function(){
      osjs.should.have.property('arch').and.be.Number;
    })
  })

  if (os.platform() == 'darwin') {
    describe('mac -', function(){
      it('os name', function(){
        osjs.should.have.property('os').and.equal('OS X');
      })

      var current = os.release().split('.');
      it('current major version', function(){
        osjs.should.have.property('version').and.be.Object;
        osjs.version.should.have.property('major').and.equal(10);
      })

      it('current minor version', function(){
        osjs.should.have.property('version').and.be.Object;
        osjs.version.should.have.property('minor').and.be.Number;

        switch(current[0]) {
          case '5': osjs.version.minor.should.equal(1); break;
          case '6': osjs.version.minor.should.equal(2); break;
          case '7': osjs.version.minor.should.equal(3); break;
          case '8': osjs.version.minor.should.equal(4); break;
          case '9': osjs.version.minor.should.equal(5); break;
          case '10': osjs.version.minor.should.equal(6); break;
          case '11': osjs.version.minor.should.equal(7); break;
          case '12': osjs.version.minor.should.equal(8); break;
          case '13': osjs.version.minor.should.equal(9); break;
          case '14': osjs.version.minor.should.equal(10); break;
          case '15': osjs.version.minor.should.equal(11); break;
        }
      })

      if('current os codename', function(){
        osjs.should.have.property('version').and.be.Object;
        osjs.version.should.have.property('codename').and.be.String;

        switch(current[0]) {
          case '5': osjs.version.codename.should.equal('Puma'); break;
          case '6': osjs.version.codename.should.equal('Jaguar'); break;
          case '7': osjs.version.codename.should.equal('Panther'); break;
          case '8': osjs.version.codename.should.equal('Tiger'); break;
          case '9': osjs.version.codename.should.equal('Leopard'); break;
          case '10': osjs.version.codename.should.equal('Snow Leopard'); break;
          case '11': osjs.version.codename.should.equal('Lion'); break;
          case '12': osjs.version.codename.should.equal('Mountain Lion'); break;
          case '13': osjs.version.codename.should.equal('Mavericks'); break;
          case '14': osjs.version.codename.should.equal('Yosemite'); break;
          case '15': osjs.version.codename.should.equal('El Capitan'); break;
        }
      })

      it('current architecture', function(){
        osjs.should.have.property('arch').and.be.Number;
        if (os.arch() == 'x32') {
          osjs.arch.should.equal(32);
        }
        else {
          osjs.arch.should.equal(64);
        }
      })
    })
  }
 }

 console.log(osjs.os, osjs.version.codename, String(osjs.version), 'x'+osjs.arch);