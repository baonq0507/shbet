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
            <div class="dropdown" v-if="activeDropdown === item.id" 
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
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  z-index: 102;
  background: transparent;
  pointer-events: auto;
}

.nav-link:hover {
  background: rgba(255, 215, 0, 0.08);
  color: var(--gold-light);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px 0 rgba(255, 215, 0, 0.08);
}

.nav-link i {
  font-size: 18px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
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

.nav-link:hover i {
  color: var(--gold);
  /* transform: scale(1.1); */
  text-shadow: 0 2px 8px rgba(255, 215, 0, 0.25);
}

.nav-link:hover span {
  color: var(--gold-light);
}

/* Dropdown styles */
.dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--black2);
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
  min-width: 180px;
  z-index: 1000;
  animation: dropdownFadeIn 0.3s ease;
  margin-top: 5px;
  border: 1.5px solid var(--gold);
  pointer-events: auto;
}

.dropdown::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid var(--black2);
  filter: drop-shadow(0 0 2px var(--gold));
}

.dropdown-content {
  padding: 12px 0;
  position: relative;
  z-index: 1001;
  pointer-events: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 5px;
  color: var(--gold);
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  background: transparent;
  font-weight: 500;
  pointer-events: auto;
}

.dropdown-item:hover {
  background: linear-gradient(90deg, rgba(255,215,0,0.08) 0%, rgba(255,215,0,0.18) 100%);
  color: var(--gold-light);
  /* transform: translateX(5px); */
}

.dropdown-item i {
  margin-right: 12px;
  font-size: 16px;
  width: 20px;
  text-align: center;
  color: var(--gold-dark);
  transition: color 0.2s;
}

.dropdown-item:hover i {
  color: var(--gold);
}

.dropdown-item span {
  font-size: 12px;
  font-weight: 500;
  color: var(--gold);
}

.dropdown-item:hover span {
  color: var(--gold-light);
}

/* Animation */
@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Ensure dropdown is always visible */
.nav-item:hover .dropdown {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Ensure dropdown stays visible when hovering dropdown items */
.dropdown:hover {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
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
