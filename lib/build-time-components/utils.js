/* eslint-env node */
"use strict";

function buildConditional(b, conditionArgs) {
  let args = conditionArgs.map((p) => typeof p === 'string' ? b.string(p) : p);
  return b.mustache(b.path('if'), args);
}

// Exported functions
function buildConcatIfPresent(b, path, concatArgs) {
  let args = concatArgs.map((p) => typeof p === 'string' ? b.string(p) : p);
  return buildConditional(b, [path, b.sexpr(b.path('concat'), args)]);
}

function isDynamic(node) {
  return node.type !== undefined && node.type === 'PathExpression' || node.type === 'SubExpression';
}

function interpolateSize(component) {
  if (component.invocationAttrs.size) {
    if (isDynamic(component.invocationAttrs.size)) {
      return buildConcatIfPresent(component._syntax.builders, component.invocationAttrs.size, ['fa-', component.invocationAttrs.size, 'x']);
    } else if (component.invocationAttrs.size.type === 'NumericLiteral') {
      return `fa-${component.invocationAttrs.size.value}x`;
    } else if (isNaN(parseInt(component.invocationAttrs.size.value), 10)) {
      return `fa-${component.invocationAttrs.size.value}`;
    } else {
      return `fa-${component.invocationAttrs.size.value}x`;
    }
  }
}

module.exports = {
  interpolateSize,
  buildConcatIfPresent,
  isDynamic
}
