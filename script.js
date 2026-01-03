let answers = {};
let currentStep = 1;

function selectAnswer(key, value) {
  answers[key] = value;
}

function nextStep() {
  if (currentStep < 3) {
    document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('active');
    currentStep++;
    document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('active');
    
    document.getElementById('prevBtn').style.display = 'inline-block';
    if (currentStep === 3) {
      document.getElementById('nextBtn').style.display = 'none';
      document.getElementById('submitBtn').style.display = 'inline-block';
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('active');
    currentStep--;
    document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('active');
    
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('submitBtn').style.display = 'none';
  }
}

// ✅ Simplified quiz: Only 3 scents
function submitQuiz() {
  const profileMap = {
    'dreamy': 'Floral',
    'bold': 'Oriental',
    'calm': 'Woody',
    'energetic': 'Fresh'
  };

  const profile = profileMap[answers.vibe] || 'Floral';

  // Only include your 3 perfumes
  const perfumes = {
    'Floral': {
      name: 'Velvet Rose',
      desc: 'Romantic, elegant, and timeless.',
      image: 'assets/velvet-rose.jpg',
      notes: 'Top: Bergamot • Middle: Rose • Base: Musk'
    },
    'Oriental': {
      name: 'Midnight Amber',
      desc: 'Deep, warm, and mysterious.',
      image: 'assets/midnight-amber.jpg',
      notes: 'Top: Spice • Middle: Vanilla • Base: Amber'
    },
    // Map both 'Woody' and 'Fresh' to Citrus Breeze (or choose one)
    'Woody': {
      name: 'Citrus Breeze',
      desc: 'Vibrant, clean, and uplifting.',
      image: 'assets/citrus-breeze.jpg',
      notes: 'Top: Lemon • Middle: Green Tea • Base: Cedar'
    },
    'Fresh': {
      name: 'Citrus Breeze',
      desc: 'Vibrant, clean, and uplifting.',
      image: 'assets/citrus-breeze.jpg',
      notes: 'Top: Lemon • Middle: Green Tea • Base: Cedar'
    }
  };

  const result = perfumes[profile];

  // Hide quiz
  document.querySelector('.quiz-steps').style.display = 'none';
  document.querySelector('.quiz-actions').style.display = 'none';

  // Show result
  const resultHTML = `
    <div class="result-card">
      <img src="${result.image}" alt="${result.name}" class="result-image">
      <div class="result-info">
        <h3>Your Perfect Scent: ${result.name}</h3>
        <p class="result-desc">${result.desc}</p>
        <p class="result-notes"><strong>Scent Notes:</strong> ${result.notes}</p>
        <div class="result-buttons">
          <button class="btn" onclick="location.reload()">Try Again</button>
          <button class="btn outlined" onclick="addToWishlist('${result.name}')">Add to Wishlist</button>
        </div>
      </div>
    </div>
  `;

  document.querySelector('#quiz .container').innerHTML = resultHTML;
}

// Wishlist function
function addToWishlist(name) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  if (!wishlist.includes(name)) {
    wishlist.push(name);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(`✅ "${name}" added to your wishlist!`);
  } else {
    alert(`❤️ "${name}" is already in your wishlist.`);
  }
}

// Dark mode toggle (if you have it)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggle.textContent = '☀️';
    }
    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }
});