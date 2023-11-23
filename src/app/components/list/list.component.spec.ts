import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { Router } from '@angular/router';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let compiled: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
    })
      .compileComponents();
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    router = TestBed.inject(Router);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match with snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

});
