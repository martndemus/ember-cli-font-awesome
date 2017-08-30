/* eslint-env node */
"use strict";

/*
  ```hbs
  {{! purely static }}
  1. {{fa-icon icon="credit-card"}}
  2. {{fa-icon icon="credit-card" fixedWidth=true}}
  3. {{fa-icon "credit-card"}}
  4. {{fa-icon "credit-card" ariaLabel="Select card"}}
  5. {{fa-icon "credit-card" ariaHidden=false}}
  6. {{fa-icon "credit-card" class="custom-class"}}
  7. {{fa-icon "credit-card" tagName="span"}}
  8. {{fa-icon "credit-card" size="lg"}}
  9. {{fa-icon "credit-card" size=2}}
  10. {{fa-icon "credit-card" pulse=true}}
  11. {{fa-icon "credit-card" rotate=90}}
  12. {{fa-icon "credit-card" rotate="90"}}
  13. {{fa-icon "credit-card" flip="horizontal"}}
  14. {{fa-icon "credit-card" stack=2}}
  15. {{fa-icon "credit-card" stack="2"}}
  16. {{fa-icon "credit-card" stack="2x"}}
  17. {{fa-icon "credit-card" inverse=true}}
  18. {{fa-icon "credit-card" title="pay now"}}
  19. {{fa-icon "credit-card" color="#ff0000"}}
  20. {{fa-icon "credit-card" border=true}}
  21. {{fa-icon "credit-card" pull="left"}}
  22. {{fa-icon "credit-card" pull="right"}}

  {{! dynamic }}
  30. {{fa-icon icon=boundValue}}
  31. {{fa-icon icon=boundValue fixedWidth=true}}}
  32. {{fa-icon icon=boundValue pull=direction}}}
  ```

  becomes

  ```hbs
  {{! purely static }}
  1. <i aria-hidden="true" class="fa fa-credit-card"></i>
  2. <i aria-hidden="true" class="fa fa-credit-card fa-fw"></i>
  3. <i aria-hidden="true" class="fa fa-credit-card"></i>
  4. <i aria-hidden="true" aria-label="Select card" class="fa fa-credit-card"></i>
  5. <i class="fa fa-credit-card"></i>
  6. <i aria-hidden="true" class="fa fa-credit-card custom-class"></i>
  7. <span aria-hidden="true" class="fa fa-credit-card"></span>
  8. <i aria-hidden="true" class="fa fa-credit-card fa-lg"></i>
  9. <i aria-hidden="true" class="fa fa-credit-card fa-2x"></i>
  10. <i aria-hidden="true" class="fa fa-credit-card fa-pulse"></i>
  11. <i aria-hidden="true" class="fa fa-credit-card fa-rotate-90"></i>
  12. <i aria-hidden="true" class="fa fa-credit-card fa-rotate-90"></i>
  13. <i aria-hidden="true" class="fa fa-credit-card fa-flip-horizontal"></i>
  14. <i aria-hidden="true" class="fa fa-credit-card fa-stack-2x"></i>
  15. <i aria-hidden="true" class="fa fa-credit-card fa-stack-2x"></i>
  16. <i aria-hidden="true" class="fa fa-credit-card fa-stack-2x"></i>
  17. <i aria-hidden="true" class="fa fa-credit-card fa-inverse"></i>
  18. <i aria-hidden="true" class="fa fa-credit-card" title="pay now"></i>
  19. <i aria-hidden="true" class="fa fa-credit-card" style="color:#ff0000"></i>
  20. <i aria-hidden="true" class="fa fa-credit-card fa-border"></i>
  21. <i aria-hidden="true" class="fa fa-credit-card fa-pull-left"></i>
  22. <i aria-hidden="true" class="fa fa-credit-card fa-pull-right"></i>

  {{! dynamic }}
  30. <i aria-hidden="true" class="fa {{if boundValue (concat 'fa-' boundValue)}}"></i>
  31. <i aria-hidden="true" class="fa {{if boundValue (concat 'fa-' boundValue)}} fa-fw"></i>
  31. <i aria-hidden="true" class="fa {{if boundValue (concat 'fa-' boundValue)}} fa-pull-{{direction}}"></i>
  ```
*/
const appendToContent = require('ember-ast-helpers/lib/helpers/append-to-content');
const buildAttr = require('ember-ast-helpers/lib/helpers/build-attr');

function buildConditional(b, ...conditionArgs) {
  let args = conditionArgs.map((p) => typeof p === 'string' ? b.string(p) : p);
  return b.mustache(b.path('if'), args);
}

