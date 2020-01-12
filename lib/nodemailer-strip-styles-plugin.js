'use strict';

function stripStyles() {
  return (mail, callback) => {
    if (!mail || !mail.data || !mail.data.html) {
      return callback();
    }

    mail.data.html = mail.data.html.replace(/<style([\s\S]+?)<\/style>/g, '');

    callback();
  };
}

module.exports = stripStyles;
