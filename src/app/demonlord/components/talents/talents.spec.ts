import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TalentsComponent } from './talents';
import { type Talent } from '../../demonlord-models';
import { characterData } from '../../../demonlord-data';

describe('TalentsComponent', () => {
  let component: TalentsComponent;
  let fixture: ComponentFixture<TalentsComponent>;

  const sampleTalents: Talent[] = [
    { name: 'Corps mécanique', description: 'Description du talent 1' },
    { name: 'Tour de magie' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TalentsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('talents', sampleTalents);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display talent names', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Corps mécanique');
    expect(container.textContent).toContain('Tour de magie');
  });

  it('should render buttons for each talent', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    const buttons = container.querySelectorAll('button.talent-card');
    expect(buttons.length).toBe(2);
  });

  it('should not display description when collapsed', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).not.toContain('Description du talent 1');
  });
});
