import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../demonlord/services/character.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private characterService = inject(CharacterService);

  protected readonly title = signal('auspex-selvae');
  protected readonly characters =
    this.characterService.getAllMetadata();
}
