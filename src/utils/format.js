// 格式化时间：2021-05-01
export function formatTime (date, precise = false) {
  if (precise) {
    return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')} ${`${date.getHours()}`.padStart(2, 0)}:${`${date.getMinutes()}`.padStart(2, 0)}:00`
  }
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`
}

// 格式化金额：
/*
  100000.0000 => 100000
  1234567.0000 => 12.35 万
  123456789.0000 => 1.23 亿
*/
export function formatMoney (value, point = 2) {
  const str = value.split('.')[0]
  if (str.length < 6) {
    // 小于6位直接返回
    return str
  } else if (str.length >= 6 && str.length <= 8) {
    // 6-8位以万为单位
    return `${(parseFloat(value) / 10000).toFixed(point)}万`
  } else {
    return `${(parseFloat(value) / 100000000).toFixed(point)}亿`
  }
}
