/* ============================================
   لغتي بالإشارة — Full App & Games Engine
   ============================================ */

console.log('🤟 App & Games loaded');

// ============ 1. STORAGE SYSTEM (No Accounts!) ============
const Store = {
    get(key, def) { try { return JSON.parse(localStorage.getItem(key)) || def; } catch { return def; } },
    set(key, val) { localStorage.setItem(key, JSON.stringify(val)); document.dispatchEvent(new Event('storage-change')); },
    
    // Favorites
    getFavorites: () => Store.get('lughaty_favorites', []),
    toggleFavorite: (id) => {
        let list = Store.getFavorites();
        list.includes(id) ? list = list.filter(i => i !== id) : list.push(id);
        Store.set('lughaty_favorites', list);
    },

    // Progress (Learned Words)
    getProgress: () => Store.get('lughaty_progress', []),
    markLearned: (id) => {
        let list = Store.getProgress();
        if (!list.includes(id)) { list.push(id); Store.set('lughaty_progress', list); }
    },

    // Scores & Streaks
    getScores: () => Store.get('lughaty_scores', { memory: 0, quiz: 0 }),
    saveScore: (game, score) => {
        let scores = Store.getScores();
        if (score > scores[game]) { scores[game] = score; Store.set('lughaty_scores', scores); }
    },
    getStreak: () => {
        let data = Store.get('lughaty_streak', { count: 0, lastDate: null });
        let today = new Date().toDateString();
        if (data.lastDate !== today) {
            let yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
            if (data.lastDate === yesterday.toDateString()) data.count++;
            else data.count = 1;
            data.lastDate = today;
            Store.set('lughaty_streak', data);
        }
        return data.count;
    }
};

// ============ 2. UI UPDATES ============
function updateUI() {
    document.querySelectorAll('[data-fav-count]').forEach(el => el.textContent = Store.getFavorites().length);
    document.querySelectorAll('[data-learned-count]').forEach(el => el.textContent = Store.getProgress().length);
    document.querySelectorAll('[data-streak-count]').forEach(el => el.textContent = Store.getStreak() + ' 🔥');
    
    document.querySelectorAll('[data-fav-toggle]').forEach(btn => {
        const id = parseInt(btn.dataset.favToggle);
        const isFav = Store.getFavorites().includes(id);
        btn.textContent = isFav ? '★' : '☆';
        btn.className = isFav ? 'text-red-500 text-2xl' : 'text-gray-400 text-2xl';
    });
}
document.addEventListener('storage-change', updateUI);

// ============ 3. SEARCH & TTS (From before) ============
const Search = {
    init() {
        this.modal = document.getElementById('search-modal');
        if (!this.modal) return;
        this.input = document.getElementById('search-input');
        this.results = document.getElementById('search-results');
        
        document.getElementById('search-open-btn').onclick = () => { this.modal.classList.remove('hidden'); this.input.focus(); };
        document.getElementById('search-close-btn').onclick = () => this.modal.classList.add('hidden');
        this.input.oninput = (e) => this.search(e.target.value);
    },
    async search(q) {
        if (q.length < 1) { this.results.innerHTML = ''; return; }
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        this.results.innerHTML = data.map(r => `
            <a href="/word/${r.id}" class="block p-4 hover:bg-gray-50 border-b">
                <div class="font-bold text-deep-blue">${r.diacritics || r.arabic_word}</div>
                <div class="text-sm text-gray-500">${r.lesson_title}</div>
            </a>`).join('');
    }
};

const TTS = {
    init() {
        const btn = document.getElementById('tts-btn');
        if (!btn) return;
        btn.onclick = () => {
            const u = new SpeechSynthesisUtterance(btn.dataset.word);
            u.lang = 'ar-SA'; u.rate = 0.85;
            window.speechSynthesis.speak(u);
        };
    }
};

