// ===================================================
// ALTERNÂNCIA DE TEMA (MODO ESCURO / CLARO)
// ===================================================

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    document.body.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Modo Escuro';
  } else {
    document.body.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Modo Claro';
  }
});

// ===================================================
// CONTADORES DE REAÇÕES INTERATIVAS
// ===================================================

const reactionCounts = {
  rainbow: 0,
  clap: 0,
  heart: 0
};

function addReaction(type) {
  if (reactionCounts.hasOwnProperty(type)) {
    reactionCounts[type]++;
    const countElement = document.getElementById(`count-${type}`);
    countElement.textContent = reactionCounts[type];
    
    // Animação rápida no botão clicado
    const button = countElement.closest('.btn-react');
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }
}

// ===================================================
// LÓGICA DO QUIZ (10 PERGUNTAS)
// ===================================================

function calculateQuizScore() {
  const answers = {
    q1: 'b',
    q2: 'a',
    q3: 'b',
    q4: 'a',
    q5: 'b',
    q6: 'a',
    q7: 'b',
    q8: 'a',
    q9: 'a',
    q10: 'b'
  };

  let score = 0;
  let answeredCount = 0;
  const form = document.getElementById('quiz-form');

  for (let i = 1; i <= 10; i++) {
    const radioGroup = form[`q${i}`];
    if (radioGroup) {
      const selectedOption = radioGroup.value;
      if (selectedOption) {
        answeredCount++;
        if (selectedOption === answers[`q${i}`]) {
          score++;
        }
      }
    }
  }

  const resultBox = document.getElementById('quiz-result');
  resultBox.classList.remove('hidden', 'success', 'warning');

  if (answeredCount < 10) {
    resultBox.classList.add('warning');
    resultBox.innerHTML = `⚠️ Por favor, responda a todas as 10 perguntas antes de enviar! (${answeredCount}/10 respondidas)`;
    resultBox.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  let message = '';
  if (score === 10) {
    resultBox.classList.add('success');
    message = `🏆 **Incrível! 10/10 Acertos!**<br>Você é o Rei/Presidente supremo do fandom de *Vermelho, Branco e Sangue Azul*! 👑🇺🇸🇬🇧`;
  } else if (score >= 7) {
    resultBox.classList.add('success');
    message = `👏 **Muito bem! ${score}/10 Acertos!**<br>Você é um verdadeiro expert diplomático e conhece super bem essa história de amor! 🌈`;
  } else {
    resultBox.classList.add('warning');
    message = `🍿 **Você acertou ${score}/10!**<br>Que tal fazer uma maratona do filme hoje mesmo para relembrar os detalhes? ❤️`;
  }

  resultBox.innerHTML = message;
  resultBox.scrollIntoView({ behavior: 'smooth' });
}
