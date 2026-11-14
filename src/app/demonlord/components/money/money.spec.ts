import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyComponent } from './money';
import { MoneyData } from './money-models';

describe('MoneyComponent', () => {
  let component: MoneyComponent;
  let fixture: ComponentFixture<MoneyComponent>;

  const testMoney: MoneyData = { totalShards: 28034 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoneyComponent);
    component = fixture.componentInstance;
    component.characterId.set('test-char');
    component.money.set(testMoney);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display currency breakdown', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    // 28034 shards = 28 co, 0 ca, 3 sc, 4 e
    expect(container.textContent).toContain("Couronnes d'Or");
    expect(container.textContent).toContain('28');
    expect(container.textContent).toContain('Chelins');
    expect(container.textContent).toContain('0');
    expect(container.textContent).toContain('Sous');
    expect(container.textContent).toContain('3');
    expect(container.textContent).toContain('Éclats');
    expect(container.textContent).toContain('4');
  });

  it('should display +/- buttons for each currency', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    // Buttons use +/- symbols as text
    const plusButtons = container.querySelectorAll('.money-inline-plus');
    const minusButtons = container.querySelectorAll('.money-inline-minus');
    expect(plusButtons.length).toBe(4);
    expect(minusButtons.length).toBe(4);
  });
});
