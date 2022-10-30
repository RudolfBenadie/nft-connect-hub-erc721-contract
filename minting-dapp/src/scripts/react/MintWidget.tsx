import { utils, BigNumber } from 'ethers';
import React from 'react';
import NetworkConfigInterface from '../../../../smart-contract/lib/NetworkConfigInterface';

interface Props {
  networkConfig: NetworkConfigInterface;
  maxSupply: number;
  totalSupply: number;
  tokenPrice: BigNumber;
  maxMintAmountPerTx: number;
  isPaused: boolean;
  loading: boolean;
  isRestrictedMintEnabled: boolean;
  isRestrictedPresaleMintEnabled: boolean;
  isUserInWhitelist: boolean;
  mintTokens(mintAmount: number): Promise<void>;
  restrictedMintTokens(mintAmount: number): Promise<void>;
  restrictedPresaleMintTokens(mintAmount: number): Promise<void>;
}

interface State {
  mintAmount: number;
}

const defaultState: State = {
  mintAmount: 1,
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private canMint(): boolean {
    return !this.props.isPaused || this.canRestrictedMint();
  }

  private canRestrictedMint(): boolean {
    return (this.props.isRestrictedMintEnabled || this.props.isRestrictedPresaleMintEnabled) && this.props.isUserInWhitelist;
  }

  private incrementMintAmount(): void {
    this.setState({
      mintAmount: Math.min(this.props.maxMintAmountPerTx, this.state.mintAmount + 1),
    });
  }

  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }

  private async mint(): Promise<void> {
    if (this.props.isRestrictedMintEnabled)
      await this.props.restrictedMintTokens(this.state.mintAmount);
    if (this.props.isRestrictedPresaleMintEnabled)
      await this.props.restrictedPresaleMintTokens(this.state.mintAmount);
    if (!this.props.isPaused) {
      await this.props.mintTokens(this.state.mintAmount);

      return;
    }
  }

  render() {
    return (
      <>
        {this.canMint() ?
          <div className={`mint-widget ${this.props.loading ? 'animate-pulse saturate-0 pointer-events-none' : ''}`}>
            <div className="preview">
              <img src="/build/images/preview.gif" alt="Collection preview" />
            </div>

            <div className="price">
              {this.props.isRestrictedMintEnabled
                ? <><strong>Total price:</strong> {utils.formatEther(this.props.tokenPrice.mul(this.state.mintAmount).sub(this.props.tokenPrice))}</>
                : <><strong>Total price:</strong> {utils.formatEther(this.props.tokenPrice.mul(this.state.mintAmount))}</>
              }
              {this.props.networkConfig.symbol}
            </div>

            <div className="controls">
              <button className="decrease" disabled={this.props.loading} onClick={() => this.decrementMintAmount()}>-</button>
              <span className="mint-amount">{this.state.mintAmount}</span>
              <button className="increase" disabled={this.props.loading} onClick={() => this.incrementMintAmount()}>+</button>
              <button className="primary" disabled={this.props.loading} onClick={() => this.mint()}>Mint</button>
            </div>
          </div>
          :
          <div className="cannot-mint">
            <span className="emoji">⏳</span>

            {this.props.isRestrictedMintEnabled
              ? <>You do not have an <strong>OG Connector role</strong>.</>
              : this.props.isRestrictedPresaleMintEnabled
                ? <>You are not included in the <strong>Connect presale list</strong>.</>
                : <>The contract is <strong>paused</strong>.</>
            }<br />
            Please come back during the next sale!
          </div>
        }
      </>
    );
  }
}
