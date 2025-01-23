import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LeaderboardService} from './services/leaderboard-service';
import {Player} from './services/models';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeaderboardComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'leaderboard-front';
  players: Player[] = []
  playerSlug = ""

  constructor(private service: LeaderboardService) {

  }

  ngOnInit(): void {
    this.service.getAllPlayers().then(response => this.players = response.players);
  }

  addPlayer() {
    this.service.addPlayer(this.playerSlug).then((player) => {
      this.players.push(player)
    })
  }
}
