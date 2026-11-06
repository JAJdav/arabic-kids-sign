/* ============================================
   Lottie Cartoon Animations Manager
   ============================================ */

const LottieAnimations = {
    // Free Lottie animations from LottieFiles
    urls: {
        // Waving character (for header/mascot)
        waving: 'https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json',
        // Reading/thinking character
        reading: 'https://assets5.lottiefiles.com/packages/lf20_V9t630.json',
        // Celebration/success
        celebration: 'https://assets10.lottiefiles.com/packages/lf20_qp1q7mct.json',
        // Walking character
        walking: 'https://assets9.lottiefiles.com/packages/lf20_touohxv0.json',
        // Happy/excited
        happy: 'https://assets3.lottiefiles.com/packages/lf20_u4yrau.json',
        // Thinking/question
        thinking: 'https://assets4.lottiefiles.com/packages/lf20_jcikwtux.json',
        // Sign language hands
        signing: 'https://assets6.lottiefiles.com/packages/lf20_jbrw4hcz.json',
        // Star/sparkle
        sparkle: 'https://assets1.lottiefiles.com/packages/lf20_g5zLZv.json',
        // Book/learning
        book: 'https://assets7.lottiefiles.com/packages/lf20_5tkzbni2.json',
        // Trophy/achievement
        trophy: 'https://assets8.lottiefiles.com/packages/lf20_6bGJGM.json'
    },

    // Store all animation instances
    instances: {},

    /**
     * Load a Lottie animation into a container
     * @param {string} containerId - HTML element ID
     * @param {string} animationKey - Key from urls object
     * @param {object} options - Additional options
     */
    load(containerId, animationKey, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Lottie container #${containerId} not found`);
            return null;
        }

        const url = this.urls[animationKey];
        if (!url) {
            console.warn(`Lottie animation "${animationKey}" not found in URLs`);
            return null;
        }

        const defaultOptions = {
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: url
        };

        const anim = lottie.loadAnimation({ ...defaultOptions, ...options });
        this.instances[containerId] = anim;
        return anim;
    },

    /**
     * Play a specific animation (one-time)
     */
    playOnce(containerId, animationKey) {
        const anim = this.load(containerId, animationKey, { loop: false });
        if (anim) {
            anim.addEventListener('complete', () => {
                // Optional: switch back to default
            });
        }
        return anim;
    },

    /**
     * Stop and destroy an animation
     */
    destroy(containerId) {
        if (this.instances[containerId]) {
            this.instances[containerId].destroy();
            delete this.instances[containerId];
        }
    },

    /**
     * Initialize all default animations
     */
    initDefaults() {
        // Header logo animation (small waving hand)
        this.load('header-lottie', 'signing', {
            loop: true,
            autoplay: true
        });

        // Mascot character (waving boy)
        this.load('mascot-lottie', 'waving', {
            loop: true,
            autoplay: true
        });
    },

    /**
     * Make mascot react (change animation temporarily)
     */
    mascotReact(reaction) {
        const container = document.getElementById('mascot-lottie');
        if (!container) return;

        // Destroy current
        this.destroy('mascot-lottie');

        // Load reaction
        this.load('mascot-lottie', reaction, { loop: false });

        // Return to default after animation
        setTimeout(() => {
            this.destroy('mascot-lottie');
            this.load('mascot-lottie', 'waving', { loop: true, autoplay: true });
        }, 3000);
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    LottieAnimations.initDefaults();
    console.log('🎬 Lottie animations initialized');
});