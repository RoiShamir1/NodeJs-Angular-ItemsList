import { Component } from '@angular/core';
import Animal from '../model/animal.model';
import { AnimalsService } from '../services/animals.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  list: Animal[] = [];
  constructor(private animalService: AnimalsService) {
    animalService.get().subscribe((date) => {
      this.list = date as Animal[];
    });
  }

  delete(id: number) {
    this.animalService.delete(id).subscribe(() => {
      this.list = this.list.filter((p) => p.id != id);
    });
  }
}
