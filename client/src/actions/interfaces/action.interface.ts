interface IAction {
  label: string;
  execute(evt: MouseEvent, index: number, game: IGame): void;
}
