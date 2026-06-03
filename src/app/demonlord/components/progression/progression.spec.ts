import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressionComponent } from './progression';
import { characterData } from '../../demonlord-data';

describe('ProgressionComponent', () => {
  let component: ProgressionComponent;
  let fixture: ComponentFixture<ProgressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressionComponent],
     }).compileComponents();

    fixture = TestBed.createComponent(ProgressionComponent);
    component = fixture.componentInstance;
   });

  it('should create', () => {
    expect(component).toBeTruthy();
   });

  it('should display progression details', () => {
    component.progression = characterData.progression;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Niveau');
    expect(container.textContent).toContain('5');
    expect(container.textContent).toContain('Automate');
    expect(container.textContent).toContain('Grand Brasseur');
   });
});
