import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceModalComponent } from './add-price-modal.component';

describe('AddPriceModalComponent', () => {
  let component: AddPriceModalComponent;
  let fixture: ComponentFixture<AddPriceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPriceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
