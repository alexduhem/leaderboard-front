import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../services/models';
import {FormsModule} from '@angular/forms';
import {LeaderboardService} from '../services/leaderboard-service';

@Component({
  selector: 'app-player-item',
  imports: [
    FormsModule
  ],
  templateUrl: './player-item.component.html',
  standalone: true,
  styleUrl: './player-item.component.css'
})
export class PlayerItemComponent implements OnInit {

  constructor(private service: LeaderboardService) {

  }

  ngOnInit(): void {
    this.points = this.player.points
  }

  points: number;
  @Input() player: Player;
  @Output() playerScoreUpdated = new EventEmitter<void>();

  updatePoints() {
    this.service.updatePlayerPoints(this.player, this.points).then(() => {
      this.playerScoreUpdated.emit();
    })
  }
}
