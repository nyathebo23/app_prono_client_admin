import { HttpParams } from '@angular/common/http';
import { PlayerSex } from '../../../shared/utils/enums/player-sex';
import { TeamKind } from '../enums/team-kind';

export class SearchTeamQueryDto {
  constructor(
    public countryCode?: string | null,
    public kind?: TeamKind | null,
    public playerSex?: PlayerSex | null,
    public name?: string | null,
  ) {}

  static empty(): SearchTeamQueryDto {
    return new SearchTeamQueryDto();
  }

  toHttpParams(): HttpParams {
    let params = new HttpParams();

    if (this.countryCode) {
      params = params.set('countryCode', this.countryCode);
    }

    if (this.kind !== undefined && this.kind !== null) {
      params = params.set('kind', String(this.kind));
    }

    if (this.playerSex !== undefined && this.playerSex !== null) {
      params = params.set('playerSex', String(this.playerSex));
    }

    if (this.name) {
      params = params.set('name', this.name);
    }

    return params;
  }
}
