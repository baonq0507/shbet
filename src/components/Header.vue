<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import logo from '@assets/logo.png';
import Register from '@components/modal/Register.vue';
import Login from '@components/modal/Login.vue';
import { useStore } from 'vuex';
import UserStatus from '@components/UserStatus.vue';
const store = useStore();

const emit = defineEmits(['open-login-popup', 'open-register-popup']);

const handleOpenLoginPopup = () => {
    emit('open-login-popup');
}

const handleOpenRegisterPopup = () => {
    emit('open-register-popup');
}

const canvasRef = ref(null);

function randomColor() {
    const colors = [
        '#FFD700', '#FF69B4', '#00FFFF', '#FF4500', '#7CFC00', '#1E90FF', '#FF6347', '#FFF700'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
const isLogin = computed(() => {
    console.log('Header computed isLogin:', store.state.auth.isLogin, 'user:', store.state.auth.user);
    return store.state.auth.isLogin;
});

let animationId;
let fireworks = [];

function createFirework(width, height) {
    const x = Math.random() * width;
    const y = height;
    const targetY = Math.random() * (height / 2);
    const color = randomColor();
    const speed = 2 + Math.random() * 2;
    return {
        x, y, targetY, color, speed,
        exploded: false,
        particles: []
    };
}

function createParticles(firework) {
    const particles = [];
    const count = 24 + Math.floor(Math.random() * 12);
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 1 + Math.random() * 3;
        particles.push({
            x: firework.x,
            y: firework.targetY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: firework.color
        });
    }
    return particles;
}

function animateFireworks(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);

    // Tạo pháo hoa mới ngẫu nhiên
    if (Math.random() < 0.04) {
        fireworks.push(createFirework(width, height));
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        if (!fw.exploded) {
            // Di chuyển pháo hoa lên
            fw.y -= fw.speed;
            ctx.beginPath();
            ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = fw.color;
            ctx.shadowColor = fw.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
            if (fw.y <= fw.targetY) {
                fw.exploded = true;
                fw.particles = createParticles(fw);
            }
        } else {
            // Vẽ các hạt pháo hoa
            for (let j = fw.particles.length - 1; j >= 0; j--) {
                const p = fw.particles[j];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.03; // trọng lực
                p.alpha -= 0.012;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(p.alpha, 0);
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
                if (p.alpha <= 0) {
                    fw.particles.splice(j, 1);
                }
            }
            if (fw.particles.length === 0) {
                fireworks.splice(i, 1);
            }
        }
    }
    animationId = requestAnimationFrame(() => animateFireworks(ctx, width, height));
}

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const ctx = canvas.getContext('2d');
    animateFireworks(ctx, canvas.width, canvas.height);

    // cleanup
    onBeforeUnmount(() => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resize);
    });
});
</script>
<template>
    <div class="home-container">
        <canvas ref="canvasRef" class="firework-bg"></canvas>
        <a-row :gutter="20" class="home-row">
            <a-col :span="16">
                <img :src="logo" alt="logo" class="logo">
                <span class="title">Thế giới casino trong tầm tay bạn</span>
            </a-col>
            <a-col :span="8" v-if="!isLogin">
                <a-space>
                    <a-button type="primary" size="large" @click="handleOpenLoginPopup">Đăng nhập</a-button>
                    <a-button type="primary" size="large" @click="handleOpenRegisterPopup">Đăng ký</a-button>
                </a-space>
            </a-col>
            <a-col :span="8" v-else>
                <UserStatus />
            </a-col>
        </a-row>
    </div>
</template>