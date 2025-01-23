import {Injectable} from '@angular/core';
import {Player, PlayerResponse} from './models';

// const BASE_URL = "http://localhost:8080"
const BASE_URL = "https://betclic-leaderboard.ew.r.appspot.com/"

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  async getAllPlayers() {
    const response = await fetch(`${BASE_URL}/players`);
    return await response.json() as PlayerResponse
  }

  async deleteAllPlayers() {
    await fetch(`${BASE_URL}/players`, {
      method: 'DELETE',
    });
  }

  async addPlayer(slug: string) {
    const response = await fetch(`${BASE_URL}/players`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({slug})
    });
    if (!response.ok) {
      throw new Error("Could not create player with slug '" + slug + "'");
    }
    return (await response.json()) as Player;
  }

  async updatePlayerPoints(player: Player, points: number) {
    const response = await fetch(`${BASE_URL}/players/${player.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({points})
    });
    return (await response.json()) as Player;
  }

}
