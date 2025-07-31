<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import Register from '@components/modal/Register.vue';
import Header from '@components/Header.vue';
import Navigation from '@components/Navigation.vue';
import Login from '@components/modal/Login.vue';

const registerModal = ref(false);
const loginModal = ref(false);

const handleOpenLoginPopup = () => {
    loginModal.value = true;
}

const handleOpenRegisterPopup = () => {
    registerModal.value = true;
}

const onChange = (current) => {
    console.log(current);
};

// Games navigation functionality
const activeCategory = ref('PG Điện Tử');

const categories = [
    'PG Điện Tử',
    'TP Điện Tử', 
    'JILI Điện Tử',
    'CQ9 Điện Tử',
    'FC Điện Tử',
    'YGR Điện Tử',
    'JILI Bắn Cá',
    'PP Điện Tử'
];

// Games data for each category
const gamesData = {
    'PG Điện Tử': [
        { name: 'Kho Báu Aztec', image: 'AZTEC', jackpot: '100.00' },
        { name: 'Đường Mạt Chược', image: 'MAHJONG' },
        { name: 'Đường Mạt Chược 2', image: 'MAHJONG2' },
        { name: 'Neko May Mắn', image: 'NEKO', jackpot: '25.000' },
        { name: 'Chiến Thắng CaiShen', image: 'CAISHEN' },
        { name: 'Wild Đạo Tặc', image: 'BANDIT' },
        { name: 'Pháo hoa Wild', image: 'FIREWORKS' },
        { name: 'Giấc Mơ Ma Cao', image: 'MACAU' },
        { name: 'Kỳ Lân Mách Nước', image: 'QILIN' },
        { name: 'Kho Báu Ganesha', image: 'GANESHA' },
        { name: 'Kho Báu Của Thuyền Trưởng', image: 'CAPTAIN' },
        { name: 'Quyết Chiến Tiền Thưởng', image: 'BOUNTY' }
    ],
    'TP Điện Tử': [
        { name: 'Fortune Tiger', image: 'TIGER', jackpot: '50.00' },
        { name: 'Dragon Tiger', image: 'DRAGON' },
        { name: 'Baccarat Pro', image: 'BACCARAT' },
        { name: 'Roulette Gold', image: 'ROULETTE', jackpot: '15.000' },
        { name: 'Blackjack VIP', image: 'BLACKJACK' },
        { name: 'Poker Master', image: 'POKER' },
        { name: 'Sic Bo Fortune', image: 'SICBO' },
        { name: 'Three Card Poker', image: 'THREECARD' },
        { name: 'Caribbean Stud', image: 'CARIBBEAN' },
        { name: 'Texas Holdem', image: 'TEXAS' },
        { name: 'Omaha Poker', image: 'OMAHA' },
        { name: 'Seven Card Stud', image: 'SEVENCARD' }
    ],
    'JILI Điện Tử': [
        { name: 'Super Ace', image: 'SUPERACE', jackpot: '200.00' },
        { name: 'Fortune Gods', image: 'FORTUNEGODS' },
        { name: 'Lucky Fishing', image: 'LUCKYFISHING' },
        { name: 'Golden Empire', image: 'GOLDENEMPIRE', jackpot: '75.000' },
        { name: 'Dragon Phoenix', image: 'DRAGONPHOENIX' },
        { name: 'Treasure Hunt', image: 'TREASUREHUNT' },
        { name: 'Mystic Fortune', image: 'MYSTICFORTUNE' },
        { name: 'Royal Flush', image: 'ROYALFLUSH' },
        { name: 'Golden Dragon', image: 'GOLDENDRAGON' },
        { name: 'Lucky Star', image: 'LUCKYSTAR' },
        { name: 'Fortune Wheel', image: 'FORTUNEWHEEL' },
        { name: 'Diamond Quest', image: 'DIAMONDQUEST' }
    ],
    'CQ9 Điện Tử': [
        { name: 'Lucky Neko', image: 'LUCKYNEKO', jackpot: '150.00' },
        { name: 'Fortune Mouse', image: 'FORTUNEMOUSE' },
        { name: 'Golden Toad', image: 'GOLDENTOAD' },
        { name: 'Lucky Cat', image: 'LUCKYCAT', jackpot: '45.000' },
        { name: 'Money Frog', image: 'MONEYFROG' },
        { name: 'Fortune Rabbit', image: 'FORTUNERABBIT' },
        { name: 'Golden Ox', image: 'GOLDENOX' },
        { name: 'Lucky Horse', image: 'LUCKYHORSE' },
        { name: 'Fortune Sheep', image: 'FORTUNESHEEP' },
        { name: 'Golden Monkey', image: 'GOLDENMONKEY' },
        { name: 'Lucky Rooster', image: 'LUCKYROOSTER' },
        { name: 'Fortune Dog', image: 'FORTUNEDOG' }
    ],
    'FC Điện Tử': [
        { name: 'Football Star', image: 'FOOTBALLSTAR', jackpot: '300.00' },
        { name: 'Soccer Legend', image: 'SOCCERLEGEND' },
        { name: 'Champion League', image: 'CHAMPIONLEAGUE' },
        { name: 'World Cup', image: 'WORLDCUP', jackpot: '100.000' },
        { name: 'Euro Cup', image: 'EUROCUP' },
        { name: 'Premier League', image: 'PREMIERLEAGUE' },
        { name: 'La Liga', image: 'LALIGA' },
        { name: 'Bundesliga', image: 'BUNDESLIGA' },
        { name: 'Serie A', image: 'SERIEA' },
        { name: 'Ligue 1', image: 'LIGUE1' },
        { name: 'Champions League', image: 'CHAMPIONSLEAGUE' },
        { name: 'Europa League', image: 'EUROPALEAGUE' }
    ],
    'YGR Điện Tử': [
        { name: 'YGR Slots', image: 'YGRSLOTS', jackpot: '500.00' },
        { name: 'Golden YGR', image: 'GOLDENYGR' },
        { name: 'Lucky YGR', image: 'LUCKYYGR' },
        { name: 'Fortune YGR', image: 'FORTUNEYGR', jackpot: '200.000' },
        { name: 'Diamond YGR', image: 'DIAMONDYGR' },
        { name: 'Royal YGR', image: 'ROYALYGR' },
        { name: 'VIP YGR', image: 'VIPYGR' },
        { name: 'Premium YGR', image: 'PREMIUMYGR' },
        { name: 'Elite YGR', image: 'ELITEYGR' },
        { name: 'Master YGR', image: 'MASTERYGR' },
        { name: 'Legend YGR', image: 'LEGENDYGR' },
        { name: 'Ultimate YGR', image: 'ULTIMATEYGR' }
    ],
    'JILI Bắn Cá': [
        { name: 'Ocean Treasure', image: 'OCEANTREASURE', jackpot: '1000.00' },
        { name: 'Deep Sea', image: 'DEEPSEA' },
        { name: 'Coral Reef', image: 'CORALREEF' },
        { name: 'Shark Attack', image: 'SHARKATTACK', jackpot: '500.000' },
        { name: 'Whale Hunter', image: 'WHALEHUNTER' },
        { name: 'Dolphin Quest', image: 'DOLPHINQUEST' },
        { name: 'Turtle Race', image: 'TURTLERACE' },
        { name: 'Crab Battle', image: 'CRABBATTLE' },
        { name: 'Lobster Trap', image: 'LOBSTERTRAP' },
        { name: 'Squid Game', image: 'SQUIDGAME' },
        { name: 'Octopus King', image: 'OCTOPUSKING' },
        { name: 'Sea Monster', image: 'SEAMONSTER' }
    ],
    'PP Điện Tử': [
        { name: 'PP Slots', image: 'PPSLOTS', jackpot: '750.00' },
        { name: 'Golden PP', image: 'GOLDENPP' },
        { name: 'Lucky PP', image: 'LUCKYPPS' },
        { name: 'Fortune PP', image: 'FORTUNEPP', jackpot: '300.000' },
        { name: 'Diamond PP', image: 'DIAMONDPP' },
        { name: 'Royal PP', image: 'ROYALPP' },
        { name: 'VIP PP', image: 'VIPPP' },
        { name: 'Premium PP', image: 'PREMIUMPP' },
        { name: 'Elite PP', image: 'ELITEPP' },
        { name: 'Master PP', image: 'MASTERPP' },
        { name: 'Legend PP', image: 'LEGENDPP' },
        { name: 'Ultimate PP', image: 'ULTIMATEPP' }
    ]
};

