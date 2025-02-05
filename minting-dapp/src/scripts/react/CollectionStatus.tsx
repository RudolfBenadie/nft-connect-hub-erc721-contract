import React from 'react';

interface Props {
  userAddress: string | null;
  totalSupply: number;
  maxSupply: number;
  isPaused: boolean;
  isRestrictedMintEnabled: boolean;
  isRestrictedPresaleMintEnabled: boolean;
  isUserInWhitelist: boolean;
  isSoldOut: boolean;
}

interface State {
}

const defaultState: State = {
};

export default class CollectionStatus extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private isSaleOpen(): boolean {
    return (this.props.isRestrictedMintEnabled || this.props.isRestrictedPresaleMintEnabled || !this.props.isPaused) && !this.props.isSoldOut;
  }

  render() {
    return (
      <>
        <div className="collection-status">
          <div className="user-address">
            <span className="label">Wallet address:</span>
            <span className="address">{this.props.userAddress}</span>
          </div>

          <div className="supply">
            <span className="label">Supply</span>
            {this.props.totalSupply}/{this.props.maxSupply}
          </div>

          <div className="current-sale">
            <span className="label">Sale status</span>
            {this.isSaleOpen() ?
              <>
                {this.props.isRestrictedMintEnabled ? 'OG Connector' : this.props.isRestrictedPresaleMintEnabled ? 'Connect presale' : 'Open'}
              </>
              :
              'Closed'
            }
          </div>
        </div>
      </>
    );
  }
}
