class Utils {
  public static generateRandomString(): string {
    return Math.random().toString(36).substring(7);
  }
}
