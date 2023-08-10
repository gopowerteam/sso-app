export class RedirectError extends Error {
  constructor(public readonly redirect: string) {
    super()
  }
}
