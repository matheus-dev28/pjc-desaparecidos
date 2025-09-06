import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasSearchComponent } from './pessoas-search.component';

describe('PessoasSearchComponent', () => {
  let component: PessoasSearchComponent;
  let fixture: ComponentFixture<PessoasSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoasSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
