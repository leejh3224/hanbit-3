export const currency = number => `${new Intl.NumberFormat().format(number)}원`

// 날짜 표시 형식
const dateOptions = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false,
  timeZone: 'Asia/Seoul',
}

export const date = date => new Intl.DateTimeFormat('ko-KR', dateOptions).format(new Date(date))