import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TalentsComponent } from './talents';
import { characterData } from '../../demonlord-data';

describe('TalentsComponent', () => {
  let component: TalentsComponent;
  let fixture: ComponentFixture<TalentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TalentsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('immunities', characterData.immunities);
    fixture.componentRef.setInput('talents', characterData.talents);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display immunities', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('maladies');
    expect(container.textContent).toContain('poison');
  });

  it('should display talents list', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Corps mécanique');
    expect(container.textContent).toContain('Contresort');
  });
});
