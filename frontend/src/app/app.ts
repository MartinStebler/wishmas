import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface HealthResponse {
  status: string;
  service: string;
}

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly apiStatus = signal('API-Status wird geprüft…');

  ngOnInit(): void {
    this.http.get<HealthResponse>('/api/health').subscribe({
      next: (response) => {
        if (response.status === 'ok') {
          this.apiStatus.set('API verbunden');
        } else {
          this.apiStatus.set('API antwortet unerwartet');
        }
      },
      error: () => {
        this.apiStatus.set('API nicht erreichbar');
      },
    });
  }
}
