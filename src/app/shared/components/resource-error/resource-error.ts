import { Component, computed, input, output } from '@angular/core';
import { ApiErrorResponse } from '../../api/api-error-response';

@Component({
  imports: [],
  selector: 'app-resource-error',
  styleUrl: './resource-error.scss',
  templateUrl: './resource-error.html',
})
export class ResourceError {
  readonly error = input<ApiErrorResponse | undefined>();
  readonly retry = output<void>();

  protected readonly title = computed(() => {
    switch (this.error()?.errorType) {
      case 'network':
        return 'Connexion au serveur impossible';
      case 'unauthorized':
        return 'Authentification requise';
      case 'forbidden':
        return 'Accès refusé';
      case 'notfound':
        return 'Ressource introuvable';
      case 'badrequest':
      case 'unprocessable':
        return 'Les données ne peuvent pas être chargées';
      case 'conflict':
        return 'Conflit lors du chargement';
      case 'server':
        return 'Erreur du serveur';
      default:
        return 'Une erreur est survenue';
    }
  });
}
