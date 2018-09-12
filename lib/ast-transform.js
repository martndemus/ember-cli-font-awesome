/* eslint-env node */
"use strict";

const FaIconComponent = require('./build-time-components/fa-icon');
const FaListComponent = require('./build-time-components/fa-list');
const FaStackComponent = require('./build-time-components/fa-stack');

class EmberFontAwesomeAstTransform {
  constructor(options) {
    this.options = options;
  }

  transform(ast) {
    this.syntax.traverse(ast, {
      BlockStatement: (node) => {
        return this._applyTransform(node);
      },
      MustacheStatement: (node) => {
        return this._applyTransform(node);
      }
    });

    return ast;
  }

  _applyTransform(node) {
    if (node.path.original === 'fa-icon') {
      return new FaIconComponent(node, { transform: this }).toElement();
    } else if (node.path.original === 'fa-list') {
      return (new FaListComponent(node, { transform: this })).toElement();
    } else if (node.path.original === 'fa-stack') {
      return (new FaStackComponent(node, { transform: this })).toElement();
    }
  }
}

module.exports = EmberFontAwesomeAstTransform;