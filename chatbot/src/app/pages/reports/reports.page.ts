import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ThemeService } from '../../services/theme.service';

Chart.register(...registerables);

interface Tip {
  title: string;
  description: string;
  likes: number;
  readTime: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: false
})
export class ReportsPage implements OnInit, AfterViewInit {

  moodAverage = 4.2;
  totalInteractions = 47;
  totalTime = 185;
  peakHour = '20:00';
  isDarkMode = false;
  isMenuMinimized = false;
  selectedConversation: any = null;

  weeks = [
    { 
      title: 'Ansiedade noturna',
      date: 'Segunda-feira, 18/11',
      preview: 'Tenho sentido muita ansiedade antes de dormir...',
      conversation: [
        { sender: 'user', text: 'Tenho sentido muita ansiedade antes de dormir. Não consigo desligar minha mente.' },
        { sender: 'bot', text: 'Entendo como isso pode ser desafiador. A ansiedade noturna é comum e existem técnicas que podem ajudar. Você já tentou alguma prática de relaxamento antes de dormir?' },
        { sender: 'user', text: 'Não, nunca tentei nada específico.' },
        { sender: 'bot', text: 'Que tal começarmos com exercícios de respiração? Temos uma seção dedicada a isso. Também recomendo evitar telas 1 hora antes de dormir e criar uma rotina relaxante.' },
        { sender: 'user', text: 'Vou tentar. Obrigada pela sugestão.' },
        { sender: 'bot', text: 'De nada! Estou aqui sempre que precisar. Que tal experimentar nossa seção de respiração guiada agora?' }
      ]
    },
    { 
      title: 'Estresse no trabalho',
      date: 'Quarta-feira, 20/11',
      preview: 'Estou me sentindo sobrecarregado com o trabalho...',
      conversation: [
        { sender: 'user', text: 'Estou me sentindo sobrecarregado com o trabalho. Sinto que nunca é suficiente.' },
        { sender: 'bot', text: 'Reconheço que você está passando por um momento difícil. O estresse ocupacional pode afetar muito nossa saúde mental. Como anda seu equilíbrio entre trabalho e vida pessoal?' },
        { sender: 'user', text: 'Praticamente inexistente. Trabalho até tarde e finais de semana.' },
        { sender: 'bot', text: 'Isso é insustentável a longo prazo. Que tal começarmos estabelecendo pequenos limites? Por exemplo, definir um horário para parar de trabalhar.' },
        { sender: 'user', text: 'Tenho medo de não conseguir entregar tudo.' },
        { sender: 'bot', text: 'Essa preocupação é válida, mas lembre-se: sua saúde vem primeiro. Produtividade sem descanso leva ao esgotamento. Vamos trabalhar juntos em estratégias de gestão de tempo?' }
      ]
    },
    { 
      title: 'Relacionamentos',
      date: 'Sexta-feira, 22/11',
      preview: 'Tenho dificuldade em me conectar com as pessoas...',
      conversation: [
        { sender: 'user', text: 'Tenho dificuldade em me conectar com as pessoas. Sempre me sinto deslocado.' },
        { sender: 'bot', text: 'Sentir-se deslocado socialmente pode ser muito solitário. Você consegue identificar quando começou a se sentir assim?' },
        { sender: 'user', text: 'Acho que sempre fui assim, mas piorou depois da pandemia.' },
        { sender: 'bot', text: 'A pandemia afetou profundamente nossas habilidades sociais. É natural precisar de tempo para se readaptar. O que você gosta de fazer? Talvez possamos encontrar formas de se conectar através de interesses em comum.' },
        { sender: 'user', text: 'Gosto de ler e caminhar.' },
        { sender: 'bot', text: 'Que legal! Já pensou em participar de clubes de leitura ou grupos de caminhada? São formas menos intimidadoras de conhecer pessoas com interesses similares.' }
      ]
    },
    { 
      title: 'Autoestima',
      date: 'Domingo, 24/11',
      preview: 'Não me sinto bom o suficiente...',
      conversation: [
        { sender: 'user', text: 'Não me sinto bom o suficiente. Sempre me comparo aos outros e saio perdendo.' },
        { sender: 'bot', text: 'A comparação com outros é um dos maiores ladrões da felicidade. Cada pessoa tem sua própria jornada. O que você mais admira em si mesmo?' },
        { sender: 'user', text: 'Não sei... não consigo pensar em nada.' },
        { sender: 'bot', text: 'Vamos começar pequeno. Que tal fazer um exercício de gratidão diário? Todo dia, anote três coisas sobre você pelas quais é grato - podem ser pequenas!' },
        { sender: 'user', text: 'Parece difícil, mas posso tentar.' },
        { sender: 'bot', text: 'Isso mesmo! O simples fato de estar disposto a tentar já é algo positivo. Confira nossa seção de exercícios de autoconhecimento, pode ajudar muito nessa jornada.' }
      ]
    }
  ];

