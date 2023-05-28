import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllDicomComponent } from './view-all-dicom.component';

describe('ViewAllDicomComponent', () => {
  let component: ViewAllDicomComponent;
  let fixture: ComponentFixture<ViewAllDicomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllDicomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllDicomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
