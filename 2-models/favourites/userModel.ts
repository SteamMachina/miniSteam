export class UserModel {
  private user_name: string;
  private user_games: string[];
  private user_id: number;

  public constructor(user_name: string, user_games: string[], user_id: number) {
    this.user_name = user_name;
    this.user_games = user_games;
    this.user_id = user_id;
  }

  public getUser_name(): string {
    return this.user_name;
  }
  public getUser_games(): string[] {
    return this.user_games;
  }
  public getUser_id(): number {
    return this.user_id;
  }

  public setUser_name(user_name: string): void {
    this.user_name = user_name;
  }
  public setUser_games(user_games: string[]): void {
    this.user_games = user_games;
  }
  public setUser_id(user_id: number): void {
    this.user_id = user_id;
  }
}