function buildConcatIfPresent(b, path, concatArgs) {
  let args = concatArgs.map((p) => typeof p === 'string' ? b.string(p) : p);
  return buildConditional(b, path, b.sexpr(b.path('concat'), args));
}
function isDynamic(node) {
  return node.type !== undefined && node.type === 'PathExpression' || node.type === 'SubExpression';
}
class AstTransform {
  constructor() {
    this.syntax = null;
  }

  transform(ast) {
    let b = this.syntax.builders;
    let traverse = this.syntax.traverse;

    traverse(ast, {
      BlockStatement: (node) => {
        if (node.path.original === 'fa-list') {
          return this.transformFaListBlock(b, traverse, node);
        } else if (node.path.original === 'fa-stack') {
          return this.transformFaStackBlock(b, traverse, node);
        }
      },

      MustacheStatement: (node) => {
        if (node.path.original === 'fa-icon') {
          return this.transformFaIcon(b, node);
        } else if (node.path.original === 'fa-list') {
          return this.buildFaList(b, node);
        } else if (node.path.original === 'fa-stack') {
          return this.buildFaStack(b, node);
        }
      }
    });

    return ast;
  }

  // Private functions
  buildFaList(b, node) {
    let classContent = b.text('fa-ul');
    node.hash.pairs.forEach(function(pair) {
      switch(pair.key) {
        case 'class':
        classContent = appendToContent(b, pair.value, classContent);
        break;
      }
    });
    let children = node.type === 'BlockStatement' ? node.program.body : [];
    return b.element('ul', [b.attr('class', classContent)], [], children);
  }

