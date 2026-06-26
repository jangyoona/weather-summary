const BASE_URL = '/api'

const GEO_ERRORS = {
  1: '위치 접근 권한이 거부되었습니다',
  2: '위치 정보를 가져올 수 없습니다',
  3: '위치 요청 시간이 초과되었습니다',
}

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('이 브라우저는 위치 정보를 지원하지 않습니다'))
      return
    }
    navigator.geolocation.getCurrentPosition(resolve, (err) => {
      reject(new Error(GEO_ERRORS[err.code] ?? '위치를 가져오는 중 오류가 발생했습니다'))
    }, { timeout: 10000 })
  })
}

async function postWeather(body) {
  const res = await fetch(`${BASE_URL}/gemini/weather`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.status === 404) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail ?? '주소를 찾을 수 없습니다.')
  } else if ((!res.ok)) {
    const err = await res.json().catch(() => ({}))
    console.error('server error :', res.status, err)
    throw new Error(err.detail ?? `오류가 발생했습니다. (${res.status})`)
  }
  return res.json()
}

export async function fetchWeatherSummaryByAddress(address) {
  const data = await postWeather({ address, latitude: null, longitude: null })
  return { description: data.description, weather: data.weather, address: data.address ?? address }
}

export async function fetchWeatherSummaryByLocation(latitude, longitude) {
  const data = await postWeather({ address: null, latitude, longitude })
  return { description: data.description, weather: data.weather, address: data.address ?? '현재 위치' }
}
