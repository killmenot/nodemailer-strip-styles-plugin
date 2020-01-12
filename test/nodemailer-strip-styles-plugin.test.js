'use strict';

const expect = require('chai').expect;
const stripStyles = require('../').stripStyles;

describe('trap', () => {
  let plugin, mail, options;

  it('should stop processing when no mail', (done) => {
    plugin = stripStyles();

    plugin(mail, () => {
      done();
    });
  });

  it('should stop processing when no mail.data', (done) => {
    mail = {};

    plugin = stripStyles();

    plugin(mail, () => {
      done();
    });
  });

  it('should stop processing when no mail.data.html', (done) => {
    mail = {
      data: {}
    };

    plugin = stripStyles();

    plugin(mail, () => {
      done();
    });
  });

  it('should replace style tag (single)', (done) => {
    mail = {
      data: {
        html: `<html><head><style>.test{color:'red'}</style></head><body><h1>Hello World</h1></body>`,
      }
    };

    plugin = stripStyles(options);

    plugin(mail, () => {
      expect(mail.data.html).to.equal('<html><head></head><body><h1>Hello World</h1></body>');
      done();
    });
  });

  it('should replace style tag (type=text/css)', (done) => {
    mail = {
      data: {
        html: `<html><head><style type="text/css">.test{color:'red'}</style></head><body><h1>Hello World</h1></body>`,
      }
    };

    plugin = stripStyles(options);

    plugin(mail, () => {
      expect(mail.data.html).to.equal('<html><head></head><body><h1>Hello World</h1></body>');
      done();
    });
  });

  it('should replace style tag (multiple)', (done) => {
    mail = {
      data: {
        html: `<html><head><style>.test1{color:'red'}</style><style>.test2{color:'blue'}</style></head><body><h1>Hello World</h1></body>`,
      }
    };

    plugin = stripStyles(options);

    plugin(mail, () => {
      expect(mail.data.html).to.equal('<html><head></head><body><h1>Hello World</h1></body>');
      done();
    });
  });
  
  it('should replace style tag (mixed)', (done) => {
    mail = {
      data: {
        html: `<html><head><style type="text/css">.test1{color:'red'}</style><style>.test2{color:'blue'}</style></head><body><h1>Hello World</h1></body>`,
      }
    };

    plugin = stripStyles(options);

    plugin(mail, () => {
      expect(mail.data.html).to.equal('<html><head></head><body><h1>Hello World</h1></body>');
      done();
    });
  });
});
