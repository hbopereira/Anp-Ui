import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseCadastroComponent } from './classe-cadastro.component';

describe('ClasseCadastroComponent', () => {
  let component: ClasseCadastroComponent;
  let fixture: ComponentFixture<ClasseCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
