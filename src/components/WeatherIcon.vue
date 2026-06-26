<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

    <!-- ☀️ 맑음 -->
    <template v-if="type === 'clear'">
      <g stroke="#F9A825" stroke-width="5" stroke-linecap="round">
        <line x1="50" y1="10" x2="50" y2="22" />
        <line x1="50" y1="78" x2="50" y2="90" />
        <line x1="10" y1="50" x2="22" y2="50" />
        <line x1="78" y1="50" x2="90" y2="50" />
        <line x1="22.9" y1="22.9" x2="31.3" y2="31.3" />
        <line x1="68.7" y1="68.7" x2="77.1" y2="77.1" />
        <line x1="77.1" y1="22.9" x2="68.7" y2="31.3" />
        <line x1="31.3" y1="68.7" x2="22.9" y2="77.1" />
      </g>
      <circle cx="50" cy="50" r="20" fill="#FFD54F" />
      <circle cx="50" cy="50" r="14" fill="#FFB300" opacity="0.5" />
    </template>

    <!-- ⛅ 구름 조금 ~ 흐림 -->
    <template v-else-if="type === 'cloudy'">
      <circle cx="33" cy="37" r="15" fill="#FFD54F" />
      <g stroke="#F9A825" stroke-width="3.5" stroke-linecap="round">
        <line x1="33" y1="15" x2="33" y2="21" />
        <line x1="14" y1="37" x2="20" y2="37" />
        <line x1="19.7" y1="23.7" x2="24.0" y2="28.0" />
      </g>
      <ellipse cx="58" cy="62" rx="25" ry="15" fill="#E3F2FD" />
      <ellipse cx="44" cy="59" rx="17" ry="15" fill="#E3F2FD" />
      <ellipse cx="72" cy="60" rx="14" ry="12" fill="#BBDEFB" />
    </template>

    <!-- 🌫 안개 -->
    <template v-else-if="type === 'fog'">
      <g stroke="#90A4AE" stroke-width="6" stroke-linecap="round">
        <line x1="18" y1="28" x2="82" y2="28" />
        <line x1="13" y1="50" x2="87" y2="50" />
        <line x1="18" y1="72" x2="82" y2="72" />
      </g>
      <g fill="#B0BEC5" opacity="0.35">
        <circle cx="28" cy="39" r="4" />
        <circle cx="52" cy="39" r="4" />
        <circle cx="74" cy="39" r="4" />
        <circle cx="22" cy="61" r="4" />
        <circle cx="48" cy="61" r="4" />
        <circle cx="72" cy="61" r="4" />
      </g>
    </template>

    <!-- 🌦 이슬비 -->
    <template v-else-if="type === 'drizzle'">
      <ellipse cx="52" cy="41" rx="24" ry="14" fill="#B3E5FC" />
      <ellipse cx="38" cy="47" rx="17" ry="15" fill="#B3E5FC" />
      <ellipse cx="67" cy="45" rx="14" ry="12" fill="#81D4FA" />
      <g fill="#29B6F6">
        <ellipse cx="37" cy="70" rx="2.5" ry="4.5" />
        <ellipse cx="52" cy="76" rx="2.5" ry="4.5" />
        <ellipse cx="67" cy="70" rx="2.5" ry="4.5" />
      </g>
    </template>

    <!-- 🌧 비 -->
    <template v-else-if="type === 'rain'">
      <ellipse cx="52" cy="37" rx="25" ry="15" fill="#90A4AE" />
      <ellipse cx="38" cy="43" rx="18" ry="16" fill="#78909C" />
      <ellipse cx="67" cy="41" rx="15" ry="13" fill="#78909C" />
      <g stroke="#5C6BC0" stroke-width="3.5" stroke-linecap="round">
        <line x1="38" y1="62" x2="33" y2="77" />
        <line x1="52" y1="62" x2="47" y2="77" />
        <line x1="66" y1="62" x2="61" y2="77" />
        <line x1="44" y1="74" x2="39" y2="89" />
        <line x1="58" y1="74" x2="53" y2="89" />
      </g>
    </template>

    <!-- ❄️ 눈 -->
    <template v-else-if="type === 'snow'">
      <ellipse cx="52" cy="37" rx="25" ry="15" fill="#B0BEC5" />
      <ellipse cx="38" cy="43" rx="18" ry="16" fill="#90A4AE" />
      <ellipse cx="67" cy="41" rx="15" ry="13" fill="#90A4AE" />
      <g fill="#E3F2FD">
        <circle cx="37" cy="67" r="5" />
        <circle cx="52" cy="75" r="5" />
        <circle cx="67" cy="67" r="5" />
        <circle cx="44" cy="82" r="4" />
        <circle cx="60" cy="82" r="4" />
      </g>
      <g stroke="#90CAF9" stroke-width="1.5" stroke-linecap="round">
        <line x1="34" y1="67" x2="40" y2="67" /><line x1="37" y1="64" x2="37" y2="70" />
        <line x1="49" y1="75" x2="55" y2="75" /><line x1="52" y1="72" x2="52" y2="78" />
        <line x1="64" y1="67" x2="70" y2="67" /><line x1="67" y1="64" x2="67" y2="70" />
      </g>
    </template>

    <!-- 🌧 소나기 -->
    <template v-else-if="type === 'shower'">
      <ellipse cx="52" cy="34" rx="26" ry="16" fill="#546E7A" />
      <ellipse cx="37" cy="42" rx="19" ry="17" fill="#37474F" />
      <ellipse cx="68" cy="40" rx="16" ry="14" fill="#455A64" />
      <g stroke="#29B6F6" stroke-width="3.5" stroke-linecap="round">
        <line x1="34" y1="60" x2="27" y2="78" />
        <line x1="47" y1="60" x2="40" y2="78" />
        <line x1="60" y1="60" x2="53" y2="78" />
        <line x1="73" y1="60" x2="66" y2="78" />
        <line x1="40" y1="76" x2="33" y2="94" />
        <line x1="54" y1="76" x2="47" y2="94" />
        <line x1="66" y1="76" x2="59" y2="94" />
      </g>
    </template>

    <!-- ⛈ 뇌우 -->
    <template v-else-if="type === 'thunder'">
      <ellipse cx="52" cy="32" rx="27" ry="17" fill="#37474F" />
      <ellipse cx="36" cy="41" rx="20" ry="18" fill="#263238" />
      <ellipse cx="69" cy="39" rx="17" ry="15" fill="#2E3B40" />
      <path d="M57 54 L44 73 L54 73 L47 90 L68 65 L57 65 Z" fill="#FFD54F" />
      <path d="M57 54 L44 73 L54 73 L47 90 L68 65 L57 65 Z" fill="#FFB300" opacity="0.4" />
    </template>

    <!-- 😢 에러 / 응답 없음 -->
    <template v-else-if="type === 'sad'">
      <!-- 흐린 구름 -->
      <ellipse cx="52" cy="36" rx="26" ry="16" fill="#90A4AE" />
      <ellipse cx="37" cy="44" rx="19" ry="17" fill="#78909C" />
      <ellipse cx="68" cy="42" rx="16" ry="14" fill="#78909C" />
      <!-- 눈 -->
      <circle cx="43" cy="51" r="3.5" fill="#37474F" />
      <circle cx="61" cy="51" r="3.5" fill="#37474F" />
      <!-- 눈 하이라이트 -->
      <circle cx="44.5" cy="49.5" r="1.2" fill="white" opacity="0.7" />
      <circle cx="62.5" cy="49.5" r="1.2" fill="white" opacity="0.7" />
      <!-- 슬픈 입 -->
      <path d="M42 61 Q52 56.5 62 61" stroke="#37474F" stroke-width="2.8" fill="none" stroke-linecap="round" />
      <!-- 눈물 (방울) -->
      <ellipse cx="41" cy="68" rx="2.5" ry="4"   fill="#64B5F6" />
      <ellipse cx="63" cy="68" rx="2.5" ry="4"   fill="#64B5F6" />
      <ellipse cx="41" cy="77" rx="2"   ry="3.2" fill="#42A5F5" opacity="0.6" />
      <ellipse cx="63" cy="77" rx="2"   ry="3.2" fill="#42A5F5" opacity="0.6" />
    </template>

    <!-- 기본 / 알 수 없음 -->
    <template v-else>
      <ellipse cx="52" cy="44" rx="27" ry="16" fill="#CFD8DC" />
      <ellipse cx="37" cy="51" rx="19" ry="17" fill="#B0BEC5" />
      <ellipse cx="68" cy="49" rx="16" ry="14" fill="#B0BEC5" />
      <text x="52" y="82" text-anchor="middle" font-size="22" fill="#78909C" font-family="sans-serif">?</text>
    </template>

  </svg>
</template>

<script setup>
defineProps({ type: { type: String, default: 'default' } })
</script>
