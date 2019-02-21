import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFoodPriceComponent } from './card-food-price.component';

describe('CardFoodPriceComponent', () => {
  let component: CardFoodPriceComponent;
  let fixture: ComponentFixture<CardFoodPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFoodPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFoodPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
