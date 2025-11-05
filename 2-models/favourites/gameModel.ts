export class GameModel {
  private game_name: string;
  private game_id: number;

  public constructor(game_name: string, game_id: number) {
    this.game_name = game_name;
    this.game_id = game_id;
  }

  public getGame_name(): string {
    return this.game_name;
  }
  public getGame_id(): number {
    return this.game_id;
  }

  public setGame_name(game_name: string): void {
    this.game_name = game_name;
  }
  public setGame_id(game_id: number): void {
    this.game_id = game_id;
  }
}