  comunicacaoTips: Tip[] = [
    {
      title: 'Escuta Ativa',
      description: 'Pratique ouvir atentamente sem interromper. Mantenha contato visual e faça perguntas para demonstrar interesse genuíno na conversa.',
      likes: 156,
      readTime: 3
    },
    {
      title: 'Comunicação Não-Violenta',
      description: 'Expresse seus sentimentos e necessidades de forma clara, sem culpar ou criticar. Use "eu sinto" em vez de "você fez".',
      likes: 132,
      readTime: 4
    },
    {
      title: 'Linguagem Corporal',
      description: 'Esteja atento aos sinais não-verbais. Postura aberta, gestos naturais e expressões faciais adequadas fortalecem sua mensagem.',
      likes: 98,
      readTime: 3
    }
  ];

  sonoTips: Tip[] = [
    {
      title: 'Rotina Pré-Sono',
      description: 'Estabeleça rituais relaxantes antes de dormir: banho morno, leitura leve ou música suave. Evite telas 1 hora antes.',
      likes: 203,
      readTime: 4
    },
    {
      title: 'Ambiente Ideal',
      description: 'Mantenha o quarto escuro, silencioso e fresco (18-22°C). Use cortinas blackout e considere ruído branco se necessário.',
      likes: 167,
      readTime: 3
    },
    {
      title: 'Horários Regulares',
      description: 'Durma e acorde no mesmo horário todos os dias, incluindo fins de semana. Isso regula seu relógio biológico natural.',
      likes: 189,
      readTime: 2
    }
  ];

  constructor(private themeService: ThemeService, private router: Router) { }

  ngOnInit() {
    this.themeService.darkMode$.subscribe(value => {
      this.isDarkMode = value;
    });
    this.themeService.menuMinimized$.subscribe(value => {
      this.isMenuMinimized = value;
    });
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  toggleMenu() {
    this.themeService.toggleMenu();
  }

  newChat() {
    this.router.navigate(['/chat']);
  }

  goToExercises() {
    this.router.navigate(['/exercises']);
  }

  goToBreathing() {
    this.router.navigate(['/breathing']);
  }

  goToReport() {
    this.router.navigate(['/reports']);
  }

  selectWeek(conversation: any) {
    this.selectedConversation = conversation;
  }

  openConversationPage(conversation: any) {
    this.router.navigate(['/history-chat'], {
      state: { conversation: conversation }
    });
  }

  goToTemporaryChat() {
    this.router.navigate(['/temporary-chat']);
  }

  sendReportByEmail() {
    // Implementar lógica de envio de email
    alert('Relatório será enviado para seu email!');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createMoodChart();
      this.createInteractionsChart();
      this.createTimeChart();
      this.createActivityChart();
    }, 100);
  }

  createMoodChart() {
    const ctx = document.getElementById('moodChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          datasets: [{
            label: 'Humor',
            data: [4, 3.5, 4.5, 4, 5, 4.5, 4],
            borderColor: '#432E65',
            backgroundColor: 'rgba(201, 184, 231, 0.2)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 5,
              ticks: {
                color: '#432E65'
              }
            },
            x: {
              ticks: {
                color: '#432E65'
              }
            }
          }
        }
      });
    }
  }

  createInteractionsChart() {
    const ctx = document.getElementById('interactionsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
          datasets: [{
            label: 'Interações',
            data: [8, 6, 7, 9, 5, 6, 6],
            backgroundColor: '#C9B8E7',
            borderColor: '#432E65',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#432E65'
              }
            },
            x: {
              ticks: {
                color: '#432E65'
              }
            }
          }
        }
      });
    }
  }

  createTimeChart() {
    const ctx = document.getElementById('timeChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
          datasets: [{
            data: [30, 25, 28, 35, 20, 22, 25],
            backgroundColor: [
              '#432E65',
              '#5A3E85',
              '#714EA5',
              '#885EC5',
              '#9F6EE5',
              '#B68EF5',
              '#C9B8E7'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#432E65',
                font: {
                  size: 10
                }
              }
            }
          }
        }
      });
    }
  }

  createActivityChart() {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Manhã', 'Tarde', 'Noite', 'Madrugada'],
          datasets: [{
            label: 'Atividade',
            data: [30, 45, 85, 20],
            backgroundColor: 'rgba(201, 184, 231, 0.2)',
            borderColor: '#432E65',
            pointBackgroundColor: '#432E65',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#432E65'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            r: {
              beginAtZero: true,
              ticks: {
                color: '#432E65'
              },
              pointLabels: {
                color: '#432E65'
              }
            }
          }
        }
      });
    }
  }

}
