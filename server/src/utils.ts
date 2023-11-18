export default class Utils {
  public static generateRandomString(): string {
    return Math.random().toString(36).substring(7);
  }
  public static createIndexArray(size: number): number[] {
    return new Array(size).fill(null).map((_value: null, index: number) => index);
  }
}
