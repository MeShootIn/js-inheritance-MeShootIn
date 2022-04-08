/**
 * Всевозможные статусы запроса.
 */
export class Status {
  static get WAIT() {
    return 'wait';
  }

  static get IN_PROGRESS() {
    return 'in-progress';
  }

  static get RESOLVED() {
    return 'resolved';
  }

  static get REJECTED() {
    return 'rejected';
  }
}
