<template>
  <div class="page">
    <div class="card">

      <!-- 날씨 배너 -->
      <div class="banner" :style="{ background: bannerConfig.gradient }">
        <transition name="icon-swap" mode="out-in">
          <WeatherIcon :key="weatherType" :type="weatherType" class="banner__icon" />
        </transition>
        <div class="banner__text">
          <h1 class="banner__title" :style="{ color: bannerConfig.titleColor }">날씨 요약</h1>
          <transition name="fade" mode="out-in">
            <p v-if="queriedAddress" :key="queriedAddress" class="banner__location" :style="{ color: bannerConfig.subtitleColor }">
              📍 {{ queriedAddress }}<span v-if="currentWeather && currentWeather !== '__error__'"> · {{ currentWeather }}</span>
            </p>
            <p v-else class="banner__subtitle" :style="{ color: bannerConfig.subtitleColor }">
              지역을 입력하거나 위치를 자동으로 받아보세요
            </p>
          </transition>
        </div>
      </div>

      <!-- 카드 바디 -->
      <div class="card__body">

        <!-- 모드 토글 -->
        <div class="mode-toggle">
          <button
            :class="['toggle-option', { 'toggle-option--active': mode === 'manual' }]"
            type="button"
            @click="switchMode('manual')"
          >
            직접 입력
          </button>
          <button
            :class="['toggle-option', { 'toggle-option--active': mode === 'auto' }]"
            type="button"
            @click="switchMode('auto')"
          >
            자동 위치
          </button>
        </div>

        <!-- 입력 영역 (모드별) -->
        <transition name="slide" mode="out-in">

          <!-- 직접 입력 -->
          <form v-if="mode === 'manual'" key="manual" class="form" @submit.prevent="handleManualSubmit">
            <div class="input-row">
              <input
                v-model="address"
                class="input"
                type="text"
                placeholder="예) 서울 강남구, 부산 해운대구"
                autocomplete="off"
                :disabled="loading"
              />
              <button class="btn" type="submit" :disabled="loading || !address.trim()">
                <span v-if="loading" class="spinner" />
                <span v-else>검색</span>
              </button>
            </div>
          </form>

          <!-- 자동 위치 -->
          <div v-else key="auto" class="auto-panel">
            <button class="btn btn--full" type="button" :disabled="loading" @click="handleAutoSearch">
              <span v-if="loading" class="spinner" />
              <span v-else>📍 현재 위치로 날씨 검색</span>
            </button>
            <transition name="fade">
              <p v-if="autoStatus" class="auto-status">{{ autoStatus }}</p>
            </transition>
          </div>

        </transition>

        <!-- 결과 -->
        <transition name="fade">
          <div v-if="result" class="result">
            <p class="result__text" v-html="result"></p>
          </div>
        </transition>

        <!-- 에러 -->
        <transition name="fade">
          <div v-if="error" class="error">
            <p>{{ error }}</p>
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WeatherIcon from './components/WeatherIcon.vue'
import {
  fetchWeatherSummaryByAddress,
  fetchWeatherSummaryByLocation,
  getCurrentPosition,
} from './api/weather.js'

const mode = ref('manual')
const address = ref('')
const queriedAddress = ref('')
const result = ref('')
const currentWeather = ref('')
const error = ref('')
const loading = ref(false)
const autoStatus = ref('')

function switchMode(next) {
  if (mode.value === next) return
  mode.value = next
  result.value = ''
  error.value = ''
  queriedAddress.value = ''
  currentWeather.value = ''
  autoStatus.value = ''
}

async function handleManualSubmit() {
  const trimmed = address.value.trim()
  if (!trimmed) return
  loading.value = true
  result.value = ''
  error.value = ''
  try {
    const data = await fetchWeatherSummaryByAddress(trimmed)
    applyResult(data)
  } catch (e) {
    error.value = e.message
    currentWeather.value = '__error__'
  } finally {
    loading.value = false
  }
}

async function handleAutoSearch() {
  loading.value = true
  result.value = ''
  error.value = ''
  autoStatus.value = '위치를 가져오는 중...'
  try {
    const pos = await getCurrentPosition()
    autoStatus.value = '날씨를 불러오는 중...'
    const data = await fetchWeatherSummaryByLocation(pos.coords.latitude, pos.coords.longitude)
    applyResult(data)
  } catch (e) {
    error.value = e.message
    currentWeather.value = '__error__'
  } finally {
    loading.value = false
    autoStatus.value = ''
  }
}

function applyResult(data) {
  result.value = data.description
  // weather 필드 미 존재 시 (Gemini 오류 등) 슬픈 구름 아이콘으로 전환
  currentWeather.value = data.weather ?? '__error__'
  queriedAddress.value = data.address ?? ''
}

const WEATHER_TYPE_MAP = {
  '맑음': 'clear',
  '구름 조금 ~ 흐림': 'cloudy',
  '안개': 'fog',
  '이슬비': 'drizzle',
  '비': 'rain',
  '눈': 'snow',
  '소나기': 'shower',
  '뇌우': 'thunder',
  '__error__': 'sad',
}

const BANNER_CONFIGS = {
  clear:   { gradient: 'linear-gradient(155deg, #FFF9C4 0%, #FFE082 60%, #FFB300 100%)', titleColor: '#5D4037', subtitleColor: '#6D4C41' },
  cloudy:  { gradient: 'linear-gradient(155deg, #E3F2FD 0%, #90CAF9 100%)',              titleColor: '#1565C0', subtitleColor: '#1976D2' },
  fog:     { gradient: 'linear-gradient(155deg, #F5F5F5 0%, #CFD8DC 100%)',              titleColor: '#37474F', subtitleColor: '#546E7A' },
  drizzle: { gradient: 'linear-gradient(155deg, #E1F5FE 0%, #4FC3F7 100%)',              titleColor: '#01579B', subtitleColor: '#0277BD' },
  rain:    { gradient: 'linear-gradient(155deg, #9FA8DA 0%, #283593 100%)',              titleColor: '#FFFFFF', subtitleColor: 'rgba(255,255,255,0.8)' },
  snow:    { gradient: 'linear-gradient(155deg, #F1F8E9 0%, #BBDEFB 100%)',              titleColor: '#0D47A1', subtitleColor: '#1565C0' },
  shower:  { gradient: 'linear-gradient(155deg, #78909C 0%, #263238 100%)',              titleColor: '#FFFFFF', subtitleColor: 'rgba(255,255,255,0.8)' },
  thunder: { gradient: 'linear-gradient(155deg, #7E57C2 0%, #1A237E 100%)',              titleColor: '#FFFFFF', subtitleColor: 'rgba(255,255,255,0.8)' },
  sad:     { gradient: 'linear-gradient(155deg, #B0BEC5 0%, #546E7A 100%)',              titleColor: '#FFFFFF', subtitleColor: 'rgba(255,255,255,0.75)' },
  default: { gradient: 'linear-gradient(155deg, #E0F0FF 0%, #90CAF9 100%)',              titleColor: '#1a3a5c', subtitleColor: '#4a7ab5' },
}

const weatherType = computed(() => WEATHER_TYPE_MAP[currentWeather.value] ?? 'default')
const bannerConfig = computed(() => BANNER_CONFIGS[weatherType.value] ?? BANNER_CONFIGS.default)
</script>
