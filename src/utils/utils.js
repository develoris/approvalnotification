const asyncHandlerWrap = fn => (...args) => fn(...args).catch(args[2])
class Utils {

}
module.exports = { asyncHandlerWrap, Utils };