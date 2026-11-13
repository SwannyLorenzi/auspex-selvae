import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoneyComponent } from './money';
import { MoneyData } from './money-models';

describe('MoneyComponent', () => {
  let component: MoneyComponent;
  let fixture: ComponentFixture<MoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoneyComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('money', {
      couronnes: 28,
      chelins: 3,
      sous: 4,
      eclats: 0,
    } as MoneyData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all currency cards', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Couronnes');
    expect(container.textContent).toContain('28');
    expect(container.textContent).toContain('Chelins');
    expect(container.textContent).toContain('3');
    expect(container.textContent).toContain('Sous');
    expect(container.textContent).toContain('4');
    expect(container.textContent).toContain('Éclats');
    expect(container.textContent).toContain('0');
  });
});
