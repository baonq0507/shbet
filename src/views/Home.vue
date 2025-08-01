<script setup>
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import Register from '@components/modal/Register.vue';
import Header from '@components/Header.vue';
import Navigation from '@components/Navigation.vue';
import Login from '@components/modal/Login.vue';
import { getGameList } from '@/services/player';

const registerModal = ref(false);
const loginModal = ref(false);

const handleOpenLoginPopup = () => {
    loginModal.value = true;
}

const handleOpenRegisterPopup = () => {
    registerModal.value = true;
}

const onChange = (current) => {
    // console.log(current);
};

// Casino panel management
const activeCasinoPanel = ref('casino'); // Không có panel nào active từ đầu

const setActiveCasinoPanel = (panelId) => {
    activeCasinoPanel.value = panelId;
};

// Games navigation functionality
const currentGames = ref([]);
const isLoadingGameList = ref(false);
const categories = [
    {
        name: 'CQ9 Điện Tử',
        gpid: 2
    },
    {
        name: 'WM Điện Tử',
        gpid: 13
    },
    {
        name: 'SBO Điện Tử',
        gpid: 14
    },
    {
        name: 'FK Điện Tử',
        gpid: 16
    },
    {
        name: 'YG Điện Tử',
        gpid: 22
    },
    {
        name: 'MG Điện Tử',
        gpid: 29
    },
    {
        name: 'PG Điện Tử',
        gpid: 35
    },
    {
        name: 'YGR Điện Tử',
        gpid: 1010
    },
    {
        name: 'PT Điện Tử',
        gpid: 1018
    },
    {
        name: 'JILI Điện Tử',
        gpid: 1020
    }
];
const activeCategory = ref(categories[0].gpid);

const getGames = async (gpid) => {
    isLoadingGameList.value = true;
    const res = await getGameList({
        gpid: gpid
    });
    currentGames.value = res.games;
    isLoadingGameList.value = false;
}

onMounted(async () => {
    await getGames(categories[0].gpid);
});

const selectCategory = async (gpid) => {
    activeCategory.value = gpid;
    await getGames(gpid);
};

const scrollLeft = () => {
    const container = document.querySelector('.nav-categories');
    if (container) {
        container.scrollBy({ left: -200, behavior: 'smooth' });
    }
};

const scrollRight = () => {
    const container = document.querySelector('.nav-categories');
    if (container) {
        container.scrollBy({ left: 200, behavior: 'smooth' });
    }
};



</script>

