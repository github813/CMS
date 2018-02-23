import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#example1').DataTable();
  }

}
