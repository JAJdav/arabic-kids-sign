/* ============================================
   Cartoon Character SVG Generator — Fixed
   ============================================ */

const Characters = {
    /**
     * Mascot: Friendly Owl (gender-neutral, wise)
     */
    owl: (size = 200, animate = true) => `
        <svg class="character-svg character-interactive" width="${size}" height="${size}" viewBox="0 0 200 200">
            <!-- Body -->
            <ellipse cx="100" cy="120" rx="60" ry="70" fill="#4ECDC4" />
            
            <!-- Head -->
            <circle cx="100" cy="80" r="50" fill="#4ECDC4" />
            
            <!-- Ear tufts -->
            <path d="M 60 50 L 50 20 L 70 40 Z" fill="#4ECDC4" />
            <path d="M 140 50 L 150 20 L 130 40 Z" fill="#4ECDC4" />
            
            <!-- Face (lighter) -->
            <ellipse cx="100" cy="85" rx="40" ry="35" fill="#FFF8E7" />
            
            <!-- Eyes (large, friendly) -->
            <circle cx="80" cy="75" r="15" fill="white" />
            <circle cx="120" cy="75" r="15" fill="white" />
            
            <!-- Pupils -->
            ${animate ? `<circle class="eye-blink" cx="80" cy="75" r="8" fill="#264653" />` : `<circle cx="80" cy="75" r="8" fill="#264653" />`}
            ${animate ? `<circle class="eye-blink-delay" cx="120" cy="75" r="8" fill="#264653" />` : `<circle cx="120" cy="75" r="8" fill="#264653" />`}
            
            <!-- Eye highlights -->
            <circle cx="77" cy="72" r="3" fill="white" />
            <circle cx="117" cy="72" r="3" fill="white" />
            
            <!-- Beak -->
            <path d="M 95 90 L 100 100 L 105 90 Z" fill="#F4A261" />
            
            <!-- Smile -->
            <path d="M 85 105 Q 100 115 115 105" stroke="#264653" stroke-width="3" fill="none" stroke-linecap="round" />
            
            <!-- Wings -->
            ${animate ? `<ellipse class="hand-wave" cx="40" cy="120" rx="20" ry="30" fill="#4ECDC4" style="transform-origin: 60px 120px;" />` : `<ellipse cx="40" cy="120" rx="20" ry="30" fill="#4ECDC4" />`}
            ${animate ? `<ellipse class="hand-wave-slow" cx="160" cy="120" rx="20" ry="30" fill="#4ECDC4" style="transform-origin: 140px 120px;" />` : `<ellipse cx="160" cy="120" rx="20" ry="30" fill="#4ECDC4" />`}
            
            <!-- Feet -->
            <ellipse cx="80" cy="185" rx="15" ry="10" fill="#F4A261" />
            <ellipse cx="120" cy="185" rx="15" ry="10" fill="#F4A261" />
            
            <!-- Belly pattern -->
            <ellipse cx="100" cy="130" rx="30" ry="40" fill="#FFF8E7" opacity="0.5" />
        </svg>
    `,

    /**
     * Teacher: Warm adult with modest dress, signing
     */
    teacher: (size = 220, animate = true) => `
        <svg class="character-svg character-interactive" width="${size}" height="${size * 1.2}" viewBox="0 0 180 220">
            <!-- Body (modest dress - abaya style) -->
            <path d="M 60 100 L 50 220 L 130 220 L 120 100 Z" fill="#264653" />
            
            <!-- Head -->
            <circle cx="90" cy="70" r="35" fill="#F4A261" />
            
            <!-- Hijab -->
            <path d="M 55 70 Q 90 40 125 70 L 130 100 Q 90 110 50 100 Z" fill="#4ECDC4" />
            <path d="M 55 70 Q 90 50 125 70" stroke="#264653" stroke-width="2" fill="none" />
            
            <!-- Face -->
            <ellipse cx="90" cy="75" rx="25" ry="28" fill="#F4A261" />
            
            <!-- Eyes -->
            <circle cx="78" cy="70" r="6" fill="white" />
            <circle cx="102" cy="70" r="6" fill="white" />
            ${animate ? `<circle class="eye-blink" cx="78" cy="70" r="4" fill="#264653" />` : `<circle cx="78" cy="70" r="4" fill="#264653" />`}
            ${animate ? `<circle class="eye-blink-delay" cx="102" cy="70" r="4" fill="#264653" />` : `<circle cx="102" cy="70" r="4" fill="#264653" />`}
            
            <!-- Smile -->
            <path d="M 80 85 Q 90 92 100 85" stroke="#264653" stroke-width="2" fill="none" stroke-linecap="round" />
            
            <!-- Hands (signing) -->
            ${animate ? `<circle class="hand-sign" cx="50" cy="130" r="12" fill="#F4A261" />` : `<circle cx="50" cy="130" r="12" fill="#F4A261" />`}
            ${animate ? `<circle class="hand-sign-alt" cx="130" cy="130" r="12" fill="#F4A261" />` : `<circle cx="130" cy="130" r="12" fill="#F4A261" />`}
            
            <!-- Fingers (simplified) -->
            ${animate ? `<circle class="hand-sign" cx="45" cy="125" r="4" fill="#F4A261" />` : `<circle cx="45" cy="125" r="4" fill="#F4A261" />`}
            ${animate ? `<circle class="hand-sign" cx="55" cy="125" r="4" fill="#F4A261" />` : `<circle cx="55" cy="125" r="4" fill="#F4A261" />`}
            ${animate ? `<circle class="hand-sign-alt" cx="125" cy="125" r="4" fill="#F4A261" />` : `<circle cx="125" cy="125" r="4" fill="#F4A261" />`}
            ${animate ? `<circle class="hand-sign-alt" cx="135" cy="125" r="4" fill="#F4A261" />` : `<circle cx="135" cy="125" r="4" fill="#F4A261" />`}
        </svg>
    `,

    /**
     * Peer: Deaf child (around 5-10 years old)
     */
    peer: (size = 200, animate = true) => `
        <svg class="character-svg character-interactive" width="${size}" height="${size * 1.2}" viewBox="0 0 160 200">
            <!-- Body (colorful shirt) -->
            <rect x="50" y="100" width="60" height="80" rx="10" fill="#FF6B6B" />
            
            <!-- Head -->
            <circle cx="80" cy="70" r="35" fill="#F4A261" />
            
            <!-- Hair -->
            <path d="M 45 60 Q 80 30 115 60 L 110 70 Q 80 50 50 70 Z" fill="#264653" />
            
            <!-- Face -->
            <ellipse cx="80" cy="75" rx="25" ry="28" fill="#F4A261" />
            
            <!-- Eyes (large, expressive) -->
            <circle cx="68" cy="70" r="7" fill="white" />
            <circle cx="92" cy="70" r="7" fill="white" />
            ${animate ? `<circle class="eye-blink" cx="68" cy="70" r="5" fill="#264653" />` : `<circle cx="68" cy="70" r="5" fill="#264653" />`}
            ${animate ? `<circle class="eye-blink-delay" cx="92" cy="70" r="5" fill="#264653" />` : `<circle cx="92" cy="70" r="5" fill="#264653" />`}
            
            <!-- Eye highlights -->
            <circle cx="66" cy="68" r="2" fill="white" />
            <circle cx="90" cy="68" r="2" fill="white" />
            
            <!-- Smile -->
            <path d="M 70 85 Q 80 92 90 85" stroke="#264653" stroke-width="2" fill="none" stroke-linecap="round" />
            
            <!-- Hands (signing - raised) -->
            ${animate ? `<circle class="hand-sign" cx="40" cy="120" r="10" fill="#F4A261" />` : `<circle cx="40" cy="120" r="10" fill="#F4A261" />`}
            ${animate ? `<circle class="hand-sign-alt" cx="120" cy="120" r="10" fill="#F4A261" />` : `<circle cx="120" cy="120" r="10" fill="#F4A261" />`}
            
            <!-- Arms -->
            <line x1="50" y1="110" x2="40" y2="120" stroke="#FF6B6B" stroke-width="8" stroke-linecap="round" />
            <line x1="110" y1="110" x2="120" y2="120" stroke="#FF6B6B" stroke-width="8" stroke-linecap="round" />
        </svg>
    `,

    /**
     * Animal Friend: Cheerful Cat (for rewards)
     */
    cat: (size = 140, animate = true) => `
        <svg class="character-svg character-interactive" width="${size}" height="${size}" viewBox="0 0 140 140">
            <!-- Body -->
            <ellipse cx="70" cy="90" rx="40" ry="35" fill="#FFD93D" />
            
            <!-- Head -->
            <circle cx="70" cy="60" r="35" fill="#FFD93D" />
            
            <!-- Ears -->
            <path d="M 40 40 L 35 15 L 55 30 Z" fill="#FFD93D" />
            <path d="M 100 40 L 105 15 L 85 30 Z" fill="#FFD93D" />
            
            <!-- Inner ears -->
            <path d="M 42 38 L 38 20 L 52 32 Z" fill="#FF6B6B" />
            <path d="M 98 38 L 102 20 L 88 32 Z" fill="#FF6B6B" />
            
            <!-- Face -->
            <ellipse cx="70" cy="65" rx="28" ry="25" fill="#FFF8E7" />
            
            <!-- Eyes -->
            <circle cx="58" cy="60" r="8" fill="white" />
            <circle cx="82" cy="60" r="8" fill="white" />
            ${animate ? `<circle class="eye-blink" cx="58" cy="60" r="5" fill="#264653" />` : `<circle cx="58" cy="60" r="5" fill="#264653" />`}
            ${animate ? `<circle class="eye-blink-delay" cx="82" cy="60" r="5" fill="#264653" />` : `<circle cx="82" cy="60" r="5" fill="#264653" />`}
            
            <!-- Nose -->
            <path d="M 67 70 L 70 73 L 73 70 Z" fill="#FF6B6B" />
            
            <!-- Smile -->
            <path d="M 60 78 Q 70 85 80 78" stroke="#264653" stroke-width="2" fill="none" stroke-linecap="round" />
            
            <!-- Whiskers -->
            <line x1="45" y1="70" x2="30" y2="68" stroke="#264653" stroke-width="1.5" />
            <line x1="45" y1="75" x2="30" y2="75" stroke="#264653" stroke-width="1.5" />
            <line x1="95" y1="70" x2="110" y2="68" stroke="#264653" stroke-width="1.5" />
            <line x1="95" y1="75" x2="110" y2="75" stroke="#264653" stroke-width="1.5" />
            
            <!-- Tail (wagging) -->
            ${animate ? `<path class="tail-wag" d="M 110 90 Q 130 80 125 60" stroke="#FFD93D" stroke-width="8" fill="none" stroke-linecap="round" style="transform-origin: 110px 90px;" />` : `<path d="M 110 90 Q 130 80 125 60" stroke="#FFD93D" stroke-width="8" fill="none" stroke-linecap="round" />`}
            
            <!-- Paws -->
            <ellipse cx="50" cy="120" rx="12" ry="8" fill="#FFD93D" />
            <ellipse cx="90" cy="120" rx="12" ry="8" fill="#FFD93D" />
        </svg>
    `,

    /**
     * Book character (for curriculum feature)
     */
    book: (size = 100, animate = true) => `
        <svg class="character-svg" width="${size}" height="${size}" viewBox="0 0 100 100">
            <!-- Book body -->
            <rect x="20" y="25" width="60" height="55" rx="5" fill="#4ECDC4" />
            <rect x="25" y="30" width="50" height="45" rx="3" fill="white" />
            
            <!-- Pages lines -->
            <line x1="30" y1="40" x2="70" y2="40" stroke="#4ECDC4" stroke-width="2" />
            <line x1="30" y1="48" x2="65" y2="48" stroke="#4ECDC4" stroke-width="2" />
            <line x1="30" y1="56" x2="60" y2="56" stroke="#4ECDC4" stroke-width="2" />
            
            <!-- Bookmark -->
            <path d="M 75 25 L 80 40 L 75 35 L 70 40 Z" fill="#FF6B6B" />
            
            <!-- Sparkles -->
            ${animate ? `<circle class="float" cx="15" cy="20" r="3" fill="#FFD93D" style="animation-delay: 0s;" />` : ''}
            ${animate ? `<circle class="float" cx="85" cy="70" r="2" fill="#FFD93D" style="animation-delay: 0.5s;" />` : ''}
            ${animate ? `<circle class="float" cx="80" cy="25" r="2.5" fill="#FF6B6B" style="animation-delay: 1s;" />` : ''}
        </svg>
    `,

    /**
     * Sparkle/Illustration character
     */
    sparkle: (size = 100, animate = true) => `
        <svg class="character-svg" width="${size}" height="${size}" viewBox="0 0 100 100">
            <!-- Star shape -->
            <polygon points="50,10 61,40 95,40 68,60 78,90 50,72 22,90 32,60 5,40 39,40" 
                     fill="#A78BFA" stroke="#7C3AED" stroke-width="2" />
            
            <!-- Center circle -->
            <circle cx="50" cy="50" r="15" fill="white" />
            
            <!-- Eyes -->
            ${animate ? `<circle class="eye-blink" cx="45" cy="48" r="4" fill="#264653" />` : `<circle cx="45" cy="48" r="4" fill="#264653" />`}
            ${animate ? `<circle class="eye-blink-delay" cx="55" cy="48" r="4" fill="#264653" />` : `<circle cx="55" cy="48" r="4" fill="#264653" />`}
            
            <!-- Smile -->
            <path d="M 45 58 Q 50 63 55 58" stroke="#264653" stroke-width="2" fill="none" stroke-linecap="round" />
            
            <!-- Floating sparkles around -->
            ${animate ? `<circle class="float" cx="20" cy="20" r="3" fill="#FFD93D" style="animation-delay: 0s;" />` : ''}
            ${animate ? `<circle class="float" cx="80" cy="25" r="2" fill="#FF6B6B" style="animation-delay: 0.3s;" />` : ''}
            ${animate ? `<circle class="float" cx="85" cy="75" r="2.5" fill="#4ECDC4" style="animation-delay: 0.6s;" />` : ''}
            ${animate ? `<circle class="float" cx="15" cy="80" r="2" fill="#A78BFA" style="animation-delay: 0.9s;" />` : ''}
        </svg>
    `,

    /**
     * Sign language hands character
     */
    signHands: (size = 100, animate = true) => `
        <svg class="character-svg" width="${size}" height="${size}" viewBox="0 0 100 100">
            <!-- Left hand -->
            ${animate ? `<g class="hand-sign">` : '<g>'}
                <path d="M 20 70 L 25 40 L 30 35 L 35 40 L 40 60 L 35 75 Z" fill="#F4A261" stroke="#264653" stroke-width="2" />
                <circle cx="28" cy="38" r="8" fill="#F4A261" stroke="#264653" stroke-width="2" />
            </g>
            
            <!-- Right hand -->
            ${animate ? `<g class="hand-sign-alt">` : '<g>'}
                <path d="M 80 70 L 75 40 L 70 35 L 65 40 L 60 60 L 65 75 Z" fill="#F4A261" stroke="#264653" stroke-width="2" />
                <circle cx="72" cy="38" r="8" fill="#F4A261" stroke="#264653" stroke-width="2" />
            </g>
            
            <!-- Heart between hands -->
            <path d="M 50 55 C 45 45, 35 50, 40 60 L 50 70 L 60 60 C 65 50, 55 45, 50 55" fill="#FF6B6B" />
            
            <!-- Sparkles -->
            ${animate ? `<circle class="float" cx="30" cy="25" r="2" fill="#FFD93D" style="animation-delay: 0s;" />` : ''}
            ${animate ? `<circle class="float" cx="70" cy="25" r="2" fill="#FFD93D" style="animation-delay: 0.5s;" />` : ''}
        </svg>
    `
};

// Auto-inject characters into containers
document.addEventListener('DOMContentLoaded', () => {
    // Inject mascot into header
    const headerChar = document.getElementById('header-character');
    if (headerChar) headerChar.innerHTML = Characters.owl(50, true);
    
    // Inject mascot into corner (REMOVED - see base.html update below)
});