import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('FormComponent', () => {
  let location: Location;
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let compiled: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent, RouterTestingModule.withRoutes([
        { path: 'agregar-producto', component: FormComponent }
      ])]
    })
      .compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    router.initialNavigation();
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  test('should match with snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

});
