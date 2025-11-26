import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-history-chat',
  templateUrl: './history-chat.page.html',
  styleUrls: ['./history-chat.page.scss'],
  standalone: false
})
export class HistoryChatPage implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  conversation: any;
  messages: { sender: string; text: string }[] = [];
  userMessage = '';
  isDarkMode = false;
  isMenuMinimized = false;
  isTyping = false;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.conversation = navigation?.extras?.state?.['conversation'];
    
    if (!this.conversation) {
      this.router.navigate(['/home']);
    } else {
      this.messages = [...this.conversation.conversation];
    }
  }

  ngOnInit() {
    this.themeService.darkMode$.subscribe(value => {
      this.isDarkMode = value;
    });
    this.themeService.menuMinimized$.subscribe(value => {
      this.isMenuMinimized = value;
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  toggleMenu() {
    this.themeService.toggleMenu();
  }

  goToHome() {
    this.router.navigate(['/home']);
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

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({
        sender: 'user',
        text: this.userMessage
      });

      const tempMessage = this.userMessage;
      this.userMessage = '';
      this.isTyping = true;

      setTimeout(() => {
        this.messages.push({
          sender: 'bot',
          text: this.generateBotResponse(tempMessage)
        });
        this.isTyping = false;
      }, 1500);
    }
  }

  generateBotResponse(userMessage: string): string {
    const responses = [
      'Entendo como você se sente. Quer me contar mais sobre isso?',
      'Isso é muito importante. Como posso ajudá-lo hoje?',
      'Obrigada por compartilhar isso comigo. Vamos trabalhar nisso juntos.',
      'Percebo que isso tem sido difícil para você. Estou aqui para apoiar.',
      'Suas sensações são válidas. Que tal explorarmos algumas técnicas que podem ajudar?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