// ============ 4. MEMORY GAME ENGINE (FIXED) ============
const MemoryGame = {
    async init() {
        const board = document.getElementById('memory-board');
        const status = document.getElementById('memory-status');
        if (!board) return;

        status.textContent = 'جاري تحميل البطاقات...';
        const res = await fetch('/api/random-words/8');
        const words = await res.json();

        // Create pairs: Word card + Meaning card
        let cards = [];
        words.forEach(w => {
            cards.push({ id: w.id, text: w.diacritics || w.arabic_word, type: 'word' });
            cards.push({ id: w.id, text: w.meaning, type: 'meaning' });
        });
        cards.sort(() => Math.random() - 0.5);

        // FIXED: Proper card structure with hidden content
        board.innerHTML = cards.map((c, i) => `
            <div class="memory-card relative bg-primary rounded-xl flex items-center justify-center text-xl font-bold cursor-pointer h-24 md:h-32 shadow-md transition-all duration-300 hover:scale-105" 
                 data-idx="${i}" 
                 data-id="${c.id}" 
                 data-type="${c.type}">
                <!-- Card Back (Question Mark) - Shown Initially -->
                <div class="card-back absolute inset-0 flex items-center justify-center text-5xl text-white">
                    ❓
                </div>
                <!-- Card Front (Content) - Hidden Initially -->
                <div class="card-front absolute inset-0 flex items-center justify-center p-2 text-center text-white bg-primary rounded-xl hidden">
                    ${c.text}
                </div>
            </div>
        `).join('');

        let flipped = [], matched = 0, moves = 0;
        const totalPairs = words.length;

        board.querySelectorAll('.memory-card').forEach(card => {
            card.onclick = () => {
                if (flipped.length === 2 || card.classList.contains('matched') || flipped.includes(card)) return;
                
                // Flip the card: hide back, show front
                card.querySelector('.card-back').classList.add('hidden');
                card.querySelector('.card-front').classList.remove('hidden');
                card.classList.add('bg-white', 'text-gray-800', 'border-2', 'border-primary');
                flipped.push(card);

                if (flipped.length === 2) {
                    moves++;
                    const [c1, c2] = flipped;
                    
                    // Check if they match (same ID, different types)
                    if (c1.dataset.id === c2.dataset.id && c1.dataset.type !== c2.dataset.type) {
                        // Match found!
                        setTimeout(() => {
                            c1.classList.add('matched', 'bg-green', 'text-white');
                            c1.classList.remove('bg-white', 'text-gray-800', 'border-2', 'border-primary');
                            c2.classList.add('matched', 'bg-green', 'text-white');
                            c2.classList.remove('bg-white', 'text-gray-800', 'border-2', 'border-primary');
                        }, 500);
                        matched++;
                        flipped = [];
                        
                        if (matched === totalPairs) {
                            const score = Math.max(100 - (moves - totalPairs) * 5, 10);
                            Store.saveScore('memory', score);
                            setTimeout(() => {
                                status.innerHTML = `🎉 أحسنت! أنهيت اللعبة في ${moves} حركة. <br><a href='/games' class='underline text-primary'>العودة للتحديات</a>`;
                            }, 600);
                        }
                    } else {
                        // No match - flip back after delay
                        setTimeout(() => {
                            c1.querySelector('.card-back').classList.remove('hidden');
                            c1.querySelector('.card-front').classList.add('hidden');
                            c1.classList.remove('bg-white', 'text-gray-800', 'border-2', 'border-primary');
                            c2.querySelector('.card-back').classList.remove('hidden');
                            c2.querySelector('.card-front').classList.add('hidden');
                            c2.classList.remove('bg-white', 'text-gray-800', 'border-2', 'border-primary');
                            flipped = [];
                        }, 1000);
                    }
                    status.textContent = `الحركات: ${moves} | المتطابقات: ${matched}/${totalPairs}`;
                }
            };
        });
    }
};

// ============ 5. QUIZ ENGINE ============
const QuizGame = {
    async init() {
        const container = document.getElementById('quiz-container');
        const status = document.getElementById('quiz-status');
        if (!container) return;

        status.textContent = 'جاري تحضير الأسئلة...';
        const res = await fetch('/api/quiz-words/10');
        const questions = await res.json();
        
        let current = 0, score = 0;

        const renderQuestion = () => {
            if (current >= questions.length) {
                Store.saveScore('quiz', score);
                container.innerHTML = `
                    <div class="text-center py-10">
                        <div class="text-6xl mb-4">🏆</div>
                        <h2 class="text-3xl font-bold text-deep-blue mb-2">انتهى التحدي!</h2>
                        <p class="text-xl text-gray-600 mb-6">نتيجتك: <span class="font-bold text-green">${score}</span> من ${questions.length * 10}</p>
                        <a href="/games" class="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-deep-blue transition">العودة للتحديات</a>
                    </div>`;
                return;
            }

            const q = questions[current];
            container.innerHTML = `
                <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div class="text-sm text-gray-500 mb-4">السؤال ${current + 1} من ${questions.length}</div>
                    <h2 class="text-4xl font-extrabold text-deep-blue mb-8">${q.word}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${q.options.map(opt => `
                            <button class="quiz-opt bg-gray-50 hover:bg-primary hover:text-white border-2 border-gray-200 rounded-xl p-4 text-lg font-bold transition" data-val="${opt}">${opt}</button>
                        `).join('')}
                    </div>
                </div>`;

            container.querySelectorAll('.quiz-opt').forEach(btn => {
                btn.onclick = () => {
                    if (btn.dataset.val === q.correct) {
                        btn.classList.add('bg-green', 'text-white');
                        score += 10;
                    } else {
                        btn.classList.add('bg-red-500', 'text-white');
                        container.querySelectorAll('.quiz-opt').forEach(b => { if(b.dataset.val === q.correct) b.classList.add('bg-green', 'text-white'); });
                    }
                    setTimeout(() => { current++; renderQuestion(); }, 1000);
                };
            });
            status.textContent = `النتيجة: ${score}`;
        };
        renderQuestion();
    }
};

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    Search.init();
    TTS.init();
    MemoryGame.init();
    QuizGame.init();
});


