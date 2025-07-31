<template>
  <nav class="navigation">
    <div class="nav-container">
      <ul class="nav-menu">
        <li class="nav-item" v-for="item in menuItems" :key="item.id" 
            @mouseenter="showDropdown(item.id)" 
            @mouseleave="hideDropdown">
          <div class="nav-link">
            <i :class="item.icon"></i>
            <span>{{ item.text }}</span>
            <div class="dropdown" v-if="item.dropdown && activeDropdown === item.id" 
                 @mouseenter="keepDropdown(item.id)"
                 @mouseleave="hideDropdown">
              <div class="dropdown-content">
                <div v-for="subItem in item.dropdown" :key="subItem.id" 
                     class="dropdown-item"
                     @click="handleDropdownItemClick(subItem, item)">
                  <img :src="subItem.icon" v-if="subItem.type === 'image'" style="width: 35px; height: 20px; padding-right: 10px;">
                  <i :class="subItem.icon" v-else></i>
                  <span>{{ subItem.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { menuItems } from '../utils/const';
import { openGame } from '../services/player';
import { useStore } from 'vuex';

const emit = defineEmits(['open-login-popup']);

const activeDropdown = ref(null);
const store = useStore();

const isLogin = computed(() => store.state.auth.isLogin);

function showDropdown(itemId) {
  activeDropdown.value = itemId;
}

function hideDropdown() {
  activeDropdown.value = null;
}

function keepDropdown(itemId) {
  activeDropdown.value = itemId;
}

async function handleDropdownItemClick(subItem, parentItem) {
  hideDropdown();

  if (!isLogin.value) {
    // Emit event để mở popup đăng nhập
    emit('open-login-popup', {
      subItem: subItem,
      parentItem: parentItem,
      gameId: subItem.id,
      gameName: subItem.text,
      category: parentItem.text
    });
    return;
  }

  try {
    const result = await openGame({
      gpid: subItem.id,
    });
    // Tính toán vị trí để cửa sổ popup hiển thị giữa màn hình
    const width = 1000;
    const height = 900;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(
      result.url,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  } catch (error) {
    console.log(error.response.data.message);
  }
}
</script>

<style scoped>
:root {
  --gold: #FFD700;
  --gold-light: #ffe066;
  --gold-dark: #bfa100;
  --black: #181818;
  --black2: #232323;
  --gray: #333;
  --white: #fff;
}

.navigation {
  background: linear-gradient(135deg, var(--black) 0%, var(--black2) 100%);
  box-shadow: 0 2px 10px rgba(0,0,0,0.5);
  position: relative;
  z-index: 100;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 20px;
  overflow: visible;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  overflow: visible;
}

.nav-item {
  position: relative;
  flex: 1;
  text-align: center;
  z-index: 101;
  padding-bottom: 10px;
  /* Tạo vùng hover rộng hơn */
  padding-top: 10px;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  text-decoration: none;
  padding: 10px 8px;
  height: 60px;
  transition: all 0.15s ease;
  cursor: pointer;
  position: relative;
  z-index: 102;
  background: transparent;
  pointer-events: auto;
  border-radius: 8px;
  border: 1px solid transparent;
}

.nav-link i {
  font-size: 18px;
  margin-bottom: 4px;
  transition: all 0.15s ease;
  color: var(--gold-dark);
  text-shadow: 0 1px 4px rgba(255, 215, 0, 0.15);
}

.nav-link span {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.2;
  color: var(--gold);
  text-shadow: 0 1px 4px rgba(255, 215, 0, 0.10);
}


/* Dropdown styles */
.dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #232323 !important;
  background: #232323 !important;
  border-radius: 12px;
  box-shadow: 0 12px 35px rgba(0,0,0,0.9), 0 0 20px rgba(255, 215, 0, 0.1);
  min-width: 180px;
  z-index: 1000;
  animation: dropdownFadeIn 0.15s ease;
  margin-top: -10px;
  border: 2px solid var(--gold);
  pointer-events: auto;
  opacity: 1 !important;
  backdrop-filter: none !important;
  /* Tạo vùng hover rộng hơn */
  /* padding-top: 20px; */
  transition: all 0.15s ease;
}

.dropdown-content {
  padding: 12px 0;
  position: relative;
  z-index: 1001;
  pointer-events: auto;
  background-color: #232323 !important;
  background: #232323 !important;
  backdrop-filter: none !important;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 5px;
  color: var(--gold);
  text-decoration: none;
  transition: all 0.1s ease;
  cursor: pointer;
  background-color: #232323 !important;
  background: #232323 !important;
  font-weight: 500;
  pointer-events: auto;
}

.dropdown-item:hover {
  background: linear-gradient(90deg, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.25) 100%);
  color: var(--gold-light);
  transform: translateX(5px) scale(1.01);
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.2);
  border-radius: 6px;
  transition: all 0.1s ease;
}


/* Animation */
@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

/* Tạo vùng hover liền mạch cho toàn bộ nav-item */
.nav-item {
  position: relative;
}

.nav-item:hover {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%);
  color: var(--gold-light);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.25);
  border: 1px solid rgba(255, 215, 0, 0.3);
}
/* Responsive design */
@media (max-width: 1200px) {
  .nav-menu {
    flex-wrap: wrap;
    height: auto;
    padding: 10px 0;
  }
  
  .nav-item {
    flex: 0 0 25%;
    margin-bottom: 10px;
  }
  
  .nav-link {
    height: 50px;
    padding: 8px 4px;
  }
  
  .nav-link span {
    font-size: 10px;
  }
}

@media (max-width: 768px) {
  .nav-item {
    flex: 0 0 33.333%;
  }
  
  .dropdown {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
  }
  
  .dropdown::before {
    display: none;
  }
}

@media (max-width: 480px) {
  .nav-item {
    flex: 0 0 50%;
  }
  
  .nav-link span {
    font-size: 9px;
  }
}
</style>
