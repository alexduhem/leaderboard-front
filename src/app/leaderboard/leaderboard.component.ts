import {Component, OnInit} from '@angular/core';
import {Player} from '../services/models';
import {LeaderboardService} from '../services/leaderboard-service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PlayerItemComponent} from '../player-item/player-item.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  standalone: true,
  imports: [
    PlayerItemComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
})
export class LeaderboardComponent implements OnInit {
  players: Player[] = []
  playerSlug = ""

  constructor(private service: LeaderboardService) {

  }

  ngOnInit(): void {
    this.refreshPlayersList()
  }

  addPlayer() {
    this.service.addPlayer(this.playerSlug).then((player) => {
      this.players.push(player)
      this.playerSlug = ""
    })
  }

  refreshPlayersList() {
    this.service.getAllPlayers().then(response => this.players = response.players);
  }

  async resetTournament()  {
    this.players = []
    this.service.deleteAllPlayers().then(()=> console.log('Tournament has been reset!'))
  }
}
