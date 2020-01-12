import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {ConfigService} from './config.service';
import {Asset, AssetsConfig} from '../models/configuration';
import {ReplaySubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssetsProviderService {

    private assets: AssetsConfig;
    public changed = new ReplaySubject(1);

    constructor(private config: ConfigService) {
        this.config.changed.subscribe(() => {
            this.assets = config.getAssets();
            this.changed.next();
        });
    }

    public get(fileName: string): string {

        let foundAsset: string;
        foundAsset = this.getObject(fileName, false);
        if (!foundAsset || foundAsset === '') {
            foundAsset = this.getIcon(fileName, false);
        }
        if (!foundAsset || foundAsset === '') {
            foundAsset = this.getOther(fileName, false);
        }
        return foundAsset;

    }

    public getObject(fileName: string, defaultOnError: boolean = true): string {
        const foundAsset = _.find(this.assets.objects, a => a.name === fileName);
        if (!foundAsset && defaultOnError) {
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTExLTI3VDIxOjI1OjU0KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTExLTI3VDIxOjI1OjU0KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0xMS0yN1QyMToyNTo1NCswMTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiZDc3YTVkZS1jYjg2LWE3NDctYTcwNi0xM2U5MjdjOTJjN2QiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZTU3MjQxOS1lNDBhLTkxNDItYWUzZi1jMGE2NmNlYzk0MzEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDU3Y2M5MC0wYzM5LWFiNDMtODE4Zi1hMTFjNTRhZTMzNzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNTdjYzkwLTBjMzktYWI0My04MThmLWExMWM1NGFlMzM3MCIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0yN1QyMToyNTo1NCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiZDc3YTVkZS1jYjg2LWE3NDctYTcwNi0xM2U5MjdjOTJjN2QiIHN0RXZ0OndoZW49IjIwMTktMTEtMjdUMjE6MjU6NTQrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4D/+/PAAAF20lEQVRogdWZW2hcRRjHf7vdtpLW1jYmjZcqEo2p1qRYfbBU6YOiEfFSvEZUFC9IC31TBFERLV4etFRRBAVvqAEvffZBYlGEitpNN0nbCGpTbS41rUmzJtl4fPhm9szOzpw9exP7h2HmzJlvvvnmfPNd5iSCICAu7gSOArwD2GSB3cjXSWtkwp63EehVFAFAotSqdhvtzzWViyRIAh+ph1fU6OI1G8joF48YKwoAFlgjXwOeB5YDw8BxeypT0AB40sFO4znduAi4zljby8CjDoLAGMMshcIE9gD9nDAe4iAvwqtAVyyKcjTKhWngfWQTYuEf63kt8l0yiJxTWogu4BJgoWeiKxXXHijePhceU/XNWsWvN15q4hYH4a6kNQhkr7cCf1iDz0fp8RDwl8Vhp2OiuwGSwMfAYYuDWTQe1i/bFWHGsWYTCZDzMA6kkGOVBc4DlliDzwYmzY5twLklOAibanWpJIOId58AtyHqZR99F7LAILJ3g8BvwM/2oNspPJyVFpBDn7GN64whWSXlcWOuhUBPUm1DAKwDTnjE/8zTXwofJg3ia/GfzieMdgvxTdhQEphXD3cBc56B44T7q89gFJNbdEN/gy+ATuB3x+AliO907bkP3cbCgVB7VpdYWSncRyjp1xirWADkgFbgfosoh+j4JGKFcsApQBNioi4ENqmxzwKLML6Z7Qp9GEEOTxrYixymARy+1Ub9TUW9GdgnueaIUrUAiWEGgD5k7/vVs+/El83gBMXOwYdh5OP3IZb0VyBdikHU+9ORyKBT1W2It1ptjHnBNWm15VZjrgdTjpXtAXZFrNyHOeBFYBVwherrd0nwZgWTm/RbgIdUe2WK6myPD52q/jMJfKsefL5gK3BHGZPPI5EfUBjg5DwEO5HoKS6ySPA0phmkSxDYtj9A9tiHSaAZOZAkkYMRBwHwgGq/FTFOB5ZpzWAgxuR/q/pto+9Hz9isqvs0g9ESk+8AFjv61yFbYaNB1fs0A41TPQy24Y+DXA5HR/L9NoMOD4MozDj6ulV9zGagdXeiAkYmnDlVALxBbYzdZnNibewmgI3AdgqTtQAJYqcQ9dOOZiVilluB9aqeAF6nMJ3JH6BvgA3quQ3JoTuRbbsYCU9cltdGkf/QRP2KgcvwzQH7EbXbR+g6i2J/FzSDT4FDwC9qkoNYOVOlOPnjonojKmjw4SZEow8DRxBTNoakEBOEdvE/QRzNtnEjoVeIiyySwmhBR5A8aRzZhBHj3VHKiBsrEeAso70eiRFXqdKEOIgW67kZWIFcSNQS70YJcA5wA4WJXABcqto55OIpS6EqzhIGvoGin1f9M1YxjWoDEmQvRYRtRGLfFsSlDyMG9mnEux5CeUwfuqiNa6hF2aLW1Gr07QY2RyVPph5up/KrkUrLvY41rTXae4F0Csm4rwFOA5apshz5fBqNEYLWC2c4+syQJw0MpRC9uxzxtyCucQrxZA38P6CdlfkFMhAG1ebd5xrksHQTD/qiTJeN1azUg1lVawHmMSLSfgpTj6tU7YqjXeglzCF7cQfzz1BdbKLPY7uqD6AC2xTiQMzUxvxMcTCKhHwaCeAe5I8CiKnT7+eQ3KBcb30cUXVtdPIaU9RBmNfafyniYJOie49QpUzhUojfuKzMeaeRLEojrzFagP2EucYaVWcpD33AVzHH7qG8fB6KLRAQhhLziLfbAJyp+qZiTtwOfIlsQNwsG+AlxMvuiDF2GYWqnb+3MUOJDCIAiEk1//1EYZDCa616YDHihUHO7EH9whTgJ6PdAXxX50WVgx6jXfC7y/4CGh0UCtSG+IVKotdKkEMiXY0e4HtEvX/wETUTWo4PgKupX3BWbnnKt2g7IzsAXOB5Vw5WILlAExLTNBulCYmtGpGYayniGxYZ9ONqXEnYKpFBBAiQeDuFBHW1VJ2cWuA4cougM7JRo9Zx2HSpyeyF6dOdQHZoEvERY6qMKoZHCNNBvZhjlUpUDU76W4m6/w2qN/4Fpwb8n47C5uIAAAAASUVORK5CYII=';
        }
        return foundAsset ? foundAsset.data : '';
    }

    public getIcon(fileName: string, defaultOnError: boolean = true): string {
        const foundAsset = _.find(this.assets.icons, a => a.name === fileName);
        if (!foundAsset && defaultOnError) {
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTExLTI3VDIxOjI1OjU0KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTExLTI3VDIxOjI1OjU0KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0xMS0yN1QyMToyNTo1NCswMTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiZDc3YTVkZS1jYjg2LWE3NDctYTcwNi0xM2U5MjdjOTJjN2QiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZTU3MjQxOS1lNDBhLTkxNDItYWUzZi1jMGE2NmNlYzk0MzEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDU3Y2M5MC0wYzM5LWFiNDMtODE4Zi1hMTFjNTRhZTMzNzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNTdjYzkwLTBjMzktYWI0My04MThmLWExMWM1NGFlMzM3MCIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0yN1QyMToyNTo1NCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiZDc3YTVkZS1jYjg2LWE3NDctYTcwNi0xM2U5MjdjOTJjN2QiIHN0RXZ0OndoZW49IjIwMTktMTEtMjdUMjE6MjU6NTQrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4D/+/PAAAF20lEQVRogdWZW2hcRRjHf7vdtpLW1jYmjZcqEo2p1qRYfbBU6YOiEfFSvEZUFC9IC31TBFERLV4etFRRBAVvqAEvffZBYlGEitpNN0nbCGpTbS41rUmzJtl4fPhm9szOzpw9exP7h2HmzJlvvvnmfPNd5iSCICAu7gSOArwD2GSB3cjXSWtkwp63EehVFAFAotSqdhvtzzWViyRIAh+ph1fU6OI1G8joF48YKwoAFlgjXwOeB5YDw8BxeypT0AB40sFO4znduAi4zljby8CjDoLAGMMshcIE9gD9nDAe4iAvwqtAVyyKcjTKhWngfWQTYuEf63kt8l0yiJxTWogu4BJgoWeiKxXXHijePhceU/XNWsWvN15q4hYH4a6kNQhkr7cCf1iDz0fp8RDwl8Vhp2OiuwGSwMfAYYuDWTQe1i/bFWHGsWYTCZDzMA6kkGOVBc4DlliDzwYmzY5twLklOAibanWpJIOId58AtyHqZR99F7LAILJ3g8BvwM/2oNspPJyVFpBDn7GN64whWSXlcWOuhUBPUm1DAKwDTnjE/8zTXwofJg3ia/GfzieMdgvxTdhQEphXD3cBc56B44T7q89gFJNbdEN/gy+ATuB3x+AliO907bkP3cbCgVB7VpdYWSncRyjp1xirWADkgFbgfosoh+j4JGKFcsApQBNioi4ENqmxzwKLML6Z7Qp9GEEOTxrYixymARy+1Ub9TUW9GdgnueaIUrUAiWEGgD5k7/vVs+/El83gBMXOwYdh5OP3IZb0VyBdikHU+9ORyKBT1W2It1ptjHnBNWm15VZjrgdTjpXtAXZFrNyHOeBFYBVwherrd0nwZgWTm/RbgIdUe2WK6myPD52q/jMJfKsefL5gK3BHGZPPI5EfUBjg5DwEO5HoKS6ySPA0phmkSxDYtj9A9tiHSaAZOZAkkYMRBwHwgGq/FTFOB5ZpzWAgxuR/q/pto+9Hz9isqvs0g9ESk+8AFjv61yFbYaNB1fs0A41TPQy24Y+DXA5HR/L9NoMOD4MozDj6ulV9zGagdXeiAkYmnDlVALxBbYzdZnNibewmgI3AdgqTtQAJYqcQ9dOOZiVilluB9aqeAF6nMJ3JH6BvgA3quQ3JoTuRbbsYCU9cltdGkf/QRP2KgcvwzQH7EbXbR+g6i2J/FzSDT4FDwC9qkoNYOVOlOPnjonojKmjw4SZEow8DRxBTNoakEBOEdvE/QRzNtnEjoVeIiyySwmhBR5A8aRzZhBHj3VHKiBsrEeAso70eiRFXqdKEOIgW67kZWIFcSNQS70YJcA5wA4WJXABcqto55OIpS6EqzhIGvoGin1f9M1YxjWoDEmQvRYRtRGLfFsSlDyMG9mnEux5CeUwfuqiNa6hF2aLW1Gr07QY2RyVPph5up/KrkUrLvY41rTXae4F0Csm4rwFOA5apshz5fBqNEYLWC2c4+syQJw0MpRC9uxzxtyCucQrxZA38P6CdlfkFMhAG1ebd5xrksHQTD/qiTJeN1azUg1lVawHmMSLSfgpTj6tU7YqjXeglzCF7cQfzz1BdbKLPY7uqD6AC2xTiQMzUxvxMcTCKhHwaCeAe5I8CiKnT7+eQ3KBcb30cUXVtdPIaU9RBmNfafyniYJOie49QpUzhUojfuKzMeaeRLEojrzFagP2EucYaVWcpD33AVzHH7qG8fB6KLRAQhhLziLfbAJyp+qZiTtwOfIlsQNwsG+AlxMvuiDF2GYWqnb+3MUOJDCIAiEk1//1EYZDCa616YDHihUHO7EH9whTgJ6PdAXxX50WVgx6jXfC7y/4CGh0UCtSG+IVKotdKkEMiXY0e4HtEvX/wETUTWo4PgKupX3BWbnnKt2g7IzsAXOB5Vw5WILlAExLTNBulCYmtGpGYayniGxYZ9ONqXEnYKpFBBAiQeDuFBHW1VJ2cWuA4cougM7JRo9Zx2HSpyeyF6dOdQHZoEvERY6qMKoZHCNNBvZhjlUpUDU76W4m6/w2qN/4Fpwb8n47C5uIAAAAASUVORK5CYII=';
        }
        return foundAsset ? foundAsset.data : '';
    }

    public getOther(fileName: string, defaultOnError: boolean = true): string {
        const foundAsset = _.find(this.assets.others, a => a.name === fileName);
        if (!foundAsset && defaultOnError) {
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAAEgBckRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTExLTI3VDIxOjI1OjU0KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTExLTI3VDIxOjI1OjU0KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0xMS0yN1QyMToyNTo1NCswMTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiZDc3YTVkZS1jYjg2LWE3NDctYTcwNi0xM2U5MjdjOTJjN2QiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZTU3MjQxOS1lNDBhLTkxNDItYWUzZi1jMGE2NmNlYzk0MzEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDU3Y2M5MC0wYzM5LWFiNDMtODE4Zi1hMTFjNTRhZTMzNzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNTdjYzkwLTBjMzktYWI0My04MThmLWExMWM1NGFlMzM3MCIgc3RFdnQ6d2hlbj0iMjAxOS0xMS0yN1QyMToyNTo1NCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiZDc3YTVkZS1jYjg2LWE3NDctYTcwNi0xM2U5MjdjOTJjN2QiIHN0RXZ0OndoZW49IjIwMTktMTEtMjdUMjE6MjU6NTQrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4D/+/PAAAF20lEQVRogdWZW2hcRRjHf7vdtpLW1jYmjZcqEo2p1qRYfbBU6YOiEfFSvEZUFC9IC31TBFERLV4etFRRBAVvqAEvffZBYlGEitpNN0nbCGpTbS41rUmzJtl4fPhm9szOzpw9exP7h2HmzJlvvvnmfPNd5iSCICAu7gSOArwD2GSB3cjXSWtkwp63EehVFAFAotSqdhvtzzWViyRIAh+ph1fU6OI1G8joF48YKwoAFlgjXwOeB5YDw8BxeypT0AB40sFO4znduAi4zljby8CjDoLAGMMshcIE9gD9nDAe4iAvwqtAVyyKcjTKhWngfWQTYuEf63kt8l0yiJxTWogu4BJgoWeiKxXXHijePhceU/XNWsWvN15q4hYH4a6kNQhkr7cCf1iDz0fp8RDwl8Vhp2OiuwGSwMfAYYuDWTQe1i/bFWHGsWYTCZDzMA6kkGOVBc4DlliDzwYmzY5twLklOAibanWpJIOId58AtyHqZR99F7LAILJ3g8BvwM/2oNspPJyVFpBDn7GN64whWSXlcWOuhUBPUm1DAKwDTnjE/8zTXwofJg3ia/GfzieMdgvxTdhQEphXD3cBc56B44T7q89gFJNbdEN/gy+ATuB3x+AliO907bkP3cbCgVB7VpdYWSncRyjp1xirWADkgFbgfosoh+j4JGKFcsApQBNioi4ENqmxzwKLML6Z7Qp9GEEOTxrYixymARy+1Ub9TUW9GdgnueaIUrUAiWEGgD5k7/vVs+/El83gBMXOwYdh5OP3IZb0VyBdikHU+9ORyKBT1W2It1ptjHnBNWm15VZjrgdTjpXtAXZFrNyHOeBFYBVwherrd0nwZgWTm/RbgIdUe2WK6myPD52q/jMJfKsefL5gK3BHGZPPI5EfUBjg5DwEO5HoKS6ySPA0phmkSxDYtj9A9tiHSaAZOZAkkYMRBwHwgGq/FTFOB5ZpzWAgxuR/q/pto+9Hz9isqvs0g9ESk+8AFjv61yFbYaNB1fs0A41TPQy24Y+DXA5HR/L9NoMOD4MozDj6ulV9zGagdXeiAkYmnDlVALxBbYzdZnNibewmgI3AdgqTtQAJYqcQ9dOOZiVilluB9aqeAF6nMJ3JH6BvgA3quQ3JoTuRbbsYCU9cltdGkf/QRP2KgcvwzQH7EbXbR+g6i2J/FzSDT4FDwC9qkoNYOVOlOPnjonojKmjw4SZEow8DRxBTNoakEBOEdvE/QRzNtnEjoVeIiyySwmhBR5A8aRzZhBHj3VHKiBsrEeAso70eiRFXqdKEOIgW67kZWIFcSNQS70YJcA5wA4WJXABcqto55OIpS6EqzhIGvoGin1f9M1YxjWoDEmQvRYRtRGLfFsSlDyMG9mnEux5CeUwfuqiNa6hF2aLW1Gr07QY2RyVPph5up/KrkUrLvY41rTXae4F0Csm4rwFOA5apshz5fBqNEYLWC2c4+syQJw0MpRC9uxzxtyCucQrxZA38P6CdlfkFMhAG1ebd5xrksHQTD/qiTJeN1azUg1lVawHmMSLSfgpTj6tU7YqjXeglzCF7cQfzz1BdbKLPY7uqD6AC2xTiQMzUxvxMcTCKhHwaCeAe5I8CiKnT7+eQ3KBcb30cUXVtdPIaU9RBmNfafyniYJOie49QpUzhUojfuKzMeaeRLEojrzFagP2EucYaVWcpD33AVzHH7qG8fB6KLRAQhhLziLfbAJyp+qZiTtwOfIlsQNwsG+AlxMvuiDF2GYWqnb+3MUOJDCIAiEk1//1EYZDCa616YDHihUHO7EH9whTgJ6PdAXxX50WVgx6jXfC7y/4CGh0UCtSG+IVKotdKkEMiXY0e4HtEvX/wETUTWo4PgKupX3BWbnnKt2g7IzsAXOB5Vw5WILlAExLTNBulCYmtGpGYayniGxYZ9ONqXEnYKpFBBAiQeDuFBHW1VJ2cWuA4cougM7JRo9Zx2HSpyeyF6dOdQHZoEvERY6qMKoZHCNNBvZhjlUpUDU76W4m6/w2qN/4Fpwb8n47C5uIAAAAASUVORK5CYII=';
        }
        return foundAsset ? foundAsset.data : '';
    }

    public getAllObjects(): Asset[] {
        return [...this.assets.objects];
    }

    public getAllIcons(): Asset[] {
        return [...this.assets.icons];
    }

    public getAllOthers(): Asset[] {
        return [...this.assets.others];
    }
}

export function loadImage(data: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const obj = new Image();
        obj.alt = '';
        obj.onload = () => {
            resolve(obj);
        };
        obj.src = data;
    });
}