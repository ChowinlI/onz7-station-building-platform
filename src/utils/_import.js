/**
 * webpack动态加载模板
 * @param {*} file 文件路径
 */
module.exports = file => () => {
    return import ('@/' + file)
}