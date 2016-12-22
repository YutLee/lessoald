class Custompromise extends Promise {

  finally(callback) {
    let P = this.constructor;
    return this.then(
      value  => P.resolve(callback(value)).then(() => value),
      reason => P.resolve(callback(reason)).then(() => { throw reason })
    );
  }

}

module.exports = Custompromise;