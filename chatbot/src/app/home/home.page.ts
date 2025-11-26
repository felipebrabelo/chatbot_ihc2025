import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements AfterViewInit {

  userMessage = '';
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
  selectedConversation: any = null;
  isDarkMode = false;
  isMenuMinimized = false;

  constructor(
    private router: Router, 
    private auth: AuthService,
    private themeService: ThemeService
  ) { }

  ngAfterViewInit() {
    this.themeService.darkMode$.subscribe(value => {
      this.isDarkMode = value;
    });
    this.themeService.menuMinimized$.subscribe(value => {
      this.isMenuMinimized = value;
    });
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

  closeConversation() {
    this.selectedConversation = null;
  }

  goToTemporaryChat() {
    this.router.navigate(['/temporary-chat']);
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  toggleMenu() {
    this.themeService.toggleMenu();
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      console.log('Mensagem enviada:', this.userMessage);
      this.router.navigate(['/chat'], {
        queryParams: {
          message: this.userMessage
        }
      });
      this.userMessage = '';
    }
  }

  goToChat(chatType: string) {
    if (chatType == 'chat') {
      this.router.navigate(['/chat']);
    }
    if (chatType == 'sleep-chat') {
      this.router.navigate(['/sleep-chat'], {
        queryParams: {
          newChat: true
        }
      }
      );
    }

  }

}
