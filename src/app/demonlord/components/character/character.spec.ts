import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterComponent } from './character';
import { characterData } from '../../demonlord-data';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the character name', () => {
    fixture.componentRef.setInput('character', characterData);
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('7 7');
    expect(container.textContent).toContain('La Tavernière');
  });

  it('should display the character description', () => {
    fixture.componentRef.setInput('character', characterData);
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('femme humaine');
  });
});