  buildFaStack(b, node) {
    let classContent = b.text('fa-stack');
    node.hash.pairs.forEach(function(pair) {
      switch(pair.key) {
        case 'class':
          classContent = appendToContent(b, pair.value, classContent);
          break;
        case 'size':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, buildConcatIfPresent(b, pair.value, ['fa-', pair.value, 'x']), classContent);
          } else if (pair.value.type === 'NumericLiteral') {
            classContent = appendToContent(b, `fa-${pair.value.value}x`, classContent);
          } else if (isNaN(parseInt(pair.value.value), 10)) {
            classContent = appendToContent(b, `fa-${pair.value.value}`, classContent);
          } else {
            classContent = appendToContent(b, `fa-${pair.value.value}x`, classContent);
          }
          break;
      }
    });
    let children = node.type === 'BlockStatement' ? node.program.body : [];
    return b.element('span', [b.attr('class', classContent)], [], children);
  }

  transformFaListBlock(b, traverse, node) {
    let listAlias = node.program.blockParams[0];

    traverse(node.program, {
      MustacheStatement: (node) => {
        if (node.path.original === `${listAlias}.fa-icon`) {
          return this.transformFaIcon(b, node, { listItem: true });
        }
      }
    });

    return this.buildFaList(b, node);
  }

  transformFaStackBlock(b, traverse, node) {
    let listAlias = node.program.blockParams[0];

    traverse(node.program, {
      MustacheStatement: (node) => {
        if (node.path.original === `${listAlias}.stack-1x`) {
          return this.transformFaIcon(b, node, { stack: b.string('1') });
        } else if (node.path.original === `${listAlias}.stack-2x`) {
          return this.transformFaIcon(b, node, { stack: b.string('2') });
        }
      }
    });

    return this.buildFaStack(b, node);
  }

  transformFaIcon(b, node, { tagName = 'i', listItem = false, stack = undefined } = {}) {
    let attrs = [];
    let iconValue = node.params[0];
    let classContent = b.text('fa');
    let ariaHidden = true;
    let ariaLabel, title;
    node.hash.pairs.forEach(function(pair) {
      switch(pair.key) {
        case 'tagName':
          tagName = pair.value.value;
          break;
        case 'ariaHidden':
          ariaHidden = pair.value;
          break;
        case 'class':
          classContent = appendToContent(b, pair.value, classContent);
          break;
        case 'ariaLabel':
          ariaLabel = pair.value;
          break;
        case 'title':
          title = pair.value;
          break;
        case 'icon':
          iconValue = pair.value;
          break;
        case 'fixedWidth':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, buildConditional(b, pair.value, 'fa-fw'), classContent);
          } else if (pair.value.value) {
            classContent = appendToContent(b, 'fa-fw', classContent);
          }
          break;
        case 'listItem':
          listItem = pair.value;
          break;
        case 'pulse':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, buildConditional(b, pair.value, 'fa-pulse'), classContent);
          } else if (pair.value.value) {
            classContent = appendToContent(b, 'fa-pulse', classContent);
          }
          break;
        case 'inverse':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, buildConditional(b, pair.value, 'fa-inverse'), classContent);
          } else if (pair.value.value) {
            classContent = appendToContent(b, 'fa-inverse', classContent);
          }
          break;
        case 'border':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, buildConditional(b, pair.value, 'fa-border'), classContent);
          } else if (pair.value.value) {
            classContent = appendToContent(b, 'fa-border', classContent);
          }
          break;
        case 'spin':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, buildConditional(b, pair.value, 'fa-spin'), classContent);
          } else if (pair.value.value) {
            classContent = appendToContent(b, 'fa-spin', classContent);
          }
          break;
        case 'size':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, buildConcatIfPresent(b, pair.value, ['fa-', pair.value, 'x']), classContent);
          } else if (pair.value.type === 'NumericLiteral') {
            classContent = appendToContent(b, `fa-${pair.value.value}x`, classContent);
          } else if (isNaN(parseInt(pair.value.value), 10)) {
            classContent = appendToContent(b, `fa-${pair.value.value}`, classContent);
          } else {
            classContent = appendToContent(b, `fa-${pair.value.value}x`, classContent);
          }
          break;
        case 'pull':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, 'fa-pull-', classContent);  // This is going to be wrong
            classContent = appendToContent(b, pair.value, classContent, { prependSpace: false });  // This is going to be wrong
          } else {
            classContent = appendToContent(b, `fa-pull-${pair.value.value}`, classContent);
          }
          break;
        case 'flip':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, 'fa-flip-', classContent);  // This is going to be wrong
            classContent = appendToContent(b, pair.value, classContent, { prependSpace: false });  // This is going to be wrong
          } else {
            classContent = appendToContent(b, `fa-flip-${pair.value.value}`, classContent);
          }
          break;
        case 'rotate':
          if (isDynamic(pair.value)) {
            classContent = appendToContent(b, 'fa-rotate-', classContent);  // This is going to be wrong
            classContent = appendToContent(b, pair.value, classContent, { prependSpace: false });  // This is going to be wrong
          } else {
            classContent = appendToContent(b, `fa-rotate-${pair.value.value}`, classContent);
          }
          break;
        case 'color':
          if (isDynamic(pair.value)) {
            let content = buildConcatIfPresent(b, pair.value, ['color:', pair.value]);
            attrs.push(buildAttr(b, 'style', content));
          } else {
            attrs.push(buildAttr(b, 'style', b.text(`color:${pair.value.value}`)));
          }
          break;
        case 'stack':
          stack = pair.value;
          break;
        default:
          console.warn(`Found unknown hash option named "${pair.key}"`);
          // throw new Error(`Found unknown hash option named "${pair.key}"`);
      }
    });
    if (ariaHidden === true || ariaHidden.value === true) {
      attrs.push(buildAttr(b, 'aria-hidden', b.text('true')));
    }
    if (ariaLabel) {
      attrs.push(buildAttr(b, 'aria-label', ariaLabel));
    }
    if (title) {
      attrs.push(buildAttr(b, 'title', title));
    }
    if (iconValue) {
      if (isDynamic(iconValue)) {
        classContent = appendToContent(b, buildConcatIfPresent(b, iconValue, ['fa-', iconValue]), classContent);
        this.addon.fontAwesomeUsage.usedIconsUnknown = true;
      } else {
        if (!this.addon.fontAwesomeUsage.usedIconsUnknown) {
          this.addon.fontAwesomeUsage.usedIcons.add(iconValue.value);
        }
        classContent = appendToContent(b, `fa-${iconValue.value}`, classContent);
      }
    }
    if (listItem) {
      if (isDynamic(listItem)) {
        classContent = appendToContent(b, buildConditional(b, listItem, 'fa-li'), classContent);
      } else {
        classContent = appendToContent(b, 'fa-li', classContent);
      }
    }
    if (stack) {
      if (isDynamic(iconValue)) {
        classContent = appendToContent(b, 'fa-stack-', classContent);
        classContent = appendToContent(b, stack, classContent, { prependSpace: false });
        classContent = appendToContent(b, 'x', classContent, { prependSpace: false });
      } else if (stack.value[stack.value.length - 1] !== 'x') {
        classContent = appendToContent(b, `fa-stack-${stack.value}x`, classContent);
      } else {
        classContent = appendToContent(b, `fa-stack-${stack.value}`, classContent);
      }
    }
    attrs.push(buildAttr(b, 'class', classContent));
    return b.element(tagName, attrs)
  }
}

function buildAstTransform(addon) {
  return class EmberFontAwesomeAstTransform extends AstTransform {
    constructor(options) {
      super(options);
      this.addon = addon;
    }
  }
}

module.exports = buildAstTransform;