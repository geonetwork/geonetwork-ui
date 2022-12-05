module.exports = {
  process(src, path) {
    return {
      code: 'module.exports = `' + src.replace(/`/g, '\\`') + '`',
    }
  },
}
