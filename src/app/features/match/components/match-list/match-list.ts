import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match-service';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-list.html',
  styleUrls: ['./match-list.scss'],
})
export class MatchList {
 
}
