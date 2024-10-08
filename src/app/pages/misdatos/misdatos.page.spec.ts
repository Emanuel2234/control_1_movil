import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MisDatosPage } from './misdatos.page';

describe('MisDatosPage', () => {
  let component: MisDatosPage;
  let fixture: ComponentFixture<MisDatosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisDatosPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//close