<template>
    <Header @open-login-popup="handleOpenLoginPopup" @open-register-popup="handleOpenRegisterPopup" />
    <Navigation @open-login-popup="handleOpenLoginPopup" />
    <a-carousel :after-change="onChange" autoplay>
        <div>
            <img src="@/assets/banner1.jpg" alt="banner1" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
            <img src="@/assets/banner2.jpg" alt="banner2" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
            <img src="@/assets/banner3.jpg" alt="banner3" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
            <img src="@/assets/banner4.jpg" alt="banner4" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
    </a-carousel>

    <div class="container-fluid">
        <!-- Tính năng vượt trội của SHBET -->
        <section class="features-section">
            <section class="ambassador-section"><div class="features-header"><div class="header-line left"></div><h2 class="features-title">NHỮNG TÍNH NĂNG VƯỢT TRỘI CỦA SHBET</h2><div class="header-line right"></div></div></section>
            
            <div class="features-grid">
                <!-- Hàng đầu tiên: 2 feature items -->
                <div class="feature-item">
                    <div class="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="6" width="18" height="12" rx="2" stroke="url(#gradient1)" stroke-width="2"/>
                            <path d="M7 10L10 13L17 6" stroke="url(#gradient1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 18L12 21L15 18" stroke="url(#gradient1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#FFD700"/>
                                    <stop offset="100%" style="stop-color:#FFA500"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h3 class="feature-title">Thương Hiệu Uy Tín</h3>
                    <p class="feature-description">Thương hiệu uy tín được nhiều người chơi lựa chọn.</p>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="6" width="18" height="12" rx="2" stroke="url(#gradient2)" stroke-width="2"/>
                            <rect x="6" y="9" width="3" height="6" rx="1" fill="url(#gradient2)"/>
                            <rect x="10.5" y="9" width="3" height="6" rx="1" fill="url(#gradient2)"/>
                            <rect x="15" y="9" width="3" height="6" rx="1" fill="url(#gradient2)"/>
                            <path d="M3 6L21 6" stroke="url(#gradient2)" stroke-width="2"/>
                            <path d="M3 18L21 18" stroke="url(#gradient2)" stroke-width="2"/>
                            <defs>
                                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#FFD700"/>
                                    <stop offset="100%" style="stop-color:#FFA500"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h3 class="feature-title">Đa Dạng Sản Phẩm</h3>
                    <p class="feature-description">Casino Trực Tuyến, Thể Thao, Nổ Hũ, Bắn Cá, Đá Gà... Nhiều sản phẩm đa dạng bạn có thể lựa chọn.</p>
                </div>
                
                <!-- Hàng divider nằm ngang -->
                <div class="horizontal-divider-row">
                    <div class="horizontal-divider"></div>
                    <div class="horizontal-divider"></div>
                </div>
                
                <!-- Hàng thứ hai: 2 feature items -->
                <div class="feature-item">
                    <div class="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="url(#gradient3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 12L11 14L15 10" stroke="url(#gradient3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 6V10" stroke="url(#gradient3)" stroke-width="2" stroke-linecap="round"/>
                            <defs>
                                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#FFD700"/>
                                    <stop offset="100%" style="stop-color:#FFA500"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h3 class="feature-title">An Ninh Bảo Mật</h3>
                    <p class="feature-description">Phương thức thanh toán đa dạng, đảm bảo an toàn và bảo mật cao.</p>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="6" y="8" width="12" height="8" rx="1" stroke="url(#gradient4)" stroke-width="2"/>
                            <path d="M6 12H18" stroke="url(#gradient4)" stroke-width="2"/>
                            <path d="M8 16H16" stroke="url(#gradient4)" stroke-width="2"/>
                            <path d="M2 12H4" stroke="url(#gradient4)" stroke-width="2"/>
                            <path d="M20 12H22" stroke="url(#gradient4)" stroke-width="2"/>
                            <path d="M12 4L12 8" stroke="url(#gradient4)" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 20L12 24" stroke="url(#gradient4)" stroke-width="2" stroke-linecap="round"/>
                            <defs>
                                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#FFD700"/>
                                    <stop offset="100%" style="stop-color:#FFA500"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h3 class="feature-title">Giao Dịch Nhanh Chóng</h3>
                    <p class="feature-description">Giao dịch gửi tiền được xử lý trong vòng 1-3 phút khi nhận được khoản chuyển. Thời gian rút tiền trong vòng 5-15 phút.</p>
                </div>
            </div>
        </section>
        
        <!-- Đại sứ thương hiệu -->
        <section class="ambassador-section">
            <div class="features-header">
                <div class="header-line left"></div>
                <h2 class="features-title">ĐẠI SỨ THƯƠNG HIỆU ANDRÉS INIESTA</h2>
                <div class="header-line right"></div>
            </div>
        </section>
    </div>

    <div class="container-fluid">
        <!-- SẢN PHẨM Section -->
        <div class="products-section">
            <section class="ambassador-section"><div class="features-header"><div class="header-line left"></div><h2 class="features-title">SẢN PHẨM</h2><div class="header-line right"></div></div></section>
            
            <div class="products-container" @mouseleave="setActiveCasinoPanel(null)">
                <!-- CASINO Panel -->
                <div 
                    class="casino-panel"
                    :class="{ active: activeCasinoPanel === 'casino' }"
                    @mouseenter="setActiveCasinoPanel('casino')"
                >
                    <div class="casino-header">
                        <h3>CASINO</h3>
                        <p>SẢNH HOT</p>
                    </div>
                    
                    <div class="casino-content">
                        <div v-if="activeCasinoPanel === 'casino'" class="casino-buttons">
                            <button class="casino-btn">MT TRỰC TUYẾN</button>
                            <button class="casino-btn">SE TRỰC TUYẾN</button>
                            <button class="casino-btn">DG TRỰC TUYẾN</button>
                            <button class="casino-btn">WM TRỰC TUYẾN</button>
                            <button class="casino-btn">EVO TRỰC TUYẾN</button>
                            <button class="casino-btn">SA TRỰC TUYẾN</button>
                            <button class="casino-btn">PA TRỰC TUYẾN</button>
                        </div>
                        
                        <div class="casino-image">
                            <img src="@assets/product1.png" alt="Casino Hostess" />
                        </div>
                    </div>
                </div>
                
                <!-- NỔ HŨ Panel -->
                <div 
                    class="casino-panel"
                    :class="{ active: activeCasinoPanel === 'nohu' }"
                    @mouseenter="setActiveCasinoPanel('nohu')"
                >
                    <div class="casino-header">
                        <h3>NỔ HŨ</h3>
                        <p>SẢNH HOT</p>
                    </div>
                    
                    <div class="casino-content">
                        <div v-if="activeCasinoPanel === 'nohu'" class="casino-buttons">
                            <button class="casino-btn">MT TRỰC TUYẾN</button>
                            <button class="casino-btn">SE TRỰC TUYẾN</button>
                            <button class="casino-btn">DG TRỰC TUYẾN</button>
                            <button class="casino-btn">WM TRỰC TUYẾN</button>
                            <button class="casino-btn">EVO TRỰC TUYẾN</button>
                            <button class="casino-btn">SA TRỰC TUYẾN</button>
                            <button class="casino-btn">PA TRỰC TUYẾN</button>
                        </div>
                        
                        <div class="casino-image">
                            <img src="@assets/product2.png" alt="Casino Hostess" />
                        </div>
                    </div>
                </div>

                <div 
                    class="casino-panel"
                    :class="{ active: activeCasinoPanel === 'banca' }"
                    @mouseenter="setActiveCasinoPanel('banca')"
                >
                    <div class="casino-header">
                        <h3>BẮN CÁ</h3>
                        <p>SẢNH HOT</p>
                    </div>
                    
                    <div class="casino-content">
                        <div v-if="activeCasinoPanel === 'banca'" class="casino-buttons">
                            <button class="casino-btn">MT TRỰC TUYẾN</button>
                            <button class="casino-btn">SE TRỰC TUYẾN</button>
                            <button class="casino-btn">DG TRỰC TUYẾN</button>
                            <button class="casino-btn">WM TRỰC TUYẾN</button>
                            <button class="casino-btn">EVO TRỰC TUYẾN</button>
                            <button class="casino-btn">SA TRỰC TUYẾN</button>
                            <button class="casino-btn">PA TRỰC TUYẾN</button>
                        </div>
                        
                        <div class="casino-image">
                            <img src="@assets/product3.png" alt="Casino Hostess" />
                        </div>
                    </div>
                </div>

                <div 
                    class="casino-panel"
                    :class="{ active: activeCasinoPanel === 'thethao' }"
                    @mouseenter="setActiveCasinoPanel('thethao')"
                >
                    <div class="casino-header">
                        <h3>THỂ THAO</h3>
                        <p>SẢNH HOT</p>
                    </div>
                    
                    <div class="casino-content">
                        <div v-if="activeCasinoPanel === 'thethao'" class="casino-buttons">
                            <button class="casino-btn">MT TRỰC TUYẾN</button>
                            <button class="casino-btn">SE TRỰC TUYẾN</button>
                            <button class="casino-btn">DG TRỰC TUYẾN</button>
                            <button class="casino-btn">WM TRỰC TUYẾN</button>
                            <button class="casino-btn">EVO TRỰC TUYẾN</button>
                            <button class="casino-btn">SA TRỰC TUYẾN</button>
                            <button class="casino-btn">PA TRỰC TUYẾN</button>
                        </div>
                        
                        <div class="casino-image">
                            <img src="@assets/product4.png" alt="Casino Hostess" />
                        </div>
                    </div>
                </div>

                <div 
                    class="casino-panel"
                    :class="{ active: activeCasinoPanel === 'gamebai' }"
                    @mouseenter="setActiveCasinoPanel('gamebai')"
                >
                    <div class="casino-header">
                        <h3>GAME BÀI</h3>
                        <p>SẢNH HOT</p>
                    </div>
                    
                    <div class="casino-content">
                        <div v-if="activeCasinoPanel === 'gamebai'" class="casino-buttons">
                            <button class="casino-btn">MT TRỰC TUYẾN</button>
                            <button class="casino-btn">SE TRỰC TUYẾN</button>
                            <button class="casino-btn">DG TRỰC TUYẾN</button>
                            <button class="casino-btn">WM TRỰC TUYẾN</button>
                            <button class="casino-btn">EVO TRỰC TUYẾN</button>
                            <button class="casino-btn">SA TRỰC TUYẾN</button>
                            <button class="casino-btn">PA TRỰC TUYẾN</button>
                        </div>
                        
                        <div class="casino-image">
                            <img src="@assets/product5.png" alt="Casino Hostess" />
                        </div>
                    </div>
                </div>

                <div 
                    class="casino-panel"
                    :class="{ active: activeCasinoPanel === 'dagaa' }"
                    @mouseenter="setActiveCasinoPanel('dagaa')"
                >
                    <div class="casino-header">
                        <h3>ĐÁ GÀ</h3>
                        <p>SẢNH HOT</p>
                    </div>
                    
                    <div class="casino-content">
                        <div v-if="activeCasinoPanel === 'dagaa'" class="casino-buttons">
                            <button class="casino-btn">MT TRỰC TUYẾN</button>
                            <button class="casino-btn">SE TRỰC TUYẾN</button>
                            <button class="casino-btn">DG TRỰC TUYẾN</button>
                            <button class="casino-btn">WM TRỰC TUYẾN</button>
                            <button class="casino-btn">EVO TRỰC TUYẾN</button>
                            <button class="casino-btn">SA TRỰC TUYẾN</button>
                            <button class="casino-btn">PA TRỰC TUYẾN</button>
                        </div>
                        
                        <div class="casino-image">
                            <img src="@assets/product6.png" alt="Casino Hostess" />
                        </div>
                    </div>
                </div>

                <div 
                    class="casino-panel"
                    :class="{ active: activeCasinoPanel === 'xoso' }"
                    @mouseenter="setActiveCasinoPanel('xoso')"
                >
                    <div class="casino-header">
                        <h3>XỔ SỐ</h3>
                        <p>SẢNH HOT</p>
                    </div>
                    
                    <div class="casino-content">
                        <div v-if="activeCasinoPanel === 'xoso'" class="casino-buttons">
                            <button class="casino-btn">MT TRỰC TUYẾN</button>
                            <button class="casino-btn">SE TRỰC TUYẾN</button>
                            <button class="casino-btn">DG TRỰC TUYẾN</button>
                            <button class="casino-btn">WM TRỰC TUYẾN</button>
                            <button class="casino-btn">EVO TRỰC TUYẾN</button>
                            <button class="casino-btn">SA TRỰC TUYẾN</button>
                            <button class="casino-btn">PA TRỰC TUYẾN</button>
                        </div>
                        
                        <div class="casino-image">
                            <img src="@assets/product7.png" alt="Casino Hostess" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <!-- TRÒ CHƠI YÊU THÍCH -->
        <section class="favorite-games-section">
            <div class="favorite-games-header">
                <!-- <div class="header-decoration"></div> -->
                <h2 class="favorite-games-title">TRÒ CHƠI YÊU THÍCH</h2>
            </div>
            
            <!-- Navigation Bar -->
            <div class="games-navigation">
                <button class="nav-arrow left-arrow" @click="scrollLeft">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                
                <div class="nav-categories">
                    <button 
                        v-for="category in categories" 
                        :key="category.name"
                        class="nav-category"
                        :class="{ active: activeCategory === category.gpid }"
                        @click="selectCategory(category.gpid)"
                    >
                        {{ category.name }}
                    </button>
                </div>
                
                <button class="nav-arrow right-arrow" @click="scrollRight">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>


          
            
            <!-- Games Grid with Vertical Scroll -->
            <div class="games-container">
                <div class="games-grid">
                    <template v-if="isLoadingGameList">
                        <div
                            v-for="n in 12"
                            :key="'skeleton-' + n"
                            class="game-item"
                        >
                            <div class="game-icon">
                                <a-skeleton-avatar shape="circle" :size="120" />
                            </div>
                            <a-skeleton-button style="width:100%;margin-top:8px;" :active="true" size="small" />
                        </div>
                    </template>
                    <template v-else>
                        <div
                            v-for="game in currentGames" 
                            :key="game.name"
                            class="game-item"
                        >
                            <div class="game-icon">
                                <img 
                                    :src="game.gameInfos[0].gameIconUrl" 
                                    :alt="game.name" 
                                />
                                <div v-if="game.jackpot" class="jackpot-overlay">{{ game.jackpot }}</div>
                            </div>
                            <button class="game-button">{{ game.gameInfos[0].gameName }}</button>
                        </div>
                    </template>
                </div>
            </div>
        </section>
    </div>
    <Register v-model:visible="registerModal" />
    <Login v-model:visible="loginModal" />
</template>