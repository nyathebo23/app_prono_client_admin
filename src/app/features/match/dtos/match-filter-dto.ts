import { HttpParams } from '@angular/common/http';
import { MatchStatus } from '../enums/match-status';

export class MatchFilterDto {
  constructor(
    public after?: string | null,
    public before?: string | null,
    public inProgress?: boolean | null,
    public excludeStatus?: MatchStatus | null,
    public descending = false,
  ) {}

  static empty(): MatchFilterDto {
    return new MatchFilterDto();
  }

  toHttpParams(): HttpParams {
    let params = new HttpParams();

    if (this.after !== undefined && this.after !== null && this.after !== '') {
      params = params.set('after', this.after);
    }

    if (this.before !== undefined && this.before !== null && this.before !== '') {
      params = params.set('before', this.before);
    }

    if (this.inProgress !== undefined && this.inProgress !== null) {
      params = params.set('inProgress', String(this.inProgress));
    }

    if (this.excludeStatus !== undefined && this.excludeStatus !== null) {
      params = params.set('excludeStatus', String(this.excludeStatus));
    }

    params = params.set('descending', String(this.descending));

    return params;
  }
}
