import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  { path: 'archive', component: ArchiveComponent },
  { path: '', component: TablesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