const selectCategory = (category) => {
    activeCategory.value = category;
};

// Get current games based on active category
const currentGames = computed(() => {
    return gamesData[activeCategory.value] || [];
});

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

    <div class="container">
        <!-- Tính năng vượt trội của SHBET -->
        <section class="features-section">
            <div class="features-header">
                <div class="header-line left"></div>
                <h2 class="features-title">NHỮNG TÍNH NĂNG VƯỢT TRỘI CỦA SHBET</h2>
                <div class="header-line right"></div>
            </div>
            
            <div class="features-grid">
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
                
                <div class="feature-divider"></div>
                
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
                
                <div class="feature-divider"></div>
                
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
                
                <div class="feature-divider"></div>
                
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
                <div class="feature-divider"></div>
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

    <div class="container">
        <!-- TRÒ CHƠI YÊU THÍCH -->
        <section class="favorite-games-section">
            <div class="favorite-games-header">
                <div class="header-decoration"></div>
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
                        :key="category"
                        class="nav-category"
                        :class="{ active: activeCategory === category }"
                        @click="selectCategory(category)"
                    >
                        {{ category }}
                    </button>
                </div>
                
                <button class="nav-arrow right-arrow" @click="scrollRight">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            
            <!-- Games Grid -->
            <div class="games-grid">
                <div 
                    v-for="game in currentGames" 
                    :key="game.name"
                    class="game-item"
                >
                    <div class="game-icon">
                        <img 
                            :src="`https://via.placeholder.com/120x120/FFD700/000?text=${game.image}`" 
                            :alt="game.name" 
                        />
                        <div v-if="game.jackpot" class="jackpot-overlay">{{ game.jackpot }}</div>
                    </div>
                    <button class="game-button">{{ game.name }}</button>
                </div>
            </div>
        </section>
    </div>
    <Register v-model:visible="registerModal" />
    <Login v-model:visible="loginModal" />
</template>