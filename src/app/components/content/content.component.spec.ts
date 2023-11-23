import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  test('should match with snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });
});
