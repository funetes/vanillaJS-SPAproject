// For load validator and require in test file.

(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.validator = factory();
  }
}(this, function () {
  // implement code here
  const validator = {
    isNumber(a) {
      return typeof a === 'number'
    }
  };

  return validator
}));
