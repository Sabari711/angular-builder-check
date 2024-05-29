import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForEmployersComponent } from './for-employers.component';

describe('ForEmployersComponent', () => {
  let component: ForEmployersComponent;
  let fixture: ComponentFixture<ForEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForEmployersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
