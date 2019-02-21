import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRecipeCardComponent } from './select-recipe-card.component';

describe('SelectRecipeCardComponent', () => {
  let component: SelectRecipeCardComponent;
  let fixture: ComponentFixture<SelectRecipeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRecipeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
